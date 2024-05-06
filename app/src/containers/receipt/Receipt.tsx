import React, {useEffect, useRef} from 'react';
import {usePortrait} from '../../lib/orientation';
import {
  ReceiptLayout,
  setReceiptMinY,
} from '../../components/receipt/ReceiptLayout';
import {ScrollView, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ReceiptFooter} from './ReceiptFooter';
import {ReceiptDishes} from './ReceiptDishes';
import {ReceiptInput} from './ReceiptInput';

export const Receipt = ({
  bottom,
  opacity,
  onHide,
}: {
  bottom: number;
  opacity: number;
  onHide: () => void;
}) => {
  usePortrait();

  const scrollRef = useRef();
  const handleInputFocus = () => {
    setTimeout(() => {
      (scrollRef.current as unknown as ScrollView).scrollToEnd({
        animated: true,
      });
    }, 200);
  };

  const receiptRef = useRef<View>();
  useEffect(() => {
    receiptRef.current?.setNativeProps({bottom});
  }, [bottom]);

  const backgroundRef = useRef<View>();
  useEffect(() => {
    backgroundRef.current?.setNativeProps({opacity});
  }, [opacity]);

  setReceiptMinY(useSafeAreaInsets().top + 64);

  return (
    <ReceiptLayout
      open={bottom === 0}
      onHide={onHide}
      Dishes={ReceiptDishes}
      Input={<ReceiptInput onFocus={handleInputFocus} />}
      Footer={ReceiptFooter}
      innerPanelRef={receiptRef}
      backgroundRef={backgroundRef}
      scrollRef={scrollRef}
    />
  );
};
