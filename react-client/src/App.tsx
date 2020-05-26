import React from 'react';
import Footer from './nav/Footer';
import NavigationBar from './nav/NavigationBar';
import MyRouter from './MyRouter';
import { CardProvider } from './contexts/CardContext';
import { UserProvider } from './contexts/UserContext';

function App() {
  return (
    <UserProvider>
      <CardProvider>
        <NavigationBar />
        <MyRouter />
        <Footer />
      </CardProvider>
    </UserProvider>
  );
}

export default App;
