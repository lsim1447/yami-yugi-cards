import React, { useContext, useState, useEffect } from 'react';
import { Button, Col, Form, Modal } from 'react-bootstrap';
import { ICardDetails } from '../models/Cards';
import  { UserContext }  from "../../contexts/UserContext";
import { IComment, DEFAULT_COMMENT_VALUE } from '../models/Comment';
import {
  saveComment,
  updateComment
} from '../../repositories/CommentRepository';

type RatingModalProps = {
  cardDetails?: ICardDetails,
  comments: IComment[],
  commentToModify?: IComment,
  setCommentToModify?: any,
  setComments: any,
  onHide: any,
  show: boolean,
}

function RatingModal(props: RatingModalProps) {
  const {
    cardDetails,
    commentToModify,
    setCommentToModify,
    setComments,
    onHide,
    show
  } = props;
  let { comments } = props;
  
  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState(user.email);
  const [stars, setStars] = useState('5');
  const [title, setTitle] = useState('');
  const [userName, setUserName] = useState(user.username);
  const [commentMsg, setCommentMsg] = useState('');

  const sendComment = () => {
    const newComment: IComment = DEFAULT_COMMENT_VALUE;

    newComment._id = commentToModify ? commentToModify._id : '';
    newComment.cardId = (cardDetails && cardDetails._id) ? cardDetails._id : '5ebc4b9b221c162fa4dcaeb3';
    newComment.date = new Date();
    newComment.email = email;
    newComment.message = commentMsg;
    newComment.stars = Number(stars);
    newComment.title = title;
    newComment.username = userName;
    newComment.votes = commentToModify ? commentToModify.votes : [];

    if (commentToModify && commentToModify._id) {
      updateComment(newComment)
        .then(response => {
          comments = comments.map((c: IComment) => {
            if (newComment._id === c._id) {
              c.message = newComment.message;
              c.title = newComment.title;
              c.stars = newComment.stars;  
            }
            return c;
          })
          setCommentToModify(null);
          setComments(comments);
          onHide(true);
        })
    } else {
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
  }

  useEffect(() => {
    setEmail(user.email);
    setUserName(user.username);
  }, [user]);
  
  useEffect(() => {
    if (commentToModify) {
      setCommentMsg(commentToModify.message);
      setTitle(commentToModify.title);
      setStars(commentToModify.stars + '');
    }
  }, [commentToModify]);

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