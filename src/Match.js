import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import { MATCH_RESULTS } from './../constants';

const { WIN } = MATCH_RESULTS;

const StyledCard = styled(Card)`
  margin-top: 10px;
`;

const Match = ({ player1, player1Result, player2, player2Result}) => (
  <StyledCard>
    <CardContent>
      <Typography variant="body2">
        {player1} {player1Result === WIN ? '(W)' : null} vs. {player2} {player2Result === WIN ? '(W)' : null}
      </Typography>
    </CardContent>
  </StyledCard>
);

export default Match;