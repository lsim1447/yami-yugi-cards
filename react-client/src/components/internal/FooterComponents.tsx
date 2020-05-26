import styled from 'styled-components';

export const FooterDistributed = styled.div `
    background-color: black;
    box-sizing: border-box;
    font: bold 16px sans-serif;
    padding: 100px 50px 60px 50px;
    position: relative;
    bottom: 0;
    text-align: center;
    z-index: 10001;
    width: 100%;

    h3 {
        color:  #ffffff;
        font: normal 36px 'Cookie', cursive;
        margin: 0;
    }

    h3 span {
        color:  #e0ac1c;
    }
`;

export const FooterCol = styled.div `
    display: inline-block;
    vertical-align: top;
    
    @media (max-width: 880px) {
        display: block;
        margin-bottom: 40px;
        text-align: center;
        width: 100%;
    }
`

export const FooterLeft = styled(FooterCol) `
    width: 30%;

    img {
        height: 75px;
        text-align: center;
        width: 75px;
    }
`;

export const FooterCenter = styled(FooterCol) `
    text-align: left;
    width: 35%;

    i {
        background-color:  #33383b;
        border-radius: 50%;
        color: #ffffff;
        font-size: 25px;
        height: 38px;
        line-height: 42px;
        margin: 10px 15px;
        text-align: center;
        vertical-align: middle;
        width: 38px;
    }

    i.fa-envelope{
        font-size: 17px;
        line-height: 38px;
    }

    p {
        color: #ffffff;
        display: inline-block;
        margin:0;
        vertical-align: middle;
    }

    p span {
        display:block;
        font-size:14px;
        font-weight: normal;
        line-height:2;
    }

    p a {
        color:  #e0ac1c;
        text-decoration: none;;
    }

    @media (min-width: 880px) {
        padding-left: 8%;
    }

    @media (max-width: 880px) {
        i {
            margin-left: 0;
        }
    }
`;

export const FooterRight = styled(FooterCol) `
    width: 30%;
`;

export const FooterAboutCompany = styled.p `
    color:  #92999f;
    font-size: 13px;
    font-weight: normal;
    line-height: 20px;
    margin: 0;

    span {
        color:  #ffffff;
        display: block;
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 20px;
`;

export const FooterIcons = styled.div `
    margin-top: 25px;

    a {
        background-color:  #33383b;
        border-radius: 2px;
        color: #ffffff;
        cursor: pointer;
        display: inline-block;
        font-size: 20px;
        height: 35px;
        line-height: 35px;
        margin-bottom: 5px;
        margin-right: 3px;
        text-align: center;
        width: 35px;
    }
`;

export const FooterLink = styled.p `
    color:  #ffffff;
    margin: 20px 0 12px;

    a {
        color:  inherit;
        display:inline-block;
        line-height: 1.8;
        text-decoration: none;
    }
`;

export const FooterCompanyName = styled.div `
    color:  #8f9296;
    font-size: 14px;
    font-weight: normal;
    margin: 0;
`;
