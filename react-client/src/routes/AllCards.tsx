import React, { useContext, useState, useEffect } from 'react';
import { CardContext } from "../contexts/CardContext";
import { CardDeck } from 'react-bootstrap';
import axios from 'axios';
import { ICardDetails } from '../components/internal/Cards';
import FlipCard from '../components/external/FlipCard';

function AllCards() {
    const { allCards, setAllCards } = useContext(CardContext);

    return (
        <CardDeck style={{backgroundColor: "black", minHeight: "100vh"}}>
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

export default AllCards;