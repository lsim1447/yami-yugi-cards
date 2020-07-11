import React, { useState, useEffect } from 'react';
import { Card, Carousel, Modal, Tabs, Tab } from 'react-bootstrap';
import YuGiOhCard from '../external/card/YuGiOhCard';
import { getInitialProductList, IProductDetails } from '../../models/Product';
import { MAX_NUMBER_OF_SIMILAR_PRODUCTS } from '../../constants';
import { findAllCardsByTypeAndRace } from '../../repositories/CardRepository';
import styled from 'styled-components';

const PriceContainer = styled.p `
  padding-top: 12px;
  text-align: center;
  font-size: 14px;
  font-style: italic;
`;

type CartModalProps = {
  product?: IProductDetails,
  onHide: any,
  show: boolean,
}

function CardModal({product, onHide, show}: CartModalProps) {
  const [ similarProducts, setSimilarProducts ] = useState<IProductDetails[]>(getInitialProductList(MAX_NUMBER_OF_SIMILAR_PRODUCTS));

  useEffect(() => {
    if (show) {
      findAllCardsByTypeAndRace((product ? product.type : ''), (product ? product.race : ''), MAX_NUMBER_OF_SIMILAR_PRODUCTS)
        .then(newSimilarProducts => {
          setSimilarProducts([]);
          setSimilarProducts([...newSimilarProducts]);
        }).catch(error => {
          setSimilarProducts([]);
          console.log('Error(/api/cards/findByTypeAndRace): ', error);
        })
    }
  }, [show]);

  return (
    <Modal animation={true} show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title> {product ? product.name : ''} </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Tabs defaultActiveKey="product_details" transition={false} id="noanim-tab-example">
        <Tab eventKey="product_details" title="Product Details">
          <YuGiOhCard
            isFullDescriptionVisible={true}
            product={product}
          />
        </Tab>
        <Tab eventKey="similar_products" title="Similar Products">
          <Carousel interval={1000}>
            {
              similarProducts.map((similarProduct: IProductDetails) => {
                return (
                  <Carousel.Item key={similarProduct.id}>
                    <a href={`/card/${similarProduct._id}`}>
                      <img 
                        style={{maxHeight: "600px"}}
                        className="d-block w-100 lazyload"
                        data-src={(similarProduct && similarProduct.card_images) ? similarProduct.card_images[0].image_url : ''}
                        alt="First slide"
                      />
                    </a>
                    
                    <Card.Footer>
                      <PriceContainer>
                        Price: {(similarProduct && similarProduct.card_prices && similarProduct.card_prices[0]) ? similarProduct.card_prices[0].amazon_price : ''} $
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