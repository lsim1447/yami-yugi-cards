import React, { useState } from 'react';
import { Container ,Col, Jumbotron, Row } from 'react-bootstrap';
import styled from 'styled-components';
import OrderModal from '../modals/OrderModal';
import { IOrder } from '../../models/Order';

const ShowDetailsButton = styled.button `
    background-color: white;
    border-radius: 3%;
    color: black;
    float: right;
    font-weight: 600;
    padding: 8px 48px;

    &:hover {
        background-color: black;
        color: white;
    }
`;

const ImportantDetails = styled.p `
    border-bottom: 1px solid black;
    padding-bottom: 36px;
`;

const ResumeDetails = styled.p `
    font-size: 20px;
    font-weight: 500;
    padding-top: 12px;
`;

export type OrderItemProps = {
    order: IOrder
}

const OrderItem = ({ order } : OrderItemProps) => {
    const [show, setShow] = useState<boolean>(false);

    return (
        <Jumbotron key={order._id} fluid>
            <Container>
                <h3>Order number: {order._id}</h3>
                <ShowDetailsButton onClick={() => setShow(true)}>Show details</ShowDetailsButton>
                <p>Number of products: <span style={{fontSize: "16px", fontWeight: 600}}> {order.products.length} </span>  </p>
                <ImportantDetails>
                    The order was created on: {order.date}
                </ImportantDetails>
                <ResumeDetails>
                    Total price: ${order.totalPrice}
                </ResumeDetails>
            </Container>
            <OrderModal
                order={order}
                show={show}
                setShow={setShow}  
            />
        </Jumbotron>
    );
}

export default OrderItem;