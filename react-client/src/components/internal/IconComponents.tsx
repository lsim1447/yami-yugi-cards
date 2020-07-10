import styled from 'styled-components';

export const CloseIcon = styled.i `
    color: ${props => 
        (props && props.theme && props.theme.color) ? 
            props.theme.color :
            '#000000'
    } !important;
    cursor: pointer;
    float: right;
    font-size: 24px;
    margin-bottom: 12px;
    padding: 16px;
    position: absolute;
    right: 8px !important;
    top: ${props => 
        (props && props.theme && props.theme.top) ? 
            props.theme.top :
            '0px'
    };
`;
