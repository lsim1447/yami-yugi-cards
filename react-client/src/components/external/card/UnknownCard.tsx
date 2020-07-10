import React from 'react';
import { Card } from 'react-bootstrap';

const UnknownCard = () => 
    <Card>
        <Card.Img className="lazyload" variant="top" data-src="/images/yugioh-card-back-side.jpg" />
        <Card.Body>
            <Card.Title> No title </Card.Title>
            <Card.Text> No description </Card.Text>
        </Card.Body>
        <Card.Footer>
            <small className="text-muted"> No note </small>
        </Card.Footer>
    </Card>

export default UnknownCard;