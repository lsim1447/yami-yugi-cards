import React, { useContext, useEffect, useState } from 'react';
import { Container ,Col, Jumbotron, Row } from 'react-bootstrap';
import { UserContext } from '../../contexts/UserContext';
import { getOrdersByUserId } from '../../repositories/OrderRepository';
import { IOrder } from '../../models/Order';
import OrderItem from '../../components/external/order/OrderItem';
import styled from 'styled-components';

const CustomRow = styled(Row) `

`;

const CustomLeftCol = styled(Col) `
    background: url(/images/world-image.jpg) top left fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;

    @media (max-width: 992px) {
        display: none;
    }
`;

const CustomRightCol = styled(Col) `
    background: url(/images/world-image.jpg) top right fixed;
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
                    orders.map((order: IOrder, index: number) => {
                        return (
                            <OrderItem 
                                key={order._id}
                                order={order}
                            />
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