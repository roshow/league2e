import React, { useContext } from 'react';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
// import { getMatchesForPlayer } from './../lib/calcResults';
import LeagueDataContext from './../contexts/LeagueDataContext';

const StyledCard = styled(Card)`
  margin-top: 10px;
`;

const StyledPaper = styled(Paper)`
  margin-top: 10px;
  padding: 5px;
  width: 100%;
  overflow-x: auto;
`;

export const WEEK_IDS = [1,2,3,4,5,6,7];

const Schedule = () => {

  const { schedule, divisions } = useContext(LeagueDataContext);
  
  return (
    <>
      {
        divisions.map(({ name }) => (
          <StyledPaper key={name}>
            <Typography variant="h6">Division: {name}</Typography>
            { 
              WEEK_IDS.map(weekId => (
                <StyledPaper key={weekId}>
                  <Typography variant="body2">Week {weekId}</Typography>
                  {
                    schedule
                      .filter(({ division, week }) => (division === name && parseFloat(week) === weekId))
                      .map(({ player1, player2 }, i) => (
                        <StyledCard key={`${player1}-${player2}-${weekId}`}>
                          <CardContent>
                            <Typography variant="body2">
                              {player1} {player2 ? `vs. ${player2}` : '(off week)'}
                            </Typography>
                          </CardContent>
                        </StyledCard>
                      ))
                  }
                </StyledPaper>
              ))
            }
          </StyledPaper>
        ))
      }
    </>
  );

}

export default Schedule;