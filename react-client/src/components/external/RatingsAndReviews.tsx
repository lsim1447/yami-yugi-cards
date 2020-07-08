import React, { useContext, useState, useEffect } from 'react';
import loadable from '@loadable/component';
import { UserContext } from "../../contexts/UserContext";
import { Alert, Col, Form, ProgressBar, Row, Button } from 'react-bootstrap';
import { ICardDetails } from '../../models/Cards';
import { IComment, IVote } from '../../models/Comment';
import {
    deleteCommentById,
    getCommentsByCardId,
    updateComment
} from '../../repositories/CommentRepository';
import { isUserSignedIn } from '../../services/UserService';
import { confirmAlert } from 'react-confirm-alert';
import styled from 'styled-components';
import 'react-confirm-alert/src/react-confirm-alert.css';

const RatingModal = loadable(() => import('../modals/RatingModal'), {
    fallback: undefined
});

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

const RemoveComment = styled.p `
    font-weight: 400;
    font-size: 16px;

    &:hover {
        text-decoration: underline;
    }
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

const NoCommentsWrapper = styled(Row) `
    border-bottom: 1px solid #D3D3D3;
`;

const NoCommentsParagraph = styled.p `
    font-size: 36px;
    font-weight: 300;
    padding-bottom: 12px;
    text-align: center;
    width: 100%;
`;

const ArrowTopLeft = styled.img `
    background-color: transparent;
    height: 40px;
    width: 40px;
`;

const BeTheFirst = styled.span `
    &:hover {
        color: #007BFF;
    }
`;

const EditIcon = styled.i `
    font-size: 24px;
    position: absolute;
    top: 0;
    right: 0;
`;

type RatingsAndReviewsProps = {
    cardDetails: ICardDetails
}

const RatingsAndReviews = ({cardDetails} : RatingsAndReviewsProps) => {
    const { user } = useContext(UserContext);
    const [modalShow, setModalShow] = useState(false);
    const [commentToModify, setCommentToModify] = useState<IComment>();
    let [comments, setComments] = useState<IComment[]>([]);

    const checkBoxValueChange = (comment: IComment, type: string) => {
        if (isUserSignedIn()) {
            let myVote = comment.votes.filter((vote: IVote) => vote.email === user.email);

            if (!myVote.length) {
                comment.votes.push({
                    email: user.email,
                    isHelpful: type === 'yes'
                });
            } else {
                comment.votes = comment.votes.map((vote: IVote) => {
                    if (vote.email === user.email) {
                        return {
                            email: vote.email,
                            isHelpful: type === 'yes'
                        }
                    } else {
                        return vote;
                    }
                }) 
            }

            const updatedComments: IComment[] = comments.map((c: IComment) => {
                if (c._id === comment._id) {
                    return comment;
                } else {
                    return c;
                }
            });

            updateComment(comment)
                .then(response => {
                    //console.log('response = ', response);
                })

            setComments(updatedComments);
        }
        
    }

    const editExistingComment = (comment: IComment) => {
        setCommentToModify(comment);
        setModalShow(true);
    }

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

    const isCheckBoxChecked = (comment: IComment, type: string) => {
        if (type === 'yes') {
            return comment.votes.some((vote :IVote) => vote.email === user.email && vote.isHelpful);
        } else {
            return comment.votes.some((vote :IVote) => vote.email === user.email && !vote.isHelpful);
        }
    }

    const isCheckboxDisabled = (comment: IComment, type: string) => {
        if (comment.email === user.email) {
            return true;
        } else if (type === 'yes') {
            return comment.votes.some((vote: IVote) => vote.email === user.email && vote.isHelpful);
        } else {
            return comment.votes.some((vote: IVote) => vote.email === user.email && !vote.isHelpful);
        }
    }

    const getNrOfVotes = (comment: IComment, isHelpful: boolean) => {
        return comment.votes.filter((vote: IVote) => vote.isHelpful === isHelpful).length;
    }

    const removeComment = (comment: IComment) => {
        confirmAlert({
            title: 'Confirmation',
            message: 'Are you sure you want to remove this comment?',
            buttons: [
              {
                label: 'Yes, I want to remove it.',
                onClick: () => {
                    deleteCommentById(comment._id)
                        .then(response => {
                            console.log('The comment has been removed successfully.');
                            comments = comments.filter((c: IComment) => c._id !== comment._id);
                            setComments(comments);
                        })
                }
              },
              {
                label: "No, I don't want to remove it.",
                onClick: () => {
                    
                }
              }
            ]
          });
    }

    const writeReview = () => {
        if (isUserSignedIn()) {
            setModalShow(true);
        }
    }

    useEffect(() => {
        if (cardDetails && cardDetails._id) {
            getCommentsByCardId(cardDetails._id)
                .then(comments => {
                    setComments(comments);
                })
        }
    }, [cardDetails]);

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
                            onClick={() => writeReview()}
                            variant="outline-primary"
                        >
                            Write a Review
                        </WriteReviewButton>
                        {
                            isUserSignedIn() ?
                                null :
                                <Alert style={{width: "100%", marginRight: "24px", textAlign: "center"}} variant={'danger'}>
                                    You must be signed in to be able to write a review.
                                </Alert>
                        }
                    </Row>
                </Col>
                <Col style={{borderLeft: "1px solid #D3D3D3"}}>
                    <Row>
                        <Col>
                            <div>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                (5 stars) <ProgressBar style={{marginTop: "8px", marginBottom: "22px"}} now={getPercentage(5)} label={`${getPercentage(5)}%`} />
                            </div>
                            <div>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                (4 stars) <ProgressBar style={{marginBottom: "20px"}} now={getPercentage(4)} label={`${getPercentage(4)}%`} />
                            </div>
                            <div>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                (3 stars) <ProgressBar style={{marginBottom: "20px"}} now={getPercentage(3)} label={`${getPercentage(3)}%`} />
                            </div>
                            <div>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                (2 stars) <ProgressBar style={{marginBottom: "20px"}} now={getPercentage(2)} label={`${getPercentage(2)}%`} />
                            </div>
                            <div>
                                <i className="fa fa-star"></i>
                                (1 stars) <ProgressBar style={{marginBottom: "20px"}} now={getPercentage(1)} label={`${getPercentage(1)}%`} />
                            </div>
                        </Col>
                    </Row>
                </Col>
            </RatingWrapper>
            {
                comments.map((comment: IComment, index: number) => {
                    return (
                        <CommentItem key={comment._id}>
                            <Col>
                                <CommentTitle>{comment.title}</CommentTitle>
                                {
                                    [...Array(comment.stars)].map((element: number) => <i key={comment.date + Math.random()} className="fa fa-star"></i>)
                                }
                                <CommentDate>{comment.date}</CommentDate>
                                <CommentUsername>{comment.username}</CommentUsername>
                                {
                                    (user && user.email === comment.email) ?
                                        <RemoveComment onClick={() => removeComment(comment)}> Remove your comment</RemoveComment> :
                                        null
                                }
                            </Col>
                            <Col>
                                {
                                    (user && user.email === comment.email) ?
                                        <EditIcon className="fa fa-edit" onClick={() => editExistingComment(comment)}></EditIcon> :
                                        null
                                }
                                <CommentMessage>{comment.message}</CommentMessage>
                                <WasThisHelpful>
                                    Was this review helpful to you?
                                    <Form>
                                        <Form.Check
                                            checked={isCheckBoxChecked(comment, 'yes')}
                                            custom
                                            disabled={isCheckboxDisabled(comment, 'yes')}
                                            id={`${index}-yes`}
                                            label={`Yes (${getNrOfVotes(comment, true)})`}
                                            onClick={(event: any) => checkBoxValueChange(comment, 'yes')}
                                            type={'checkbox'}
                                        />
                                        <Form.Check
                                            checked={isCheckBoxChecked(comment, 'no')}
                                            custom
                                            disabled={isCheckboxDisabled(comment, 'no')}
                                            id={`${index}-no`}
                                            label={`No (${getNrOfVotes(comment, false)})`}
                                            onClick={(event: any) => checkBoxValueChange(comment, 'no')}
                                            type={'checkbox'}
                                        />
                                    </Form>
                                </WasThisHelpful>
                            </Col>
                        </CommentItem>
                    )
                })
            }
            {
                comments.length ?
                    null :
                    <NoCommentsWrapper>
                        <NoCommentsParagraph>
                            There are no comments yet.
                            <BeTheFirst onClick={() => setModalShow(true)}> Be the first to comment</BeTheFirst>
                            <ArrowTopLeft src="/images/diag-arrow-left.png" />
                        </NoCommentsParagraph>
                    </NoCommentsWrapper>

            }
            {
                modalShow && (
                    <RatingModal
                        cardDetails={cardDetails}
                        comments={comments}
                        commentToModify={commentToModify}
                        setCommentToModify={setCommentToModify}
                        setComments={setComments}
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    />
                )
            }
            
        </div>
    );
}

export default RatingsAndReviews;