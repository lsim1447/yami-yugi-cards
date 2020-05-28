import React, { useContext, useState, useEffect } from 'react';
import { CardContext } from "../../contexts/CardContext";
import { Button, Card, Carousel, Modal, Tabs, Tab } from 'react-bootstrap';
import styled from 'styled-components';
import { ICardDetails } from '../models/Cards';
import YuGiOhCard from '../external/YuGiOhCard';
import { MAX_NUMBER_OF_SIMILAR_CARDS } from '../../constants';
import { getInitialCardList } from '../models/Cards';
import { findAllCardsByTypeAndRace } from '../../repositories/CardRepository';

const PriceContainer = styled.p `
  padding-top: 12px;
  text-align: center;
  font-size: 14px;
  font-style: italic;
`;

type CartModalProps = {
  card?: ICardDetails,
  isAddToBagButtonDisabled?: boolean,
  onHide: any,
  show: boolean,
}

function CardModal(props: CartModalProps) {
  const {
    card,
    isAddToBagButtonDisabled,
    onHide,
    show
  } = props;
  
  const [isCardAlreadyAdded, setIsCardAlreadyAdded] = useState<boolean>(false);
  const { cartItems, setCartItems } = useContext(CardContext);
  const [similarCards, setSimilarCards] = useState<ICardDetails[]>(getInitialCardList(MAX_NUMBER_OF_SIMILAR_CARDS));

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

    onHide(false);
  }

  useEffect(() => {
    const cardIDs = localStorage.getItem('card_ids');
    
    if (cardIDs) {
      const tmpIsAlreadyAdded = cardIDs.split('|').some(id => id === card?._id);
      setIsCardAlreadyAdded(tmpIsAlreadyAdded);
    }
  }, []);

  useEffect(() => {
    if (show) {
      findAllCardsByTypeAndRace((card ? card.type : ''), (card ? card.race : ''), MAX_NUMBER_OF_SIMILAR_CARDS)
        .then(newSimilarCards => {
          setSimilarCards([]);
          setSimilarCards([...newSimilarCards]);
        }).catch(error => {
          setSimilarCards([]);
          console.log('Error(/api/cards/findByTypeAndRace): ', error);
        })
    }
  }, [show]);

  return (
    <Modal animation={true} show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title> {card ? card.name : ''} </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Tabs defaultActiveKey="card_details" transition={false} id="noanim-tab-example">
        <Tab eventKey="card_details" title="Card Details">
          <YuGiOhCard
            isFullDescriptionVisible={true}
            card={card}
          />
        </Tab>
        <Tab eventKey="similar_cards" title="Similar Cards">
          <Carousel interval={1000}>
            {
              similarCards.map(c => {
                return (
                  <Carousel.Item key={c.id}>
                    <img 
                      style={{maxHeight: "600px"}}
                      className="d-block w-100 lazyload"
                      data-src={(c && c.card_images) ? c.card_images[0].image_url : ''}
                      alt="First slide"
                    />
                    <Card.Footer>
                      <PriceContainer>
                        Price on Amazon: {(c && c.card_prices && c.card_prices[0]) ? c.card_prices[0].amazon_price : ''} $
                      </PriceContainer>
                    </Card.Footer>
                  </Carousel.Item>
                );
              })
            }
          </Carousel>
        </Tab>
      </Tabs>
      </Modal.Body>
      <Modal.Footer>
        <Button
          style={{width: "100%"}} 
          disabled={isCardAlreadyAdded && !isAddToBagButtonDisabled}
          onClick={() => addToCart(card)}
          variant="dark"
        >
          {(isCardAlreadyAdded && !isAddToBagButtonDisabled) ? 'ALREADY IN YOUR DECK / BAG' : 'ADD TO BAG'} 
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CardModal;