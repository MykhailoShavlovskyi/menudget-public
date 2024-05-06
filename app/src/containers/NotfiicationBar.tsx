import {NotificationBar as Bar} from '../components/notification-bar/NotificationBar';
import {setTable, setTables} from '../store/slice';
import React, {forwardRef, useCallback} from 'react';
import {getTables} from '../api/api';
import {userUserId, useTables} from '../store/selectors';
import {useSessionKey} from '../lib/storage';
import {usePolling} from '../lib/usePolling';

function useTablesPolling() {
  const userId = userUserId();
  const {sessionKey} = useSessionKey();

  const action = useCallback(() => {
    if (userId != null && sessionKey != null)
      getTables(userId, sessionKey)
        .then(setTables)
        .catch((e: Error) => console.debug(e.message));
  }, [userId, sessionKey]);

  usePolling(action);
}

export const NotificationBar = forwardRef((_, ref) => {
  const tables = useTables();
  useTablesPolling();

  return <Bar ref={ref} tables={tables} onTablePress={setTable} />;
});
