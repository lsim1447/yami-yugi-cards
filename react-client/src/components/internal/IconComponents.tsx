import styled from 'styled-components';

export const CloseIcon = styled.i `
    color: ${props => 
        (props && props.theme && props.theme.color) ? 
            props.theme.color :
            ''
    } !important;
    float: right;
    font-size: 28px;
    margin-bottom: 12px;
    padding: 8px;
    position: absolute;
    right: 8px !important;
    top: ${props => 
        (props && props.theme && props.theme.top) ? 
            props.theme.top :
            ''
    };
`;

CloseIcon.defaultProps = {
    theme: {
        color: "black",
        top: "0px"
    }
}