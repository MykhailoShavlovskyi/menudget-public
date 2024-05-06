import {Table} from './NotificationBar';
import styled from 'styled-components/native';
import {TouchableOpacity} from 'react-native';
import React, {useMemo} from 'react';
import LinearGradient from 'react-native-linear-gradient';

const StyledAlarmCircle = styled.View`
  width: 20px;
  height: 20px;
  border: white 4px solid;
  border-radius: 12px;
  top: -1px;
  right: 2px;
  background-color: red;
  position: absolute;
`;

const StyledContainer = styled.View`
  width: 62px;
  height: 62px;
  margin-right: 10px;
  justify-content: center;
  align-items: center;
`;

const StyledGradient = styled(LinearGradient)`
  width: 100%;
  height: 100%;
  border-radius: 32px;
  justify-content: center;
  align-items: center;
`;

const StyledLabel = styled.Text`
  color: white;
  font-family: Avenir;
  font-weight: 700;
  text-align: center;
  font-size: 14px;
`;

export const TableEntry = ({
  id,
  name,
  state,
  first,
  onPress,
}: Table & {first?: boolean; onPress: (id: number) => void}) => {
  const colors = useMemo(() => {
    const red = ['#FF6464', '#F34444'];
    if (state === 'idle') return ['#c4c4c4', '#A9A9A9'];
    if (state === 'order-in-progress') return ['#FFC147', '#FFA723'];
    if (state === 'order-ready') return ['#FFC147', '#FFA723'];
    if (state === 'order-payed') return ['#49CB7D', '#25A658'];
    return ['#c4c4c4', '#A9A9A9'];
  }, [state]);

  return (
    <TouchableOpacity onPress={() => onPress(id)}>
      <StyledContainer style={first ? {marginLeft: 21} : {}}>
        <StyledGradient colors={colors}>
          <StyledLabel style={{fontSize: name.length > 3 ? 14 : 23}}>
            {name}
          </StyledLabel>
        </StyledGradient>
        {state === 'order-ready' && <StyledAlarmCircle />}
      </StyledContainer>
    </TouchableOpacity>
  );
};
