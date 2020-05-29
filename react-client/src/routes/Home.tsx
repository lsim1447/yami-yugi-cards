import React, { useContext, useState, useEffect } from 'react';
import { Card, CardDeck, Col, Container, Jumbotron, Row } from 'react-bootstrap';
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

const ExodiaVideoWrapper = styled(Row) `
  height: 100%;
  width: 100%;
`;

const CustomIFrame = styled.iframe `
  margin-top: 36px;
  min-height: 85vh;
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
  height: 100%;
  max-height: 850px;
  width: 100%;
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

const LeftCol = styled(Col) `
    background: url(images/home-page-video-left-col.jpg) top center;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    @media (max-width: 992px) {
        display: none;
    }
`;

const RightCol = styled(Col) `
    background: url(images/home-page-video-right-col.jpg) top center;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    @media (max-width: 992px) {
        display: none;
    }
`;

function Home() {
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
          data-src="/images/exodia-background.jpg"
        />
        <ExodiaVideoWrapper>
          <LeftCol sm={2}></LeftCol>
          <Col sm={8}>
          <Jumbotron fluid>
            <Container>
              <Title>Kaiba vs Yugi</Title>
              <p>
              Let’s face it: 4Kids Entertainment botched the English dubs of a lot of animes. One of these was the Yu-Gi-Oh series. Aside from the OBVIOUS violent, religious and sexual scene/script changes, censors, and flat-out omissions (i.e. finger guns, the creation of the fictitious “Shadow Realm” to censor Death, the removal of blood, crosses/crucifixes, punches, guns/knives, etc.), they completely changed the motives and/or backstories of some of the characters (mainly Kaiba, Mai, Pegasus, Marik and the members of Doma), the exciting original soundtrack was thrown overboard for a more ambient soundtrack and intros ("It's time to Duel!"), the editing was bad (text removal, card design, different graphics/sound effects, etc.), the "humor" was just god-awful, and, worst of all, the voice acting was half-assed and as if the actors didn't really care about this show. As a result of this carelessness and other scandals, 4Kids Entertainment Inc. officially filed for Chapter 11 bankruptcy in 2011, but resurfaced again in 2012 under the new name 4K Media Inc., and became a branch of Konami. 
              </p>
            </Container>
          </Jumbotron>
            <CustomIFrame
              frameBorder='0'
              allow='autoplay; encrypted-media'
              allowFullScreen
              title='video'
              src="https://www.youtube.com/embed/UtVHpY-oU4Y?autoplay=0&fs=1&iv_load_policy=3&showinfo=1&rel=0&cc_load_policy=1&start=&end=0&origin=https://youtubeembedcode.com">
            </CustomIFrame>
          </Col>
          <RightCol sm={2}></RightCol>
        </ExodiaVideoWrapper>
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
        <Row>
          <Col>
            <Jumbotron fluid>
              <Container>
                <Title>Slifer The Sky Dragon</Title>
                <p>
                  Requires 3 Tributes to Normal Summon (cannot be Normal Set). This card's Normal Summon cannot be negated. When Normal Summoned, cards and effects cannot be activated. Once per turn, during the End Phase, if this card was Special Summoned: Send it to the GY. Gains 1000 ATK and DEF for each card in your hand. If a monster(s) is Normal or Special Summoned to your opponent's field in Attack Position: That monster(s) loses 2000 ATK, then if its ATK has been reduced to 0 as a result, destroy it.
                </p>
              </Container>
            </Jumbotron>
          </Col>
          <Col>
            <Jumbotron fluid>
              <Container>
                <Title>Obelisk The Tormentor</Title>
                <p>
                  Requires 3 Tributes to Normal Summon (cannot be Normal Set). This card's Normal Summon cannot be negated. When Normal Summoned, cards and effects cannot be activated. Cannot be targeted by Spells, Traps, or card effects. Once per turn, during the End Phase, if this card was Special Summoned: Send it to the Graveyard. You can Tribute 2 monsters; destroy all monsters your opponent controls. This card cannot declare an attack the turn this effect is activated.
                </p>
              </Container>
            </Jumbotron>
          </Col>
          <Col>
            <Jumbotron fluid>
              <Container>
                <Title>Winged Dragon Of Ra</Title>
                <p>
                  Cannot be Special Summoned. Requires 3 Tributes to Normal Summon (cannot be Normal Set). This card's Normal Summon cannot be negated. When Normal Summoned, other cards and effects cannot be activated. When this card is Normal Summoned: You can pay LP so that you only have 100 left; this card gains ATK/DEF equal to the amount of LP paid. You can pay 1000 LP, then target 1 monster on the field; destroy that target.
                </p>
              </Container>
            </Jumbotron>
          </Col>
        </Row>
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