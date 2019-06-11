import React, { useContext } from 'react';
// import PropTypes from 'prop-types';
import DivisionBox from './DivisionBox';
import LeagueDataContext from './../contexts/LeagueDataContext';

const Standings = () => {

  const { results } = useContext(LeagueDataContext);

  return (
    <React.Fragment>
      {results.map(result => <DivisionBox key={result.division} {...result} />)}
    </React.Fragment>
  );
};

export default Standings;