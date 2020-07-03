import styled from 'styled-components';
import { Button } from 'react-bootstrap';

export const FacebookButton = styled.button `
    background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_facebook.png') 6px 6px no-repeat;
    background-color: #5B7BD5;
    border: none;
    border-radius: 0.2em;
    color: #FFFFFF;
    font-size: 16px;
    line-height: 34px;
    margin: 0.2em;
    padding: 0 15px 0 46px;
    text-align: left;
    white-space: nowrap;

    &:focus {
        outline: none;
    }
    &:active {
        box-shadow: inset 0 0 0 32px rgba(0,0,0,0.1);
    }
`;

export const SubmitOrderButton = styled(Button)`
    background-color: black;
    float: right;
    margin-bottom: 24px;
    padding: 12px 60px;

    @media (max-width: 992px) {
        width: 100%;
    }
`;

export const CheckoutButton = styled(Button) `
    background-color: black;
    color: white;
    font-size: 20px;
    font-weight: 600;
    margin-top: 36px;
    padding-bottom: 12px;
    padding-top: 12px;
    width: 100%;
`;

export const AddToBagButton = styled(Button) `
    background-color: black;
    color: white;
    font-size: 24px;
    font-weight: 600;
    padding-bottom: 24px;
    padding-top: 24px;
    width: 100%;
`;
