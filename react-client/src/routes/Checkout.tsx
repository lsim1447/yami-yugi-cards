import React, { useContext } from 'react';
import { CardContext } from "../contexts/CardContext";
import { UserContext } from "../contexts/UserContext";
import { Button, Col, Row } from 'react-bootstrap';
import styled from 'styled-components';
import CartItem from '../components/external/CartItem';
import { ICardDetails } from '../models/Cards';
import { IUser } from '../models/User';
import { IOrder, DEFAULT_ORDER_VALUE } from '../models/Order';
import { updateUserById } from '../repositories/UserRepository';
import { isUserSignedIn } from '../services/UserService';
import { saveOrder } from '../repositories/OrderRepository';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const CustomCol = styled(Col) `
    border-left: 1px solid #D3D3D3;
    border-right: 1px solid #D3D3D3;
    min-height: 100vh;
`;

const LeftCol = styled(CustomCol) `
    background: url(/images/checkout-left.jpg) top center;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    @media (max-width: 992px) {
        display: none;
    }
`;

const CenterCol = styled(CustomCol) `
    @media (max-width: 992px) {
        max-width: 100%;
        flex: 0 0 100%;
    }
`;

const RightCol = styled(CustomCol) `
    background: url(/images/checkout-right.jpg) top center;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    @media (max-width: 992px) {
        display: none;
    }
`;

const BagWrapper = styled.div `
    font-size: 30px;
    font-weight: 600;
    padding: 12px 0;
    text-align: center;
    width: 100%;
`;

const CheckoutButton = styled(Button)`
    background-color: black;
    float: right;
    margin-bottom: 24px;
    padding: 12px 60px;

    @media (max-width: 992px) {
        width: 100%;
    }
`;

const CheckoutFooterWrapper = styled.div `
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
  const { cartItems, setCartItems } = useContext(CardContext);
  const { user } = useContext(UserContext);

  const getTotalPrice = () => {
    if (cartItems && cartItems.length) {
        return cartItems.reduce((accumulator: number, currentCard: ICardDetails) => {
            const price: number = Number((currentCard && currentCard.card_prices && currentCard.card_prices[0]) ? currentCard.card_prices[0].amazon_price : 0);
            const newAccumulator: number = Number((accumulator + price).toFixed(2));

            return newAccumulator ? newAccumulator : accumulator;
        }, 0);
    } else {
        return 0;
    }
  }

  const checkoutCartItems = () => {
    const NEW_DECK_ITEMS = user.deck.concat(cartItems.map(item => item._id));
    const ALL_CARDS_PRICE = cartItems.reduce((accumulator, cartItem) => {
        return accumulator + Number(cartItem.card_prices[0].amazon_price);
    }, 0);
    const newUser: IUser = Object.create(user);
    newUser.accountBalance = user.accountBalance - ALL_CARDS_PRICE;
    newUser.deck = NEW_DECK_ITEMS;

    updateUserById(newUser)
        .then(userResponse => {
            const newOrder: IOrder = DEFAULT_ORDER_VALUE;
            
            newOrder.products = cartItems.map(item => item._id);
            newOrder.userId = user._id;
            newOrder.totalPrice = getTotalPrice();

            saveOrder(newOrder)
                .then(orderResponse => {
                    localStorage.removeItem('card_ids');
                    setCartItems([]);

                    confirmAlert({
                        title: 'Checkout completed!',
                        message: 'The desired cards were added to your deck successfully!',
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

  if (!isUserSignedIn()) {
    window.location.href='/signin';
    
    return null;
  } else {
    return (
        <Row>
            <LeftCol sm={3}/>
            <CenterCol sm={6}>
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
                    cartItems.map((card: ICardDetails) => {
                        return (
                            <CartItem
                                cartItem={card}
                            />
                        )
                    })
                }
                <TotalPrice> TOTAL PRICE: {getTotalPrice()} $</TotalPrice>
                <CheckoutFooterWrapper>
                    <CheckoutButton
                        disabled={!cartItems.length}
                        onClick={() => checkoutCartItems()}
                        variant="dark"
                    >
                         SUBMIT YOUR ORDER
                    </CheckoutButton>
                </CheckoutFooterWrapper>
            </CenterCol>
            <RightCol sm={3}/>
        </Row>
      );
  }
}

export default Checkout;