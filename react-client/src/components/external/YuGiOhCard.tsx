import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import axios from 'axios';
import { CardProps, DEFAULT_CARD_VALUE, ICardDetails } from '../internal/Cards';
import styled from 'styled-components';

const PriceContainer = styled.p `
  padding-top: 12px;
  text-align: center;
  font-size: 14px;
  font-style: italic;
`;

const YuGiOhCard = ({ id, card } : CardProps) => {
  const initialValue: ICardDetails = DEFAULT_CARD_VALUE;
  const [cardDetails, setCardDetails] = useState(initialValue);

  useEffect(() => {
    if (id) {
        axios.get(`https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${id}`)
        .then(response => {
            setCardDetails(response.data.data[0]);
        })
    } else if (card) {
        setCardDetails(card);
    }
  }, []);

  return (
      <Card>
        <Card.Img className="lazyload" style={{maxHeight: "600px"}} variant="top" src={initialValue.card_images[0].image_url} data-src={(cardDetails.card_images && cardDetails.card_images.length) ? cardDetails.card_images[0].image_url : initialValue.card_images[0].image_url} />
        <Card.Footer>
          <PriceContainer>
            Price on Amazon: {(cardDetails.card_prices && cardDetails.card_prices.length) ? cardDetails.card_prices[0].amazon_price : initialValue.card_prices[0].amazon_price} $
          </PriceContainer>
        </Card.Footer>
      </Card>
  );
}

export default YuGiOhCard;