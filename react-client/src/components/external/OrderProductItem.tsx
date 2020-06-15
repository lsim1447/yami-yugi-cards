import React, { useContext, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { ICardDetails, DEFAULT_CARD_VALUE } from '../models/Cards';

const CartItemWrapper = styled.div `
    border-bottom: 1px solid #D3D3D3;
    padding: 24px 24px;
    width: 100%;
`;

const HeaderWrapper = styled.p `
    font-size: 16px;
    font-weight: bold;
    padding-top: 12px;
    text-align: center;
`;

const CenterWrapper = styled.p `
    padding-top: 16px;
    text-align: center;
`;

export type OrderProductItemProps = {
    productItem: ICardDetails
}

const OrderProductItem = ({ productItem } : OrderProductItemProps) => {
    return (
        <CartItemWrapper>
            <Row>
                <Col sm={3}>
                    <a href={`/card/${productItem._id}`}>
                        <img
                            width="100%"
                            src={(productItem.card_images && productItem.card_images.length) ? productItem.card_images[0].image_url : DEFAULT_CARD_VALUE.card_images[0].image_url} 
                            alt=""
                        />
                    </a>
                </Col>
                <Col sm={3}>
                    <HeaderWrapper> {productItem.name} </HeaderWrapper>
                    <CenterWrapper> This card is a(n) {productItem.type} </CenterWrapper>
                    <CenterWrapper> {productItem?.archetype} </CenterWrapper>
                    <CenterWrapper> {productItem?.race} </CenterWrapper>
                </Col>
                <Col sm={4}>
                    <HeaderWrapper> ABOUT THE CARD </HeaderWrapper>
                    <CenterWrapper> {productItem.desc} </CenterWrapper>
                </Col>
                <Col sm={2}>
                    <HeaderWrapper> PRICE </HeaderWrapper>
                    <CenterWrapper> {productItem.card_prices[0].amazon_price} $</CenterWrapper>
                </Col>
            </Row>
        </CartItemWrapper>
    );
}

export default OrderProductItem;