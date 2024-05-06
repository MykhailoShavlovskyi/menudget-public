import {TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import React from 'react';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

const StyledContainer = styled.View`
  position: absolute;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const StyledModalContent = styled.View`
  font-family: Avenir;
  background-color: white;
  border-radius: 15px;
  padding: 20px;
  display: flex;
  align-items: center;
  width: 100%;
`;

const StyledHeading = styled.Text`
  margin-bottom: 16px;
  font-family: Avenir;
  text-align: center;
  font-weight: 700;
  font-size: 22px;
  line-height: 30px;
  width: 180px;
`;

const StyledText = styled.Text`
  font-family: Avenir;
  text-align: center;
  font-weight: 600;
  font-size: 17px;
  line-height: 24px;
  color: #828282;
`;

const StyledButtonsContainer = styled.View`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 30px;
`;

const StyledButtonContainer = styled(LinearGradient)`
  background-color: orange;
  border-radius: 100px;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
`;

const StyledButtonText = styled.Text`
  font-family: Avenir;
  font-style: normal;
  font-weight: 700;
  font-size: 17px;
  line-height: 24px;
  color: white;
`;

const Button = ({
  title,
  red,
  onPress,
}: {
  title: string;
  red?: boolean;
  onPress: () => void;
}) => (
  <View>
    <TouchableOpacity onPress={onPress} activeOpacity={0.75}>
      <StyledButtonContainer
        height={48}
        style={{marginTop: red ? 8 : undefined}}
        colors={red ? ['#B6B6B6', '#B6B6B6'] : ['#FFC500', '#FF8B01']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <StyledButtonText>{title}</StyledButtonText>
      </StyledButtonContainer>
    </TouchableOpacity>
  </View>
);

export const ConfirmOrderModal = ({
  open,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) => {
  return (
    <StyledContainer pointerEvents={'none'}>
      <Modal
        style={{margin: 16}}
        isVisible={open}
        animationIn={'fadeInLeftBig'}
        animationOut={'fadeOutRightBig'}>
        <StyledModalContent>
          <StyledHeading>You are about to make an order</StyledHeading>
          <StyledText>
            As soon as you confirm, you order will be send to the kitchen and we
            will start preparing it.
          </StyledText>
          <StyledButtonsContainer>
            <Button title="Confirm" onPress={onConfirm} />
            <Button title="Cancel" red={true} onPress={onCancel} />
          </StyledButtonsContainer>
        </StyledModalContent>
      </Modal>
    </StyledContainer>
  );
};
