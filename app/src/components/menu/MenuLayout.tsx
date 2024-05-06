import styled from 'styled-components/native';
import React, {useCallback, useState} from 'react';
import {KeyboardAvoidingViewWrapper} from '../common/KeyboardAvoidingViewWrapper';
import {Splitter} from '../common/Splitter';
import {StatusBar, StatusBarStyle, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const StyledScrollContainer = styled.ScrollView`
  flex: 1;
  background-color: white;
`;

export const StyledMenuContent = styled.View`
  width: 100%;
`;

const StyledSplitter = styled(Splitter)`
  margin-top: 9px;
`;

export const MenuLayout = ({
  Banner,
  Header,
  Search,
  Menu,
  noHeader,
}: {
  Banner: () => JSX.Element | null;
  Header: () => JSX.Element | null;
  Search: () => JSX.Element;
  Menu: () => JSX.Element;
  noHeader: boolean;
}) => {
  const [barStyle, setBarStyle] = useState<StatusBarStyle>('light-content');
  const handleScroll = useCallback(event => {
    setBarStyle(
      event.nativeEvent.contentOffset.y > 155
        ? 'dark-content'
        : 'light-content',
    );
  }, []);

  return (
    <KeyboardAvoidingViewWrapper>
      <StatusBar animated={true} barStyle={barStyle} />
      <StyledScrollContainer
        contentContainerStyle={{paddingBottom: 100}}
        nestedScrollEnabled
        bounces={false}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={0.1}
        onScroll={handleScroll}>
        {!noHeader ? (
          <Banner />
        ) : (
          <View style={{height: useSafeAreaInsets().top + 110}} />
        )}
        <StyledMenuContent>
          {!noHeader && (
            <>
              <Header />
              <StyledSplitter />
            </>
          )}
          <Search />
          <Menu />
        </StyledMenuContent>
      </StyledScrollContainer>
    </KeyboardAvoidingViewWrapper>
  );
};
