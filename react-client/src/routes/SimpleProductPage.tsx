import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
import  { CardContext }  from "../contexts/CardContext";
import  { UserContext }  from "../contexts/UserContext";
import { Breadcrumb, Button, Card, Carousel, Col, Container, Form, Jumbotron, ProgressBar, Row } from 'react-bootstrap';
import { ICardDetails } from '../components/models/Cards';
import { getCardById } from '../repositories/CardRepository';
import { DEFAULT_CARD_VALUE} from '../components/models/Cards';
import { getInitialCardList } from '../components/models/Cards';
import { MAX_NUMBER_OF_SIMILAR_CARDS } from '../constants';
import { findAllCardsByTypeAndRace } from '../repositories/CardRepository';

const SPPWrapper = styled.div `
    min-height: 500px;
`;

const CustomRow = styled(Row) `
    padding: 36px;
`;

const CustomLeftCol = styled(Col) `
    padding-left: 24px;
    padding-top: 24px;
`;

const SPPImageWrapper = styled.div `
    background: url(https://yugioh-cards.net/wp-content/uploads/2020/02/yugioh_duel_youtube-1024x539.png) top center;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    margin-bottom: 24px;
    min-height: 600px;
`;

const SPPImage = styled(Card.Img) `
    display: block;
    height: 100%;
    margin-left: auto;
    margin-right: auto;
    max-height: 614px;
    max-width: 450px;
`;

const CardName = styled.p `
    font-size: 48px;
    font-weight: 800;
`;

const DetailsWrapper = styled.div `

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

const RatingWrapper = styled(Row) `
    border-top: 1px solid #D3D3D3;
    border-bottom: 1px solid #D3D3D3;
    margin-top: 36px;
    margin-bottom: 36px;
    padding: 36px;
`;

const RatingParagraph = styled.p `
    font-size: 48px;
    font-weight: 800;
    padding-bottom: 36px;
    text-align: center;
    width: 100%;
`;

const BigFontWrapper = styled.p `
    font-size: 52px;
    font-weight: 700;
`;

function SimpleProductPage(props: any) {
    const [addToBagButtonText, setAddToBagButtonText] = useState('ADD TO BAG');
    const { allCards, setAllCards } = useContext(CardContext);
    const { cartItems, setCartItems } = useContext(CardContext);
    const { user, setUser } = useContext(UserContext);
    const [cardDetails, setCardDetails] = useState(DEFAULT_CARD_VALUE);
    const [similarCards, setSimilarCards] = useState<ICardDetails[]>(getInitialCardList(MAX_NUMBER_OF_SIMILAR_CARDS));
    const cardId = (props.match.params && props.match.params.id) ? props.match.params.id : '5ebc4aad221c162fa4dcae6d';


    const handleOnDragStart = (e: any) => e.preventDefault()
    const responsive = {
        0: { items: 1 },
        855: { items: 2 },
        1280: { items: 3 },
        1705: { items: 4 }
    };

    const addToCart = (card?: ICardDetails) => {
        let cardIDs = localStorage.getItem('card_ids');
        const card_id = card ? card._id : '';
    
        if (cardIDs) {
          cardIDs = cardIDs + '|' + card_id;
          localStorage.setItem('card_ids', cardIDs);
          setCartItems([...cartItems, card]);
        } else {
          localStorage.setItem('card_ids', card_id);
          if (card) {
            setCartItems([...cartItems, card]);
          }
        }

        setAddToBagButtonText('ADDED TO YOUR BAG');
    }

    const updateAddToBagButtonText = () => {
        let cardIDs = localStorage.getItem('card_ids')?.split('|');
        const isCardAlreadyAddedToBag = (cardIDs && cardIDs.length) ? cardIDs.some(id => id === cardDetails._id) : false;
        const isCardAlreadyAddedToYourDeck = user.deck.some(id => id && id === cardDetails._id);
        
        if (isCardAlreadyAddedToBag) {
            setAddToBagButtonText('ALREADY ADDED TO YOUR BAG');
            return true;
        } else if (isCardAlreadyAddedToYourDeck){
            setAddToBagButtonText('ALREADY ADDED TO YOUR DECK');
            return true;
        } else {
            setAddToBagButtonText('ADD TO BAG');
            return false;
        }
    }


    useEffect(() => {
        updateAddToBagButtonText();
    }, [user]);

    useEffect(() => {
        getCardById(cardId)
            .then(desiredCard => {
                setCardDetails(desiredCard);
            });

        updateAddToBagButtonText();
    }, []);

    useEffect(() => {
        findAllCardsByTypeAndRace((cardDetails ? cardDetails.type : ''), (cardDetails ? cardDetails.race : ''), MAX_NUMBER_OF_SIMILAR_CARDS)
            .then(newSimilarCards => {
                setSimilarCards([]);
                setSimilarCards([...newSimilarCards]);
            }).catch(error => {
                setSimilarCards([]);
                console.log('Error(/api/cards/findByTypeAndRace): ', error);
            })
    }, [cardDetails]);

    useEffect(() => {
        updateAddToBagButtonText();
    }, [cartItems]);

    return (
        <SPPWrapper>
            <CustomRow>
                <CustomLeftCol sm={5}>
                    <SPPImage
                        variant="top"
                        src={cardDetails.card_images[0].image_url}
                    />
                </CustomLeftCol>
                <Col sm={7}>
                    <Breadcrumb>
                        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                        <Breadcrumb.Item href="/all-cards">
                            All Cards
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active> {cardDetails.name} </Breadcrumb.Item>
                    </Breadcrumb>
                    <CardName> {cardDetails.name} </CardName>
                    <Jumbotron fluid>
                        <Container>
                           {cardDetails.desc}
                        </Container>
                    </Jumbotron>
                    <DetailsWrapper>
                        <Row style={{borderTop: "1px solid #D3D3D3", paddingTop: "12px"}}>
                            <Col>
                                <SubTitle> Type of the Card </SubTitle>
                                <SimpleText> {cardDetails.type} </SimpleText>
                            </Col>
                            <Col>
                                <SubTitle> Archetype </SubTitle>
                                <SimpleText> {cardDetails.archetype ? cardDetails.archetype : 'N/A'} </SimpleText>
                            </Col>
                            <Col>
                                <SubTitle> Race of the Card </SubTitle>
                                <SimpleText> {cardDetails.race} </SimpleText>
                            </Col>
                        </Row>
                        <Row style={{marginBottom: "12px"}}>
                            <Col sm={4}>
                                <SubTitle> Attack(ATK) </SubTitle>
                                {cardDetails.atk ? cardDetails.atk : 'N/A'}
                            </Col>
                            <Col sm={4}>
                                <SubTitle> Deffence(DEF) </SubTitle>
                                {cardDetails.def ? cardDetails.def : 'N/A'}
                            </Col>
                        </Row>
                        <Row style={{borderTop: "1px solid #D3D3D3", paddingTop: "12px"}}>
                            <Col>
                                <SubTitle> Price </SubTitle>
                                <PriceText> US${cardDetails.card_prices[0].amazon_price} </PriceText>
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
                                    disabled={addToBagButtonText === 'ALREADY ADDED TO YOUR BAG' || addToBagButtonText === 'ALREADY ADDED TO YOUR DECK'} 
                                    onClick={() => addToCart(cardDetails)}
                                >
                                    {addToBagButtonText}
                                </AddToBagButton>
                            </Col>
                        </Row>
                    </DetailsWrapper>
                </Col>
            </CustomRow>

            <Jumbotron fluid>
                <Container>
                    We're open and accepting orders! The health and well-being of our customers, employees and community is of the utmost importance to us. Due to modified operations put in place to help protect those working at the distribution centers, some orders may experience a processing delay up to 6 business days. We apologize for any inconvenience and appreciate your understanding. We are committed to delivering your orders as soon as possible!
                </Container>
            </Jumbotron>

            <SPPImageWrapper />

            <Jumbotron fluid>
                <Container>
                    <SubTitle>These cards are recommended for you. Feel free to check them. You won't regret it! </SubTitle>
                </Container>
            </Jumbotron>

            <AliceCarousel 
                autoPlay={true}
                autoPlayInterval={1500}
                fadeOutAnimation={true}
                mouseTrackingEnabled={true}
                playButtonEnabled={true}
                responsive={responsive}
            >
                {
                    similarCards.map(similarCard => {
                        return (
                            <a href={`/card/${similarCard._id}`}>
                                <img
                                    src={similarCard.card_images[0].image_url}
                                    onDragStart={handleOnDragStart} 
                                />      
                            </a>
                            
                        )
                    })
                }
            </AliceCarousel>

            <RatingWrapper>
                <RatingParagraph>
                    Ratings & Reviews
                </RatingParagraph>
                <Col>
                    <Row>
                        <Col>
                            <BigFontWrapper> 89% </BigFontWrapper>
                            would recommend this product.
                        </Col>
                        <Col>
                            <BigFontWrapper> 4.4 </BigFontWrapper>
                            out of <strong style={{fontSize: "24px"}}>5</strong>
                            <p>198 Reviews</p>
                        </Col>
                    </Row>
                </Col>
                <Col style={{borderLeft: "1px solid #D3D3D3"}}>
                    <Row>
                        <Col sm={2}>
                            <p>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                            </p>
                            <p>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                            </p>
                            <p>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                            </p>
                            <p>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                            </p>
                            <p>
                                <i className="fa fa-star"></i>
                            </p>
                            
                        </Col>
                        <Col sm={10}>
                            <p><ProgressBar style={{marginTop: "8px", marginBottom: "22px"}} now={18} label={`${18}%`} /></p>
                            <p><ProgressBar style={{marginBottom: "20px"}} now={42} label={`${42}%`} /></p>
                            <p><ProgressBar style={{marginBottom: "20px"}} now={25} label={`${25}%`} /></p>
                            <p><ProgressBar style={{marginBottom: "20px"}} now={10} label={`${10}%`} /></p>
                            <p><ProgressBar style={{marginBottom: "20px"}} now={5} label={`${5}%`} /></p>
                        </Col>
                    </Row>
                </Col>
            </RatingWrapper>
        </SPPWrapper>
    );
}

export default SimpleProductPage;