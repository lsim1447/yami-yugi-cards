import React, { useState, useEffect } from 'react';

const initialState = {
    showSearchOverlay: false,
    setShowSearchOverlay: (a: any) => {},
}

export const SearchContext = React.createContext(initialState);

export const SearchContextConsumer = SearchContext.Consumer;

export const SearchProvider = (props: any) => {
    const [showSearchOverlay, setShowSearchOverlay] = useState(false);

    useEffect(() => {
        
    }, [showSearchOverlay]);
    
    return (
        <SearchContext.Provider value={{ 
            showSearchOverlay: showSearchOverlay,
            setShowSearchOverlay: setShowSearchOverlay
         }}>
            { props.children }
        </SearchContext.Provider>
    );
}