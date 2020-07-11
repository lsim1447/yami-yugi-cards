import React, { useState } from 'react';

const initialState = {
    showSearchOverlay: false,
    setShowSearchOverlay: (a: any) => {},
}

export const SearchContext = React.createContext(initialState);

export const SearchProvider = (props: any) => {
    const [ showSearchOverlay, setShowSearchOverlay ] = useState(false);
    
    return (
        <SearchContext.Provider value={{ 
            showSearchOverlay: showSearchOverlay,
            setShowSearchOverlay: setShowSearchOverlay
         }}>
            { props.children }
        </SearchContext.Provider>
    );
}