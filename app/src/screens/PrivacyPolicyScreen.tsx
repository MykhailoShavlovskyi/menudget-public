import React, {memo} from 'react';
import styled from 'styled-components/native';
import {usePortrait} from '../lib/orientation';

const StyledView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-start;

  padding: 0 46px;

  background-color: white;
`;

const StyledHeading = styled.Text`
  margin-top: 109px;
  font-family: Avenir;
  font-size: 31px;
  font-weight: 900;
`;

const StyledText = styled.Text`
  margin-top: 20px;
  padding-top: 25px;
  font-family: Avenir;
  color: #b2b2b2;
  font-weight: 500;
  font-size: 16px;
  line-height: 15.7px;
  letter-spacing: -0.3px;
`;

export const PrivacyPolicyScreen = memo(() => {
  usePortrait();

  return (
    <StyledView>
      <StyledHeading>Private Policy</StyledHeading>
      <StyledText numberOfLines={100}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem dasda da sad as asd asd ad sdsadas aa das sd Lorem Ipsum
        is simply dummy text of the printing and typesetting industry. Lorem
        dasda da sad as asd asd ad sdsadas aa das sd asd a Lorem Ipsum is simply
        dummy text of the printing and typesetting industry. Lorem dasda da sad
        as asd asd ad sdsadas aa das sd asd a Lorem Ipsum is simply dummy text
        of the printing and typesetting industry. Lorem dasda da sad as asd asd
        ad sdsadas aa das sd asd a Lorem Ipsum is simply dummy text of the
        printing and typesetting industry. Lorem dasda da sad as asd asd ad
        sdsadas aa das sd asd a Lorem Ipsum is simply dummy text of the printing
        and typesetting industry. Lorem dasda da sad as asd asd ad sdsadas aa
        das sd asd a Lorem Ipsum is simply dummy text of the printing and
        typesetting industry. Lorem dasda da sad as asd asd ad sdsadas aa das sd
        asd a Lorem Ipsum is simply dummy text of the Lorem Ipsum is simply
        dummy text of the printing and typesetting industry. Lorem dasda da sad
        as asd asd ad sdsadas aa das sd asd a typesetting
      </StyledText>
    </StyledView>
  );
});
