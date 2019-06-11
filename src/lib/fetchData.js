import camelCase from 'camelcase';
import { getPlayersWithScore, getAllDivisionsStandings } from './calcResults';
import { GOOGLE_API_KEY, SHEET_NAMES, GOOGLE_SHEETS_ID } from './../constants';

const formatRowDataIntoObjects = ([keys, ...rows]) => rows.map(row => {
  const rowObj = {};
  const keysCamelCase = keys.map(camelCase);
  for (let i = 0, l = keys.length; i < l; i++) {
    if (row[i] && row[i] !== "") {
      rowObj[keysCamelCase[i]] = row[i];
    }
  }
  return rowObj;
});

export const fetchSheet = async (sheetName) => {
  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEETS_ID}/values/${sheetName}?key=${GOOGLE_API_KEY}`,
  );
  const json = await res.json();
  return formatRowDataIntoObjects(json.values);
};

export const fetchSheets = async (sheetNames) => {
  const promises = sheetNames.map(fetchSheet);
  const sheetsArray = await Promise.all(promises);
  const sheets = {};
  for (let i = 0, l = sheetNames.length; i < l; i++) {
    sheets[sheetNames[i]] = sheetsArray[i];
  }
  return sheets;
};

export const fetchLeagueData = async () => {
  const { divisions, players, matches, schedule } = await fetchSheets(SHEET_NAMES);
  const playersWithScore = getPlayersWithScore(players, matches);
  const results = getAllDivisionsStandings(divisions, playersWithScore);
  return {
    divisions,
    matches,
    schedule,
    results,
    players: playersWithScore,
  };
}