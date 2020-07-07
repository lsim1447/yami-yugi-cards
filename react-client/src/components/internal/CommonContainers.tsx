import styled from 'styled-components';

export const BackgroundContainer = styled.div `
    min-height: 850px;
    background: url(${props => (props && props.theme && props.theme.backgroundImage) ? props.theme.backgroundImage : ''}) no-repeat top center fixed; 
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
`;

BackgroundContainer.defaultProps = {
    theme: {
        backgroundImage: ''
    }
}

export const CenterWrapper = styled.div `
    text-align: center;
`;

export const SimpleContainer = styled.div `
    background-color: ${props => (props && props.theme && props.theme.backgroundColor) ? props.theme.backgroundColor : '#FFFFFF'};
    color: ${props => (props && props.theme && props.theme.color) ? props.theme.color : '#000000'};
    filter: ${props => (props && props.theme && props.theme.filter) ? props.theme.filter : 'brightness(1.0) contrast(1.0)'};
    transition: all .6s ease-in-out;
`;