import React, { useContext} from 'react';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { Container } from 'react-bootstrap';
import { CustomJumbotron } from '../../internal/CustomComponents';
import styled from 'styled-components';

const AdvertisementWrapper = styled.div `
    background-color: transparent;
    width: 100%;
`;

const BoldParagraph = styled.p `
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 24px;
`;

const DarkButton = styled.a `
    background-color: #000000;
    color: #FFFFFF;
    font-weight: 600;
    margin-top: 24px;
    padding: 24px 60px;
    text-decoration: none;
`;

const Advertisement = () => {
    const { activeTheme } = useContext(ThemeContext);

    return (
        <AdvertisementWrapper>
            <CustomJumbotron fluid theme={{backgroundColor: activeTheme.itemBackgroundColor, color: activeTheme.color}}>
                <Container>
                    <BoldParagraph>
                        Don't hesitate!
                    </BoldParagraph>
                    <BoldParagraph style={{marginBottom: "36px"}}>
                        Come on... let's see the World's newest cards. Go and choose any kind of cards with the most player-friendly prices...
                    </BoldParagraph>
                    <DarkButton href="/all-cards"> SHOP NOW </DarkButton>
                </Container>
            </CustomJumbotron>
        </AdvertisementWrapper>
    );
}

export default Advertisement;