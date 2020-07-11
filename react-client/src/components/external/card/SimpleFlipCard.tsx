import React, { useState, useEffect } from 'react';
import loadable from '@loadable/component';
import { Card } from 'react-bootstrap';
import { FlipCardInner, FlipCardContainer, FlipCardFront, FlipCardBack } from '../../internal/FlipComponents';
import { DEFAULT_PRODUCT_VALUE, IProductDetails, ProductProps } from '../../../models/Product';
import { getCardById } from '../../../repositories/CardRepository';
import styled from 'styled-components';

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

const SimpleFlipCard = ({ id, product } : ProductProps) => {
    const initialValue: IProductDetails = DEFAULT_PRODUCT_VALUE;
    const [ productDetails, setProductDetails ] = useState(initialValue);
    const [ modalShow, setModalShow ] = useState(false);

    useEffect(() => {
        if (id) {
            getCardById(id)
                .then(desiredProduct => {
                    setProductDetails(desiredProduct);
                })
        } else if (product) {
            setProductDetails(product);
        }
    }, []);
    
    return (
        <SimpleCardContainer>
            <Card style={{minWidth: "230px", margin: "24px", backgroundColor: "transparent", border: "none"}} onClick={() => setModalShow(true)}>
                <FlipCardContainer>
                    <FlipCardInner>
                        <FlipCardFront>
                            <Card.Img className="lazyload" variant="top" src={initialValue.card_images[0].image_url} data-src={(productDetails.card_images && productDetails.card_images.length) ? productDetails.card_images[0].image_url : initialValue.card_images[0].image_url} />
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
                        product={product}
                        onHide={() => setModalShow(false)}
                        show={modalShow}
                    />
                )
            }
        </SimpleCardContainer>
    );
}

export default SimpleFlipCard;