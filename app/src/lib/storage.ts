import {MMKVLoader, useMMKVStorage} from 'react-native-mmkv-storage';
import {useBookmarks, useOrder} from '../store/selectors';
import {setBookmarks, setOrder} from '../store/slice';
import {useEffect, useState} from 'react';
import {TableOrder} from '../store/models';

const storage = new MMKVLoader().initialize();

export function useSessionKey() {
  const [sessionKey, setSessionKey] = useMMKVStorage(
    'sessionKey',
    storage,
    null,
  );
  return {sessionKey, setSessionKey};
}

export function useTutorialComplete() {
  const [tutorialComplete, setTutorialComplete] = useMMKVStorage(
    'tutorialComplete',
    storage,
    false,
  );
  return {tutorialComplete, setTutorialComplete};
}

export function useSaveBookmarksToStorage() {
  const bookmarks = useBookmarks();
  const [storedBookmarks, setStoredBookmarks] = useMMKVStorage<number[]>(
    'bookmarks',
    storage,
    [],
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!mounted) {
      setBookmarks(storedBookmarks ?? bookmarks);
      setMounted(true);
    } else setStoredBookmarks(bookmarks);
  }, [bookmarks]);
}

export function useSaveOrderToStorage() {
  const order = useOrder();
  const [storedOrder, setStoredOrder] = useMMKVStorage<TableOrder | undefined>(
    'order',
    storage,
    undefined,
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!mounted) {
      setOrder(storedOrder ?? order);
      setMounted(true);
    } else setStoredOrder(order);
  }, [order]);
}
