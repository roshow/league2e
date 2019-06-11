import React from 'react';
import styled from 'styled-components'
import headerImage from './../images/header.jpg';

const HeroDiv = styled.div`
  background-color: black;
  img {
    width: 100%;
    height: 100%;
    max-width: 700px;
    display: block;
    margin: auto;
  }
`;

const HeroImage = props => (
  <HeroDiv>
    <img alt="" {...props} />
  </HeroDiv>
);

HeroImage.defaultProps = {
  src: headerImage,
  alt: "NYC X-Wing League 2.0 Season 1"
};

export default HeroImage;
