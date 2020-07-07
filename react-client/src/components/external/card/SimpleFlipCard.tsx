import React, { useState, useEffect } from 'react';
import loadable from '@loadable/component';
import { Card } from 'react-bootstrap';
import styled from 'styled-components';
import { CardProps, DEFAULT_CARD_VALUE, ICardDetails } from '../../../models/Cards';
import { FlipCardInner, FlipCardContainer, FlipCardFront, FlipCardBack } from '../../internal/FlipComponents';
import { getCardById } from '../../../repositories/CardRepository';

const CardModal = loadable(() => import('../../modals/CardModal'), {
    fallback: undefined
});

const SimpleCardContainer = styled.div `
    @media (max-width: 420px) {
        width: 100%;
        max-height: 600px;
        height: 600px;
        margin: 0 !important;
    }
`;

const SimpleFlipCard = ({ id, isAddToBagButtonDisabled, card } : CardProps) => {
    const initialValue: ICardDetails = DEFAULT_CARD_VALUE;
    const [cardDetails, setCardDetails] = useState(initialValue);
    const [modalShow, setModalShow] = useState(false);

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
        <SimpleCardContainer>
            <Card style={{minWidth: "230px", margin: "24px", backgroundColor: "transparent", border: "none"}} onClick={() => setModalShow(true)}>
                <FlipCardContainer>
                    <FlipCardInner>
                        <FlipCardFront>
                            <Card.Img className="lazyload" variant="top" src={initialValue.card_images[0].image_url} data-src={(cardDetails.card_images && cardDetails.card_images.length) ? cardDetails.card_images[0].image_url : initialValue.card_images[0].image_url} />
                        </FlipCardFront>
                        <FlipCardBack>
                            <Card.Img className="lazyload" variant="top" data-src="/images/yugioh-card-back-side.jpg" />
                        </FlipCardBack>
                    </FlipCardInner>
                </FlipCardContainer>
            </Card>
            {
                modalShow && (
                    <CardModal
                        card={card}
                        isAddToBagButtonDisabled={isAddToBagButtonDisabled}
                        onHide={() => setModalShow(false)}
                        show={modalShow}
                    />
                )
            }
        </SimpleCardContainer>
    );
}

export default SimpleFlipCard;