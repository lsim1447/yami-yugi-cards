import React, { useState } from 'react';
import { CardDeck } from 'react-bootstrap';
import SimpleFlipCard  from '../external/card/SimpleFlipCard';
import AnimateHeight from 'react-animate-height';
import { DEFAULT_PRODUCT_VALUE, IProductDetails } from '../../models/Product';
import styled from 'styled-components';

const AutoCompleteTextContainer = styled.div `
    width: 100%;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 12px;
    color: black;
`;

const AutoCompleteInput = styled.input `
    width: 100%;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;
    color: black;
    padding: 5px 15px;
    box-sizing: border-box;
    outline: none;
    text-align: center;
    @media (min-width: 992px) {
        max-width: 125px;
    }
    ::placeholder {
        color: #32CD32;
        opacity: 1; 
    }
`;

const AutoCompleteUl = styled.ul `
    position: fixed;
    right: 0px;
    @media (max-width: 992px) {
        right: 0px;
        width: 100%;
        height: 100hv;
    }
    overflow: hidden;
    list-style-type: none;
    text-align: center;
    margin: 0;
    padding: 0;
    border-top: 1px solid grey;
    color: black;
    font-weight: bold;
    &: before {
        content: ""
    }
`;

const AutoCompleteLi = styled.li `
    padding: 10px 15px;
    cursor: pointer;
    background-color: white;
    &: hover{
        background-color: white;
        color: red;
    }
`;

function AutoComplete(props: any) {
    const [ mySuggestions, setMySuggestions ] = useState<any>([]);
    const [ cardText, setCardText ] = useState('');
    const [ myHeight, setMyHeight ] = useState<any>('');
    const [ selectedProduct, setSelectedProduct ] = useState(DEFAULT_PRODUCT_VALUE);
    const MAX_NR_OF_MATCHES_TO_SHOW = 2;

    const _handleEnterPress = (error: any) => {
        if (error.key === 'Enter' && mySuggestions && mySuggestions.length > 0) {
          suggestionSelected(mySuggestions[0]);
        }
    }

    const onTextChange = (e: any) => {
        const { items } = props;
        const value = e.target.value;
        let newSuggestions: any = [];

        if (value.length > 0){
            const regex = new RegExp(`${value}`, 'g');
            newSuggestions = items.filter((product: IProductDetails) => {
                const name = product.name;
                return regex.test(name);
            })

            setMySuggestions(newSuggestions);
            setCardText(value);
            setMyHeight('auto');
            
        } else {
            setMySuggestions(newSuggestions);
            setCardText(value);
            setMyHeight(0);
        }
    }

    const renderSuggestions = () => {
        if (mySuggestions.length === 0) {
            return null;
        }

        return mySuggestions.slice(0, MAX_NR_OF_MATCHES_TO_SHOW).map((product: IProductDetails) => {
            return (
                <AutoCompleteLi key={product.id} onClick={() => suggestionSelected(product)}> 
                    <SimpleFlipCard
                        isFullDescriptionVisible={false}
                        product={product}
                        key={product.id} 
                    />
                </AutoCompleteLi>
            )
        }) 
        
    }

    const suggestionSelected = (product: IProductDetails) => {
        //setMySuggestions([]);
        setMyHeight('');
        setSelectedProduct(product);
        setCardText(product.name)
    }

    return(
        <AutoCompleteTextContainer>
            <AutoCompleteInput
                className="search_auto_complete"
                type="text"
                value={cardText}
                placeholder={props.placeholder}
                onChange={(e) => onTextChange(e)}
                onKeyUp={(e) => _handleEnterPress(e)}
            />
                    <AutoCompleteUl className="seach_results_container">
                        <AnimateHeight
                            duration={ 750 }
                            height={ myHeight }
                        >
                            <CardDeck>
                                { renderSuggestions() }
                            </CardDeck>
                        </AnimateHeight>
                    </AutoCompleteUl>
        </AutoCompleteTextContainer>
    )
}

export default AutoComplete;