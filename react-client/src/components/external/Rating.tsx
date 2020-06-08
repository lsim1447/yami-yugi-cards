import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Col, Form, ProgressBar, Row, Button } from 'react-bootstrap';
import { ICardDetails } from '../models/Cards';
import { IComment } from '../models/Comment';
import RatingModal from '../modals/RatingModal';
import {
    getAllComments,
    getCommentsByCardId
} from '../../repositories/CommentRepository';

const RatingWrapper = styled(Row) `
    border-top: 1px solid #D3D3D3;
    border-bottom: 1px solid #D3D3D3;
    margin-bottom: 36px;
    padding: 36px;
`;

const RatingParagraph = styled.p `
    font-size: 48px;
    font-weight: 800;
    padding-bottom: 36px;
    text-align: center;
    width: 100%;
`;

const BigFontWrapper = styled.p `
    font-size: 52px;
    font-weight: 700;
`;

const WriteReviewButton = styled(Button) `
    font-size: 24px;
    margin-right: 24px;
    margin-top: 48px;
    padding-bottom: 12px;
    padding-top: 12px;
    width: 100%;
`;

const CommentItem = styled(Row) `
    border-bottom: 1px solid #D3D3D3;
    margin: 0px 24px;
    padding: 24px 48px;

    @media (max-width: 767px) {
        margin: 0;
        padding: 24px 0;
    }
`;

const CommentTitle = styled.p `
    font-size: 32px;
    font-weight: 800;
`;

const CommentDate = styled.p `
    font-weight: 400;
    font-size: 14px;
`;

const CommentUsername = styled.p `
    font-weight: 600;
    font-size: 16px;
    padding-top: 12px;
`;

const CommentMessage = styled.p `
    border-bottom: 1px solid #D3D3D3;
    font-size: 16px;
    padding: 24px 24px;
`;

const WasThisHelpful = styled.div `
    font-size: 16px;
    font-weight: 700;
    padding: 12px 24px;
`;

type RatingProps = {
    cardDetails: ICardDetails
}

const Rating = ({cardDetails} : RatingProps) => {
    const [modalShow, setModalShow] = useState(false);
    const [comments, setComments] = useState([]);
    
    const getAvgPercentage = () => {
        if (comments.length === 0) {
            return 0;
        } else {
            const sum = comments.reduce((accumulator: number, comment: IComment) => {
                return accumulator + comment.stars;
            }, 0);
    
            return (sum / comments.length).toFixed(2);
        }
    }

    const getPercentage = (star: number) => {
        if (comments.length === 0) {
            return 0;
        } else {
            const nr = comments.filter((comment: IComment) => comment.stars === star).length;

            return Math.round((nr / comments.length) * 100);
        }
    }

    const getWouldRecommended = () => {
        if (comments.length === 0) {
            return 0;
        } else {
            return ((comments
                .filter((comment: IComment) => comment.stars > 2)
                .length) / comments.length * 100).toFixed(2);
        }
    }

    useEffect(() => {
        getAllComments()
            .then(comments => {
                setComments(comments);
            })
        /*
        getCommentsByCardId(cardDetails._id)
            .then(comments => {
                console.log('comments = ', comments)
                setComments(comments);
            })
        */
    }, []);

    return (
        <div>
            <RatingWrapper>
                <RatingParagraph>
                    Ratings & Reviews
                </RatingParagraph>
                <Col>
                    <Row>
                        <Col>
                            <BigFontWrapper> {getWouldRecommended()}% </BigFontWrapper>
                            would recommend this product.
                        </Col>
                        <Col>
                            <BigFontWrapper> {getAvgPercentage()} </BigFontWrapper>
                            out of <strong style={{fontSize: "24px"}}>5</strong>
                            <p> {comments.length} Reviews</p>
                        </Col>
                    </Row>
                    <Row>
                        <WriteReviewButton
                            onClick={() => setModalShow(true)}
                            variant="outline-primary"
                        >
                            Write a Review
                        </WriteReviewButton>
                    </Row>
                </Col>
                <Col style={{borderLeft: "1px solid #D3D3D3"}}>
                    <Row>
                        <Col>
                            <p>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                (5 stars) <ProgressBar style={{marginTop: "8px", marginBottom: "22px"}} now={getPercentage(5)} label={`${getPercentage(5)}%`} />
                            </p>
                            <p>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                (4 stars) <ProgressBar style={{marginBottom: "20px"}} now={getPercentage(4)} label={`${getPercentage(4)}%`} />
                            </p>
                            <p>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                (3 stars) <ProgressBar style={{marginBottom: "20px"}} now={getPercentage(3)} label={`${getPercentage(3)}%`} />
                            </p>
                            <p>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                (2 stars) <ProgressBar style={{marginBottom: "20px"}} now={getPercentage(2)} label={`${getPercentage(2)}%`} />
                            </p>
                            <p>
                                <i className="fa fa-star"></i>
                                (1 stars) <ProgressBar style={{marginBottom: "20px"}} now={getPercentage(1)} label={`${getPercentage(1)}%`} />
                            </p>
                        </Col>
                    </Row>
                </Col>
            </RatingWrapper>
            {
                comments.map((comment: IComment, index: number) => {
                    return (
                        <CommentItem>
                            <Col>
                                <CommentTitle>{comment.title}</CommentTitle>
                                {
                                    [...Array(comment.stars)].map((element) => <i className="fa fa-star"></i>)
                                }
                                <CommentDate>{comment.date}</CommentDate>
                                <CommentUsername>{comment.username}</CommentUsername>
                            </Col>
                            <Col>
                                <CommentMessage>{comment.message}</CommentMessage>
                                <WasThisHelpful>
                                    Was this review helpful to you?
                                    <Form>
                                        <Form.Check
                                            custom
                                            type={'checkbox'}
                                            label={`Yes`}
                                            id={`${index}-yes`}
                                        />
                                        <Form.Check
                                            custom
                                            type={'checkbox'}
                                            label={`No`}
                                            id={`${index}-no`}
                                        />
                                    </Form>
                                </WasThisHelpful>
                            </Col>
                        </CommentItem>
                    )
                })
            }
            <RatingModal
                cardDetails={cardDetails}
                comments={comments}
                setComments={setComments}
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </div>
    );
}

export default Rating;