import React, { useState, useEffect } from 'react';
import { CardDeck, Pagination } from 'react-bootstrap';
import styled from 'styled-components';
import { ICardDetails, getInitialCardList } from '../models/Cards';
import FlipCard from './FlipCard';
import {
    findCardsPaginated,
    findCardsByTypePaginated
} from '../../repositories/CardRepository';
import { ALL_NUMBER_OF_CARDS } from '../../constants';

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
    backgroundColor: string,
    cardsPerPage: number,
    pageBound: number,
    selectedType?: string
}

const CustomFlipPagination = ({backgroundColor, cardsPerPage, pageBound, selectedType}: CustomFlipPagination) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [upperPageBound, setUpperPageBound] = useState(5);
    const [lowerPageBound, setLowerPageBound] = useState(0);
    const [isPrevBtnActive, setIsPrevBtnActive] = useState('disabled');
    const [isNextBtnActive, setIsNextBtnActive] = useState('');
    const [pageNumbers, setPageNumbers] = useState<number[]>([]);
    const [cards, setCards] = useState<ICardDetails[]>(getInitialCardList(cardsPerPage));

    // Update Page Counter
    useEffect(() => {
        const tmpNumbers: number[] = [];
        for (let i = 1; i <= Math.ceil(ALL_NUMBER_OF_CARDS / cardsPerPage); i++) {
            tmpNumbers.push(i);
        }
        setPageNumbers(tmpNumbers);
    }, [cards]);

    // Update Cards
    useEffect(() => {
        console.log('selectedType = ', selectedType);
        if (!selectedType || selectedType === 'All') {
            findCardsPaginated(currentPage, cardsPerPage)
                .then(newCards => {
                    setCards([]);
                    setCards(newCards)
                });
        } else {
            findCardsByTypePaginated(selectedType, currentPage, cardsPerPage)
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
            findCardsPaginated(currentPage, cardsPerPage)
                .then(newCards => {
                    setCards([]);
                    setCards(newCards)
                });
        } else {
            findCardsByTypePaginated(selectedType, currentPage, cardsPerPage)
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
            <CardDeck style={{minHeight: "100vh", backgroundColor: backgroundColor}}>
            {
                cards.map(
                    (card: ICardDetails) => {
                        return (
                            <FlipCard 
                                isFullDescriptionVisible={false}
                                card={card}
                                key={card.id}
                            />
                        );
                })
            }
            </CardDeck>
        )
    }

    // Logic for displaying page numbers
    const RenderPageNumbers = () => {
        return pageNumbers.map(number => {
            if (number === 1 && currentPage === 1){
                return(
                    <Pagination.Item key={number} className='active'> <a href='#' onClick={(event) => handleClick(event)}>{number}</a></Pagination.Item>
                )
            }
            else if ((number < upperPageBound + 1) && number > lowerPageBound) {
                if (number === currentPage) {
                    return (
                        <Pagination.Item key={number} className='active' id={`${number}`}> <a href='#' id={`${number}`} onClick={(event) => handleClick(event)}>{number}</a></Pagination.Item>
                    )
                } else {
                    return (
                        <Pagination.Item key={number} id={`${number}`}> <a href='#' id={`${number}`} onClick={(event) => handleClick(event)}>{number}</a></Pagination.Item>
                    )
                }
                
            }
            
            return null;
        });
    }
    
    let pageIncrementBtn = null;
    if (pageNumbers.length > upperPageBound){
        pageIncrementBtn = <Pagination.Item className=''><a href='#' onClick={() => btnIncrementClick()}> &hellip; </a></Pagination.Item>
    }

    let pageDecrementBtn = null;
    if (lowerPageBound >= 1) {
        pageDecrementBtn = <Pagination.Item className=''><a href='#' onClick={() => btnDecrementClick()}> &hellip; </a></Pagination.Item>
    }

    let renderPrevBtn = null;
    if (isPrevBtnActive === 'disabled') {
        renderPrevBtn = <Pagination.Item className={isPrevBtnActive}><span id="btnPrev"> Prev </span></Pagination.Item>
    } else {
        renderPrevBtn = <Pagination.Item className={isPrevBtnActive}><a href='#' id="btnPrev" onClick={() => btnPrevClick()}> Prev </a></Pagination.Item>
    }

    let renderNextBtn = null;
    if (isNextBtnActive === 'disabled') {
        renderNextBtn = <Pagination.Item className={isNextBtnActive}><span id="btnNext"> Next </span></Pagination.Item>
    } else{
        renderNextBtn = <Pagination.Item className={isNextBtnActive}><a href='#' id="btnNext" onClick={() => btnNextClick()}> Next </a></Pagination.Item>
    }
    
    return (
        <div>
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
        </div>
    );
}

export default CustomFlipPagination;