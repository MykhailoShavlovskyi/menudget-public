import React, {memo} from 'react';
import {BookmarksLayout} from '../components/bookmarks/BookmarksLayout';
import {BookmarksDishes} from '../containers/bookmarks/Bookmarks';
import {usePortrait} from '../lib/orientation';

export const BookMarksScreen = memo(() => {
  usePortrait();

  return <BookmarksLayout Dishes={BookmarksDishes} />;
});
