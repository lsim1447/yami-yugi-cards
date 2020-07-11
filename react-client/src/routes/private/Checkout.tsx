import React, { useContext } from 'react';
import { CardContext } from "../../contexts/CardContext";
import { UserContext } from "../../contexts/UserContext";
import { HideOverlaysContext } from "../../contexts/HideOverlaysContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Row } from 'react-bootstrap';
import CartItem from '../../components/external/cart/CartItem';
import { CustomLeftCol, CustomCenterCol, CustomRightCol } from '../../components/internal/CustomComponents';
import { SimpleContainer } from '../../components/internal/CommonContainers';
import { SubmitOrderButton } from '../../components/internal/ButtonComponents';
import { IProductDetails } from '../../models/Product';
import { IUser } from '../../models/User';
import { IOrder, DEFAULT_ORDER_VALUE } from '../../models/Order';
import { updateUserById } from '../../repositories/UserRepository';
import { saveOrder } from '../../repositories/OrderRepository';
import { emptyBag } from '../../services/CartService';
import { confirmAlert } from 'react-confirm-alert';
import styled from 'styled-components';
import 'react-confirm-alert/src/react-confirm-alert.css';

const BagWrapper = styled.div `
    font-size: 30px;
    font-weight: 600;
    padding: 12px 0;
    text-align: center;
    width: 100%;
`;

const SubmitYourOrderWrapper = styled.div `
    border-top: 1px solid #D3D3D3;
    padding-top: 24px;
    width: 100%;
`;

const CoverWrapper = styled.div `
    background: url(/images/checkout_cover_image.jpg) top center;
    margin: 0;
    padding: 12px;
    max-height: 200px;
    margin-top: 12px;
    min-height: 200px;
    width: 100%;
`;

const DescriptionWrapper = styled.div `
    border-bottom: 1px solid #D3D3D3;
    overlay: hidden;
    padding: 16px 18px;
    text-align: center;
    width: 100%;
`;

const TitleWrapper = styled.div `
    border-bottom: 1px solid #D3D3D3;
    font-size: 36px;
    font-weight: 800;
    padding: 16px 18px;
    text-align: center;
`;

const TotalPrice = styled.div `
    border-top: 1px solid #D3D3D3;
    font-size: 24px;
    font-weight: bold;
    padding-bottom: 12px;
    padding-top: 12px;
    text-align: right;
    width: 100;

    @media (max-width: 992px) {
        text-align: center;
    }
`;

function Checkout() {
    const { activeTheme } = useContext(ThemeContext);
    const { cartItems, setCartItems } = useContext(CardContext);
    const { hideAllOverlays } = useContext(HideOverlaysContext);
    const { user } = useContext(UserContext);

    const getTotalPrice = () => {
        if (cartItems && cartItems.length) {
            return cartItems.reduce((accumulator: number, currentProduct: IProductDetails) => {
                const price: number = Number((currentProduct && currentProduct.card_prices && currentProduct.card_prices[0]) ? currentProduct.card_prices[0].amazon_price : 0);
                const newAccumulator: number = Number((accumulator + price).toFixed(2));
                return newAccumulator ? newAccumulator : accumulator;
            }, 0);
        } else {
            return 0;
        }
    }

    const checkoutCartItems = () => {
        const NEW_DECK_ITEMS: string[] = user.deck.concat(cartItems.map((cartItem: IProductDetails) => cartItem._id));
        const BAGs_VALUE = cartItems.reduce((accumulator: number, cartItem: IProductDetails) => {
            return accumulator + Number(cartItem.card_prices[0].amazon_price);
        }, 0);
        const newUser: IUser = Object.create(user);

        newUser.accountBalance = user.accountBalance - BAGs_VALUE;
        newUser.deck = NEW_DECK_ITEMS;

        updateUserById(newUser)
            .then(userResponse => {
                const newOrder: IOrder = DEFAULT_ORDER_VALUE;
                
                newOrder.products = cartItems.map((cartItem: IProductDetails) => cartItem._id);
                newOrder.userId = user._id;
                newOrder.totalPrice = getTotalPrice();

                saveOrder(newOrder)
                    .then(orderResponse => {
                        emptyBag();
                        setCartItems([]);

                        confirmAlert({
                            title: 'Checkout completed!',
                            message: 'The desired cards were added to your DECK successfully!',
                            buttons: [
                            {
                                label: 'Go to the My Deck page',
                                onClick: () => {
                                    window.location.href = '/my-deck'
                                }
                            },
                            {
                                label: 'Stay on this page.',
                                onClick: () => {}
                            }
                            ]
                        });
                    })
            })
            .catch(error => {
                console.log('Error(/api/users/update/userID): ', error);
            })   
    }

    return (
        <SimpleContainer theme={activeTheme} onClick={() => hideAllOverlays()}>
            <Row>
                <CustomLeftCol sm={3} theme={{backgroundImage: '/images/checkout-left.jpg'}}/>
                <CustomCenterCol sm={6}>
                    <DescriptionWrapper>
                        Yu-Gi-Oh! is a Japanese manga series about gaming written and illustrated by Kazuki Takahashi.
                        It was serialized in Shueisha's Weekly Shōnen Jump magazine between September 30, 1996 and March 8, 2004.
                    </DescriptionWrapper>
                    <TitleWrapper>
                        COMPLETE YOUR CHECKOUT
                    </TitleWrapper>
                    <DescriptionWrapper>
                        Congratulations! Your order qualifies for FREE Standard Shipping. No offer code needed.
                    </DescriptionWrapper>
                    <CoverWrapper />
                    <BagWrapper>
                        My Bag ({cartItems.length} items)
                    </BagWrapper>
                    {
                        cartItems.map((cartItem: IProductDetails) => {
                            return (
                                <CartItem
                                    cartItem={cartItem}
                                />
                            )
                        })
                    }
                    <TotalPrice> TOTAL PRICE: {getTotalPrice()} $</TotalPrice>
                    <SubmitYourOrderWrapper>
                        <SubmitOrderButton
                            disabled={!cartItems.length}
                            onClick={() => checkoutCartItems()}
                            variant="dark"
                        >
                                SUBMIT YOUR ORDER
                        </SubmitOrderButton>
                    </SubmitYourOrderWrapper>
                </CustomCenterCol>
                <CustomRightCol sm={3} theme={{backgroundImage: '/images/checkout-right.jpg'}} />
            </Row>
        </SimpleContainer>
    );
}

export default Checkout;