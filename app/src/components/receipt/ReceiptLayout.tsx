import React, {
  memo,
  MutableRefObject,
  ReactNode,
  RefObject,
  useRef,
} from 'react';
import styled from 'styled-components/native';
import {Color} from '../../lib/Color';
import {
  Dimensions,
  PanResponder,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {KeyboardAvoidingViewWrapper} from '../common/KeyboardAvoidingViewWrapper';
import {ReceiptMessages} from './ReceiptMessages';
import {receiptAnimationDuration} from './ReceiptContext';

const StyledContainer = styled.View`
  flex: 1;
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
  padding: 0 16px 42px;
  bottom: 0;
`;

const StyledScrollContainer = styled.ScrollView`
  padding: 6px 16px 0;
  flex: 1;
`;

export const StyledSplitter = styled.View`
  border-top-color: #e3e3e3;
  border-top-width: 1px;
  width: 100%;
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
let scrollState = 0;

export function setReceiptMinY(v: number) {
  minY = v;
  if (posY === -1) {
    posY = minY;
  }
}

function useReceiptDragging(
  ref: MutableRefObject<any>,
  textRef: MutableRefObject<any>,
  scrollRef: MutableRefObject<any>,
  onHide: () => void,
) {
  const panResponder = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, {dx, dy}) => {
        if (evt.target !== textRef.current && scrollState !== 0) {
          return false;
        }

        const draggedDown = dy > 15;
        const draggedUp = dy < -15;
        const draggedLeft = dx < -15;
        const draggedRight = dx > 15;
        return draggedDown || draggedUp || draggedLeft || draggedRight;
      },

      onPanResponderGrant: evt => {
        startPointerY = evt.nativeEvent.pageY;
        startY = currentY;
      },
      onPanResponderMove: evt => {
        // Move receipt
        const delta = startPointerY - evt.nativeEvent.pageY;

        ref.current?.setNativeProps({
          marginTop: Math.min(Math.max(minY, startY - delta), maxY),
        });
        currentY = Math.min(Math.max(minY, startY - delta), maxY);

        // Trigger close
        if (currentY > Dimensions.get('window').height - 510) {
          onHide();
          setTimeout(() => {
            currentY = minY;
            ref.current?.setNativeProps({marginTop: minY});
          }, receiptAnimationDuration * 1.1);
        }
      },
      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease: () => {
        // Trigger close
        if (currentY > Dimensions.get('window').height - 510) {
          onHide();
          setTimeout(() => {
            currentY = minY;
            ref.current?.setNativeProps({marginTop: minY});
          }, receiptAnimationDuration * 1.1);
        }
        // Restore to original
        else if (currentY > minY) {
          const update = () => {
            currentY -= 30;
            ref.current?.setNativeProps({marginTop: Math.max(currentY, minY)});
            if (currentY > minY) {
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

export const ReceiptLayout = memo(
  ({
    open,
    onHide,
    Dishes,
    Input,
    Footer,
    backgroundRef,
    innerPanelRef,
    scrollRef,
  }: {
    open: boolean;
    onHide: () => void;
    Dishes: () => JSX.Element;
    Input: ReactNode;
    Footer: () => JSX.Element;
    backgroundRef: RefObject<any>;
    innerPanelRef: RefObject<any>;
    scrollRef: RefObject<any>;
  }) => {
    const textRef = useRef();
    const panHandlers = useReceiptDragging(
      innerPanelRef,
      textRef,
      scrollRef,
      onHide,
    );

    const handleScroll = (event: any) => {
      scrollState = event.nativeEvent.contentOffset.y;
    };

    return (
      <View style={{height: '100%'}} pointerEvents={open ? 'auto' : 'none'}>
        <TouchableWithoutFeedback
          onPress={onHide}
          style={{backgroundColor: 'red', zIndex: 20}}>
          <StyledBackground ref={backgroundRef} />
        </TouchableWithoutFeedback>

        <StyledContainer
          ref={innerPanelRef}
          style={{marginTop: minY}}
          {...panHandlers}>
          <KeyboardAvoidingViewWrapper offset={minY}>
            <ReceiptMessages ref={textRef} />
            <StyledScrollContainer
              ref={scrollRef}
              nestedScrollEnabled
              bounces={false}
              showsVerticalScrollIndicator={false}
              scrollEventThrottle={4}
              onScroll={handleScroll}>
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
  },
  (p, n) => p.open === n.open,
);
