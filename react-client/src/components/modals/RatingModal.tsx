import React, { useContext, useState, useEffect } from 'react';
import { Button, Card, Col, Carousel, Form, Modal, Tabs, Tab } from 'react-bootstrap';
import { ICardDetails } from '../models/Cards';
import  { UserContext }  from "../../contexts/UserContext";
import { IComment, DEFAULT_COMMENT_VALUE } from '../models/Comment';
import { saveComment } from '../../repositories/CommentRepository';
import styled from 'styled-components';


type RatingModalProps = {
  cardDetails?: ICardDetails,
  comments: IComment[],
  setComments: any,
  onHide: any,
  show: boolean,
}

function RatingModal(props: RatingModalProps) {
  const {
    cardDetails,
    comments,
    setComments,
    onHide,
    show
  } = props;
  
  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState(user.email);
  const [stars, setStars] = useState('5');
  const [title, setTitle] = useState('');
  const [userName, setUserName] = useState(user.username);
  const [commentMsg, setCommentMsg] = useState('');

  const sendComment = () => {
    const newComment: IComment = DEFAULT_COMMENT_VALUE;
    newComment.cardId = (cardDetails && cardDetails._id) ? cardDetails._id : '5ebc4b9b221c162fa4dcaeb3';
    newComment.date = new Date();
    newComment.email = email;
    newComment.message = commentMsg;
    newComment.stars = Number(stars);
    newComment.title = title;
    newComment.username = userName;

    saveComment(newComment)
      .then(savedComment => {
        comments.push(savedComment)
        setComments(comments);
        setEmail('');
        setStars('5');
        setTitle('');
        setCommentMsg('');
        onHide(true);
      })
      .catch(error => {
        console.log('Error: ', error);
      })
  }

  useEffect(() => {
    setEmail(user.email);
    setUserName(user.username);
  }, [user]);

  return (
    <Modal animation={true} show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title> About the {cardDetails ? cardDetails.name : ''} </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formTitle">
            <Form.Label>Comment title</Form.Label>
            <Form.Control
              onChange={(event) => setTitle(event.target.value)}
              value={title}
              placeholder="Type here the title"
              required
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              disabled
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              value={email}
              placeholder="Enter email"
              required
            />
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col} controlId="formUserName">
              <Form.Label>Username</Form.Label>
              <Form.Control
                disabled
                value={userName}
                placeholder="Type here your username"
                required
              />
            </Form.Group>

            <Form.Group as={Col} controlId="exampleForm.ControlSelect1">
              <Form.Label>Your rate (stars)</Form.Label>
              <Form.Control
                as="select"
                onChange={(event) => setStars(event.target.value)}
                value={stars}
              >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>
          

          <Form.Group controlId="formReviewMessage">
            <Form.Label>Message</Form.Label>
            <Form.Control
              onChange={(event) => setCommentMsg(event.target.value)}
              value={commentMsg}
              placeholder="Type here your opinion"
              required
            />
          </Form.Group>

          <Button
            style={{width: "100%"}}
            variant="primary"
            type="button"
            onClick={() => sendComment()}
          >
            Submit your comment
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>

      </Modal.Footer>
    </Modal>
  );
}

export default RatingModal;