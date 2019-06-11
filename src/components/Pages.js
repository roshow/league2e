import React, { useState } from 'react';
import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// import Typography from '@material-ui/core/Typography';
import Standings from './Standings';
import Players from './Players';
import Schedule from './Schedule';
import Info from './Info';

const SECTIONS = {
  STANDINGS: 'STANDINGS',
  PLAYERS: 'PLAYERS',
  SCHEDULE: 'SCHEDULE',
  INFO: 'INFO',
};

const Section = styled.section`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  > div {
    width: 100%;
    max-width: 700px;
  }
`;

const Pages = () => {

  const [section, setSection] = useState(SECTIONS.STANDINGS);
  const changeSection = (event, value) => setSection(value);

  return (
    <React.Fragment>
      <AppBar position="static">
        <Tabs value={section} onChange={changeSection}>
          {Object.values(SECTIONS).map(section => <Tab key={section} label={section} value={section} />)}
        </Tabs>
      </AppBar>
      <Section>
        <div>
          {section === SECTIONS.STANDINGS && <Standings />}
          {section === SECTIONS.PLAYERS && <Players />}
          {section === SECTIONS.SCHEDULE && <Schedule />}
          {section === SECTIONS.INFO && <Info />}
        </div>
      </Section>
    </React.Fragment>
  );
}

export default Pages;