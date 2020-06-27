import React from 'react';
import { Spinner } from 'react-bootstrap';
import styled from 'styled-components';

const LoadingWrapper = styled.div `
    background-color: #F0F0F0;
    min-height: 30vh;
    opacity: 0.4;
    width: 100%;
    text-align: center;
`;

const SpinnerWrapper = styled.div `
    position: relative;
    left:50%;
    top:50%;
`;

const CustomSpinner = styled(Spinner) `
    font-size: 24px;
    height: 50px;
    width: 50px;
`;

const DefaultLoadingComponent = () => (
    <LoadingWrapper>
        <SpinnerWrapper>
            <CustomSpinner animation="grow" />
        </SpinnerWrapper>
    </LoadingWrapper>
);

export default DefaultLoadingComponent;