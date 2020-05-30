import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Col, Image, Row } from 'react-bootstrap';
import  { CardContext }  from "../../contexts/CardContext";
import  { CheckoutContext }  from "../../contexts/CheckoutContext";
import  { UserContext }  from "../../contexts/UserContext";
import { ICardDetails } from '../../components/models/Cards';

const CustomRow = styled(Row) `
    margin-bottom: 18px;
`;

const OverlayWrapper = styled.div `
    background-color: white;
    height: 100vh;
    overflow-y: scroll;
    -ms-overflow-style: none;
    padding-top: 60px;
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
    width: 180px;
    height: 180px;
`;

const OverlayTitle = styled.p `
    border-bottom: 3px solid #D3D3D3;
    border-top: 3px solid #D3D3D3;
    font-size: 36px;
    font-weight: 800;
    padding-bottom: 12px;
    padding-top: 12px;
    text-align: center;
`;

const TotalPriceWrapper = styled.div `
    font-size: 36px;
    font-weight: 800;
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
                COMPLETE YOUR CHECKOUT
            </OverlayTitle>
            {
                cartItems.map((cartItem: ICardDetails) => {
                    return (
                        <CustomRow>
                            <Col>
                                <CartItemImage 
                                    thumbnail
                                    src={cartItem.card_images[0].image_url}
                                    alt={cartItem.name}
                                />
                            </Col>
                            <Col>
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
                Total Price: {getTotalPrice()}$
            </TotalPriceWrapper>
            <CheckoutButton
                href="/checkout"
                onClick={() => setShowCartOverlay(false)}
            >
                    CHECKOUT
            </CheckoutButton>
        </OverlayWrapper>

    );
}

export default CartOverlay;