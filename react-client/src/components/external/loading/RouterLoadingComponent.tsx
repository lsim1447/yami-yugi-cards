import React from 'react';
import { Spinner } from 'react-bootstrap';
import styled from 'styled-components';

const LoadingWrapper = styled.div `
    background-color: #F0F0F0;
    min-height: 100vh;
    opacity: 0.4;
    position: relative;
    width: 100%;
    text-align: center;
`;

const SpinnerWrapper = styled.div `
    margin: 0;
    position: absolute;
    top: 40%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
`;

const CustomSpinner = styled(Spinner) `
    font-size: 24px;
    height: 50px;
    width: 50px;
`;

const RouterLoadingComponent = () => (
    <LoadingWrapper>
        <SpinnerWrapper>
            <CustomSpinner animation="border" />
        </SpinnerWrapper>
    </LoadingWrapper>
);

export default RouterLoadingComponent;