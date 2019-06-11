import React from 'react';
import styled from 'styled-components';
import { GOOGLE_DOC_ID } from './../constants';

const StyledIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: 1;
`;

const Info = () => {

  const url = `https://docs.google.com/document/d/e/${GOOGLE_DOC_ID}/pub`;

  return <StyledIframe src={url} title="season info" />;
};

export default Info

