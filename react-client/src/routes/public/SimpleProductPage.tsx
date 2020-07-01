import React, { useState, useEffect } from 'react';
import loadableVisibility from "react-loadable-visibility/loadable-components";
import { Card, Col, Container, Jumbotron, Row } from 'react-bootstrap';
import AliceCarousel from 'react-alice-carousel'
import { ICardDetails } from '../../models/Cards';
import ProductDetails from '../../components/external/spp/ProductDetails';
import RatingsAndReviewsLoading from '../../components/external/loading/RatingsAndReviewsLoading';
import { getCardById } from '../../repositories/CardRepository';
import Actors from '../../components/external/sections/Actors';
import { DEFAULT_CARD_VALUE} from '../../models/Cards';
import { getInitialCardList } from '../../models/Cards';
import { MAX_NUMBER_OF_SIMILAR_CARDS } from '../../constants';
import { findAllCardsByTypeAndRace } from '../../repositories/CardRepository';
import GifGrid from '../../components/external/sections/GifGrid';
import styled from 'styled-components';
import 'react-alice-carousel/lib/alice-carousel.css'

const RatingsAndReviews = loadableVisibility(() => import('../../components/external/RatingsAndReviews'), {
    fallback: <RatingsAndReviewsLoading />
});

const SPPWrapper = styled.div `
    min-height: 500px;
`;

const CustomRow = styled(Row) `
    padding: 36px;
`;

const CustomLeftCol = styled(Col) `
    padding-left: 24px;
    padding-top: 24px;
`;

const SPPImageWrapper = styled.div `
    background: url(https://yugioh-cards.net/wp-content/uploads/2020/02/yugioh_duel_youtube-1024x539.png) top center;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    margin-bottom: 24px;
    min-height: 600px;
`;

const SPPImage = styled(Card.Img) `
    display: block;
    height: 100%;
    margin-left: auto;
    margin-right: auto;
    max-height: 614px;
    max-width: 450px;
`;

const RecommandationWrapper = styled.div `
    background: url(/images/Banner_RecommendationHub.gif) top center;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    margin-bottom: 24px;
    min-height: 400px;
`;

const AliceCarouselImg = styled.img `
    width: 100%;
`;

function SimpleProductPage(props: any) {
    const [cardDetails, setCardDetails] = useState(DEFAULT_CARD_VALUE);
    const [similarCards, setSimilarCards] = useState<ICardDetails[]>(getInitialCardList(MAX_NUMBER_OF_SIMILAR_CARDS));
    const cardId = (props.match.params && props.match.params.id) ? props.match.params.id : '5ebc4aad221c162fa4dcae6d';

    const handleOnDragStart = (e: any) => e.preventDefault()
    const responsive = {
        0: { items: 1 },
        855: { items: 2 },
        1280: { items: 3 },
        1705: { items: 4 }
    };

    useEffect(() => {
        getCardById(cardId)
            .then(desiredCard => {
                setCardDetails(desiredCard);
            });
    }, [cardId]);

    useEffect(() => {
        findAllCardsByTypeAndRace((cardDetails ? cardDetails.type : ''), (cardDetails ? cardDetails.race : ''), MAX_NUMBER_OF_SIMILAR_CARDS)
            .then(newSimilarCards => {
                setSimilarCards([]);
                setSimilarCards([...newSimilarCards]);
            }).catch(error => {
                setSimilarCards([]);
                console.log('Error(/api/cards/findByTypeAndRace): ', error);
            })
    }, [cardDetails]);

    return (
        <SPPWrapper>
            <CustomRow>
                <CustomLeftCol sm={5}>
                    <SPPImage
                        variant="top"
                        src={cardDetails.card_images[0].image_url}
                    />
                </CustomLeftCol>
                <Col sm={7}>
                    <ProductDetails
                        productDetails={cardDetails}
                    />
                </Col>
            </CustomRow>

            <Jumbotron fluid>
                <Container>
                    We're open and accepting orders! The health and well-being of our customers, employees and community is of the utmost importance to us. Due to modified operations put in place to help protect those working at the distribution centers, some orders may experience a processing delay up to 6 business days. We apologize for any inconvenience and appreciate your understanding. We are committed to delivering your orders as soon as possible!
                </Container>
            </Jumbotron>

            <SPPImageWrapper />

            <RecommandationWrapper />
               
            <AliceCarousel 
                autoPlay={true}
                autoPlayInterval={700}
                fadeOutAnimation={true}
                mouseTrackingEnabled={true}
                playButtonEnabled={true}
                responsive={responsive}
            >
                {
                    similarCards.map(similarCard => {
                        return (
                            <a key={similarCard._id} href={`/card/${similarCard._id}`}>
                                <AliceCarouselImg
                                    src={similarCard.card_images[0].image_url}
                                    onDragStart={handleOnDragStart} 
                                />      
                            </a>
                            
                        )
                    })
                }
            </AliceCarousel>
            
            <GifGrid 
                gif1_url="/gifs/its-time-to-duel.gif"
                gif2_url="/gifs/call-farao.gif"
            />

            <Actors />

            <RatingsAndReviews cardDetails={cardDetails}/>
        </SPPWrapper>
    );
}

export default SimpleProductPage;