import {Color} from '../lib/Color';
import {Dimensions, Text, TouchableOpacity, View} from 'react-native';
import {style} from '../style/style';
import React from 'react';
import {Bookmark} from './icons/Bookmark';

export const HeaderTitle = ({value}: {value: string}) => (
  <View
    style={{
      flex: 1,
      alignItems: 'center',
      paddingTop: 20,
      marginTop: -25,
    }}>
    <Text
      numberOfLines={3}
      lineBreakMode={'head'}
      style={{
        width: Dimensions.get('window').width * 0.5,
        ...style.headerText,
      }}>
      {value}
    </Text>
  </View>
);

export const HeaderBookmarkButton = ({
  enabled,
  onPress,
}: {
  enabled: boolean;
  onPress: () => void;
}) => (
  <TouchableOpacity
    onPress={onPress}
    hitSlop={{top: 32, bottom: 32, left: 32, right: 32}}>
    <Bookmark color={enabled ? Color.RED : 'black'} />
  </TouchableOpacity>
);
