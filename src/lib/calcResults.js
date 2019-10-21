import { MATCH_RESULTS, MAX_GAMES } from './../constants';

export const getMatchesForPlayer = (playerName, matches) => 
  matches.filter(({ player1, player2 }) => (player1 === playerName || player2 === playerName));

const calcPlayerScores = (playerName, allMatches) => {
  const matches = getMatchesForPlayer(playerName, allMatches);

  let score = 0;
  let mov = 0;
  let totalMov = 0;
  let totalWins = 0;
  const totalGamesPlayed = matches.length;
  const gamesPlayed = totalGamesPlayed > MAX_GAMES ? MAX_GAMES : totalGamesPlayed;
  

  for (let i = 0; i < totalGamesPlayed; i++) {
    const { player1, player1Result, player1Points, player2Result, player2Points } = matches[i];

    const pointsDiff = Math.abs(player1Points - player2Points);

    const playerResult = player1 === playerName ? player1Result : player2Result;

    if (playerResult === MATCH_RESULTS.WIN) {
      totalWins += 1;
      totalMov += (200 + pointsDiff);
      if (i < MAX_GAMES) {
        score += 1;
        mov += (200 + pointsDiff);
      }
    
    } else { 
      totalMov += (200 - pointsDiff);
      if (i < MAX_GAMES) {
        mov += (200 - pointsDiff);
      }
    }

  }

  return {
    score,
    mov,
    gamesPlayed,
    totalGamesPlayed,
    totalWins,
    totalMov,
  };

}

export const getPlayersWithScore = (players, matches) => players.map(player => ({
  ...player,
  ...calcPlayerScores(player.name, matches),
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