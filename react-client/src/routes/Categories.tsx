import React, { useContext, useState, useEffect } from 'react';
import { CardContext } from "../contexts/CardContext";
import { CardDeck, Col, Row } from 'react-bootstrap';
import { SIDE_BAR_OPTIONS_API } from '../constants';
import { ICardDetails } from '../components/internal/Cards';
import FlipCard from '../components/external/FlipCard';
import { BackgroundContainer, CenterWrapper } from '../components/internal/CommonContainers';
import { SideBarListContainer, SideBarListItem, BoxedItem, LogoBold, LogoTitle } from '../components/internal/SideBarComponents';

function Categories() {
  const [nrOfCardsToShow, setNrOfCardsToShow] = useState(20);
  const [cards, setCards] = useState<ICardDetails[]>([]);
  const { allCards, setAllCards } = useContext(CardContext);

  const filterCardsByType = (type: string, deny?: boolean) => {
    setCards([]);
    if (type === "All") {
        setCards(allCards);
    } else {
        const filteredCards: ICardDetails[] = 
            deny ?
                allCards.filter(card => !card.type?.includes(type)) :
                allCards.filter(card => card.type?.includes(type));
        setCards(filteredCards); 
    }
  }

  useEffect(() => {
    setCards(allCards);
  }, [allCards]);

  return (
    <BackgroundContainer theme={
      {
        backgroundImage: "blue-ice-white-dragon.jpg"
      }
    }>
      <Row>
        <Col>
          <div>
            <i className="fa fa-bars toggle_menu"></i>
            <div className="sidebar_menu">
                <i className="fa fa-times"></i>
                <CenterWrapper>
                    <BoxedItem>
                        Filter cards by
                        <LogoBold>
                            Categories
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
                                key={item.eventKey}
                                onClick={() => filterCardsByType(item.type)}
                            >
                              {item.type}
                            </SideBarListItem>
                        )
                    })
                }
                </SideBarListContainer>
            </div>
          </div>
        </Col>
        <Col sm={9}>
          <CardDeck style={{backgroundColor: "transparent"}}>
            {
              cards.map(card => {
                    return (
                      <FlipCard 
                        isFullDescriptionVisible={false}
                        card={card}
                        key={card.id}
                      />
                    );
                })
            }
          </CardDeck>
        </Col>
      </Row>
    </BackgroundContainer>
  );
}

export default Categories;