import React from 'react';
import styled from 'styled-components';
import { Container, Jumbotron } from 'react-bootstrap';
import GifGrid from './GifGrid';

const Title = styled.h1 `
    font-size: 48px;
    font-weight: 800;
`;

const SealOfOrichalcos = () => {
    return (
        <div>
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
                        All monsters you control gain 500 ATK. Once per turn, this card cannot be destroyed by card effects. 
                        While you control 2 or more face-up Attack Position monsters, your opponent cannot target your monster(s)
                        with the lowest ATK for an attack. If this card is activated: Destroy all Special Summoned monsters you control. 
                        You cannot Special Summon monsters from the Extra Deck. You can only activate "The Seal of Orichalcos" once per Duel.
                    </p>
                </Container>
            </Jumbotron>
        </div>
    );
}

export default SealOfOrichalcos;