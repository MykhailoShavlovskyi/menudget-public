import {useSpring} from 'react-spring';
import {awaitTimeout} from './awaitTimeout';

/**
 * Use to create animation spring loop
 * @param duration - animation duration
 * @param delay - initial delay (0-1 relative to animation duration)
 * @param from - animation from values
 * @param getNextState - animation to values getter
 */
export function useLoopSpring(
  duration: number,
  delay: number,
  from: any,
  getNextState: (toggle: 0 | 1) => any,
) {
  // Gets spring 'to' values.
  // !Important - getTo function have to return Promise, otherwise - there throw exceptions
  const getTo = async (next: (param: typeof getNextState) => Promise<any>) => {
    // State toggle
    let toggle = 0;
    const toggleState = () => (toggle = 1 - toggle) as 0 | 1;

    // Update loop
    let initial = true;
    const update = async () => {
      if (initial) {
        initial = false;
        await awaitTimeout(duration * delay);
      }

      next(getNextState(toggleState()))?.then(update);
    };
    void update();
  };

  // Create spring
  return useSpring({
    config: {delay, duration},
    from,
    to: getTo,
  });
}
