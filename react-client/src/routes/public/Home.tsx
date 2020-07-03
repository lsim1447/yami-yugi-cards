import React, { useContext } from 'react';
import loadableVisibility from "react-loadable-visibility/loadable-components";
import { Button, Container, Jumbotron } from 'react-bootstrap';
import { SimpleContainer } from '../../components/internal/CommonContainers';
import { CustomJumbotron } from '../../components/internal/CustomComponents';
import { ThemeContext } from '../../contexts/ThemeContext';
import DefaultLoadingComponent from '../../components/external/loading/DefaultLoadingComponent';
import styled from 'styled-components';

const ExodiaTheForbiddenOne = loadableVisibility(() => import('../../components/external/sections/ExodiaTheForbiddenOne'), {
  fallback: <DefaultLoadingComponent />
});

const Actors = loadableVisibility(() => import('../../components/external/sections/Actors'), {
  fallback: <DefaultLoadingComponent />
});

const KaibaVSYugi = loadableVisibility(() => import('../../components/external/sections/KaibaVSYugi'), {
  fallback: <DefaultLoadingComponent />
});

const TheSacredBeasts = loadableVisibility(() => import('../../components/external/sections/TheSacredBeasts'), {
  fallback: <DefaultLoadingComponent />
});

const SealOfOrichalcos = loadableVisibility(() => import('../../components/external/sections/SealOfOrichalcos'), {
  fallback: <DefaultLoadingComponent />
});

const GifGrid = loadableVisibility(() => import('../../components/external/sections/GifGrid'), {
  fallback: <DefaultLoadingComponent />
});

const Advertisement = loadableVisibility(() => import('../../components/external/sections/Advertisement'), {
  fallback: <DefaultLoadingComponent />
});

const HomePageWrapper = styled.div `
  margin-top: 24px;
`;

const Title = styled.h1 `
  font-size: 48px;
  font-weight: 800;
`;

const ReadMoreButton = styled(Button) `
    float: right;
    font-size: 18px;
    margin-right: 54px;
    margin-bottom: 8px;
    padding: 12px 36px;
`;

const YuGiOhAdvWrapper = styled.div `
  background: url(/images/yugioh-game.jpg) top center;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  min-height: 950px;
`;

function Home() {
  const { activeTheme } = useContext(ThemeContext);

  return (
    <SimpleContainer theme={activeTheme}>
      <CustomJumbotron theme={{backgroundColor: activeTheme.itemBackgroundColor, color: activeTheme.color}}>
        <Title>How To Play Yu-Gi-Oh!?</Title>
        <p>
          Yu-Gi-Oh! (or just YuGiOh) is a card game in which two players attempt to defeat each other by decreasing their opponent's Life Points (down to 0) 
          using a collection of monster, spell, and trap cards.
          <a href="/read-more">
            <ReadMoreButton variant="dark">Read More</ReadMoreButton>
          </a>
        </p>
      </CustomJumbotron>

      <YuGiOhAdvWrapper />

      <CustomJumbotron fluid theme={{backgroundColor: activeTheme.itemBackgroundColor, color: activeTheme.color}}>
        <Container>
          <Title>Take your Card</Title>
          <p>
            Yugioh Cards | Europe's one of the largest YGO platform | yami-cards.heroku.com
            Buy and sell directly on a player-to-player basis - no risks with Trust service™. Guaranteed best prices for more than 10.000 YuGiOh! cards. 
          </p>
        </Container>
      </CustomJumbotron>

      <ExodiaTheForbiddenOne />

      <KaibaVSYugi />

      <TheSacredBeasts />

      <SealOfOrichalcos />

      <GifGrid 
          gif1_url="/gifs/show-exodia.gif"
          gif2_url="/gifs/call-farao-2.gif"
      />

      <Actors />

      <Advertisement />
    </SimpleContainer>
  );
}

export default Home;