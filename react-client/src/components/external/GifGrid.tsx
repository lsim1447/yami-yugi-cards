import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Col, Image, Row } from 'react-bootstrap';

const CustomGIF = styled(Image) `
    height: 100%;
    max-height: 500px;
    width: 100%;
`;

type GifProps = {
    gif1_url: string,
    gif2_url: string
}

const GifGrid = ({gif1_url, gif2_url}: GifProps) => {
    return (
        <Row>
            <Col>
                <CustomGIF 
                    className="lazyload"
                    src={gif1_url}
                />
            </Col>
            <Col>
                <CustomGIF
                    className="lazyload"
                    src={gif2_url}
                />
            </Col>
        </Row>
    );
}

export default GifGrid;