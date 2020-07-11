import React, { useState, useEffect, useContext } from 'react';
import loadable from '@loadable/component';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { FlipCardInner, FlipCardContainer, FlipCardFront, FlipCardBack } from '../../internal/FlipComponents';
import { CustomCard } from '../../internal/CustomComponents';
import { ProductProps, DEFAULT_PRODUCT_VALUE, IProductDetails } from '../../../models/Product';
import { getCardById } from '../../../repositories/CardRepository';
import styled from 'styled-components';

const CardModal = loadable(() => import('../../modals/CardModal'), {
    fallback: undefined
});

const PriceContainer = styled.p `
    font-size: 16px;
    font-style: italic;
    padding-top: 12px;
    text-align: center;
`;

const FlipCard = ({ id, isFullDescriptionVisible, product } : ProductProps) => {
    const { activeTheme } = useContext(ThemeContext);
    const initialValue: IProductDetails = DEFAULT_PRODUCT_VALUE;
    const [ productDetails, setProductDetails ] = useState(initialValue);
    const [ modalShow, setModalShow ] = useState(false);

    const getText = (text: string, limit: number, isFullDescriptionVisible: boolean) => {
        if (isFullDescriptionVisible) return text;
        return (text.length > 150) ? text.substring(0, limit - 3) + '...' : text; 
    }

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
        <>
            <CustomCard style={{backgroundColor: activeTheme.itemBackgroundColor, color: activeTheme.color}} onClick={() => setModalShow(true)}>
                <FlipCardContainer theme={{backgroundColor: activeTheme.backgroundColor}}>
                    <FlipCardInner>
                        <FlipCardFront>
                            <CustomCard.Img className="lazyload" variant="top" src={initialValue.card_images[0].image_url} data-src={(productDetails.card_images && productDetails.card_images.length) ? productDetails.card_images[0].image_url : initialValue.card_images[0].image_url} />
                        </FlipCardFront>
                        <FlipCardBack>
                            <CustomCard.Img className="lazyload" variant="top" data-src="/images/yugioh-card-back-side.jpg" />
                        </FlipCardBack>
                    </FlipCardInner>
                </FlipCardContainer>

                <CustomCard.Body>
                    <CustomCard.Title> {getText(productDetails.name, 150, isFullDescriptionVisible)} </CustomCard.Title>
                    <CustomCard.Text>  {getText(productDetails.desc, 150, isFullDescriptionVisible)} </CustomCard.Text>
                </CustomCard.Body>
                <CustomCard.Footer>
                    <PriceContainer> Price: {(productDetails.card_prices && productDetails.card_prices.length) ? productDetails.card_prices[0].amazon_price : initialValue.card_prices[0].amazon_price} $ </PriceContainer>
                </CustomCard.Footer>
            </CustomCard>
            
            {
                modalShow && (<CardModal
                    product={product}
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />)
            }
        </>
    );
}

export default FlipCard;