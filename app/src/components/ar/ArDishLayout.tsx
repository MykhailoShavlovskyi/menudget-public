import styled from 'styled-components/native';
import React, {ReactNode} from 'react';
import {ArIcon} from './ArIcon';
import {StatusBar, View} from 'react-native';
import {EngineView} from '@babylonjs/react-native';

const StyledContainer = styled.View`
  width: 100%;
  height: 100%;
`;

const StyledRenderContainer = styled.View`
  position: absolute;
  flex: 1;
  width: 100%;
  height: 100%;
`;

const StyledFlexTop = styled.View`
  width: 100%;
  padding: 34px 34px 0;
  flex-direction: row;
  justify-content: space-between;
  position: absolute;
  top: 0;
`;

const StyledFlexBottom = styled.View`
  width: 100%;
  padding: 0 34px 26px;
  flex-direction: row;
  justify-content: space-between;
  position: absolute;
  bottom: 0;
`;

export const StyledArPlaceholder = styled.View<{opacity: number}>`
  position: absolute;
  background-color: black;
  width: 100%;
  height: 100%;
  opacity: ${(v: {opacity: number}) => v.opacity};
`;

export const ArDishLayout = ({
  TopContent,
  BottomContent,
  Render,
}: {
  TopContent: () => JSX.Element;
  BottomContent: () => JSX.Element;
  Render: ReactNode;
}) => (
  <>
    <StatusBar barStyle={'light-content'} />
    <StyledContainer>
      <StyledRenderContainer>{Render}</StyledRenderContainer>
      <StyledFlexTop>
        <TopContent />
      </StyledFlexTop>
      <StyledFlexBottom>
        <BottomContent />
      </StyledFlexBottom>
      <ArIcon />
    </StyledContainer>
  </>
);
