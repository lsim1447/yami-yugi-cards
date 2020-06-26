import React, { useState, useEffect } from 'react';
import { Card, Carousel, Modal, Tabs, Tab } from 'react-bootstrap';
import styled from 'styled-components';
import { ICardDetails } from '../../models/Cards';
import YuGiOhCard from '../external/card/YuGiOhCard';
import { MAX_NUMBER_OF_SIMILAR_CARDS } from '../../constants';
import { getInitialCardList } from '../../models/Cards';
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

function CardModal({card, onHide, show}: CartModalProps) {
  const [isCardAlreadyAdded, setIsCardAlreadyAdded] = useState<boolean>(false);
  const [similarCards, setSimilarCards] = useState<ICardDetails[]>(getInitialCardList(MAX_NUMBER_OF_SIMILAR_CARDS));

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
                    <a href={`/card/${c._id}`}>
                      <img 
                        style={{maxHeight: "600px"}}
                        className="d-block w-100 lazyload"
                        data-src={(c && c.card_images) ? c.card_images[0].image_url : ''}
                        alt="First slide"
                      />
                    </a>
                    
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
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
}

export default CardModal;