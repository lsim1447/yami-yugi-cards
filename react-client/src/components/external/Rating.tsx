import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Col, ProgressBar, Row } from 'react-bootstrap';
import { CardProps, ICardDetails } from '../models/Cards';

const RatingWrapper = styled(Row) `
    border-top: 1px solid #D3D3D3;
    border-bottom: 1px solid #D3D3D3;
    margin-top: 36px;
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

const Rating = () => {
  
  useEffect(() => {
    
  }, []);

  return (
    <RatingWrapper>
        <RatingParagraph>
            Ratings & Reviews
        </RatingParagraph>
        <Col>
            <Row>
                <Col>
                    <BigFontWrapper> 89% </BigFontWrapper>
                    would recommend this product.
                </Col>
                <Col>
                    <BigFontWrapper> 4.4 </BigFontWrapper>
                    out of <strong style={{fontSize: "24px"}}>5</strong>
                    <p>198 Reviews</p>
                </Col>
            </Row>
        </Col>
        <Col style={{borderLeft: "1px solid #D3D3D3"}}>
            <Row>
                <Col sm={2}>
                    <p>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                    </p>
                    <p>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                    </p>
                    <p>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                    </p>
                    <p>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                    </p>
                    <p>
                        <i className="fa fa-star"></i>
                    </p>
                    
                </Col>
                <Col sm={10}>
                    <p><ProgressBar style={{marginTop: "8px", marginBottom: "22px"}} now={18} label={`${18}%`} /></p>
                    <p><ProgressBar style={{marginBottom: "20px"}} now={42} label={`${42}%`} /></p>
                    <p><ProgressBar style={{marginBottom: "20px"}} now={25} label={`${25}%`} /></p>
                    <p><ProgressBar style={{marginBottom: "20px"}} now={10} label={`${10}%`} /></p>
                    <p><ProgressBar style={{marginBottom: "20px"}} now={5} label={`${5}%`} /></p>
                </Col>
            </Row>
        </Col>
    </RatingWrapper>
  );
}

export default Rating;