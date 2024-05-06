import React, {useRef} from 'react';
import {ReceiptLayout} from '../../../components/_old/receipt/ReceiptLayout';
import {ReceiptDishes} from './ReceiptDishes';
import {ReceiptInput} from './ReceiptInput';
import {ReceiptFooter} from './ReceiptFooter';
import {usePortrait} from '../../../lib/orientation';
import {ScrollView} from 'react-native';

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

  return (
    <ReceiptLayout
      bottom={bottom}
      opacity={opacity}
      onHide={onHide}
      Dishes={ReceiptDishes}
      Input={<ReceiptInput onFocus={handleInputFocus} />}
      Footer={ReceiptFooter}
      scrollRef={scrollRef}
    />
  );
};
