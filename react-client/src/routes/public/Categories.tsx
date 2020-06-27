import React, { useState } from 'react';
import { Breadcrumb, Col, Row } from 'react-bootstrap';
import { SIDE_BAR_OPTIONS_API } from '../../constants';
import { BackgroundContainer, CenterWrapper } from '../../components/internal/CommonContainers';
import { CloseIcon, SandwichIcon, SideBarMenuLeft, SideBarListContainer, SideBarListItem, BoxedItem, LogoBold, LogoTitle } from '../../components/internal/SideBarComponents';
import CustomFlipPagination from '../../components/external/CustomFlipPagination';
import styled from 'styled-components';
import '../../special-styles/sidebar-left.css';

const CustomLeftCol = styled(Col) `
  .sidebar_menu {
    width: 25%;
  }

  @media(max-width: 576px) {
    width: 100%;
  }
`;

const CustomBreadcrumb = styled(Breadcrumb) `
  ol {
    margin-bottom: 0;
    background-color: black;
    color: white;
    font-size: 24px;
  }
`;

function Categories() {
  const [selectedType, setSelectedType] = useState<string>('All');
  const [isLeftSideBarVisible, setIsLeftSideBarVisible] = useState<boolean>(true);
  
  const toggleSidebar = (show: boolean) => {
    setIsLeftSideBarVisible(show);
  }

  return (
    <BackgroundContainer theme={
      {
        backgroundImage: "images/blue-ice-white-dragon.jpg"
      }
    }>
      <Row>
        <CustomLeftCol sm={3}>
          <div>
            <SandwichIcon className={"fa fa-bars toggle_menu" + (isLeftSideBarVisible ? "" : " opacity_one")} onClick={() => toggleSidebar(true)}></SandwichIcon>
            <SideBarMenuLeft className={"sidebar_menu" + (isLeftSideBarVisible ? "" : " hide_menu")}>
                <CloseIcon className="fa fa-times" onClick={() => toggleSidebar(false)}></CloseIcon>
                <CenterWrapper>
                    <BoxedItem>
                        Filter the cards by
                        <LogoBold>
                            Categories
                        </LogoBold>
                    </BoxedItem>
                    <LogoTitle>
                        Be a Professional Duel Master
                    </LogoTitle>
                </CenterWrapper>

                <SideBarListContainer>
                {
                    SIDE_BAR_OPTIONS_API.map(item => {
                        return (
                            <SideBarListItem 
                                key={item.eventKey}
                                onClick={() => setSelectedType(item.type)}
                            >
                              {item.type}
                            </SideBarListItem>
                        )
                    })
                }
                </SideBarListContainer>
            </SideBarMenuLeft>
          </div>
        </CustomLeftCol>
        <Col sm={9}>
          <CustomBreadcrumb>
            <CustomBreadcrumb.Item href="/categories">Cards</CustomBreadcrumb.Item>
            <CustomBreadcrumb.Item active>{selectedType}</CustomBreadcrumb.Item>
          </CustomBreadcrumb>
          <CustomFlipPagination
              backgroundColor={"transparent"}
              cardsPerPage={24}
              pageBound={5}
              selectedType={selectedType}
          />
        </Col>
      </Row>
    </BackgroundContainer>
  );
}

export default Categories;