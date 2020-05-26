import React, { useContext, useState, useEffect } from 'react';
import  { CardContext }  from "./../contexts/CardContext";
import AutoComplete from './../components/internal/AutoComplete';
import { Button, Form, FormControl, Navbar, Nav } from 'react-bootstrap';
import styled from 'styled-components';

const NavBarImage = styled.img `
    max-width: 55px;
    max-height: 55px;
    margin-right: 20px;
    position: relative;
    top: -4px;
`;

const BrandText = styled.strong `
    font-size: 34px;
    position: relative;
    top: 4px;
`;

const ShoppingCartWrapper = styled.div `
  font-size: 20px;
  padding-left: 12px;
`;

function NavigationBar(props: any) {
  const { cards, setCards } = useContext(CardContext);
  const { cartItems, setCartItems } = useContext(CardContext);

  return (
    <div>
      <Navbar fixed="top" style={{backgroundColor: "black"}} collapseOnSelect expand="lg"  variant="dark">
        <Navbar.Brand href="/">
            <NavBarImage src="milleniumIcon.png" alt="" />
            <BrandText>Yu-gi-oh Cards</BrandText> 
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            
          </Nav>
          <Nav>
            <Nav.Link href="/all-cards"> ALL Cards </Nav.Link>
            <Nav.Link eventKey={2} href="/categories"> Categories </Nav.Link>
            <Nav.Link eventKey={3} href="/my-deck"> My Deck </Nav.Link>
            <Nav>
              <AutoComplete 
                  items={cards} 
                  placeholder={"Search"}
              />
            </Nav>
            <Nav.Link eventKey={5} href="/checkout">
              <ShoppingCartWrapper>
                <i className="fa fa-shopping-cart"></i>
                <sup style={{fontSize: "16px"}}> {cartItems.length} </sup>
              </ShoppingCartWrapper>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      { props.children }
    </div>
  );
}

export default NavigationBar;
