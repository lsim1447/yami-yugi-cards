import React, { useContext, useState, useEffect } from 'react';
import { Card, CardDeck, Container, Jumbotron } from 'react-bootstrap';
import styled from 'styled-components';

const HomePageWrapper = styled.div `
  margin-top: 24px;
`;

const ExodiaWrapper = styled.div `
  padding-top: 18px;
  padding-bottom: 36px;
  text-align: center;
`;

const SacredBeastsWrapper = styled.div `
  margin-bottom: 24px;
`;

const AdvertisementWrapper = styled.div `
  width: 100%;
`;

const Title = styled.h1 `
  font-size: 48px;
  font-weight: 800;
`;

const Description = styled.div `
  padding-bottom: 24px;
  padding-left: 24px;
  padding-right: 24px;
`;

const ExodiaImage = styled.img `
  width: 100%;
  height: 100%;
  max-height: 850px;
`;

const DarkButton = styled.a `
  background-color: black;
  color: white;
  font-weight: 600;
  margin-top: 24px;
  padding: 24px 60px;
  text-decoration: none;
`;

const BoldParagraph = styled.p `
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 24px;
`;

function Home() {
  const [modalShow, setModalShow] = useState(false);
  
  return (
    <HomePageWrapper>
      <Jumbotron fluid>
        <Container>
          <Title>Take your Card</Title>
          <p>
            Yugioh Cards | Europe's one of the largest YGO platform | yami-cards.heroku.com
            Buy and sell directly on a player-to-player basis - no risks with Trust service™. Guaranteed best prices for more than 10.000 YuGiOh! cards. 
          </p>
        </Container>
      </Jumbotron>

      <ExodiaWrapper>
        <Title> Exodia the Forbidden One </Title>
        <Description>
          "Exodia" (エクゾディア, Ekuzodia) is an archetype of DARK Spellcaster monsters, with its first member released in Legend of Blue 
          Eyes White Dragon and its first support released in Millennium Box Gold Edition. They are focused on alternative victory conditions,
          and has support related to summoning or strengthening Beatsticks resembling Exodia. It is related to the "Forbidden One" archetype.
          <p>
            In the second anime series, the "Forbidden One" cards were notable for never successfully played until Yugi Muto was able to assemble 
            all five pieces during his duel against Seto Kaiba during episode 1. "Exodia" appeared in that duel when Yugi gathered all five pieces
            in his hand, after which it launched an attack, that was prompted by the line "Exodia, Obliterate" 
            ("Hellfire's Rage, Exodo Flame!" in the original) from Yugi. The attack wiped out all three of Kaiba's "Blue-Eyes White Dragons" and Yugi won the Duel.
          </p>
        </Description>
        <ExodiaImage
          className="lazyload"
          data-src="exodia-background.jpg"
        />
      </ExodiaWrapper>
      
      <SacredBeastsWrapper>
        <Jumbotron fluid>
          <Container>
            <Title>The "Sacred Beasts"</Title>
            <p>
              The Egyptian God Cards, also known in Japan as the Three Phantom Gods, (三幻神, Sangenshin),
              are a series of cards in Yu-Gi-Oh! that serve as a focal point in the series' manga, the second series anime, and numerous video games. 
            </p>
            <p>
              Each monster resembles one of the Egyptian Gods because they are dark counterparts to them, in a similar vein to the Wicked Gods 
              (though unlike the Wicked Gods, they are never stated in-series to have any relation to the Egyptian Gods). 
              In terms of gameplay, they also have similarities to the Egyptian Gods - they must be summoned by sacrificing three cards of a certain type. 
              However, the Sacred Beasts are not limited to using monsters, and they are substantially easier to summon than the Egyptian Gods,
              which comes at the cost of being generally weaker.
            </p>
          </Container>
        </Jumbotron>
        <CardDeck style={{backgroundColor: "transparent"}}>
          <Card>
            <Card.Img
              src="https://storage.googleapis.com/ygoprodeck.com/pics/10000020.jpg"
            />
          </Card>
          <Card>
            <Card.Img
              src="https://storage.googleapis.com/ygoprodeck.com/pics/10000000.jpg"
            />
          </Card>
          <Card>
            <Card.Img
              src="https://storage.googleapis.com/ygoprodeck.com/pics/10000010.jpg"
            />
          </Card>
        </CardDeck>
      </SacredBeastsWrapper>

      <AdvertisementWrapper>
        <Jumbotron fluid>
          <Container>
            <BoldParagraph>
              Don't hesitate!
            </BoldParagraph>
            <BoldParagraph style={{marginBottom: "36px"}}>
              Come on... let's see the World's newest cards. Go and choose any kind of cards with the most player-friendly prices...
            </BoldParagraph>
            <DarkButton href="/all-cards"> SHOP NOW </DarkButton>
          </Container>
        </Jumbotron>
      </AdvertisementWrapper>
    </HomePageWrapper>
  );
}

export default Home;