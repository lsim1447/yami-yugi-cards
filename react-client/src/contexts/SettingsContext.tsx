import React, { useState } from 'react';

const initialState = {
    showSettingsOverlay: false,
    setShowSettingsOverlay: (a: any) => {},
}

export const SettingsContext = React.createContext(initialState);

export const SettingsProvider = (props: any) => {
    const [ showSettingsOverlay, setShowSettingsOverlay ] = useState(false);
    
    return (
        <SettingsContext.Provider value={{ 
            showSettingsOverlay: showSettingsOverlay,
            setShowSettingsOverlay: setShowSettingsOverlay
         }}>
            { props.children }
        </SettingsContext.Provider>
    );
}