import React, { useContext, useState, useEffect } from 'react';
import  { CardContext }  from "./../contexts/CardContext";
import AutoComplete from './../components/internal/AutoComplete';
import { CardDeck } from 'react-bootstrap';
import { ICardDetails } from '../components/internal/Cards';
import FlipCard from '../components/external/FlipCard';

function Test() {
    const { allCards, setAllCards } = useContext(CardContext);
    return (
        <div>
            <CardDeck style={{backgroundColor: "black"}}>
            {
                allCards.map(
                    (card: ICardDetails) => {
                        return (
                            <FlipCard 
                                //id={card.id}
                                isFullDescriptionVisible={false}
                                card={card}
                                key={card.id}
                            />
                        );
                })
            }
            </CardDeck>
        </div>
    );
}

export default Test;