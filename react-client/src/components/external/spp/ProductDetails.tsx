import React, { useContext, useState, useEffect } from 'react';
import { Breadcrumb, Button, Col, Container, Form, Jumbotron, Row } from 'react-bootstrap';
import { CardContext }  from "../../../contexts/CardContext";
import { CheckoutContext } from "../../../contexts/CheckoutContext";
import { UserContext }  from "../../../contexts/UserContext";
import { ICardDetails } from '../../../models/Cards';
import {
    ADD_TO_BAG,
    ALREADY_ADDED_TO_YOUR_BAG,
    ALREADY_ADDED_TO_YOUR_DECK,
} from '../../../constants';
import styled from 'styled-components';

const DetailsWrapper = styled.div `

`;

const CardName = styled.p `
    font-size: 48px;
    font-weight: 800;
`;

const SubTitle = styled.p `
    font-size: 28px;
    font-weight: 800;
`;

const SimpleText = styled.p `
    font-weight: 600;
`;

const PriceText = styled(SimpleText) `
    font-size: 48px;
    font-style: italic;
    font-weight: 700;
`;

const AddToBagButton = styled(Button) `
    background-color: black;
    color: white;
    font-size: 24px;
    font-weight: 600;
    padding-bottom: 24px;
    padding-top: 24px;
    width: 100%;
`;


type ProductDetailsProps = {
    productDetails: ICardDetails
}

function ProductDetails({ productDetails } : ProductDetailsProps) {
    const [addToBagButtonText, setAddToBagButtonText] = useState<string>('ADD TO BAG');
    const { cartItems, setCartItems } = useContext(CardContext);
    const { showCartOverlay, setShowCartOverlay } = useContext(CheckoutContext);
    const { user } = useContext(UserContext);

    const addToCart = (product?: ICardDetails) => {
        let productIDs = localStorage.getItem('card_ids');
        const product_id = product ? product._id : '';
    
        if (productIDs) {
            productIDs = productIDs + '|' + product_id;
            localStorage.setItem('card_ids', productIDs);
            setCartItems([...cartItems, product]);
        } else {
            localStorage.setItem('card_ids', product_id);
            if (product) {
                setCartItems([...cartItems, product]);
            }
        }

        setShowCartOverlay(true);
        setAddToBagButtonText(ALREADY_ADDED_TO_YOUR_BAG);
    }

    const updateAddToBagButtonText = () => {
        let productIDs = localStorage.getItem('card_ids')?.split('|');
        const isCardAlreadyAddedToBag = (productIDs && productIDs.length) ? productIDs.some(id => id === productDetails._id) : false;
        const isCardAlreadyAddedToYourDeck = user.deck.some(id => id && id === productDetails._id);
        
        if (isCardAlreadyAddedToBag) {
            setAddToBagButtonText(ALREADY_ADDED_TO_YOUR_BAG);
            return true;
        } else if (isCardAlreadyAddedToYourDeck){
            setAddToBagButtonText(ALREADY_ADDED_TO_YOUR_DECK);
            return true;
        } else {
            setAddToBagButtonText(ADD_TO_BAG);
            return false;
        }
    }

    useEffect(() => {
        updateAddToBagButtonText();
    }, [cartItems, productDetails, user]);

    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="/all-cards">
                        Cards
                    </Breadcrumb.Item>
                <Breadcrumb.Item active> {productDetails.name} </Breadcrumb.Item>
            </Breadcrumb>
            <CardName> {productDetails.name} </CardName>
            <Jumbotron fluid>
                <Container>
                    {productDetails.desc}
                </Container>
            </Jumbotron>
            <DetailsWrapper>
                <Row style={{borderTop: "1px solid #D3D3D3", paddingTop: "12px"}}>
                    <Col>
                        <SubTitle> Type of the Card </SubTitle>
                        <SimpleText> {productDetails.type} </SimpleText>
                    </Col>
                    <Col>
                        <SubTitle> Archetype </SubTitle>
                        <SimpleText> {productDetails.archetype ? productDetails.archetype : 'N/A'} </SimpleText>
                    </Col>
                    <Col>
                        <SubTitle> Race of the Card </SubTitle>
                        <SimpleText> {productDetails.race} </SimpleText>
                    </Col>
                </Row>
                <Row style={{marginBottom: "12px"}}>
                    <Col sm={4}>
                        <SubTitle> Attack(ATK) </SubTitle>
                        {productDetails.atk ? productDetails.atk : 'N/A'}
                    </Col>
                    <Col sm={4}>
                        <SubTitle> Deffence(DEF) </SubTitle>
                        {productDetails.def ? productDetails.def : 'N/A'}
                    </Col>
                </Row>
                <Row style={{borderTop: "1px solid #D3D3D3", paddingTop: "12px"}}>
                    <Col>
                        <SubTitle> Price </SubTitle>
                        <PriceText> US${productDetails.card_prices[0].amazon_price} </PriceText>
                    </Col>
                    <Col>
                        <Row>
                            <Col>
                                <SubTitle> Subscribe </SubTitle>
                            </Col>
                            <Col>
                                <Form style={{paddingTop: "8px"}}>
                                    <Form.Check 
                                        type="switch"
                                        id="custom-switch"
                                        label=""
                                    />
                                </Form>
                            </Col>
                        </Row>
                        <SimpleText> Subscription orders ship free. </SimpleText>
                        <div> 
                            <SimpleText> Select Frequency </SimpleText>
                            <Form style={{ display: "inline-block", paddingLeft: "8px", maxWidth: "90px", }}>
                                <Form.Group controlId="exampleForm.SelectCustomSizeSm">
                                    <Form.Control as="select" size="sm" custom>
                                        <option> Delivery in ONE day </option>
                                        <option> Delivery in 2 days </option>
                                        <option> Delivery in 7 days </option>
                                    </Form.Control>
                                </Form.Group>
                            </Form>
                        </div>
                    </Col>
                </Row>
                <Row style={{borderTop: "1px solid #D3D3D3", paddingTop: "24px"}}>
                    <Col>
                        <AddToBagButton
                            disabled={addToBagButtonText === ALREADY_ADDED_TO_YOUR_BAG || addToBagButtonText === ALREADY_ADDED_TO_YOUR_DECK} 
                            onClick={() => addToCart(productDetails)}
                        >
                            {addToBagButtonText}
                        </AddToBagButton>
                    </Col>
                </Row>
            </DetailsWrapper>
        </div>
    )
}

export default ProductDetails;