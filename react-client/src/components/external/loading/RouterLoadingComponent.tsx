import React from 'react';
import { Spinner } from 'react-bootstrap';
import styled from 'styled-components';

const LoadingWrapper = styled.div `
    background-color: #F0F0F0;
    min-height: 100vh;
    opacity: 0.4;
    width: 100%;
    text-align: center;
`;

const LoadingGif = styled.div `
    position:absolute;
    left:50%;
    top:50%;
`;

const CustomSpinner = styled(Spinner) `
    font-size: 24px;
    height: 50px;
    width: 50px;
`;

function RouterLoadingComponent(props: any) {
    return (
        <LoadingWrapper>
            <LoadingGif>
                <CustomSpinner animation="border" />
            </LoadingGif>
        </LoadingWrapper>
    )
}

export default RouterLoadingComponent;