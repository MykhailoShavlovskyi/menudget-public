import {useEffect} from 'react';

export function usePolling(action: () => void, timeDelta = 2500) {
  useEffect(() => {
    let destroyed = false;

    // On mount
    const fetch = async () => {
      if (destroyed) return;
      action();
      setTimeout(() => fetch(), 2500);
    };
    void fetch();

    // On unmount
    return () => {
      destroyed = true;
    };
  }, [action]);
}
