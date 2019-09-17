import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import "typeface-roboto";
import HeroImage from './HeroImage';
import Pages from './Pages';
import { LeagueDataProvider } from './../contexts/LeagueDataContext';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    height: 100%;
  }
`;

const StyledApp = styled.div`
  height: 100%;
  display: flex;
  flex-flow: column;
`;

const App = () => (
  <>
    <CssBaseline />
    <GlobalStyle />
    <LeagueDataProvider>
      <StyledApp>
        <HeroImage />
        <Pages />
      </StyledApp>
    </LeagueDataProvider>
  </>
);

export default App;
