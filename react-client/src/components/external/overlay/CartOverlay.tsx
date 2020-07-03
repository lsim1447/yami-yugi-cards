import React, { useContext } from 'react';
import styled from 'styled-components';
import { Col, Image, Row } from 'react-bootstrap';
import { CheckoutButton } from '../../internal/ButtonComponents';
import { CloseIcon } from '../../internal/IconComponents';
import { CardContext }  from "../../../contexts/CardContext";
import { CheckoutContext }  from "../../../contexts/CheckoutContext";
import { ICardDetails } from '../../../models/Cards';

const CustomRow = styled(Row) `
    border-top: 1px solid #D3D3D3;
    padding-top: 18px;
    padding-bottom: 18px;
`;

const OverlayWrapper = styled.div `
    background-color: white;
    height: 100vh;
    overflow-y: scroll;
    -ms-overflow-style: none;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 50000;
    max-width: 500px;
    width: 100%;

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        display: none;
    }

    &::-webkit-scrollbar {
        display: none;
    }
`;

const CartItemImage = styled(Image) `
    height: 200px;
    width: 180px;
    padding-left: 12px;
`;

const OverlayTitle = styled.p `
    background-image: url(/images/shopping-cart.jpg);
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    font-size: 36px;
    font-weight: 800;
    padding-bottom: 12px;
    padding-top: 12px;
    margin-bottom: 24px;
    text-align: center;
`;

const TotalPriceWrapper = styled.div `
    border-bottom: 2px solid #D3D3D3;
    border-top: 2px solid #D3D3D3;
    font-size: 24px;
    font-weight: 800;
    padding-bottom: 18px;
    padding-top: 18px;
    text-align: center;
    width: 100%;
`;

const CartOverlay = () => {
    const { cartItems } = useContext(CardContext);
    const { setShowCartOverlay } = useContext(CheckoutContext);

    const getTotalPrice = () => {
        const totalPrice = cartItems.reduce((accumulator, cartItem) => {
            const price = Number(cartItem.card_prices[0].amazon_price);
            return accumulator + price;
        }, 0);

        return totalPrice.toFixed(2);
    }

    return (
        <OverlayWrapper>
            <CloseIcon 
                className="fa fa-times"
                onClick={() => setShowCartOverlay(false)}
            />
            <OverlayTitle>
                <p> My Bag({cartItems.length})</p>
            </OverlayTitle>
            <CheckoutButton
                disabled={!cartItems.length}
                href="/checkout"
                onClick={() => setShowCartOverlay(false)}
            >
                    CHECKOUT
            </CheckoutButton>
            {
                cartItems.map((cartItem: ICardDetails) => {
                    return (
                        <CustomRow>
                            <Col sm={5}>
                                <a href={`/card/${cartItem._id}`}>
                                    <CartItemImage 
                                        thumbnail
                                        src={cartItem.card_images[0].image_url}
                                        alt={cartItem.name}
                                    />
                                </a>
                            </Col>
                            <Col sm={7}>
                                <p><strong> Name: </strong> {cartItem.name} </p>
                                <p><strong> Type: </strong>{cartItem.type} </p>
                                <p><strong> Race: </strong>{cartItem.race ? cartItem.race : 'N/A'}</p>
                                <p><strong> Archetype: </strong>{cartItem.archetype ? cartItem.archetype : 'N/A'}</p>
                                <p><strong> Price: </strong>{cartItem.card_prices[0].amazon_price}$</p>
                                 
                            </Col>
                        </CustomRow>
                    )
                })
            }
            <TotalPriceWrapper>
                TOTAL PRICE: {getTotalPrice()}$
            </TotalPriceWrapper>
        </OverlayWrapper>

    );
}

export default CartOverlay;