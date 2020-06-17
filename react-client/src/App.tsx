import React from 'react';
import Footer from './nav/Footer';
import NavigationBar from './nav/NavigationBar';
import MyRouter from './MyRouter';
import { CardProvider } from './contexts/CardContext';
import { CheckoutProvider } from './contexts/CheckoutContext';
import { SearchProvider } from './contexts/SearchContext';
import { UserProvider } from './contexts/UserContext';
import { ThemeProvider } from './contexts/ThemeContext';

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
