import React, {PropsWithChildren} from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  keyboardAvoidingView: {flex: 1, justifyContent: 'flex-end'},
});

type Props = PropsWithChildren<{
  offset?: number;
  headerHeight?: number;
}>;

export const KeyboardAvoidingViewWrapper = ({
  offset = 0,
  children,
  ...rest
}: Props) => (
  <KeyboardAvoidingView
    style={styles.keyboardAvoidingView}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    keyboardVerticalOffset={offset}
    {...rest}>
    {children}
  </KeyboardAvoidingView>
);
