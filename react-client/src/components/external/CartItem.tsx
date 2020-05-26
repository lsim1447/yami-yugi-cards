import React, { useContext, useState, useEffect } from 'react';
import { CardContext } from "../../contexts/CardContext";
import { Col, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { ICardDetails, DEFAULT_CARD_VALUE } from '../internal/Cards';
import CardModal from './../modals/CardModal';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const CartItemWrapper = styled.div `
    border-top: 1px solid #D3D3D3;
    padding: 24px 24px;
    padding-top: 0;
    width: 100%;
`;

const HeaderWrapper = styled.p `
    font-size: 16px;
    font-weight: bold;
    padding-top: 12px;
    text-align: center;
`;

const CenterWrapper = styled.p `
    padding-top: 12px;
    text-align: center;
`;

const CloseIcon = styled.i `
    text-align: right;
    font-size: 36px;
    position: relative;
    right: 0px;
    width: 100%;
`

export type CartItemProps = {
    cartItem: ICardDetails
}

const CartItem = ({cartItem } : CartItemProps) => {
    const { cartItems, setCartItems } = useContext(CardContext);
    const [modalShow, setModalShow] = useState(false);

    const removeCartItem = () => {
        confirmAlert({
            title: 'Confirmation',
            message: 'Are you sure you want to remove this?',
            buttons: [
              {
                label: 'Yes, I want to remove this.',
                onClick: () => {
                    const newCartItems = cartItems.filter(c => c.name !== cartItem.name);
                    const cardIDs = newCartItems.map(card => card._id).join('|');
                    localStorage.setItem('card_ids', cardIDs);
                    setCartItems([...newCartItems]);
                }
              },
              {
                label: 'No, keep it in my bag.',
                onClick: () => {
                    console.log(cartItem.name, ' stays in the bag.')
                }
              }
            ]
          });
        
    }

    return (
        <CartItemWrapper>
            <Row>
                <CloseIcon
                    onClick={() => removeCartItem()}
                >
                    &times;
                </CloseIcon>
                <Col sm={3}>
                    <img
                        width="100%"
                        onClick={() => setModalShow(true)}
                        src={(cartItem.card_images && cartItem.card_images.length) ? cartItem.card_images[0].image_url : DEFAULT_CARD_VALUE.card_images[0].image_url} />
                </Col>
                <Col sm={3}>
                    <HeaderWrapper> {cartItem.name} </HeaderWrapper>
                    <CenterWrapper> This card is a(n) {cartItem.type} </CenterWrapper>
                    <CenterWrapper> {cartItem?.archetype} </CenterWrapper>
                    <CenterWrapper> {cartItem?.race} </CenterWrapper>
                </Col>
                <Col sm={4}>
                    
                    <HeaderWrapper> ABOUT THE CARD </HeaderWrapper>
                    <CenterWrapper> {cartItem.desc} </CenterWrapper>
                </Col>
                <Col sm={2}>
                    <HeaderWrapper> PRICE </HeaderWrapper>
                    <CenterWrapper> {cartItem.card_prices[0].amazon_price} $</CenterWrapper>
                </Col>
                
            </Row>

            <CardModal
                card={cartItem}
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </CartItemWrapper>
    );
}

export default CartItem;