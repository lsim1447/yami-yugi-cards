import React, { useContext, useEffect, useState } from 'react';
import { HideOverlaysContext } from '../../contexts/HideOverlaysContext';
import { UserContext } from '../../contexts/UserContext';
import { ThemeContext } from '../../contexts/ThemeContext';
import { Container ,Col, Jumbotron, Row } from 'react-bootstrap';
import OrderItem from '../../components/external/order/OrderItem';
import { IOrder } from '../../models/Order';
import { getOrdersByUserId } from '../../repositories/OrderRepository';
import styled from 'styled-components';

const CustomRow = styled(Row) `
    background-color: #000000;
    color: #FFFFFF;
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
    background-color: ${props => (props && props.theme && props.theme.backgroundColor) ? props.theme.backgroundColor : '#FFFFFF'};
    color: ${props => (props && props.theme && props.theme.color) ? props.theme.color : '#000000'};
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
    const { activeTheme } = useContext(ThemeContext);
    const { hideAllOverlays } = useContext(HideOverlaysContext);
    const { user } = useContext(UserContext);
    const [ orders, setOrders ] = useState<IOrder[]>([]);

    useEffect(() => {
        if (user && user._id) {
            getOrdersByUserId(user._id)
                .then((orders) => {
                    setOrders(orders);
                })
        }
    }, [user]);

    return (
        <CustomRow onClick={() => hideAllOverlays()}>
            <CustomLeftCol sm={3}/>
            <CustomCenterCol sm={6}>
                <CoverWrapper />
                <TitleWrapper theme={activeTheme}>
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