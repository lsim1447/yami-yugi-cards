import React, { useState, useEffect } from 'react';
import { 
    IProductDetails,
    getInitialProductList
} from '../models/Product';
import {
    getAllCards,
    getCardById
} from '../repositories/CardRepository';
import { getCartItemIDs } from '../services/CartService';

const initialState = {
    cards: getInitialProductList(20),
    setCards: (a: any) => {},
    allCards: getInitialProductList(20), 
    setAllCards: (a: any) => {},
    cartItems: getInitialProductList(0),
    setCartItems: (a: any) => {},
}

export const CardContext = React.createContext(initialState);

export const CardProvider = (props: any) => {
    const [ cards, setCards ] = useState<IProductDetails[]>([]);
    const [ cartItems, setCartItems ] = useState<IProductDetails[]>([]);
    const [ all_cards, setAllCards ] = useState<IProductDetails[]>([]);

    useEffect(() => {
        let id_string = getCartItemIDs();
    
        if (id_string) {
            let cardIDs =  id_string ? id_string.split('|') : [];

            cardIDs.forEach(id => {
                getCardById(id)
                    .then(desiredCard => {
                        const newCartItems = cartItems;
                        newCartItems.push(desiredCard);
                        setCartItems(newCartItems);
                    })
                    .catch(error => {
                        console.log('Error(/api/cards/id): ', error);
                    });
            });
        }

        getAllCards()
            .then(data => {
                setCards([...data]);
                setAllCards([...data]);
            })
    }, []);
    
    return (
        <CardContext.Provider value={{ 
            cards: cards,
            setCards: setCards,
            allCards: all_cards,
            setAllCards: setAllCards,
            cartItems: cartItems,
            setCartItems: setCartItems,
         }}>
            { props.children }
        </CardContext.Provider>
    );
}