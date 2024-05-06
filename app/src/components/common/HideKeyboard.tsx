import React, {PropsWithChildren} from 'react';
import {Keyboard, TouchableWithoutFeedback} from 'react-native';

export const HideKeyboard = ({children}: PropsWithChildren<{}>) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);
