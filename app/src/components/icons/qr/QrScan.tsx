import styled from 'styled-components/native';
import QRCodeSquare from './QRCodeSquare';
import QRCode from './QrCodeBig';
import React from 'react';

const StyledQRCodeSquare = styled(QRCodeSquare)`
  z-index: 10;
  position: absolute;
`;

const StyledQRCode = styled(QRCode)`
  position: absolute;
`;

export const QrScan = () => (
  <>
    <StyledQRCodeSquare />
    <StyledQRCode viewBox="-115 4 400 100" />
  </>
);
