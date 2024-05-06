import React, {MutableRefObject, ReactNode, RefObject, useRef} from 'react';
import styled from 'styled-components/native';
import {OrderMessages} from './OrderMessages';
import {Color} from '../../../lib/Color';
import {
  Dimensions,
  PanResponder,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {KeyboardAvoidingViewWrapper} from '../../common/KeyboardAvoidingViewWrapper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const StyledContainer = styled.View`
  flex: 1;
  padding-right: 32px;
  padding-left: 35px;
  padding-top: 28px;

  width: 100%;
  background-color: white;

  border-top-left-radius: 46.75px;
  border-top-right-radius: 46.75px;
  box-shadow: 0 0 7px #b1b1b1;
`;

const StyledBackground = styled.View`
  position: absolute;
  background-color: ${Color.GOLDEN_GLOW};
  opacity: 0.5;
  height: 100%;
  width: 100%;
`;

const StyledFooterView = styled.View`
  background-color: white;
  align-items: center;
  padding-bottom: 30px;
  bottom: 0;
`;

const StyledScrollContainer = styled.ScrollView`
  padding-top: 6px;
  flex: 1;
`;

const StyledSplitter = styled.View`
  border-top-color: #f4f4f4;
  border-top-width: 1.3px;
  width: 95%;
`;

const DishesWrp = styled.View`
  min-height: 100px;
`;

let minY = 0;
let maxY = Dimensions.get('window').height - 300;
let posY = -1;
let startPointerY = 0;
let startY = 0;
let currentY = minY;

function useReceiptDragging(
  ref: MutableRefObject<any>,
  messagesRed: MutableRefObject<any>,
  headerRef: MutableRefObject<any>,
  descriptionRef: MutableRefObject<any>,
  onHide: () => void,
) {
  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: evt => {
        return (
          evt.target === ref.current ||
          evt.target === messagesRed.current ||
          evt.target === headerRef.current ||
          evt.target === descriptionRef.current
        );
      },
      onMoveShouldSetPanResponder: evt => {
        return (
          evt.target === ref.current ||
          evt.target === messagesRed.current ||
          evt.target === headerRef.current ||
          evt.target === descriptionRef.current
        );
      },
      onStartShouldSetPanResponderCapture: evt => {
        return (
          evt.target === ref.current ||
          evt.target === messagesRed.current ||
          evt.target === headerRef.current ||
          evt.target === descriptionRef.current
        );
      },
      onMoveShouldSetPanResponderCapture: evt => {
        return (
          evt.target === ref.current ||
          evt.target === messagesRed.current ||
          evt.target === headerRef.current ||
          evt.target === descriptionRef.current
        );
      },

      onPanResponderGrant: (evt, gestureState) => {
        startPointerY = evt.nativeEvent.pageY;
        startY = currentY;
      },
      onPanResponderMove: (evt, gestureState) => {
        // Move receipt
        const delta = startPointerY - evt.nativeEvent.pageY;

        //console.debug({from: startPointerY, to: evt.nativeEvent.pageY});
        //console.debug({delta});

        ref.current?.setNativeProps({
          marginTop: Math.min(Math.max(minY, startY - delta), maxY),
        });
        currentY = Math.min(Math.max(minY, startY - delta), maxY);

        // Trigger close
        if (currentY > Dimensions.get('window').height - 400) {
          onHide();
          setTimeout(() => {
            currentY = minY;
            ref.current?.setNativeProps({marginTop: minY});
          }, 1000);
        }
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // Trigger close
        if (currentY > Dimensions.get('window').height - 400) {
          onHide();
          setTimeout(() => {
            currentY = minY;
            ref.current?.setNativeProps({marginTop: minY});
          }, 1000);
        }
        // Restore to original
        else if (currentY > minY) {
          const update = () => {
            currentY -= 30;
            ref.current?.setNativeProps({marginTop: Math.max(currentY, minY)});
            if (currentY > minY) {
              console.debug('next', currentY, minY);
              requestAnimationFrame(update);
            }
          };
          update();
        }
      },
    }),
  ).current;

  return panResponder.panHandlers;
}

export const ReceiptLayout = ({
  bottom,
  opacity,
  onHide,
  Dishes,
  Input,
  Footer,
  scrollRef,
}: {
  bottom: number;
  opacity: number;
  onHide: () => void;
  Dishes: () => JSX.Element;
  Input: ReactNode;
  Footer: () => JSX.Element;
  scrollRef: RefObject<any>;
}) => {
  const open = bottom === 0;
  minY = useSafeAreaInsets().top + 64;
  if (posY === -1) {
    posY = minY;
  }

  const ref = useRef<View>();
  const messagesRed = useRef<Text>();
  const headerRef = useRef<Text>();
  const descriptionRef = useRef<Text>();
  const panHandlers = useReceiptDragging(
    ref,
    messagesRed,
    headerRef,
    descriptionRef,
    onHide,
  );

  return (
    <View style={{height: '100%'}} pointerEvents={open ? 'auto' : 'none'}>
      <TouchableWithoutFeedback
        onPress={onHide}
        style={{backgroundColor: 'red', zIndex: 20}}>
        <StyledBackground style={{opacity}} />
      </TouchableWithoutFeedback>

      <StyledContainer
        ref={ref}
        style={{
          marginTop: minY,
          bottom,
        }}
        {...panHandlers}>
        <KeyboardAvoidingViewWrapper offset={minY}>
          <OrderMessages
            messagesRed={messagesRed}
            headerRef={headerRef}
            descriptionRef={descriptionRef}
            {...panHandlers}
          />
          <StyledScrollContainer
            ref={scrollRef}
            nestedScrollEnabled
            bounces={false}
            showsVerticalScrollIndicator={false}>
            <DishesWrp>
              <Dishes />
            </DishesWrp>
            {Input}
          </StyledScrollContainer>
          <StyledFooterView>
            <StyledSplitter />
            <Footer />
          </StyledFooterView>
        </KeyboardAvoidingViewWrapper>
      </StyledContainer>
    </View>
  );
};
