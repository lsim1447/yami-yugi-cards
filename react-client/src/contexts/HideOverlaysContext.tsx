import React, { useContext } from 'react';
import { CheckoutContext } from './CheckoutContext';
import { SearchContext } from './SearchContext';
import { SettingsContext } from './SettingsContext';

const initialState = {
    hideAllOverlays: () => {},
}

export const HideOverlaysContext = React.createContext(initialState);

export const HideOverlaysProvider = (props: any) => {
    const { setShowCartOverlay } = useContext(CheckoutContext);
    const { setShowSearchOverlay } = useContext(SearchContext);
    const { setShowSettingsOverlay } = useContext(SettingsContext);

    const hideAllOverlays = () => {
        setShowCartOverlay(false);
        setShowSearchOverlay(false);
        setShowSettingsOverlay(false);
    }
    
    return (
        <HideOverlaysContext.Provider value={{ 
            hideAllOverlays: hideAllOverlays
         }}>
            { props.children }
        </HideOverlaysContext.Provider>
    );
}