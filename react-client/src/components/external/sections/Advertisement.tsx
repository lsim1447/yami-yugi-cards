import React from 'react';
import styled from 'styled-components';
import { Container, Jumbotron } from 'react-bootstrap';

const AdvertisementWrapper = styled.div `
    width: 100%;
`;

const BoldParagraph = styled.p `
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 24px;
`;

const DarkButton = styled.a `
    background-color: black;
    color: white;
    font-weight: 600;
    margin-top: 24px;
    padding: 24px 60px;
    text-decoration: none;
`;

const Advertisement = () => {
    return (
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
    );
}

export default Advertisement;