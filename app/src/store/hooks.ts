import {useSessionKey} from '../lib/storage';
import {useCallback} from 'react';
import {logout} from './slice';

export function useLogout() {
  const {setSessionKey} = useSessionKey();

  return useCallback(() => {
    setSessionKey(null);
    logout();
  }, []);
}
