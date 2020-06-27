import React, { useContext, useState, useEffect } from 'react';
import { CardDeck } from 'react-bootstrap';
import { CardContext } from "../../contexts/CardContext";
import { ICardDetails } from '../../models/Cards';
import FlipCard from '../../components/external/card/FlipCard';

function Test() {
    const { allCards } = useContext(CardContext);

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