import React, { useContext } from 'react';
import { HideOverlaysContext }  from "../../contexts/HideOverlaysContext";
import { ThemeContext } from '../../contexts/ThemeContext';
import { SimpleContainer } from '../../components/internal/CommonContainers';
import CustomFlipPagination from '../../components/external/CustomFlipPagination';
import styled from 'styled-components';

const TitleWrapper = styled.div `
    font-family: "Courier New";
    font-size: 64px;
    font-weight: 600;
    padding: 24px;
    text-align: center;
    width: 100%;
`;

function AllCards() {
    const { activeTheme } = useContext(ThemeContext);
    const { hideAllOverlays } = useContext(HideOverlaysContext);

    return (
        <SimpleContainer theme={activeTheme} onClick={() => hideAllOverlays()}>
            <TitleWrapper> 
                Make your deck insuperable
            </TitleWrapper>
            <CustomFlipPagination
                productsPerPage={24}
                pageBound={5}
            />
        </SimpleContainer>
    );
}

export default AllCards;