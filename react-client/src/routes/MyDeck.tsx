import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from "../contexts/UserContext";
import {  CardDeck, Col, Row } from 'react-bootstrap';
import '../special-styles/sidebar-left.css'
import { ICardDetails } from '../models/Cards';
import SimpleFlipCard from '../components/external/SimpleFlipCard';
import { getInitialCardList } from '../models/Cards';
import { BackgroundContainer, CenterWrapper } from '../components/internal/CommonContainers';
import { SideBarMenuContainer, SideBarListContainer, SideBarListItem, BoxedItem, LogoBold, LogoTitle } from '../components/internal/SideBarComponents';
import { SIDE_BAR_OPTIONS_API } from '../constants';
import {
    getUserById,
} from '../repositories/UserRepository';
import {
    findAllCardsByIds,
} from '../repositories/CardRepository';
import {
    getSignedUserId,
    isUserSignedIn
} from '../services/UserService';

function MyDeck() {
    const [nrOfCardsToShow] = useState(20);
    const [allCardsInYourDeck, setAllCards] = useState<ICardDetails[]>(getInitialCardList(nrOfCardsToShow));
    const [cards, setCards] = useState<ICardDetails[]>(getInitialCardList(nrOfCardsToShow));
    const { user } = useContext(UserContext);

    const getDeckValue = () => {
        if (allCardsInYourDeck && allCardsInYourDeck.length) {
            return allCardsInYourDeck.reduce((accumulator: number, currentCard: ICardDetails) => {
                const price: number = Number((currentCard && currentCard.card_prices && currentCard.card_prices[0]) ? currentCard.card_prices[0].amazon_price : 0);
                const newAccumulator: number = Number((accumulator + price).toFixed(2));

                return newAccumulator ? newAccumulator : accumulator;
            }, 0);
        } else {
            return 0;
        }
    }

    const getNrOfCardsByType = (type: string) => {
        if (!cards) return 0;
        if (type === "All") return allCardsInYourDeck.length;
        
        return allCardsInYourDeck.filter((card: ICardDetails) => card.type?.includes(type)).length;
    }

    const filterCardsByType = (type: string, deny?: boolean) => {
        if (type === "All") {
            setCards(allCardsInYourDeck);
        } else {
            const filteredCards: ICardDetails[] = 
                deny ?
                    allCardsInYourDeck.filter(card => !card.type?.includes(type)) :
                    allCardsInYourDeck.filter(card => card.type?.includes(type));
            setCards(filteredCards); 
        }
    }

    useEffect(() => {
        const USER_ID = getSignedUserId();

        if (USER_ID) {
            getUserById(USER_ID)
                .then(currentUser => {
                    const IDS = (currentUser && currentUser.deck) ? currentUser.deck : [];

                    if (IDS) {
                        findAllCardsByIds(IDS).then(currentUserCards => {
                            setCards([]);
                            setCards(currentUserCards);
                            setAllCards([]);
                            setAllCards(currentUserCards);
                        }).catch(error => {
                            console.log('Error(/api/cards/findAllByIds): ', error);
                        })
                    } else {
                        setCards([]);
                    }
                })
        }
    }, []);

    if (!isUserSignedIn()) {
        window.location.href='/signin';

        return null;
    } else {
        return (
            <BackgroundContainer theme={
                {
                    backgroundImage: "/images/my-deck-background.jpg"
                }
            }>
                <Row>
                    <Col sm={3}>
                        <div>
                            <i className="fa fa-bars toggle_menu"></i>
                            <div className="sidebar_menu">
                                <i className="fa fa-times"></i>
                                <CenterWrapper>
                                    <BoxedItem>
                                        Check your 
                                        <LogoBold>
                                            Deck
                                        </LogoBold>
                                    </BoxedItem>
                                    <LogoTitle>
                                        Be a Professional Duel Master
                                    </LogoTitle>
                                </CenterWrapper>
    
                                <SideBarListContainer>
                                {
                                    SIDE_BAR_OPTIONS_API.map(item => {
                                        return (
                                            <SideBarListItem
                                                key={item.eventKey + Math.random()}
                                                onClick={() => filterCardsByType(item.type)}
                                            >
                                                {item.type} ({getNrOfCardsByType(item.type)})
                                            </SideBarListItem>
                                        )
                                    })
                                }
                                </SideBarListContainer>
                            </div>
                        </div>
                    </Col>
                    <Col sm={7}>
                        <CardDeck>
                        {
                            cards.map((card: ICardDetails) => {
                                return (
                                    <SimpleFlipCard 
                                        isAddToBagButtonDisabled={true}
                                        isFullDescriptionVisible={false}
                                        card={card}
                                        key={card.id + Math.random()}
                                    />
                                );
                            })
                        }
                        </CardDeck>
                    </Col>
                    <Col sm={2}>
                        <SideBarMenuContainer>
                            <div className="sidebar_menu_right">
                                <SideBarListContainer>
                                    <SideBarListItem style={{fontSize: "22px"}}>
                                        Name:  <a href={"/profile"}> {user.username} </a>
                                    </SideBarListItem>
                                </SideBarListContainer>
                                <SideBarListContainer>
                                    <SideBarListItem>
                                        Your deck's value: {getDeckValue()} $
                                    </SideBarListItem>
                                </SideBarListContainer>
                                <SideBarListContainer>
                                    <SideBarListItem onClick={() => setCards(allCardsInYourDeck)}>
                                        Cards: { allCardsInYourDeck.length }
                                    </SideBarListItem>
                                </SideBarListContainer>
                                <SideBarListContainer>
                                    <SideBarListItem onClick={() => filterCardsByType('Monster')}>
                                        Monster cards: { getNrOfCardsByType('Monster') }
                                    </SideBarListItem>
                                </SideBarListContainer>
                                <SideBarListContainer>
                                    <SideBarListItem onClick={() => filterCardsByType('Monster', true)}>
                                        Special cards: { allCardsInYourDeck.length - getNrOfCardsByType('Monster') }
                                    </SideBarListItem>
                                </SideBarListContainer>
                                <CenterWrapper>
                                    <BoxedItem>
                                        Name your 
                                        <LogoBold>
                                            Beast
                                        </LogoBold>
                                    </BoxedItem>
                                    <LogoTitle>
                                        Let's Be Professional. Never Give Up!
                                    </LogoTitle>
                                </CenterWrapper>
                            </div>
                        </SideBarMenuContainer>
                    </Col>
                </Row>
            </BackgroundContainer>
        );
    }
    
}

export default MyDeck;