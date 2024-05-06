import React, {ReactNode} from 'react';
import {NoContent} from '../common/NoContent';

export const BookmarksDishes = ({dishes}: {dishes: ReactNode[]}) =>
  dishes.length !== 0 ? (
    <>{dishes}</>
  ) : (
    <NoContent message="No dishes added to bookmarks" />
  );
