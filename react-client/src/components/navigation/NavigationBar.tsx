import React, { useContext, useState } from 'react';
import  { CardContext }  from "../../contexts/CardContext";
import  { CheckoutContext }  from "../../contexts/CheckoutContext";
import  { SettingsContext }  from "../../contexts/SettingsContext";
import { Navbar, Nav } from 'react-bootstrap';
import styled from 'styled-components';
import CartOverlay from '../external/overlay/CartOverlay';
import SearchOverlay from '../external/overlay/SearchOverlay';
import SettingsOverlay from '../external/overlay/SettingsOverlay';
import { SearchContext } from '../../contexts/SearchContext';

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

const NavbarIconWrapper = styled.div `
  font-size: 20px;
  padding-left: 12px;
`;


function NavigationBar(props: any) {
  const { cartItems } = useContext(CardContext);
  const { showCartOverlay, setShowCartOverlay } = useContext(CheckoutContext);
  const { showSearchOverlay, setShowSearchOverlay } = useContext(SearchContext);
  const { showSettingsOverlay, setShowSettingsOverlay } = useContext(SettingsContext);

  return (
    <div>
      <Navbar fixed="top" style={{backgroundColor: "black"}} collapseOnSelect expand="lg"  variant="dark">
        <Navbar.Brand href="/">
            <NavBarImage src="/milleniumIcon.png" alt="" />
            <BrandText>Yami Yugi Cards</BrandText> 
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto"></Nav>
          <Nav>
            <Nav.Link href="/all-cards"> Cards </Nav.Link>
            <Nav.Link eventKey={2} href="/categories"> Categories </Nav.Link>
            <Nav.Link eventKey={3} href="/my-deck"> My Deck </Nav.Link>
    
            <Nav.Link style={{position: "relative", top: "-5px", left: "-8px"}} eventKey={5} onClick={() => setShowSettingsOverlay(!showSettingsOverlay)}>
              <NavbarIconWrapper>
                <i className="fa fa-gear"></i>
              </NavbarIconWrapper>
            </Nav.Link>
            <Nav.Link style={{position: "relative", top: "-5px", left: "-8px"}} eventKey={6} onClick={() => setShowSearchOverlay(!showSearchOverlay)}>
              <NavbarIconWrapper>
                <i className="fa fa-search"></i>
              </NavbarIconWrapper>
            </Nav.Link>
            <Nav.Link style={{position: "relative", top: "-5px", left: "-8px"}} eventKey={7} onClick={() => setShowCartOverlay(!showCartOverlay)}>
              <NavbarIconWrapper>
                <i className="fa fa-shopping-cart"></i>
                <sup style={{fontSize: "14px"}}> {cartItems.length} </sup>
              </NavbarIconWrapper>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      
      { showSettingsOverlay ? <SettingsOverlay /> : null}
      { showCartOverlay ? <CartOverlay /> : null}
      { showSearchOverlay ? <SearchOverlay /> : null}

      { props.children }
    </div>
  );
}

export default NavigationBar;
