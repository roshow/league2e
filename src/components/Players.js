import React, { useState, useContext, useMemo } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import { getMatchesForPlayer } from './../lib/calcResults';
import LeagueDataContext from './../contexts/LeagueDataContext';

const StyledCard = styled(Card)`
  margin-top: 10px;
  max-width: 400px;
  margin: auto;
  .body2 {
    text-align: center;
  }
`;

const ListLink = ({ list }) => (list ? <a target="_blank" rel="noopener noreferrer" href={list}>List</a> : 'No List Submitted');

const Match = props => (
  <StyledCard>
    <CardContent>
      <Typography variant="body2" align="center">
        {props.player1} ({props.player1Points}, {props.player1Result || 'loss'}, <ListLink list={props.player1List} />)<br/>
        vs.<br />
        {props.player2} ({props.player2Points}, {props.player2Result || 'loss'}, <ListLink list={props.player2List} />)
      </Typography>
    </CardContent>
  </StyledCard>
);

const PlayersWrapper = styled.div`
  .muiSelect {
    padding: 20px;
  }

  .matches {
    margin-top: 10px;
  }

  .player-details {
    > h6, div {
      margin-top: 10px;
    }
  }
`

const Players = () => {

  const { matches, players } = useContext(LeagueDataContext);

  const [selectedPlayerName, selectPlayerName] = useState(' ');
  const handleChange = event => selectPlayerName(event.target.value);

  const player = useMemo(
    () => players.find(({name}) => name === selectedPlayerName),
    [selectedPlayerName, players],
  );

  const matchesForPlayer = useMemo(
    () => getMatchesForPlayer(selectedPlayerName, matches),
    [selectedPlayerName, matches],
  )

  return (
    <PlayersWrapper>
      <Select className="muiSelect" value={selectedPlayerName} onChange={handleChange}>
        <MenuItem value=" ">Select A Player</MenuItem>
        {players.map(({ name }) => <MenuItem key={name} value={name}>{name}</MenuItem>)}
      </Select>
      { player && (
        <div className="player-details">
        <Typography variant="h6">Division: {player.division}</Typography>
          <Typography variant="h6">Score: {player.score}</Typography>
          <Typography variant="h6">Games Played: {player.gamesPlayed}</Typography>
          <Typography variant="h6">MOV: {player.mov}</Typography>
          <Typography variant="h6">Total Wins: {player.totalWins}</Typography>
          <Typography variant="h6">Total Games Played: {player.totalGamesPlayed}</Typography>
          <Typography variant="h6">Total MOV: {player.totalMov}</Typography>
          <div>
            <Typography variant="h6">Matches:</Typography>
            {matchesForPlayer.length
              ? matchesForPlayer.map((match, i) => <Match {...match} key={i} />)
              : <Typography variant="body2">Has not played any matches yet.</Typography>
            }
          </div> 
        </div>
      )}
    </PlayersWrapper>
  );
}

export default Players;