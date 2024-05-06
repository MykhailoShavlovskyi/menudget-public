import React, {ReactNode} from 'react';
import styled from 'styled-components/native';
import {Insets, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Color} from '../../lib/Color';

const StyledContainer = styled(LinearGradient)`
  background-color: orange;
  width: 185px;
  height: 60px;
  border-radius: 32px;
  align-items: center;
  justify-content: center;
`;

const StyledText = styled.Text`
  font-family: Avenir;
  font-style: normal;
  font-weight: 500;
  font-size: 21px;
  letter-spacing: 0.8px;
  color: white;
`;

export const Button = ({
  disabled = false,
  title,
  icon,
  onPress,
  buttonStyle,
  textStyle,
  colors,
  ...rest
}: {
  disabled?: boolean;
  title?: string;
  icon?: ReactNode;
  buttonStyle?: any;
  textStyle?: any;
  colors?: (string | number)[];
  hitSlop?: Insets | undefined;
  onPress: () => void;
}) => (
  <TouchableOpacity
    onPress={disabled ? undefined : onPress}
    activeOpacity={disabled ? 1 : 0.75}
    {...rest}>
    <StyledContainer
      colors={
        colors ?? (disabled ? [Color.GRAY, '#aaa'] : ['#FFC500', '#FF8B01'])
      }
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={buttonStyle}>
      {icon ? icon : <StyledText style={textStyle}>{title}</StyledText>}
    </StyledContainer>
  </TouchableOpacity>
);
