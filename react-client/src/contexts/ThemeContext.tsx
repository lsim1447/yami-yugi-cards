import React, { useState, useEffect } from 'react';

const initialTheme = {
    backgroundColor: 'white',
    setBackgroundColor: (color: any) => {},
    color: 'white',
    setColor: (color: any) => {},
}

export const ThemeContext = React.createContext(initialTheme);

export const ThemeContextConsumer = ThemeContext.Consumer;

export const ThemeProvider = (props: any) => {
    const [backgroundColor, setBackgroundColor] = useState('white');
    const [color, setColor] = useState('black');

    useEffect(() => {
        
    }, []);

    return (
        <ThemeContext.Provider value={{
            backgroundColor: backgroundColor,
            setBackgroundColor: setBackgroundColor,
            color: color,
            setColor: setColor,
         }}>
            { props.children }
        </ThemeContext.Provider>
    );
}