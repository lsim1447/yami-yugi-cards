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
    background-color: ${props => (props && props.theme && props.theme.backgroundColor) ? props.theme.backgroundColor : ''};
    color: ${props => (props && props.theme && props.theme.color) ? props.theme.color : ''}
`;

SimpleContainer.defaultProps = {
    theme: {
        backgroundColor: '',
        color: ''
    }
}