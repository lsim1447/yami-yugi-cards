import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import CustomFlipPagination from '../../components/external/CustomFlipPagination';
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

function AllCards() {
    const { activeTheme } = useContext(ThemeContext);

    return (
        <div>
            <TitleWrapper> 
                Make your deck insuperable
            </TitleWrapper>
            <CustomFlipPagination
                backgroundColor={activeTheme.backgroundColor}
                cardsPerPage={24}
                pageBound={5}
            />
        </div>
        
    );
}

export default AllCards;