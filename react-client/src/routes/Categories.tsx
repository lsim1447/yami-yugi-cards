import React, { useContext, useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { SIDE_BAR_OPTIONS_API } from '../constants';
import { BackgroundContainer, CenterWrapper } from '../components/internal/CommonContainers';
import { SideBarListContainer, SideBarListItem, BoxedItem, LogoBold, LogoTitle } from '../components/internal/SideBarComponents';
import CustomFlipPagination from '../components/external/CustomFlipPagination';

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
                        Filter cards by
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