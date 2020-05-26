import styled from 'styled-components';

export const FlipCardInner = styled.div `
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.6s;
    transform-style: preserve-3d;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
`;

export const FlipCardContainer = styled.div `
    background-color: ${props =>  props.theme.backgroundColor};
    perspective: 1000px;
    width: 290px;
    height: 420px;

    @media (max-width: 420px) {
        width: 100%;
        max-height: 600px;
        height: 600px;
    }

    &:hover {
        ${FlipCardInner} {
            transform: rotateY(180deg);
        }
    }
`;

FlipCardContainer.defaultProps = {
    theme: {
        backgroundColor: "transparent"
    }
}

export const FlipCardFront = styled.div `
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    background-color: ${props =>  props.theme.backgroundColor};
    color: black;
`;

FlipCardFront.defaultProps = {
    theme: {
        backgroundColor: "transparent"
    }
}

export const FlipCardBack = styled.div `
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    background-color: ${props =>  props.theme.backgroundColor};
    color: white;
    transform: rotateY(180deg);
`;

FlipCardBack.defaultProps = {
    theme: {
        backgroundColor: "transparent"
    }
}