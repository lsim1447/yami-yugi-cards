import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from "../../contexts/ThemeContext";
import { Pagination } from 'react-bootstrap';
import FlipCard from './card/FlipCard';
import { SimpleContainer} from '../../components/internal/CommonContainers';
import { CustomCardDeck } from '../../components/internal/CustomComponents';
import { IProductDetails, getInitialProductList } from '../../models/Product';
import { ALL_NUMBER_OF_PRODUCTS } from '../../constants';
import {
    findCardsPaginated,
    findCardsByTypePaginated
} from '../../repositories/CardRepository';
import styled from 'styled-components';

const PaginationWrapper = styled(Pagination) `
    background-image: url(/images/millennium_items_header.jpg);
    display: flex;
    font-size: 28px;
    justify-content: center;
    margin-bottom: 0;
    padding-bottom: 18px;
    padding-top: 18px;
    vertical-align: middle;
`;

type CustomFlipPagination = {
    productsPerPage: number,
    pageBound: number,
    selectedType?: string
}

const CustomFlipPagination = ({productsPerPage, pageBound, selectedType}: CustomFlipPagination) => {
    const { activeTheme } = useContext(ThemeContext);
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ upperPageBound, setUpperPageBound ] = useState(5);
    const [ lowerPageBound, setLowerPageBound ] = useState(0);
    const [ isPrevBtnActive, setIsPrevBtnActive ] = useState('disabled');
    const [ isNextBtnActive, setIsNextBtnActive ] = useState('');
    const [ pageNumbers, setPageNumbers ] = useState<number[]>([]);
    const [ cards, setCards ] = useState<IProductDetails[]>(getInitialProductList(productsPerPage));

    // Update Page Counter
    useEffect(() => {
        const tmpNumbers: number[] = [];
        for (let i = 1; i <= Math.ceil(ALL_NUMBER_OF_PRODUCTS / productsPerPage); i++) {
            tmpNumbers.push(i);
        }
        setPageNumbers(tmpNumbers);
    }, [cards]);

    // Update Cards
    useEffect(() => {
        if (!selectedType || selectedType === 'All') {
            findCardsPaginated(currentPage, productsPerPage)
                .then(newCards => {
                    setCards([]);
                    setCards(newCards)
                });
        } else {
            findCardsByTypePaginated(selectedType, currentPage, productsPerPage)
                .then(newCards => {
                    setCards([]);
                    setCards(newCards)
                });
        }
    }, [currentPage]);

    // Update Cards
    useEffect(() => {
        setCurrentPage(1);

        if (!selectedType || selectedType === 'All') {
            findCardsPaginated(currentPage, productsPerPage)
                .then(newCards => {
                    setCards([]);
                    setCards(newCards)
                });
        } else {
            findCardsByTypePaginated(selectedType, currentPage, productsPerPage)
                .then(newCards => {
                    setCards([]);
                    setCards(newCards)
                });
        }
        
    }, [selectedType]);
    
    const handleClick = (event: any) =>{
        let listid = Number(event.target.id);
        
        setCurrentPage(listid);
        setPrevAndNextBtnClass(listid);
    }

    const setPrevAndNextBtnClass = (listid: any) => {
        let totalPage = pageNumbers.length;

        setIsNextBtnActive('disabled');
        setIsPrevBtnActive('disabled');
        
        if (totalPage === listid && totalPage > 1) {
            setIsPrevBtnActive('');
        } else if (listid === 1 && totalPage > 1) {
            setIsNextBtnActive('');
        } else if (totalPage > 1) {
            setIsNextBtnActive('');
            setIsPrevBtnActive('');
        }
    }
      
    const btnIncrementClick = () => {
        setUpperPageBound(upperPageBound + pageBound);
        setLowerPageBound(lowerPageBound + pageBound);
        
        let listid = upperPageBound + 1;

        setCurrentPage(listid);
        setPrevAndNextBtnClass(listid);
    }

    const btnDecrementClick = () => {
        setUpperPageBound(upperPageBound - pageBound);
        setLowerPageBound(lowerPageBound - pageBound);

        let listid = upperPageBound - pageBound;

        setCurrentPage(listid);
        setPrevAndNextBtnClass(listid);
    }
    
    const btnPrevClick = () => {
        if ((currentPage - 1) % pageBound === 0 ) {
            setUpperPageBound(upperPageBound - pageBound);
            setLowerPageBound(lowerPageBound - pageBound);
        }
        let listid = currentPage - 1;
        
        setCurrentPage(listid);
        setPrevAndNextBtnClass(listid);
    }

    const btnNextClick = () => {
        if ((currentPage + 1) > upperPageBound) {
            setUpperPageBound(upperPageBound + pageBound);
            setLowerPageBound(lowerPageBound + pageBound);
        }
        let listid = currentPage + 1;
        
        setCurrentPage(listid);
        setPrevAndNextBtnClass(listid);
    }

    // Logic for displaying current cards
    const RenderCards = () => {        
        return (
            <CustomCardDeck theme={{backgroundColor: activeTheme.backgroundColor, color: activeTheme.color}}>
            {
                cards.map(
                    (product: IProductDetails) => {
                        return (
                            <FlipCard 
                                isFullDescriptionVisible={false}
                                product={product}
                                key={product.id + Math.random()}
                            />
                        );
                })
            }
            </CustomCardDeck>
        )
    }

    // Logic for displaying page numbers
    const RenderPageNumbers = () => {
        return pageNumbers.map(number => {
            if (number === 1 && currentPage === 1){
                return(
                    <Pagination.Item key={number} className='active'> <a style={{color: "#000000"}} href='#' onClick={(event) => handleClick(event)}>{number}</a></Pagination.Item>
                )
            }
            else if ((number < upperPageBound + 1) && number > lowerPageBound) {
                if (number === currentPage) {
                    return (
                        <Pagination.Item key={number} className='active' id={`${number}`}> <a style={{color: "#000000"}} href='#' id={`${number}`} onClick={(event) => handleClick(event)}>{number}</a></Pagination.Item>
                    )
                } else {
                    return (
                        <Pagination.Item key={number} id={`${number}`}> <a style={{color: "#000000"}} href='#' id={`${number}`} onClick={(event) => handleClick(event)}>{number}</a></Pagination.Item>
                    )
                }
                
            }
            
            return null;
        });
    }
    
    let pageIncrementBtn = null;
    if (pageNumbers.length > upperPageBound){
        pageIncrementBtn = <Pagination.Item className=''><a style={{color: "#000000"}} href='#' onClick={() => btnIncrementClick()}> &hellip; </a></Pagination.Item>
    }

    let pageDecrementBtn = null;
    if (lowerPageBound >= 1) {
        pageDecrementBtn = <Pagination.Item className=''><a style={{color: "#000000"}} href='#' onClick={() => btnDecrementClick()}> &hellip; </a></Pagination.Item>
    }

    let renderPrevBtn = null;
    if (isPrevBtnActive === 'disabled') {
        renderPrevBtn = <Pagination.Item className={isPrevBtnActive}><span style={{color: "#000000"}} id="btnPrev"> Prev </span></Pagination.Item>
    } else {
        renderPrevBtn = <Pagination.Item className={isPrevBtnActive}><a style={{color: "#000000"}} href='#' id="btnPrev" onClick={() => btnPrevClick()}> Prev </a></Pagination.Item>
    }

    let renderNextBtn = null;
    if (isNextBtnActive === 'disabled') {
        renderNextBtn = <Pagination.Item className={isNextBtnActive}><span style={{color: "#000000"}} id="btnNext"> Next </span></Pagination.Item>
    } else{
        renderNextBtn = <Pagination.Item className={isNextBtnActive}><a style={{color: "#000000"}} href='#' id="btnNext" onClick={() => btnNextClick()}> Next </a></Pagination.Item>
    }
    
    return (
        <SimpleContainer theme={activeTheme}>
            <PaginationWrapper className="pagination">
                {renderPrevBtn}
                {pageDecrementBtn}
                {RenderPageNumbers()}
                {pageIncrementBtn}
                {renderNextBtn}
            </PaginationWrapper>
            {RenderCards()}
            <PaginationWrapper className="pagination">
                {renderPrevBtn}
                {pageDecrementBtn}
                {RenderPageNumbers()}
                {pageIncrementBtn}
                {renderNextBtn}
            </PaginationWrapper>
        </SimpleContainer>
    );
}

export default CustomFlipPagination;