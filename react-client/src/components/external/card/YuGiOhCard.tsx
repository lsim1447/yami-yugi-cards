import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { ProductProps, DEFAULT_PRODUCT_VALUE, IProductDetails } from '../../../models/Product';
import styled from 'styled-components';
import { getCardById } from '../../../repositories/CardRepository';

const PriceContainer = styled.p `
  padding-top: 12px;
  text-align: center;
  font-size: 14px;
  font-style: italic;
`;

const ClickOntheSpp = styled.div `
  padding-bottom: 18px;
  padding-top: 18px;
  text-align: center;
  width: 100%;
`;

const YuGiOhCard = ({ id, product } : ProductProps) => {
  const initialValue: IProductDetails = DEFAULT_PRODUCT_VALUE;
  const [ productDetails, setProductDetails ] = useState(initialValue);

  const navigateToSPP = () => {
    console.log('you clicked me', product);
  }

  useEffect(() => {
    if (id) {
      getCardById(id)
        .then(desiredProduct => {
          setProductDetails(desiredProduct);
        })
    } else if (product) {
      setProductDetails(product);
    }
  }, []);

  return (
      <Card>
        <a href={`/card/${product?._id}`}>
          <Card.Img 
            className="lazyload"
            style={{maxHeight: "600px"}}
            variant="top"
            src={initialValue.card_images[0].image_url}
            data-src={(productDetails.card_images && productDetails.card_images.length) ? productDetails.card_images[0].image_url : initialValue.card_images[0].image_url}
            onClick={() => navigateToSPP()}
          />
        </a>
        <ClickOntheSpp>
          <i style={{fontSize: "18px"}} className="fa fa-arrow-up" aria-hidden="true"></i>
          <span style={{paddingLeft: "8px", paddingRight: "8px"}}> Click on the image for navigating to the SPP </span>
          <i style={{fontSize: "18px"}} className="fa fa-arrow-up" aria-hidden="true"></i>
        </ClickOntheSpp>
        <Card.Footer>
          <PriceContainer>
            Price: {(productDetails.card_prices && productDetails.card_prices.length) ? productDetails.card_prices[0].amazon_price : initialValue.card_prices[0].amazon_price} $
          </PriceContainer>
        </Card.Footer>
      </Card>
  );
}

export default YuGiOhCard;