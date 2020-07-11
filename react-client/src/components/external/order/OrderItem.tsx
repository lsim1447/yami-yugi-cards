import React, { useContext, useState } from 'react';
import loadable from '@loadable/component';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { Container } from 'react-bootstrap';
import { CustomJumbotron } from '../../internal/CustomComponents';
import { IOrder } from '../../../models/Order';
import styled from 'styled-components';

const OrderModal = loadable(() => import('../../modals/OrderModal'), {
    fallback: undefined
});

const ShowDetailsButton = styled.button `
    background-color: #FFFFFF;
    border-radius: 3%;
    color: #000000;
    float: right;
    font-weight: 600;
    padding: 8px 48px;

    &:hover {
        background-color: #000000;
        color: #FFFFFF;
    }
`;

const ImportantDetails = styled.p `
    border-bottom: 1px solid #000000;
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
    const { activeTheme } = useContext(ThemeContext);
    const [ show, setShow ] = useState<boolean>(false);
    
    return (
        <CustomJumbotron key={order._id} fluid theme={activeTheme}>
            <Container>
                <h3> Order number: {order._id}</h3>
                <ShowDetailsButton onClick={() => setShow(true)}> Show details </ShowDetailsButton>
                <p> Number of products: <span style={{fontSize: "16px", fontWeight: 600}}> {order.products.length} </span></p>
                <ImportantDetails>
                    The order was created on: {order.date}
                </ImportantDetails>
                <ResumeDetails>
                    Total price: ${order.totalPrice}
                </ResumeDetails>
            </Container>
            {
                show && (
                    <OrderModal
                        order={order}
                        show={show}
                        setShow={setShow}  
                    />
                )
            }
        </CustomJumbotron>
    );
}

export default OrderItem;