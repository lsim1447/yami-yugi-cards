import React from 'react';
import loadableVisibility from "react-loadable-visibility/loadable-components";

import { CardProvider } from './contexts/CardContext';
import { CheckoutProvider } from './contexts/CheckoutContext';
import { SearchProvider } from './contexts/SearchContext';
import { UserProvider } from './contexts/UserContext';
import { ThemeProvider } from './contexts/ThemeContext';

import NavigationBarLoadingComponent from './components/external/loading/NavigationBarLoadingComponent';
import RouterLoadingComponent from './components/external/loading/RouterLoadingComponent';
import FooterLoadingComponent from './components/external/loading/FooterLoadingComponent';

const NavigationBar = loadableVisibility(() => import('./nav/NavigationBar'), {
  fallback: <NavigationBarLoadingComponent />
});

const MyRouter = loadableVisibility(() => import('./MyRouter'), {
  fallback: <RouterLoadingComponent />
});

const Footer = loadableVisibility(() => import('./nav/Footer'), {
  fallback: <FooterLoadingComponent />
});

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <CardProvider>
          <SearchProvider>
            <CheckoutProvider>
              <NavigationBar />
              <MyRouter />
              <Footer />
            </CheckoutProvider>
          </SearchProvider>
        </CardProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
