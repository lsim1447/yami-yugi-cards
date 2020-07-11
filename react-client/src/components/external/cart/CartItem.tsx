import React, { useContext, useState } from 'react';
import loadable from '@loadable/component';
import { CardContext } from "../../../contexts/CardContext";
import { Col, Row } from 'react-bootstrap';
import { DEFAULT_PRODUCT_VALUE, IProductDetails } from '../../../models/Product';
import { setCartItemIDs } from '../../../services/CartService';
import styled from 'styled-components';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const CardModal = loadable(() => import('../../modals/CardModal'), {
    fallback: undefined
});

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
    cartItem: IProductDetails
}

const CartItem = ({cartItem } : CartItemProps) => {
    const { cartItems, setCartItems } = useContext(CardContext);
    const [ modalShow, setModalShow ] = useState(false);

    const removeCartItem = () => {
        confirmAlert({
            title: 'Confirmation',
            message: 'Are you sure you want to remove this?',
            buttons: [
              {
                label: 'Yes, I want to remove this.',
                onClick: () => {
                    const newCartItems: IProductDetails[] = cartItems.filter((product: IProductDetails) => product.name !== cartItem.name);
                    const productIDs: string = newCartItems.map(product => product._id).join('|');
                    setCartItemIDs(productIDs);
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
                <CloseIcon onClick={() => removeCartItem()}>
                    &times;
                </CloseIcon>
                <Col sm={3}>
                    <img
                        width="100%"
                        onClick={() => setModalShow(true)}
                        src={(cartItem.card_images && cartItem.card_images.length) ? cartItem.card_images[0].image_url : DEFAULT_PRODUCT_VALUE.card_images[0].image_url} 
                        alt=""
                    />
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
            {
                modalShow && (
                    <CardModal
                        product={cartItem}
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    />
                )
            }
        </CartItemWrapper>
    );
}

export default CartItem;