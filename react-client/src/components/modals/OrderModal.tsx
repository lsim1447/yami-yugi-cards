import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { findAllCardsByIds } from '../../repositories/CardRepository';
import { Modal } from 'react-bootstrap';
import OrderProductItem from '../external/OrderProductItem';
import { ICardDetails } from '../models/Cards';
import { IOrder } from '../models/Order';
import styled from 'styled-components';

const TotalPrice = styled.p `
    font-size: 28px;
    font-weight: 600;
    margin-bottom: 0;
    padding: 24px 48px 0px 48px;
    text-align: right;
    width: 100%;
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
                <p style={{textAlign: "center"}}> Order Details </p>
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    products.map((product: ICardDetails) => {
                        return (
                            <OrderProductItem
                                productItem={product}
                            />
                        )
                    })
                }
                <TotalPrice>TOTAL PRICE: {order.totalPrice}$ </TotalPrice>
            </Modal.Body>
        </Modal>
    );
}

export default OrderModal;
  