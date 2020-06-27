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
  border-bottom: solid 1px #D8D8D8;
  box-sizing: border-box; 
  color: #D8D8D8;
  cursor: pointer;
  font-family: 'Open Sans';
  font-size: 14px;
  font-weight: 600;
  padding: 12px 0px;
  transition: all 0.3s ease-in-out;

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

export const SandwichIcon = styled.i `
  background-color: black;
  color: white;
  cursor: pointer;
  font-size: 2em; 
  opacity: 0;
  padding: 15px 20px 15px 15px;
  position: fixed;

  &:hover {
    background-color: #FE4365;
    transition: all 0.9s ease-in-out;
  }
`;

export const CloseIcon = styled.i `
    color: white;
    cursor: pointer;
    opacity: 0.7;
    position: absolute;
    right: 25px;
    top: 10px;
    transition: all 0.8s ease-in-out;

    &:hover {
        opacity: 1;
    }
`;

export const SideBarMenuLeft = styled.div `
    background-color: rgba(17, 17, 17, 0.9);
    margin-left: 0px;
    min-width: 25%;
    -ms-overflow-style: none;
    max-height: 92vh;
    opacity: 0.9;
    overflow-y: scroll;
    position: fixed;
    transition: all 0.5s ease-in-out;

    &::-webkit-scrollbar {
      display: none;
    }

    @media (max-width: 576px) {
        position: relative !important;
        width: 100%;
    }
`;

export const SideBarMenuRight = styled.div `
    background-color: rgba(17, 17, 17, 0.9);
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: flex-end;
    margin-left: 0px;
    opacity: 0.9;
    overflow: hidden;
    padding-bottom: 100px;
    position: relative;
    transition: all 1.5s ease-in-out;
    width: 100%;
`;