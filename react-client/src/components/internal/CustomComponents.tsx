import styled from 'styled-components';
import { Breadcrumb, Col, Jumbotron } from 'react-bootstrap';

const CustomCol = styled(Col) `
    border-left: 1px solid #D3D3D3;
    border-right: 1px solid #D3D3D3;
    min-height: 100vh;
`;

export const CustomLeftCol = styled(CustomCol) `
    background: url(${props => 
        (props && props.theme && props.theme.backgroundImage) ? 
            props.theme.backgroundImage :
            ''
    }) top center;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;

    @media (max-width: 992px) {
        display: none;
    }
`;

CustomLeftCol.defaultProps = {
    theme: {
        backgroundImage: ""
    }
}

export const CustomCenterCol = styled(CustomCol) `
    @media (max-width: 992px) {
        flex: 0 0 100%;
        max-width: 100%;
        width: 100%;
    }
`;

export const CustomRightCol = styled(CustomCol) `
    background: url(${props => 
        (props && props.theme && props.theme.backgroundImage) ?
            props.theme.backgroundImage :
            ''
    }) top center;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    
    @media (max-width: 992px) {
        display: none;
    }
`;

CustomRightCol.defaultProps = {
    theme: {
        backgroundImage: ""
    }
}

export const CustomJumbotron = styled(Jumbotron) `
    background-color: ${props => 
        (props && props.theme && props.theme.backgroundColor) ?
            props.theme.backgroundColor :
            ''
    };
    border-bottom: 1px solid #D3D3D3;
    border-top: 1px solid #D3D3D3;
    color: ${props => 
        (props && props.theme && props.theme.color) ?
            props.theme.color :
            ''
    };
    margin-bottom: 0px;
`;

CustomJumbotron.defaultProps = {
    theme: {
        backgroundColor: "inherit",
        color: "inherit"
    }
}

export const CustomBreadcrumb = styled(Breadcrumb) `
    ol {
        background-color: ${props => 
            (props && props.theme && props.theme.backgroundColor) ?
                props.theme.backgroundColor :
                ''
        };
    }
    color: ${props => 
        (props && props.theme && props.theme.color) ?
            props.theme.color :
            ''
    }
`;

CustomBreadcrumb.defaultProps = {
    theme: {
        backgroundColor: "inherit",
        color: "inherit"
    }
}

export const CustomCol1 = styled(Col) `
    @media (max-width: 576px) {
        -ms-flex: 0 0 8.333333%;
        flex: 0 0 8.333333%;
        max-width: 8.333333%;
    }
`;

export const CustomCol2 = styled(Col) `
    @media (max-width: 576px) {
        -ms-flex: 0 0 16.666667%;
        flex: 0 0 16.666667%;
        max-width: 16.666667%;
    }
`;

export const CustomCol3 = styled(Col) `
    @media (max-width: 576px) {
        -ms-flex: 0 0 25%;
        flex: 0 0 25%;
        max-width: 25%;
    }
`;

export const CustomCol4 = styled(Col) `
    @media (max-width: 576px) {
        -ms-flex: 0 0 33.3333%;
        flex: 0 0 33.3333%;
        max-width: 33.3333%;
    }
`;

export const CustomCol5 = styled(Col) `
    @media (max-width: 576px) {
        -ms-flex: 0 0 41.666667%;
        flex: 0 0 41.666667%;
        max-width: 41.666667%;
    }
`;

export const CustomCol6 = styled(Col) `
    @media (max-width: 576px) {
        -ms-flex: 0 0 50%;
        flex: 0 0 50%;
        max-width: 50%;
    }
`;

export const CustomCol7 = styled(Col) `
    @media (max-width: 576px) {
        -ms-flex: 0 0 58.333333%;
        flex: 0 0 58.333333%;
        max-width: 58.333333%;
    }
`;

export const CustomCol8 = styled(Col) `
    @media (max-width: 576px) {
        -ms-flex: 0 0 66.666666%;
        flex: 0 0 66.666666%;
        max-width: 66.666666%;
    }
`;

export const CustomCol9 = styled(Col) `
    @media (max-width: 576px) {
        -ms-flex: 0 0 75%;
        flex: 0 0 75%;
        max-width: 75%;
    }
`;

export const CustomCol10 = styled(Col) `
    @media (max-width: 576px) {
        -ms-flex: 0 0 83.333333%;
        flex: 0 0 83.333333%;
        max-width: 83.333333%;
    }
`;

export const CustomCol11 = styled(Col) `
    @media (max-width: 576px) {
        -ms-flex: 0 0 91.666666%;
        flex: 0 0 91.666666%;
        max-width: 91.666666%;
    }
`;