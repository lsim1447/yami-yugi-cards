import React, { useContext } from 'react';
import { CardContext }  from "../../../contexts/CardContext";
import { CheckoutContext }  from "../../../contexts/CheckoutContext";
import { ThemeContext }  from "../../../contexts/ThemeContext";
import { Image, Row } from 'react-bootstrap';
import { CustomCol5, CustomCol7 } from '../../internal/CustomComponents';
import { CheckoutButton } from '../../internal/ButtonComponents';
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
    background-image: url(/images/shopping-cart.jpg);
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    color: #000000;
    font-size: 36px;
    font-weight: 800;
    padding-bottom: 12px;
    padding-top: 12px;
    margin-bottom: 24px;
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
                className="fa fa-times"
                onClick={() => setShowCartOverlay(false)}
            />
            <OverlayTitle>
                <p> My Bag({cartItems.length})</p>
            </OverlayTitle>
            <CheckoutButton
                disabled={!cartItems.length}
                href="/checkout"
                onClick={() => setShowCartOverlay(false)}
            >
                    CHECKOUT
            </CheckoutButton>
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
                                <p><strong> Name: </strong> {cartItem.name} </p>
                                <p><strong> Type: </strong>{cartItem.type} </p>
                                <p><strong> Race: </strong>{cartItem.race ? cartItem.race : 'N/A'}</p>
                                <p><strong> Archetype: </strong>{cartItem.archetype ? cartItem.archetype : 'N/A'}</p>
                                <p><strong> Price: </strong>{cartItem.card_prices[0].amazon_price}$</p>
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