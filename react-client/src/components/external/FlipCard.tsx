import React, { useState, useEffect, useContext } from 'react';
import { Card } from 'react-bootstrap';
import styled from 'styled-components';
import { CardProps, DEFAULT_CARD_VALUE, ICardDetails } from '../../models/Cards';
import CardModal from '../modals/CardModal';
import { FlipCardInner, FlipCardContainer, FlipCardFront, FlipCardBack } from '../internal/FlipComponents';
import { getCardById } from '../../repositories/CardRepository';
import { ThemeContext } from '../../contexts/ThemeContext';

const PriceContainer = styled.p `
    padding-top: 12px;
    text-align: center;
    font-size: 14px;
    font-style: italic;
`;

const FlipCard = ({ id, isFullDescriptionVisible, card } : CardProps) => {
    const initialValue: ICardDetails = DEFAULT_CARD_VALUE;
    const [cardDetails, setCardDetails] = useState(initialValue);
    const [modalShow, setModalShow] = useState(false);
    const { backgroundColor, color } = useContext(ThemeContext);

    const getText = (text: string, limit: number, isFullDescriptionVisible: boolean) => {
        if (isFullDescriptionVisible) return text;
        return (text.length > 150) ? text.substring(0, limit - 3) + '...' : text; 
    }

    useEffect(() => {
        if (id) {
            getCardById(id)
                .then(desiredCard => {
                    setCardDetails(desiredCard);
                })
        } else if (card) {
            setCardDetails(card);
        }
    }, []);
    

    return (
        <>
            <Card style={{minWidth: "290px", marginBottom: "24px", backgroundColor: backgroundColor, color: color}} onClick={() => setModalShow(true)}>
                <FlipCardContainer theme={
                    {
                        backgroundColor: "#eee9e5",
                    }
                }>
                    <FlipCardInner>
                        <FlipCardFront>
                            <Card.Img className="lazyload" variant="top" src={initialValue.card_images[0].image_url} data-src={(cardDetails.card_images && cardDetails.card_images.length) ? cardDetails.card_images[0].image_url : initialValue.card_images[0].image_url} />
                        </FlipCardFront>
                        <FlipCardBack>
                            <Card.Img className="lazyload" variant="top" data-src="https://cdn11.bigcommerce.com/s-ebhaloj/images/stencil/1280x1280/products/6750/12455/KOIYGSLEEVE__99423.1567709419.jpg?c=2&imbypass=on" />
                        </FlipCardBack>
                    </FlipCardInner>
                </FlipCardContainer>

                <Card.Body>
                    <Card.Title> {getText(cardDetails.name, 150, isFullDescriptionVisible)} </Card.Title>
                    <Card.Text> {getText(cardDetails.desc, 150, isFullDescriptionVisible)} </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <PriceContainer className="text-muted"> Price: {(cardDetails.card_prices && cardDetails.card_prices.length) ? cardDetails.card_prices[0].amazon_price : initialValue.card_prices[0].amazon_price} $ </PriceContainer>
                </Card.Footer>
                
            </Card>
            <CardModal
                card={card}
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}

export default FlipCard;