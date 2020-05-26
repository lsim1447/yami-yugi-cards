import styled from 'styled-components';

export interface IListItem
{
  eventKey: string,
  type: string
}

export const ListItem = styled.div `
  border-top: 2px solid #343a40;
  border-bottom: 2px solid #343a40;
  color: #ffffff;
  font-weight: bold;
  padding-top: 12px;
  padding-bottom: 12px;
  
  &:hover {
    color: #05f29b;
    border-top: 2px solid #ffffff;
    border-bottom: 2px solid #ffffff;
  }
`;

export const SandwichBtnContainer = styled.div `
  color: white;
  position: fixed;
`;

export const SideBarCloseIcon = styled.div `
  float: right;
`;

export const SideBarContainer = styled.div `
  background-color: black;
  display: block;
  width: 16.66%;
  min-width: 200px;
`;

export const SideBarHeaderText = styled.strong `
  text-align: center;
`;

export const hidden_sidebar = () => {
  const sideBarElement = document.getElementById("mySidebar");
  if (sideBarElement) {
    sideBarElement.style.display = "none";
  }
}

export const show_sidebar = () => {
  const sideBarElement = document.getElementById("mySidebar");
  if (sideBarElement) {
    sideBarElement.style.display = "block";
  }
}

// MY DECK SIDEBAR MENU
export const SideBarMenuContainer = styled.div `
  @media (min-width: 576px) {
    position: fixed;
  }
`;

export const SideBarListContainer = styled.ul `
  margin: 0;
	padding: 0;
	list-style: none;
  text-decoration: none;
  margin: 20px 0;
  display: block;
  width: 100%;
  margin-left: 25px;
`;

export const SideBarListItem = styled.li `
  font-weight: 600;
  font-family: 'Open Sans';
  color: white;
  padding: 12px 0px;
  box-sizing: border-box; 
  font-size: 14px;
  color: #D8D8D8;
  border-bottom: solid 1px #D8D8D8;
  transition: all 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    color: red;
	  transition: all 0.3s ease-in-out;
  }
`;

export const BoxedItem = styled.h1 `
  font-family: 'Open Sans';
  font-weight: 200;
  padding: 10px 20px;
  display: inline-block;
  border: solid 2px white;
  box-sizing: border-box;
  font-size: 22px;
  color: white;
  text-align: center;
  margin-top: 70px;
`;

export const LogoBold = styled.span `
  font-weight: 800;
`;

export const LogoTitle = styled.h2 `
  color: red;
  font-family: 'Open Sans';
  font-weight: 800;
  font-size: 16px;
  text-align: center;
  padding: 5px 0;
`;