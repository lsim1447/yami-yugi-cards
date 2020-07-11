import React, { useContext } from 'react';
import { CardDeck } from 'react-bootstrap';
import { CardContext } from "../../contexts/CardContext";
import { IProductDetails } from '../../models/Product';
import FlipCard from '../../components/external/card/FlipCard';

function Test() {
    const { allCards } = useContext(CardContext);

    return (
        <CardDeck style={{minHeight: "100vh"}}>
        {
            allCards.map(
                (product: IProductDetails) => {
                    return (
                        <FlipCard 
                            isFullDescriptionVisible={false}
                            product={product}
                            key={product.id}
                        />
                    );
            })
        }
        </CardDeck>
    );
}

export default Test;