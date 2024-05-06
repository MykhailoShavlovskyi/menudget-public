import styled from 'styled-components/native';
import {TableEntry} from './TableEntry';
import React, {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ScrollView, View} from 'react-native';
import {env} from '../../lib/env';
import {useMount, useRafLoop} from 'react-use';
import {easeInCubic, easeOutCubic} from '../../lib/easing';
import {useFocusEffect} from '@react-navigation/native';

const StyledContainer = styled.View`
  padding: 17px 0 24px;
  position: absolute;
  flex-direction: row;
  width: 100%;
  top: 0;
  background-color: #ffffff;

  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;

  box-shadow: 0 0 8px #dddddd;
`;

export type Table = {
  id: number;
  name: string;
  state: string; // 'idle' | 'order-in-progress' | 'order-ready' | 'order-payed'
};

export const NotificationBar = forwardRef(
  (
    {
      tables,
      onTablePress,
    }: {
      tables: Table[];
      onTablePress: (id: number) => void;
    },
    ref,
  ) => {
    const instentTop = useSafeAreaInsets().top;
    useMount(() => {
      distance = -instentTop - 15 - 90;
    });

    return tables.length > 0 ? (
      <StyledContainer style={{paddingTop: instentTop + 15}} ref={ref}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          nestedScrollEnabled={true}>
          {tables.map((v: Table, i) => (
            <TableEntry
              {...v}
              first={i === 0}
              key={v.id}
              onPress={onTablePress}
            />
          ))}
          {env.DEV_MODE && false && (
            <>
              <TableEntry
                id={1}
                name={'S4'}
                state={'idle'}
                key={'a'}
                onPress={onTablePress}
              />
              <TableEntry
                id={1}
                name={'6'}
                state={'order-in-progress'}
                key={'b'}
                onPress={onTablePress}
              />
              <TableEntry
                id={1}
                name={'8'}
                state={'order-ready'}
                key={'c'}
                onPress={onTablePress}
              />
              <TableEntry
                id={1}
                name={'A5'}
                state={'order-payed'}
                key={'d'}
                onPress={onTablePress}
              />
            </>
          )}
        </ScrollView>
      </StyledContainer>
    ) : null;
  },
);

export const NotificationBarContext = createContext<{
  showNotificationBar: () => void;
  hideNotificationBar: () => void;
}>({
  showNotificationBar: () => {},
  hideNotificationBar: () => {},
});
export const useShowNotificationBar = () =>
  useContext(NotificationBarContext).showNotificationBar;
export const useHideNotificationBar = () =>
  useContext(NotificationBarContext).hideNotificationBar;

export const useHideNotificationBarWhileInFocus = () => {
  const hideNotificationBar = useHideNotificationBar();
  const showNotificationBar = useShowNotificationBar();

  useFocusEffect(
    useCallback(() => {
      hideNotificationBar();
      return showNotificationBar;
    }, []),
  );
};

let startTime = 0;
let duration = 250;
let distance = 0;

let open = true;

export function useNotificationBar() {
  const notificationBarRef = useRef<View>();
  const [animating, setAnimating] = useState(false);

  const hideNotificationBar = useCallback(() => {
    if (!open) {
      return;
    }
    startTime = performance.now();
    open = false;
    setAnimating(true);
  }, [open]);

  const showNotificationBar = useCallback(() => {
    if (open) {
      return;
    }
    startTime = performance.now();
    open = true;
    setAnimating(true);
  }, [open]);

  useRafLoop(() => {
    if (!animating) {
      return;
    }

    const time = performance.now();
    let delta = time - startTime;
    if (delta > duration) {
      setAnimating(false);
      delta = duration;
    }
    if (open) {
      delta = easeOutCubic(delta / duration) * duration;
    } else {
      delta = easeInCubic(delta / duration) * duration;
    }

    let top = (delta / duration) * distance;
    if (open) {
      top = distance - top;
    }
    notificationBarRef.current?.setNativeProps({style: {top}});
  });

  return {
    notificationBarRef,
    showNotificationBar,
    hideNotificationBar,
  };
}
