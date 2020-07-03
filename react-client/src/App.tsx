import React from 'react';
import loadableVisibility from "react-loadable-visibility/loadable-components";

import { CardProvider } from './contexts/CardContext';
import { CheckoutProvider } from './contexts/CheckoutContext';
import { SearchProvider } from './contexts/SearchContext';
import { SettingsProvider } from './contexts/SettingsContext';
import { UserProvider } from './contexts/UserContext';
import { ThemeProvider } from './contexts/ThemeContext';

const NavigationBar = loadableVisibility(() => import('./components/navigation/NavigationBar'), {
  fallback: undefined
});

const MyRouter = loadableVisibility(() => import('./MyRouter'), {
  fallback: undefined
});

const Footer = loadableVisibility(() => import('./components/navigation/Footer'), {
  fallback: undefined
});

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <CardProvider>
          <SearchProvider>
            <SettingsProvider>
              <CheckoutProvider>
                <NavigationBar />
                <MyRouter />
                <Footer />
              </CheckoutProvider>
            </SettingsProvider>
          </SearchProvider>
        </CardProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
