import React, { useState, useEffect } from 'react';
import { isDarkModeActive } from '../services/DarkModeService';

type CustomTheme = {
    backgroundColor: string,
    color: string,
    filter: string,
    itemBackgroundColor: string,
}

const lightTheme: CustomTheme = {
    backgroundColor: '#FFFFFF',
    filter: 'brightness(1.0) contrast(1.0)',
    color: '#000000',
    itemBackgroundColor: '#E9ECEF',
}

const darkTheme: CustomTheme = {
    backgroundColor: '#000000',
    color: '#FAEFEC',
    filter: 'brightness(.85) contrast(1.15)',
    itemBackgroundColor: '#272423',
}

const initialThemeContext = {
    activeTheme: lightTheme,
    setActiveTheme: (a: any) => {},
    setActiveThemeNow: (a: any) => {}
}

export const ThemeContext = React.createContext(initialThemeContext);

export const ThemeContextConsumer = ThemeContext.Consumer;

export const ThemeProvider = (props: any) => {
    const [activeTheme, setActiveTheme] = useState<CustomTheme>(lightTheme);

    const setActiveThemeNow = (isDarkTheme: boolean) => {
        if (isDarkTheme) {
            setActiveTheme(darkTheme);
        } else {
            setActiveTheme(lightTheme);
        }
    }

    useEffect(() => {
        if (isDarkModeActive()) {
            setActiveTheme(darkTheme);
        } else {
            setActiveTheme(lightTheme);
        }
    }, []);

    return (
        <ThemeContext.Provider value={{
            activeTheme: activeTheme,
            setActiveTheme: setActiveTheme,
            setActiveThemeNow: setActiveThemeNow
         }}>
            { props.children }
        </ThemeContext.Provider>
    );
}