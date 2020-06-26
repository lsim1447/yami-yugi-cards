import React, { useContext, useState, useEffect } from 'react';
import { CardContext } from "../contexts/CardContext";
import { CardDeck } from 'react-bootstrap';
import { ICardDetails } from '../models/Cards';
import FlipCard from '../components/external/card/FlipCard';

function Test() {
    const { allCards, setAllCards } = useContext(CardContext);

    return (
        <CardDeck style={{minHeight: "100vh"}}>
        {
            allCards.map(
                (card: ICardDetails) => {
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
    );
}

export default Test;