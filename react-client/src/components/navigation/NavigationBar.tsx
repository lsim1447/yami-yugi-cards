import React, { useContext } from 'react';
import { CardContext }  from "../../contexts/CardContext";
import { CheckoutContext }  from "../../contexts/CheckoutContext";
import { SearchContext } from '../../contexts/SearchContext';
import { SettingsContext }  from "../../contexts/SettingsContext";
import { Navbar, Nav } from 'react-bootstrap';
import styled from 'styled-components';
import CartOverlay from '../external/overlay/CartOverlay';
import SearchOverlay from '../external/overlay/SearchOverlay';
import SettingsOverlay from '../external/overlay/SettingsOverlay';

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

  const toggleCartOverlay = () => {
    setShowSettingsOverlay(false);
    setShowCartOverlay(!showCartOverlay);
    setShowSearchOverlay(false);
  }

  const toggleSettingsOverlay = () => {
    setShowSettingsOverlay(!showSettingsOverlay);
    setShowCartOverlay(false);
    setShowSearchOverlay(false);
  }

  const toggleSearchOverlay = () => {
    setShowSettingsOverlay(false);
    setShowCartOverlay(false);
    setShowSearchOverlay(!showSearchOverlay);
  }

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
            <Nav.Link eventKey={1} href="/all-cards"> Cards </Nav.Link>
            <Nav.Link eventKey={2} href="/categories"> Categories </Nav.Link>
            <Nav.Link eventKey={3} href="/my-deck"> My Deck </Nav.Link>
            <Nav.Link style={{position: "relative", top: "-5px", left: "-8px"}} eventKey={4} onClick={() => toggleSettingsOverlay()}>
              <NavbarIconWrapper>
                <i className="fa fa-gear"></i>
              </NavbarIconWrapper>
            </Nav.Link>
            <Nav.Link style={{position: "relative", top: "-5px", left: "-8px"}} eventKey={5} onClick={() => toggleSearchOverlay()}>
              <NavbarIconWrapper>
                <i className="fa fa-search"></i>
              </NavbarIconWrapper>
            </Nav.Link>
            <Nav.Link style={{position: "relative", top: "-5px", left: "-8px"}} eventKey={6} onClick={() => toggleCartOverlay()}>
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
