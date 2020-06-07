import React, { useContext, useState, useEffect } from 'react';
import { Button, Card, Col, Carousel, Form, Modal, Tabs, Tab } from 'react-bootstrap';
import { ICardDetails } from '../models/Cards';
import styled from 'styled-components';


type RatingModalProps = {
  cardDetails?: ICardDetails,
  onHide: any,
  show: boolean,
}

function RatingModal(props: RatingModalProps) {
  const {
    cardDetails,
    onHide,
    show
  } = props;
  

  useEffect(() => {
    
  }, []);

  return (
    <Modal animation={true} show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title> {cardDetails ? cardDetails.name : ''} </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group controlId="formGridAddress1">
            <Form.Label>Address</Form.Label>
            <Form.Control placeholder="1234 Main St" />
          </Form.Group>

          <Form.Group controlId="formReviewMessage">
            <Form.Label>Message</Form.Label>
            <Form.Control placeholder="Type here your opinion" />
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>City</Form.Label>
              <Form.Control />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>State</Form.Label>
              <Form.Control as="select" defaultValue="Choose...">
                <option>Choose...</option>
                <option>...</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>

          <Form.Group id="formGridCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>

          <Button style={{width: "100%"}} variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>

      </Modal.Footer>
    </Modal>
  );
}

export default RatingModal;