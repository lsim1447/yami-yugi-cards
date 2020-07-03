import React, { useContext } from 'react';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { Card, CardDeck, Col, Container, Row } from 'react-bootstrap';
import { CustomJumbotron } from '../../internal/CustomComponents';
import styled from 'styled-components';

const SacredBeastsWrapper = styled.div `
    margin-bottom: 24px;
`;

const Title = styled.h1 `
    font-size: 48px;
    font-weight: 800;
`;

const TheSacredBeasts = () => {
    const { activeTheme } = useContext(ThemeContext);

    return (
        <SacredBeastsWrapper>
            <CustomJumbotron fluid theme={{backgroundColor: activeTheme.itemBackgroundColor, color: activeTheme.color}}>
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
            </CustomJumbotron>
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
                    <CustomJumbotron fluid theme={{backgroundColor: activeTheme.itemBackgroundColor, color: activeTheme.color}}>
                        <Container>
                        <Title>
                            <a href={`/card/5ebc4d66221c162fa4dccf65`}> Slifer The Sky Dragon</a>
                        </Title>
                        <p>
                            Requires 3 Tributes to Normal Summon (cannot be Normal Set). This card's Normal Summon cannot be negated. When Normal Summoned, cards and effects cannot be activated. Once per turn, during the End Phase, if this card was Special Summoned: Send it to the GY. Gains 1000 ATK and DEF for each card in your hand. If a monster(s) is Normal or Special Summoned to your opponent's field in Attack Position: That monster(s) loses 2000 ATK, then if its ATK has been reduced to 0 as a result, destroy it.
                        </p>
                        </Container>
                    </CustomJumbotron>
                </Col>
                <Col>
                    <CustomJumbotron fluid theme={{backgroundColor: activeTheme.itemBackgroundColor, color: activeTheme.color}}>
                        <Container>
                        <Title>
                            <a href={`/card/5ebc4d07221c162fa4dcc88f`}>Obelisk The Tormentor </a>
                        </Title>
                        <p>
                            Requires 3 Tributes to Normal Summon (cannot be Normal Set). This card's Normal Summon cannot be negated. When Normal Summoned, cards and effects cannot be activated. Cannot be targeted by Spells, Traps, or card effects. Once per turn, during the End Phase, if this card was Special Summoned: Send it to the Graveyard. You can Tribute 2 monsters; destroy all monsters your opponent controls. This card cannot declare an attack the turn this effect is activated.
                        </p>
                        </Container>
                    </CustomJumbotron>
                </Col>
                <Col>
                    <CustomJumbotron fluid theme={{backgroundColor: activeTheme.itemBackgroundColor, color: activeTheme.color}}>
                        <Container>
                            <Title>
                                <a href={`/card/5ebc4d99221c162fa4dcd337`}> Winged Dragon Of Ra </a>
                            </Title>
                            <p>
                                Cannot be Special Summoned. Requires 3 Tributes to Normal Summon (cannot be Normal Set). This card's Normal Summon cannot be negated. When Normal Summoned, other cards and effects cannot be activated. When this card is Normal Summoned: You can pay LP so that you only have 100 left; this card gains ATK/DEF equal to the amount of LP paid. You can pay 1000 LP, then target 1 monster on the field; destroy that target.
                            </p>
                        </Container>
                    </CustomJumbotron>
                </Col>
            </Row>
        </SacredBeastsWrapper>
    );
}

export default TheSacredBeasts;