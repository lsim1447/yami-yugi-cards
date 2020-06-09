import React from 'react';
import { Button, Card, CardDeck, Col, Container, Jumbotron, Row } from 'react-bootstrap';
import Actors from '../components/external/Actors';
import GifGrid from '../components/external/GifGrid';
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

const CenterCol = styled(Col) `
    @media (max-width: 992px) {
        width: 100%;
        flex: 0 0 100%;
        max-width: 100%;
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
  return (
    <HomePageWrapper>
      <Jumbotron>
        <Title>How To Play Yu-Gi-Oh!?</Title>
        <p>
          Yu-Gi-Oh! (or just YuGiOh) is a card game in which two players attempt to defeat each other by decreasing their opponent's Life Points (down to 0) 
          using a collection of monster, spell, and trap cards.
          <a href="/read-more">
            <ReadMoreButton variant="dark">Read More</ReadMoreButton>
          </a>
        </p>
      </Jumbotron>

      <YuGiOhAdvWrapper />

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
          <CenterCol sm={8}>
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
          </CenterCol>
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
            <a href={`/card/5ebc4d66221c162fa4dccf65`}>
              <Card.Img
                src="https://storage.googleapis.com/ygoprodeck.com/pics/10000020.jpg"
              />
            </a>
          </Card>
          <Card>
            <a href={`/card/5ebc4d07221c162fa4dcc88f`}>
              <Card.Img
                src="https://storage.googleapis.com/ygoprodeck.com/pics/10000000.jpg"
              />
            </a>
          </Card>
          <Card>
            <a href={`/card/5ebc4d99221c162fa4dcd337`}>
              <Card.Img
                src="https://storage.googleapis.com/ygoprodeck.com/pics/10000010.jpg"
              />
            </a>
          </Card>
          <Card>
            <a href={`/card/5ebc4d99221c162fa4dcd338`}>
              <Card.Img
                src="https://storage.googleapis.com/ygoprodeck.com/pics/10000090.jpg"
              />
            </a>
          </Card>
        </CardDeck>
        <Row>
          <Col>
            <Jumbotron fluid>
              <Container>
                <Title>
                  <a href={`/card/5ebc4d66221c162fa4dccf65`}> Slifer The Sky Dragon</a>
                </Title>
                <p>
                  Requires 3 Tributes to Normal Summon (cannot be Normal Set). This card's Normal Summon cannot be negated. When Normal Summoned, cards and effects cannot be activated. Once per turn, during the End Phase, if this card was Special Summoned: Send it to the GY. Gains 1000 ATK and DEF for each card in your hand. If a monster(s) is Normal or Special Summoned to your opponent's field in Attack Position: That monster(s) loses 2000 ATK, then if its ATK has been reduced to 0 as a result, destroy it.
                </p>
              </Container>
            </Jumbotron>
          </Col>
          <Col>
            <Jumbotron fluid>
              <Container>
                <Title>
                  <a href={`/card/5ebc4d07221c162fa4dcc88f`}>Obelisk The Tormentor </a>
                </Title>
                <p>
                  Requires 3 Tributes to Normal Summon (cannot be Normal Set). This card's Normal Summon cannot be negated. When Normal Summoned, cards and effects cannot be activated. Cannot be targeted by Spells, Traps, or card effects. Once per turn, during the End Phase, if this card was Special Summoned: Send it to the Graveyard. You can Tribute 2 monsters; destroy all monsters your opponent controls. This card cannot declare an attack the turn this effect is activated.
                </p>
              </Container>
            </Jumbotron>
          </Col>
          <Col>
            <Jumbotron fluid>
              <Container>
                <Title>
                  <a href={`/card/5ebc4d99221c162fa4dcd337`}> Winged Dragon Of Ra </a>
                </Title>
                <p>
                  Cannot be Special Summoned. Requires 3 Tributes to Normal Summon (cannot be Normal Set). This card's Normal Summon cannot be negated. When Normal Summoned, other cards and effects cannot be activated. When this card is Normal Summoned: You can pay LP so that you only have 100 left; this card gains ATK/DEF equal to the amount of LP paid. You can pay 1000 LP, then target 1 monster on the field; destroy that target.
                </p>
              </Container>
            </Jumbotron>
          </Col>
        </Row>
      </SacredBeastsWrapper>
      
      
      <GifGrid 
          gif1_url="/images/seal-of-orichalos.jpg"
          gif2_url="/images/seal-of-orichalos-yugi.jpg"
      />
      <Jumbotron fluid>
        <Container>
          <Title>
            <a href="/card/5ebc4d96221c162fa4dcd2fe">
              Seal of Orichalcos
            </a>
          </Title>
          <p>
            All monsters you control gain 500 ATK. Once per turn, this card cannot be destroyed by card effects. While you control 2 or more face-up Attack Position monsters, your opponent cannot target your monster(s) with the lowest ATK for an attack. If this card is activated: Destroy all Special Summoned monsters you control. You cannot Special Summon monsters from the Extra Deck. You can only activate "The Seal of Orichalcos" once per Duel.
          </p>
        </Container>
      </Jumbotron>

      <GifGrid 
          gif1_url="/gifs/show-exodia.gif"
          gif2_url="/gifs/call-farao-2.gif"
      />

      <Actors />

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