import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Col, Image, ProgressBar, Row } from 'react-bootstrap';

const ActorsWrapper = styled(Row) `
    border-top: 1px solid #D3D3D3;
    border-bottom: 1px solid #D3D3D3;
    margin-top: 36px;
    max-height: 265px;
    overflow-y: hidden;
    overflow-x: scroll;
    padding-top: 36px;
    padding-bottom: 36px;
`;

const CustomImage = styled(Image) `
    height: 200px;
    width: 200px;
    margin-left: 12px;
    margin-bottom: 18px;
`;

const Actors = () => {

  return (
    <ActorsWrapper>
        <CustomImage src="/images/profile/farao.jpg" roundedCircle />
        <CustomImage src="/images/profile/joey.jpg" roundedCircle />
        <CustomImage src="/images/profile/tristan.jpg" roundedCircle />
        <CustomImage src="/images/profile/tea.jpg" roundedCircle />
        <CustomImage src="/images/profile/yugi.jpg" roundedCircle />
        <CustomImage src="/images/profile/bakura.jpg" roundedCircle />
        <CustomImage src="/images/profile/pegazus.jpg" roundedCircle />
        <CustomImage src="/images/profile/maya.jpg" roundedCircle />
        <CustomImage src="/images/profile/tucsok.jpg" roundedCircle />
    </ActorsWrapper>
  );
}

export default Actors;