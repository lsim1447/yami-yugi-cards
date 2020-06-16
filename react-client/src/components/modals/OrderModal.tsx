import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { findAllCardsByIds } from '../../repositories/CardRepository';
import { Modal } from 'react-bootstrap';
import OrderProductItem from '../external/OrderProductItem';
import { ICardDetails } from '../models/Cards';
import { IOrder } from '../models/Order';
import styled from 'styled-components';

const Date = styled.span `
    float: left;
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 0;
    padding: 24px 0px 0px 0px;
`;

const TotalPrice = styled.span `
    float: right;
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 0;
    padding: 24px 24px 0px 0px;
`;

const Title = styled.p `
    margin-bottom: 0;
    text-align: center;
`;

const OrderIdWrapper = styled.p `
    font-size: 14px;
    text-align: center;
`;

type OrderModalProps = {
    order: IOrder,
    show: boolean,
    setShow: any
}

function OrderModal({ order, show, setShow }: OrderModalProps) {
    const { user } = useContext(UserContext);
    const [products, setProducts] = useState<ICardDetails[]>([]);

    useEffect(() => {
        if (user && user._id) {
            findAllCardsByIds(order.products)
                .then(cards => {
                    setProducts(cards);
                })
        }
    }, [user]);

    return (
        <Modal
            size="lg"
            show={show}
            onHide={() => setShow(false)}
            aria-labelledby="example-modal-sizes-title-lg"
        >
            <Modal.Header closeButton>
            <Modal.Title style={{fontSize: "40px", paddingTop: "24px", width: "100%"}} id="example-modal-sizes-title-lg">
                <Title> Order Details </Title>
                <OrderIdWrapper> ({order._id}) </OrderIdWrapper>
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    products.map((product: ICardDetails) => {
                        return (
                            <OrderProductItem
                                key={product._id}
                                productItem={product}
                            />
                        )
                    })
                }
                <div>
                    <Date>Created on: {order.date}</Date>
                    <TotalPrice>TOTAL PRICE: {order.totalPrice}$ </TotalPrice>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default OrderModal;
  