import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Col, Image, Row } from 'react-bootstrap';
import  { CardContext }  from "../../contexts/CardContext";
import  { CheckoutContext }  from "../../contexts/CheckoutContext";
import  { UserContext }  from "../../contexts/UserContext";
import { ICardDetails } from '../../components/models/Cards';

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

const CheckoutButton = styled(Button) `
    background-color: black;
    color: white;
    font-size: 20px;
    font-weight: 600;
    margin-top: 36px;
    padding-bottom: 12px;
    padding-top: 12px;
    width: 100%;
`;

const CloseIcon = styled.i `
    color: black;
    font-size: 36px;
    margin-bottom: 12px;
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
    const { cartItems, setCartItems } = useContext(CardContext);
    const { showCartOverlay, setShowCartOverlay } = useContext(CheckoutContext);
    const { user, setUser } = useContext(UserContext);

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