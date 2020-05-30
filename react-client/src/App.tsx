import React from 'react';
import Footer from './nav/Footer';
import NavigationBar from './nav/NavigationBar';
import MyRouter from './MyRouter';
import { CardProvider } from './contexts/CardContext';
import { CheckoutProvider } from './contexts/CheckoutContext';
import { UserProvider } from './contexts/UserContext';

function App() {
  return (
    <UserProvider>
      <CardProvider>
        <CheckoutProvider>
          <NavigationBar />
          <MyRouter />
          <Footer />
        </CheckoutProvider>
      </CardProvider>
    </UserProvider>
  );
}

export default App;
