import React, { useContext, useState, useEffect } from 'react';
import { Breadcrumb, Col, Row } from 'react-bootstrap';
import { SIDE_BAR_OPTIONS_API } from '../constants';
import { BackgroundContainer, CenterWrapper } from '../components/internal/CommonContainers';
import { SideBarListContainer, SideBarListItem, BoxedItem, LogoBold, LogoTitle } from '../components/internal/SideBarComponents';
import CustomFlipPagination from '../components/external/CustomFlipPagination';
import styled from 'styled-components';

const TitleWrapper = styled.div `
    background-color: black;
    color: white;
    font-family: "Courier New";
    font-size: 64px;
    font-weight: 600;
    padding: 24px;
    text-align: center;
    width: 100%;
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
  const [selectedType, setSelectedType] = useState('All');
  
  return (
    <BackgroundContainer theme={
      {
        backgroundImage: "images/blue-ice-white-dragon.jpg"
      }
    }>
      <Row>
        <Col>
          <div>
            <i className="fa fa-bars toggle_menu"></i>
            <div className="sidebar_menu">
                <i className="fa fa-times"></i>
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
            </div>
          </div>
        </Col>
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