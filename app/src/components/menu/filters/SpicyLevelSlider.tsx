import React from 'react';
import styled from 'styled-components/native';
import {Splitter} from '../../common/Splitter';
import {FilterHeader} from './FilterHeader';
import {SliderKnob} from './SliderKnob';
import {fillByIndex} from '../../../lib/fillByIndex';
import {Dimensions, PanResponder, View} from 'react-native';

interface IProps {
  value: number;
  onChange: (v: number) => void;
}

// Emoji names
const emojiNames = [
  'nerd_face',
  'grin',
  'smiling_imp',
  'exploding_head',
  'face_with_symbols_on_mouth',
  'face_with_symbols_on_mouth',
];

//region Style

const StyledHeader = styled(FilterHeader)`
  margin-top: 2px;
`;

const StyledContainer = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: center;
  margin-bottom: 12px;
  margin-top: 29px;
`;

const StyledSplitter = styled(Splitter)`
  margin-top: 15px;
`;

//endregion Style

const Knob = ({index, value, onChange}: {index: number} & IProps) => (
  <SliderKnob
    key={index}
    index={index}
    active={index <= value}
    emoji={emojiNames[index]}
    onSelect={onChange}
  />
);

const StyledPanHandler = styled(View)`
  position: absolute;
  width: 100%;
  height: 75px;
  opacity: 0.5;
  top: -40px;
  display: flex;
  justify-content: center;
  flex-direction: row;
`;

const hitBoxWidth = 56;

export const SpicyLevelSlider = (props: IProps) => {
  const knobs = fillByIndex(i => <Knob index={i} {...props} key={i} />, 5);

  const handleSlide = (evt: any) => {
    const center = Dimensions.get('window').width * 0.5;
    const posX = evt.nativeEvent.pageX - center;

    if (posX >= hitBoxWidth * 1.5) {
      props.onChange(4);
    }
    if (posX <= hitBoxWidth * 1.5 && posX >= hitBoxWidth * 0.5) {
      props.onChange(3);
    }
    if (posX <= hitBoxWidth * 0.5 && posX >= hitBoxWidth * -0.5) {
      props.onChange(2);
    }
    if (posX <= hitBoxWidth * -0.5 && posX >= hitBoxWidth * -1.5) {
      props.onChange(1);
    }
    if (posX <= hitBoxWidth * -1.5) {
      props.onChange(0);
    }
  };

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: evt => {
        handleSlide(evt);
        return true;
      },
      onMoveShouldSetPanResponder: evt => {
        handleSlide(evt);
        return true;
      },
      onStartShouldSetPanResponderCapture: evt => {
        handleSlide(evt);
        return true;
      },
      onMoveShouldSetPanResponderCapture: evt => {
        handleSlide(evt);
        return true;
      },
      onPanResponderMove: (evt, gestureState) => {
        handleSlide(evt);
      },
    }),
  ).current;

  return (
    <>
      <StyledHeader value="Spicy level" />
      <StyledContainer>
        {knobs}
        <StyledPanHandler {...panResponder.panHandlers} />
      </StyledContainer>
      <StyledSplitter />
    </>
  );
};
