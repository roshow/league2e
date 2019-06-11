import React from 'react';
import styled from 'styled-components';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const StyledPaper = styled(Paper)`
  margin-top: 10px;
  padding: 5px;
  width: 100%;
  overflow-x: auto;
`;

const DivisionBox = ({ division, players}) => (
  <StyledPaper>
    <Typography variant="h6">Division: {division}</Typography>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Player</TableCell>
          <TableCell align="right">Score</TableCell>
          <TableCell align="right">Games Played</TableCell>
          <TableCell align="right">MOV</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {players.map(({ name, score, gamesPlayed, mov}) => (
          <TableRow key={name}>
            <TableCell component="th" scope="row">{name}</TableCell>
            <TableCell align="right">{score}</TableCell>
            <TableCell align="right">{gamesPlayed}</TableCell>
            <TableCell align="right">{mov}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </StyledPaper>
);

export default DivisionBox;