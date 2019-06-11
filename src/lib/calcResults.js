import { MATCH_RESULTS } from './../constants';

const roundToThreeDecimals = num => parseFloat(num.toFixed(3));

export const getMatchesForPlayer = (player, matches) => 
  matches.filter(({ player1, player2 }) => (player1 === player || player2 === player));

export const calcPlayerScore = (player, matches) => {
  const matchesPlayed = getMatchesForPlayer(player, matches);
  let totalPoints = 0;
  const numOfMatchesPlayed = matchesPlayed.length;
  for (let i = 0; i < numOfMatchesPlayed; i++) {
    const { player1, player1Result, player2, player2Result } = matchesPlayed[i];
    if (
      (player1 === player && player1Result === MATCH_RESULTS.WIN)
      || (player2 === player && player2Result === MATCH_RESULTS.WIN)
    ) {
      totalPoints = totalPoints + 1;
    }
  }
  return numOfMatchesPlayed > 0 ? roundToThreeDecimals(totalPoints / numOfMatchesPlayed) : 0;
};

export const calcPlayerMOV = (player, matches) => {
  const matchesPlayed = getMatchesForPlayer(player, matches);
  let totalMOV = 0;
  const numOfMatchesPlayed = matchesPlayed.length;
  for (let i = 0; i < numOfMatchesPlayed; i++) {
    const { player1, player1Result, player1Points, player2Result, player2Points } = matchesPlayed[i];
    const pointsDiff = Math.abs(player1Points - player2Points);
    const result = player1 === player ? player1Result : player2Result;
    let mov;
    if (result === MATCH_RESULTS.WIN) {
      mov = 200 + pointsDiff;
    } else {
      mov = 200 - pointsDiff;
    }
    totalMOV += mov;
  }
  return totalMOV;
}

export const getPlayersWithScore = (players, matches) => players.map(player => ({
  ...player,
  score: calcPlayerScore(player.name, matches),
  mov: calcPlayerMOV(player.name, matches),
  gamesPlayed: getMatchesForPlayer(player.name, matches).length,
}));

// assumes players have had score calculated and added to object
export const divisionStandings = (division, playersWithScore) =>
  playersWithScore.filter(player => player.division === division).sort((a,b) => {
    const scoreDiff = b.score - a.score;
    // if same score, sort by gamesPlayed
    if (scoreDiff === 0) {
      const gamesPlayedDiff = b.gamesPlayed - a.gamesPlayed;
      if (gamesPlayedDiff === 0) {
        return b.mov - a.mov;
      }
      return gamesPlayedDiff;
    }
    // otherwise sort by score
    return scoreDiff;
  });


export const getAllDivisionsStandings = (divisions, playersWithScore) => divisions.map(division => ({
  division: division.name,
  players: divisionStandings(division.name, playersWithScore),
}));