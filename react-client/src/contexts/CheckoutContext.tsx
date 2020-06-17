import React, { useState, useEffect } from 'react';

const initialState = {
    showCartOverlay: false,
    setShowCartOverlay: (a: any) => {},
}

export const CheckoutContext = React.createContext(initialState);

export const CheckoutContextConsumer = CheckoutContext.Consumer;

export const CheckoutProvider = (props: any) => {
    const [showCartOverlay, setShowCartOverlay] = useState(false);

    useEffect(() => {
        
    }, []);
    
    return (
        <CheckoutContext.Provider value={{ 
            showCartOverlay: showCartOverlay,
            setShowCartOverlay: setShowCartOverlay
         }}>
            { props.children }
        </CheckoutContext.Provider>
    );
}