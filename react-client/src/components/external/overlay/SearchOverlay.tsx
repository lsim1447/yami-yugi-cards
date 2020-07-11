import React, { useContext, useEffect, useRef, useState } from 'react';
import { SearchContext }  from "../../../contexts/SearchContext";
import { Col, Image, Row } from 'react-bootstrap';
import { CloseIcon } from '../../internal/IconComponents';
import { ICardDetails } from '../../../models/Cards';
import { findCardsByPartialName } from '../../../repositories/CardRepository';
import {
    WAIT_INTERVAL,
    ENTER_KEY
} from './../../../constants';
import styled from 'styled-components';

const OverlayWrapper = styled.div `
    background: url(https://cdn3.iconfinder.com/data/icons/basic-interface/100/search-512.png) center bottom;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    height: 100vh;
    max-width: 500px;
    overflow-y: scroll;
    -ms-overflow-style: none;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 50000;
    width: 100%;

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        display: none;
    }

    &::-webkit-scrollbar {
        display: none;
    }

    @media (max-width: 700px) {
        min-width: 100%
        width: 100%;
    }
`;

const NameInput = styled.input `
    background-color: #000000;
    color: white;
    font-size: 28px;
    font-weight: 800;
    padding-bottom: 12px;
    padding-top: 24px;
    text-align: center;
    width: 100%;
`;

const SearchItemWrapper = styled(Row) `
    background-color: black;
    border-top: 1px solid #D3D3D3;
    padding-top: 18px;
    padding-bottom: 18px;
`;

const SearchItemImage = styled(Image) `
    height: 200px;
    width: 180px;
    padding-left: 12px;
    
    @media (max-width: 700px) {
        width: 100%;
        height: 100%;
    }
`;

const SearchItemField = styled.p `
    color: red;
    font-size: 18px;
    font-weight: 800;

    @media (max-width: 700px) {
        text-align: center;
        width: 100%;
    }
`;

const SearchOverlay = () => {
    const { setShowSearchOverlay } = useContext(SearchContext);
    const [productName, setProductName] = useState<string>('');
    const [products, setProducts] = useState<ICardDetails[]>([]);
    const [timer, setTimer] = useState<any>(null);
    const searchRef = useRef(null);

    const triggerChange = () => {
        if (productName.length > 1) {
            findCardsByPartialName(productName, 3)
                .then(response => {
                    setProducts(response);
                })
        } else {
            setProducts([]);
        }
    }

    const changeProductName = (nameSubstring: string) => {
        clearTimeout(timer);
        setProductName(nameSubstring);
        setTimer(setTimeout(triggerChange, WAIT_INTERVAL));
    }

    const handleKeyDown = (e: any) => {
        if (e.keyCode === ENTER_KEY) {
            triggerChange();
        }
    }

    useEffect(() => {
        (searchRef as any).current.focus();
    }, []);

    return (
        <OverlayWrapper>
            <CloseIcon 
                className="fa fa-times"
                onClick={() => setShowSearchOverlay(false)}
                theme={{color: "white", top: "16px"}}
            />
            
            <NameInput 
                type="text"
                placeholder="Search by Name"
                ref={searchRef}
                value={productName} 
                onChange={(e) => changeProductName(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e)}
            />
            
            {
                products.map((product: ICardDetails, index: number) => {
                    return (
                        <SearchItemWrapper key={product._id}>
                            <Col sm={5}>
                                <a href={`/card/${product._id}`}>
                                    <SearchItemImage 
                                        thumbnail
                                        src={product.card_images[0].image_url}
                                        alt={product.name}
                                    />
                                </a>
                            </Col>
                            <Col sm={7}>
                                <SearchItemField><strong> Name: </strong> {product.name} </SearchItemField>
                                <SearchItemField><strong> Type: </strong>{product.type} </SearchItemField>
                                <SearchItemField><strong> Race: </strong>{product.race ? product.race : 'N/A'}</SearchItemField>
                                <SearchItemField><strong> Archetype: </strong>{product.archetype ? product.archetype : 'N/A'}</SearchItemField>
                                <SearchItemField><strong> Price: </strong>{product.card_prices[0].amazon_price}$</SearchItemField>
                            </Col>
                        </SearchItemWrapper>
                    )
                })
            }
        </OverlayWrapper>
    );
}

export default SearchOverlay;