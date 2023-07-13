import React from 'react';
import { Card as MuiCard, CardContent as MuiCardContent, CardHeader, Typography } from '@mui/material';
import styled from '@emotion/styled';

const Card = styled(MuiCard)`
  background-color: #f5f5f5;
  border-radius: 15px;
  color: #333;
  margin: 10px;
  padding: 20px;
  box-shadow: 5px 5px 25px rgba(0,0,0,0.1);
`;

const CardContent = styled(MuiCardContent)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled(Typography)`
  color: #1a202c;
  font-size: 24px;
  font-weight: bold;
`;

const APY = styled(Typography)`
  color: #2d3748;
  font-size: 20px;
`;

const Value = styled(Typography)`
  color: #38a169;
  font-size: 32px;
  font-weight: bold;
`;

function APYCard({ }) {
  return (
    <Card>
      <CardHeader title={'title'} titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <APY>APY: {'apy'}%</APY>
        <Value>Value: ${'value'}</Value>
      </CardContent>
    </Card>
  );
}

export default APYCard;