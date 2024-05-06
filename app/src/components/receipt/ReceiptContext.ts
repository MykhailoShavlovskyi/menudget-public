import {createContext, useCallback, useState} from 'react';
import {Dimensions} from 'react-native';
import {useRafLoop} from 'react-use';
import {easeInCubic, easeOutCubic} from '../../lib/easing';

export const ReceiptContext = createContext<{
  showReceipt: () => void;
  hideReceipt: () => void;
}>({
  showReceipt: () => {},
  hideReceipt: () => {},
});

let startTime = 0;
//let duration = 250;
export let receiptAnimationDuration = 350;
let heightDistance = -Dimensions.get('window').height;
let opacityDistance = 0.8;

let open = false;

export function useReceipt() {
  const [bottom, setBottom] = useState(-Dimensions.get('window').height);
  const [opacity, setOpacity] = useState(0);
  const [animating, setAnimating] = useState(false);

  const hideReceipt = useCallback(() => {
    if (!open) {
      return;
    }
    startTime = performance.now();
    open = false;
    setAnimating(true);
  }, []);

  const showReceipt = useCallback(() => {
    if (open) {
      return;
    }
    startTime = performance.now();
    open = true;
    setAnimating(true);
  }, []);

  useRafLoop(() => {
    if (!animating) {
      return;
    }

    const time = performance.now();
    let delta = time - startTime;
    if (delta > receiptAnimationDuration) {
      setAnimating(false);
      delta = receiptAnimationDuration;
    }
    if (open) {
      delta =
        easeOutCubic(delta / receiptAnimationDuration) *
        receiptAnimationDuration;
    } else {
      delta =
        easeInCubic(delta / receiptAnimationDuration) *
        receiptAnimationDuration;
    }

    let bottom = (delta / receiptAnimationDuration) * heightDistance;
    if (open) {
      bottom = heightDistance - bottom;
    }
    setBottom(bottom);

    let opacity = (delta / receiptAnimationDuration) * opacityDistance;
    if (!open) {
      opacity = opacityDistance - opacity;
    }
    setOpacity(opacity);
  });

  return {
    bottom,
    opacity,
    showReceipt,
    hideReceipt,
  };
}
