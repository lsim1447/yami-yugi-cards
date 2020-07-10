import React, { useContext } from 'react';
import { CardContext }  from "../../../contexts/CardContext";
import { CheckoutContext }  from "../../../contexts/CheckoutContext";
import { ThemeContext }  from "../../../contexts/ThemeContext";
import { Col, Image, Row } from 'react-bootstrap';
import { CustomCol5, CustomCol7 } from '../../internal/CustomComponents';
import { CheckoutButton, EditButton } from '../../internal/ButtonComponents';
import { CloseIcon } from '../../internal/IconComponents';
import { ICardDetails } from '../../../models/Cards';
import styled from 'styled-components';

const CustomRow = styled(Row) `
    border-top: 1px solid #D3D3D3;
    padding-top: 18px;
    padding-bottom: 18px;
`;

const OverlayWrapper = styled.div `
    background-color: ${props => (props && props.theme && props.theme.backgroundColor) ? props.theme.backgroundColor : '#FFFFFF'};
    color: ${props => (props && props.theme && props.theme.color) ? props.theme.color : '#000000'};
    height: 100vh;
    max-width: 500px;
    -ms-overflow-style: none;
    overflow-y: scroll;
    position: fixed;
    right: 0;
    top: 0;
    transition: all .6s ease-in-out;
    z-index: 50000;
    width: 100%;

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        display: none;
    }

    &::-webkit-scrollbar {
        display: none;
    }
`;

const CartItemImage = styled(Image) `
    height: 200px;
    width: 180px;
    margin-left: 12px;
`;

const OverlayTitle = styled.p `
    font-size: 32px;
    font-weight: 700;
    padding-bottom: 0px;
    padding-top: 12px;
    text-align: center;
`;

const TotalPriceWrapper = styled.div `
    border-bottom: 2px solid #D3D3D3;
    border-top: 2px solid #D3D3D3;
    font-size: 24px;
    font-weight: 800;
    padding-bottom: 18px;
    padding-top: 18px;
    text-align: center;
    width: 100%;
`;

const ButtonsWrapper = styled(Row) `
    border-bottom: 1px solid #D3D3D3;
    padding: 12px;
`;

const CartItemNameElement = styled.p `
    font-size: 26px;
    font-weight: 600;
    text-align: center;
`;

const CartItemArchetypeElement = styled.p `
    font-size: 16px;
    padding-bottom: 8px;
    padding-top: 16px;
    text-align: center;
`;

const CartItemRowWrapper = styled(Row) `
    font-size: 16px;
    padding-top: 16px;
`;


const CartOverlay = () => {
    const { activeTheme } = useContext(ThemeContext);
    const { cartItems } = useContext(CardContext);
    const { setShowCartOverlay } = useContext(CheckoutContext);

    const getTotalPrice = () => {
        const totalPrice = cartItems.reduce((accumulator, cartItem) => {
            const price = Number(cartItem.card_prices[0].amazon_price);
            return accumulator + price;
        }, 0);

        return totalPrice.toFixed(2);
    }

    return (
        <OverlayWrapper theme={{ backgroundColor: activeTheme.itemBackgroundColor, color: activeTheme.color }}>
            <CloseIcon
                theme={activeTheme}
                className="fa fa-times"
                onClick={() => setShowCartOverlay(false)}
            />
            <OverlayTitle>
                My Bag({cartItems.length})
            </OverlayTitle>
            <ButtonsWrapper>
                <Col>
                    <EditButton
                        disabled={!cartItems.length}
                        href="/checkout"
                        onClick={() => setShowCartOverlay(false)}
                    >
                            EDIT
                    </EditButton>
                </Col>
                <Col>
                    <CheckoutButton
                        disabled={!cartItems.length}
                        href="/checkout"
                        onClick={() => setShowCartOverlay(false)}
                    >
                            CHECKOUT
                    </CheckoutButton>
                </Col>
            </ButtonsWrapper>
            {
                cartItems.map((cartItem: ICardDetails) => {
                    return (
                        <CustomRow>
                            <CustomCol5 sm={5}>
                                <a href={`/card/${cartItem._id}`}>
                                    <CartItemImage 
                                        thumbnail
                                        src={cartItem.card_images[0].image_url}
                                        alt={cartItem.name}
                                    />
                                </a>
                            </CustomCol5>
                            <CustomCol7 sm={7}>
                                <CartItemNameElement> {cartItem.name} </CartItemNameElement>
                                <CartItemRowWrapper>
                                    <Col>
                                        {cartItem.type ? cartItem.type : 'N/A'}
                                    </Col>
                                    <Col>
                                        {cartItem.race ? cartItem.race : 'N/A'}
                                    </Col>
                                </CartItemRowWrapper>
                                <CartItemArchetypeElement>
                                    <strong> Archetype: &nbsp;&nbsp;</strong>
                                    {cartItem.archetype ? cartItem.archetype : 'N/A'}
                                </CartItemArchetypeElement>
                                <Row>
                                    <Col>
                                        Quantity: &nbsp; {cartItem.quantity ? cartItem.quantity : '1'}
                                    </Col>
                                    <Col>
                                        <strong> {cartItem.card_prices[0].amazon_price}$ </strong>
                                    </Col>
                                </Row>
                            </CustomCol7>
                        </CustomRow>
                    )
                })
            }
            <TotalPriceWrapper>
                TOTAL PRICE: {getTotalPrice()}$
            </TotalPriceWrapper>
        </OverlayWrapper>
    );
}

export default CartOverlay;
