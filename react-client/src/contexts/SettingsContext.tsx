import React, { useState, useEffect } from 'react';

const initialState = {
    showSettingsOverlay: false,
    setShowSettingsOverlay: (a: any) => {},
}

export const SettingsContext = React.createContext(initialState);

export const SettingsContextConsumer = SettingsContext.Consumer;

export const SettingsProvider = (props: any) => {
    const [showSettingsOverlay, setShowSettingsOverlay] = useState(false);

    useEffect(() => {
        
    }, [showSettingsOverlay]);
    
    return (
        <SettingsContext.Provider value={{ 
            showSettingsOverlay: showSettingsOverlay,
            setShowSettingsOverlay: setShowSettingsOverlay
         }}>
            { props.children }
        </SettingsContext.Provider>
    );
}