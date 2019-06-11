import React, { useState, useEffect } from 'react';
import { fetchLeagueData } from './../lib/fetchData';


const LeagueDataContext = React.createContext();

const initialLeagueData = {
  divisions: [],
  players: [],
  matches: [],
  results: [],
  schedule: [],
};

export const LeagueDataProvider = (props) => {

  const [leagueData, setLeagueData] = useState(initialLeagueData);

  useEffect(() => {
    (async () => {
      const data = await fetchLeagueData();
      setLeagueData(data);
    })();
  }, []);

  return (
    <LeagueDataContext.Provider value={leagueData}>
      {props.children}
    </LeagueDataContext.Provider>
  )
}

export default LeagueDataContext;