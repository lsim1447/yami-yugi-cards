import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import {
    getOrdersByUserId
} from '../repositories/OrderRepository';
import { IOrder } from '../components/models/Order';
import { Button, Container ,Col, Jumbotron, Row } from 'react-bootstrap';
import styled from 'styled-components';

const CustomRow = styled(Row) `

`;

const CustomLeftCol = styled(Col) `
    background: url(/images/world-image.jpg) top left;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;

    @media (max-width: 992px) {
        display: none;
    }
`;

const CustomRightCol = styled(Col) `
    background: url(/images/world-image.jpg) top right;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;

    @media (max-width: 992px) {
        display: none;
    }
`;

const CustomCenterCol = styled(Col) `
    min-height: 80vh;

    @media (max-width: 992px) {
        max-width: 100%;
        flex: 0 0 100%;
    }
`;

const CoverWrapper = styled.div `
    background: url(https://www.starpizza.ie/images/slider-content-1.png) center;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    margin: 0;
    padding: 12px;
    margin-bottom: 12px;
    margin-top: 12px;
    min-height: 120px;
    max-height: 120px;
    width: 100%;
`;

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

const TitleWrapper = styled.div `
    background-color: #e9ecef;
    margin-bottom: 16px;
    padding: 24px;
    width: 100%;
`;

const TitleText = styled.p `
    font-family: Lucida Console, Courier, monospace;
    font-size: 48px;
    font-weight: 700;
    margin: 0;
    text-align: center;
`;

function Orders() {
    const [orders, setOrders] = useState<IOrder[]>([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (user && user._id) {
            getOrdersByUserId(user._id)
                .then((orders) => {
                    setOrders(orders);
                })
        }
    }, [user]);

    return (
        <CustomRow>
            <CustomLeftCol sm={3}/>
            
            <CustomCenterCol sm={6}>
                <CoverWrapper />
                <TitleWrapper>
                    <TitleText>MY PREVIOUS ORDERS({orders.length})</TitleText>
                </TitleWrapper>
                {
                    orders.map(order => {
                        return (
                            <Jumbotron key={order._id} fluid>
                                <Container>
                                    <h3>Order number: {order._id}</h3>
                                    <ShowDetailsButton>Show details</ShowDetailsButton>
                                    <p>Number of products: <span style={{fontSize: "16px", fontWeight: 600}}> {order.products.length} </span>  </p>
                                    <ImportantDetails>
                                        The order was created on: {order.date}
                                    </ImportantDetails>
                                    <ResumeDetails>
                                        Total price: {order.totalPrice}$
                                    </ResumeDetails>
                                </Container>
                            </Jumbotron>
                        )
                    })
                }

                {
                    (!orders.length) ?
                        <Jumbotron fluid>
                            <Container>
                                <h3 style={{textAlign: "center"}}>You haven't finalized any order yet!</h3>
                            </Container>
                        </Jumbotron>
                        : null
                }
            </CustomCenterCol>

            <CustomRightCol sm={3}/>
        </CustomRow>
    );
}

export default Orders;