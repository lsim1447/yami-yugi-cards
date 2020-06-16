import React, { useContext, useState } from 'react';
import  { CardContext }  from "./../contexts/CardContext";
import  { CheckoutContext }  from "./../contexts/CheckoutContext";
import AutoComplete from './../components/internal/AutoComplete';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import styled from 'styled-components';
import CartOverlay from '../components/external/CartOverlay';
import {
  isUserSignedIn,
  userSignOut
} from '../services/UserService';
import { UserContext } from '../contexts/UserContext';

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

const CustomNavigationDropDownItem = styled(NavDropdown.Item) `
  text-align: center;

  &:hover {
    background-color: #E0E0E0;
    text-decoration: underline;
  }
`;

const UserName = styled.span `
  padding-left: 8px;
  font-weight: 700;
`;

function NavigationBar(props: any) {
  const { cards } = useContext(CardContext);
  const { cartItems } = useContext(CardContext);
  const { user } = useContext(UserContext);
  const { showCartOverlay, setShowCartOverlay } = useContext(CheckoutContext);
  const [ isUserLoggedIn ] = useState(isUserSignedIn);

  const signOut = () => {
    userSignOut();
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
            <Nav.Link href="/all-cards"> Cards </Nav.Link>
            <Nav.Link eventKey={2} href="/categories"> Categories </Nav.Link>
            <Nav.Link eventKey={3} href="/my-deck"> My Deck </Nav.Link>
            <NavDropdown style={{paddingLeft: "12px"}} title="My Account" id="basic-nav-dropdown">
              <CustomNavigationDropDownItem>
                <i
                  style={{fontSize: "24px"}}
                  className="fa fa-user"
                  aria-hidden="true"
                /> 
                <UserName>
                  {user.username} 
                  {
                    isUserLoggedIn ?  '(' + user.accountBalance.toFixed(2) + '$)' : ''
                  }
                 
                </UserName>
              </CustomNavigationDropDownItem>
              {
                !isUserLoggedIn ?
                  <CustomNavigationDropDownItem eventKey={4} href="/signin"> 
                    Sign In
                  </CustomNavigationDropDownItem>
                : 
                  <div>
                    <CustomNavigationDropDownItem href="/profile"> Profile</CustomNavigationDropDownItem>
                    <CustomNavigationDropDownItem href="/orders"> Orders</CustomNavigationDropDownItem>
                    <NavDropdown.Divider />
                    <CustomNavigationDropDownItem href="/signin" onClick={() => signOut()}>Sign Out</CustomNavigationDropDownItem>
                  </div>
              }
            </NavDropdown>
            <Nav.Link style={{position: "relative", top: "-5px", left: "-8px"}} eventKey={5} onClick={() => setShowCartOverlay(true)}>
              <ShoppingCartWrapper>
                <i className="fa fa-shopping-cart"></i>
                <sup style={{fontSize: "14px"}}> {cartItems.length} </sup>
              </ShoppingCartWrapper>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      { showCartOverlay ? <CartOverlay /> : null}
      
      { props.children }
    </div>
  );
}

export default NavigationBar;
