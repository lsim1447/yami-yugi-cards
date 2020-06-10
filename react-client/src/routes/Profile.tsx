import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from "../contexts/UserContext";
import { IComment, IVote } from '../components/models/Comment';
import {
    getCommentsByUserEmail
} from '../repositories/CommentRepository';
import styled from 'styled-components';


const ProfileWrapper = styled.div `
    background: #E9E9E9;
    font-family: "poppins", sans-serif;
    overflow-x: hidden;
    min-height: 80vh;
    padding-top: 90px;

    @media(max-width: 467px) {
        margin: 0;
    }
`;

const ProfileHeader = styled.div `
    background: #FFFFFF;
    box-shadow: 0px 3px 4px rgba(0, 0, 0, .2);
    display: flex;
    height: 190px;
    position: relative;
    width: 100%;

    @media (max-width: 900px) {
        display: flex;
        flex-direction: column;
        height: 100%;
        padding-bottom: 20px;
        text-align: center;
    }

    @media(max-width: 467px) {
        h3 {
            font-size: 1.7rem;
        }
        p {
            font-size: .9rem;
        }
    }
`;

const ProfileImageContainer = styled.div `
    float: left;
    height: 200px;
    width: 340px;

    @media (max-width: 900px) {
        float: left;
        height: 200px;
        width: 100%;
    }
`;

const ProfileImage = styled.img `
    background: #FFFFFF;
    border-radius: 50%;
    border: 4px solid #FFFFFF;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, .2);
    height: 230px;
    left: 50px;
    position: absolute;
    top: 20px;
    z-index: 5;
    width: 230px;

    @media(max-width: 1100px) {
        height: 200px;
        left: 50px;
        top: 50px;
        width: 200px;
    }

    @media (max-width: 900px) {
        left: 0;
        position: relative;
    }
`;

const ProfileNavInfo = styled.div `
    float: left;
    flex-direction: column;
    justify-content: center;
    padding-top: 60px;

    h3 {
        font-variant: small-caps;
        font-size: 2rem;
        font-family: sans-serif;
        font-weight: bold;
    }

    @media (max-width: 900px) {
        text-align: center;
    }
`;

const Address = styled.div `
    color: #777777;
    display: flex;
    font-weight: bold;

    p {
        margin-right: 5px;
    }

    @media (max-width: 900px) {
        justify-content: center;
    }
`;

const ProfileOption = styled.div `
    align-items: center;
    background: #E40046;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    height: 40px;
    outline: none;
    position: absolute;
    right: 50px;
    top: 50%;
    transform: translateY(-50%);
    transition: all .5s ease-in-out;
    width: 40px;

    &:hover {
        background: #FFFFFF;
        border: 1px solid #E40046;
    }

    @media(max-width: 467px) {
        height: 30px;
        position: absolute;
        right: 15px;
        top: 83%;
        width: 30px;
    }

    @media (max-width: 900px) {
        right: 20px;
        top: 75%;
        transform: translateY(50%);
    }
`;

const Notification = styled.div `
    i {
        color: #FFFFFF;
        font-size: 1.2rem;
        transition: all .5s ease-in-out;
    }

    &:hover {
        i {
            color: #E40046;
        }
    }
`;

const AlertMessage = styled.span `
    align-items: center;
    background: #FFFFFF;
    border: 1px solid;
    border-radius: 50%;
    color: #E40046;
    display: flex;
    font-size: .8rem;
    font-weight: bold;
    height: 20px;
    justify-content: center;
    padding: 5px;
    position: absolute;
    right: -5px;
    top: -5px;
    width: 20px;

    @media(max-width: 467px) {
        font-size: .7rem;
        height: 15px;
        padding: 4px;
        right: -4px;
        top: -3px;
        width: 15px;
    }
`;

const MainBD = styled.div `
    display: flex;
    padding-right: 15px;
    width: 100%;

    @media (max-width: 900px) {
        flex-direction: column;
        padding-right: 0px;
    }
`;

const ProfileSide = styled.div `
    background: #FFFFFF;
    box-shadow: 0px 3px 5px rgba(0, 0, 0, .2);
    font-family: "Bree Serif", serif;
    padding: 90px 30px 20px;
    margin-left: 10px;
    z-index: 99;
    width: 300px;

    p {
        color: #333333;
        font-size: 14px;
        margin-bottom: 7px;

        i {
            color: #E40046;
            margin-right: 10px;
        }
    }

    @media (max-width: 900px) {
        margin: 5px 0px;
        padding: 20px;
        width: 100%;
        text-align: center;
    }

    @media(max-width: 1100px) {
        padding: 90px 15px 20px;
        width: 250px;
    }
`;

const AccountBalance = styled.p `
    font-size: 22px !important;
    font-weight: 600;

    ::after {
        content: " $";
    }
`;

const CardsInDeckWrapper = styled.p `
    color: #666666 !important;
    font-family: "Segoe UI",Arial,sans-serif;
    font-size: 16px !important;
    font-weight: 550;
    position: relative;
    text-align: center;
    top: -10px;
`;

const CardsInDeck = styled.span `
    font-size: 50px !important;
    position: relative;
    top: 10px;
`;

const MobileNumber = styled.p `
    i {
        transform: rotateY(180deg);
    }
`;

const ProfileBtn = styled.div `
    display: flex;
`;

const CustomButton = styled.button `
    background: #E40046;
    border: 0;
    border-radius: 3px;
    box-shadow: 0px 5px 7px 0px rgba(0, 0, 0, .3);
    cursor: pointer;
    font-family: "Bree Serif", serif;
    font-size: 1rem;
    margin: 5px 2px;
    margin-bottom: 10px;
    outline: none;
    padding: 10px;
    transition: background .3s ease-in-out;
    width: 100%;

    i {
        margin-right: 5px;
    }

    &:hover {
        background: rgba(288, 0, 70, .9);
    }
`;

const UserRating = styled.div `
    display: flex;

    h3 {
        color: #666666;
        font-size: 2.5rem;
        font-weight: 200;
        letter-spacing: 1px;
        margin-right: 5px;
    }

    @media (max-width: 900px) {
        justify-content: center;
    }
`;

const NoUser = styled.span `
    font-size: .9rem;
`;

const Rate = styled.div `
    padding-top: 6px;

    i {
        color: #E40046;
        font-size: .9rem;
    }
`;

const Nav = styled.div `
    width: 100%;
    z-index: -1;

    ul {
        background: #FFFFFF;
        box-shadow: 0px 2px 5px rgba(0, 0, 0, .3);
        display: flex;
        height: 40px;
        justify-content: center;
        list-style-type: none;
        width: 100%;

        li {
            cursor: pointer;
            padding: 10px;
            text-align: center;
            transition: all .2s ease-in-out;
            width: 100%;
        }
    }
`;

const ProfileBody = styled.div `
    width: 100%;
    z-index: -1;
`;

const Tab = styled.div `
    display: none;
    padding: 20px;
    width: 100%;
    text-align: center;
    transition: all .9s ease-in-out;
`;

function Profile() {
    const { user } = useContext(UserContext);
    const [comments, setComments] = useState<IComment[]>([]);

    const changeTab = (panelIndex: number) => {
        const tab: NodeListOf<Element> = document.querySelectorAll('.tab');
        const navElements: NodeListOf<Element> = document.querySelectorAll('.nav ul li');

        tab.forEach(function(node: any, index: number) {
            if (index === panelIndex) {
                node.style.display = 'block';
            } else {
                node.style.display = 'none';
            }
        });

        navElements.forEach(function(node: any, index: number) {
            if (index === panelIndex) {
                node.style.boxShadow = '0px -3px 0px rgba(288, 0, 70, .9) inset';
            } else {
                node.style.boxShadow = 'none';
            }
        });
    }

    const getPercentageOfTheHelpfulComments = () => {
        const allNumberOfVotesOnUserComments = comments.reduce((acc: number, comment: IComment) => acc + comment.votes.length, 0);

        const allNumberOfHelpfulVotes = comments.reduce((acc: number, comment: IComment) => {
            const helpfulVotes = comment.votes.filter((vote: IVote) => vote.isHelpful).length;

            return acc + helpfulVotes;
        }, 0);

        return  allNumberOfVotesOnUserComments ? 
            allNumberOfHelpfulVotes / allNumberOfVotesOnUserComments * 5 :
            0;
    }

    useEffect(() => {
        changeTab(0);
        getCommentsByUserEmail(user.email)
            .then(userComments => {
                setComments(userComments);
            })
    }, [user]);
    
    return (
        <ProfileWrapper>
            <div className="container">
                <ProfileHeader>
                    <ProfileImageContainer>
                        <ProfileImage
                            alt=""
                            src="https://www.biography.com/.image/c_fit%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_620/MTQ4MDU5NDU0MzgwNzEzNDk0/lionel_messi_photo_josep_lago_afp_getty_images_664928892_resizedjpg.jpg"
                            width="200"
                        />
                    </ProfileImageContainer>
                    <ProfileNavInfo>
                        <h3 className="user-name"> {user.username} </h3>
                        <Address>
                            <p className="state"> {user.address} </p>
                        </Address>
                    </ProfileNavInfo>
                    <ProfileOption>
                        <Notification>
                            <i className="fa fa-bell"></i>
                            <AlertMessage>1</AlertMessage>
                        </Notification>
                    </ProfileOption>
                </ProfileHeader>
                <MainBD>
                    <div className="left-side">
                        <ProfileSide>
                            <AccountBalance>
                                Account Balance: {user.accountBalance.toFixed(2)}
                            </AccountBalance>
                            <MobileNumber>
                                <i className="fa fa-phone"></i>
                                {user.phoneNumber}
                            </MobileNumber>
                            <p className="user-mail">
                                <i className="fa fa-envelope"></i>
                                { user.email }
                            </p>
                            <div className="user-bio">
                                <p className="bio">
                                    We and our partners store and/or access information on a device, such as cookies and process personal data, such as unique identifiers and standard information sent by a device for personalised ads and content, ad and content measurement, and audience insights, as well as to develop and improve products
                                </p>
                            </div>
                            <ProfileBtn>
                                <CustomButton>
                                    <i className="fa fa-comment"></i>
                                    Chat
                                </CustomButton>
                                <CustomButton>
                                    <i className="fa fa-plus"></i>
                                    Create
                                </CustomButton>
                            </ProfileBtn>
                            <UserRating>
                                <h3 className="rating">
                                    { getPercentageOfTheHelpfulComments() }
                                </h3>
                                <Rate>
                                    <div className="stars">
                                        {
                                            [...Array(Math.round(getPercentageOfTheHelpfulComments()))].map(element => <i className="fa fa-star"></i>)
                                        }
                                    </div>
                                    <NoUser>
                                        &nbsp;&nbsp;
                                        <span> {comments.length} </span>
                                        reviews (comments)
                                    </NoUser>
                                </Rate>
                            </UserRating>
                            <CardsInDeckWrapper>
                                <CardsInDeck>
                                    {user.deck.length}
                                </CardsInDeck>
                                card(s) in Deck
                            </CardsInDeckWrapper>
                        </ProfileSide>
                    </div>
                    <div className="right-side">
                        <Nav className="nav">
                            <ul>
                                <li onClick={() => changeTab(0)}> Posts </li>
                                <li onClick={() => changeTab(1)}> Reviews </li>
                                <li onClick={() => changeTab(2)}> Settings </li>
                            </ul>
                        </Nav>
                        <ProfileBody>
                            <Tab className="tab">
                                <h1> Your  Post</h1>
                                <p>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                </p>
                            </Tab>
                            <Tab className="tab">
                                <h1> User Reviews</h1>
                                <p>
                                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                                </p>
                            </Tab>
                            <Tab className="tab">
                                <h1> Account Settins </h1>
                                <p>
                                    There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
                                </p>
                            </Tab>
                        </ProfileBody>
                    </div>
                </MainBD>
            </div>
        </ProfileWrapper>
    );
}

export default Profile;