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