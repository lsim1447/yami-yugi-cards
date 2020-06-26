import React from 'react';
import { Col, Container, Jumbotron, Row } from 'react-bootstrap';
import styled from 'styled-components';

const LeftCol = styled(Col) `
    background: url(/images/home-page-video-left-col.jpg) top center;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    
    @media (max-width: 992px) {
        display: none;
    }
`;

const CenterCol = styled(Col) `
    @media (max-width: 992px) {
        width: 100%;
        flex: 0 0 100%;
        max-width: 100%;
    }
`;

const RightCol = styled(Col) `
    background: url(/images/home-page-video-right-col.jpg) top center;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    
    @media (max-width: 992px) {
        display: none;
    }
`;

const ExodiaVideoWrapper = styled(Row) `
    height: 100%;
    width: 100%;
`;

const CustomIFrame = styled.iframe `
    margin-top: 36px;
    min-height: 85vh;
    width: 100%;
`;

const Title = styled.h1 `
    font-size: 48px;
    font-weight: 800;
    text-align: center;
`;

const Kaiba_vs_Yugi = () => (
        <ExodiaVideoWrapper>
            <LeftCol sm={2}></LeftCol>
            <CenterCol sm={8}>
                <Jumbotron fluid>
                    <Container>
                        <Title>Kaiba vs Yugi</Title>
                        <p>
                            Let’s face it: 4Kids Entertainment botched the English dubs of a lot of animes. One of these was the Yu-Gi-Oh series. Aside from the OBVIOUS violent, religious and sexual scene/script changes, censors, and flat-out omissions (i.e. finger guns, the creation of the fictitious “Shadow Realm” to censor Death, the removal of blood, crosses/crucifixes, punches, guns/knives, etc.), they completely changed the motives and/or backstories of some of the characters (mainly Kaiba, Mai, Pegasus, Marik and the members of Doma), the exciting original soundtrack was thrown overboard for a more ambient soundtrack and intros ("It's time to Duel!"), the editing was bad (text removal, card design, different graphics/sound effects, etc.), the "humor" was just god-awful, and, worst of all, the voice acting was half-assed and as if the actors didn't really care about this show. As a result of this carelessness and other scandals, 4Kids Entertainment Inc. officially filed for Chapter 11 bankruptcy in 2011, but resurfaced again in 2012 under the new name 4K Media Inc., and became a branch of Konami. 
                        </p>
                    </Container>
                </Jumbotron>
                <CustomIFrame
                    frameBorder='0'
                    allow='autoplay; encrypted-media'
                    allowFullScreen
                    title='video'
                    src="https://www.youtube.com/embed/UtVHpY-oU4Y?autoplay=0&fs=1&iv_load_policy=3&showinfo=1&rel=0&cc_load_policy=1&start=&end=0&origin=https://youtubeembedcode.com">
                </CustomIFrame>
            </CenterCol>
            <RightCol sm={2}></RightCol>
        </ExodiaVideoWrapper>
);

export default Kaiba_vs_Yugi;