import styled from 'styled-components';

export const FlipCardInner = styled.div `
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    height: 100%;
    position: relative;
    text-align: center;
    transition: transform 0.6s;
    transform-style: preserve-3d;
    width: 100%;
`;

export const FlipCardContainer = styled.div `
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

export const FlipCardFront = styled.div `
    backface-visibility: hidden;
    height: 100%;
    position: absolute;
    width: 100%;
    -webkit-backface-visibility: hidden;
`;

export const FlipCardBack = styled.div `
    backface-visibility: hidden;
    position: absolute;
    height: 100%;
    -webkit-backface-visibility: hidden;
    transform: rotateY(180deg);
    width: 100%;
`;