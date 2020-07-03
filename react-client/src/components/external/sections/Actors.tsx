import React from 'react';
import styled from 'styled-components';
import { Image, Row } from 'react-bootstrap';

const ActorsWrapper = styled(Row) `
    border-top: 1px solid #D3D3D3;
    border-bottom: 1px solid #D3D3D3;
    margin-top: 36px;
    max-height: 265px;
    overflow-y: hidden;
    overflow-x: hidden;
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
  const imageUrls: string[] = [
    "/images/profile/farao.jpg",
    "/images/profile/joey.jpg",
    "/images/profile/tristan.jpg",
    "/images/profile/tea.jpg",
    "/images/profile/yugi.jpg",
    "/images/profile/bakura.jpg",
    "/images/profile/pegazus.jpg",
    "/images/profile/maya.jpg",
    "/images/profile/tucsok.jpg",
    "/images/profile/dartz.jpg",
    "/images/profile/rex.jpg",
    "/images/profile/kaiba.jpg",
  ].sort(() => .5 - Math.random()).slice(0, 9);

  return (
    <ActorsWrapper>
        {
          imageUrls.map((imageUrl: string) => {
            return (
              <CustomImage
                key={imageUrl}
                src={imageUrl}
                roundedCircle
              />
            )
          })
        }
        
    </ActorsWrapper>
  );
}

export default Actors;