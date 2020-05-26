import React from 'react';
import { Card } from 'react-bootstrap';

const UnknownCard = () => 
    <Card>
        <Card.Img className="lazyload" variant="top" data-src="https://cdn11.bigcommerce.com/s-ebhaloj/images/stencil/1280x1280/products/6750/12455/KOIYGSLEEVE__99423.1567709419.jpg?c=2&imbypass=on" />
        <Card.Body>
            <Card.Title> No title </Card.Title>
            <Card.Text> No description </Card.Text>
        </Card.Body>
        <Card.Footer>
            <small className="text-muted"> No note </small>
        </Card.Footer>
    </Card>

export default UnknownCard;