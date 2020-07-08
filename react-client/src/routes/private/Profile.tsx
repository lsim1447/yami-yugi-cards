import React, { useContext, useEffect, useState } from 'react';
import { HideOverlaysContext }  from "../../contexts/HideOverlaysContext";
import { UserContext } from "../../contexts/UserContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Alert, Col, Form, Row } from 'react-bootstrap';
import { IComment, IVote } from '../../models/Comment';
import { ICardDetails } from '../../models/Cards';
import { getCommentsByUserEmail } from '../../repositories/CommentRepository';
import { findAllCardsByIds } from '../../repositories/CardRepository';
import {
    getUserByEmailAndPassword,
    updateUserById
} from '../../repositories/UserRepository';
import { IUser } from '../../models/User';
import styled from 'styled-components';

const ProfileWrapper = styled.div `
    background: url(/images/ProfileBackground.jpg) fixed;
    background-color: ${props => (props && props.theme && props.theme.backgroundColor) ? props.theme.backgroundColor : '#FFFFFF'};
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    color: ${props => (props && props.theme && props.theme.color) ? props.theme.color : '#000000'};
    font-family: "poppins", sans-serif;
    overflow-x: hidden;
    min-height: 100vh;
    padding-bottom: 50px;
    padding-top: 50px;
    transition: all .6s ease-in-out;

    @media(max-width: 467px) {
        margin: 0;
        padding-top: 0px;
    }
`;

const ProfileHeader = styled.div `
    background-color: ${props => (props && props.theme && props.theme.backgroundColor) ? props.theme.backgroundColor : '#FFFFFF'};
    box-shadow: 0px 3px 4px rgba(0, 0, 0, .2);
    color: ${props => (props && props.theme && props.theme.color) ? props.theme.color : '#000000'};
    display: flex;
    height: 190px;
    position: relative;
    transition: all .6s ease-in-out;
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
        width: 100%;
    }
`;

const ProfileImage = styled.img `
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
    width: 40px;

    &:hover {
        background: #FFFFFF;
        border: 1px solid #E40046;
    }

    @media(max-width: 467px) {
        height: 30px;
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
    background-color: ${props => (props && props.theme && props.theme.backgroundColor) ? props.theme.backgroundColor : '#FFFFFF'};
    box-shadow: 0px 3px 5px rgba(0, 0, 0, .2);
    color: ${props => (props && props.theme && props.theme.color) ? props.theme.color : '#000000'};
    font-family: "Bree Serif", serif;
    margin-left: 10px;
    min-height: 80vh;
    padding: 90px 30px 20px;
    transition: all .6s ease-in-out;
    z-index: 99;
    width: 300px;

    p {
        font-size: 14px;
        margin-bottom: 7px;

        i {
            margin-right: 10px;
        }
    }

    @media (max-width: 900px) {
        margin: 5px 0px;
        padding: 20px;
        width: 100%;
        text-align: center;
        width: 100% !important;
    }

    @media(max-width: 1100px) {
        padding: 90px 15px 20px;
        width: 250px;
    }
`;

const LeftSide = styled.div `
    height: 100%;

    @media (max-width: 900px) {
        width: 100% !important;
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
    font-family: "Segoe UI", Arial,sans-serif;
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
    font-weight: 600;
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
        background-color: ${props => (props && props.theme && props.theme.backgroundColor) ? props.theme.backgroundColor : '#FFFFFF'};
        border-top: 1px solid #D3D3D3;
        box-shadow: 0px 2px 5px rgba(0, 0, 0, .3);
        color: ${props => (props && props.theme && props.theme.color) ? props.theme.color : '#000000'};
        display: flex;
        font-weight: 600;
        height: 40px;
        justify-content: center;
        list-style-type: none;
        transition: all .6s ease-in-out;
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
    background-color: ${props => (props && props.theme && props.theme.backgroundColor) ? props.theme.backgroundColor : '#FFFFFF'};
    color: ${props => (props && props.theme && props.theme.color) ? props.theme.color : '#000000'};
    display: none;
    padding: 20px;
    width: 100%;
    text-align: center;
    transition: all .6s ease-in-out;
`;

const RightSide = styled.div `
    width: 100%;
`;

const ReviewsSection = styled(Row) `

`;

const ReviewItem = styled(Row) `
    border-bottom: 1px solid #D3D3D3;
    margin-left: 18px;
    margin-right: 18px;
    padding: 18px 18px;
    width: 100%;
`;

const ReviewCol = styled(Col) `
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ReviewCardName = styled.p `
    font-size: 16px;
    font-weight: 600;
`;

const ReviewCardImage = styled.img `
    max-width: 200px;
    max-height: 250px;
`;

const ReviewDate = styled.p `
    font-size: 14px;
    padding-top: 12px;
`;

const ReviewMessage = styled.p `
    padding-top: 20px;
`;

const ReviewTitle = styled.p `
    font-weight: 600;
`;

const ReviewLikeWrapper = styled.p `
    border-top: 1px solid #D3D3D3;
    margin-top: 36px;
    padding-top: 36px;

    i {
        color: #E40046;
        font-size: 22px;
        margin-right: 6px;
    }

    sub {
        font-size: 14px;
    }
`;

const SavePasswordTitle = styled.p `
    font-size: 24px;
    font-weight: 600;
    padding: 12px 18px 0px 18px;
`;

function Profile() {
    const { activeTheme } = useContext(ThemeContext);
    const { hideAllOverlays } = useContext(HideOverlaysContext);
    const { user } = useContext(UserContext);
    const [comments, setComments] = useState<IComment[]>([]);
    const [cards, setCards] = useState<ICardDetails[]>([]);
    const [currentPassword, setCurrentPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [newPasswordRepeat, setNewPasswordRepeat] = useState<string>('');
    const [isSomethingWrong, setIsSomethingWrong] = useState<boolean>(false);
    const [isPasswordChangingWentWell, setIsPasswordChangingWentWell] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

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

    const changePassword = () => {
        setIsSomethingWrong(false);
        if (!currentPassword.length || !newPassword.length || !newPasswordRepeat.length) {
            setErrorMessage('You must fill the input fields above before changing your password!')
            setIsSomethingWrong(true);
        } else if (newPassword !== newPasswordRepeat) {
            setErrorMessage('The content of the new password fields must match!')
            setIsSomethingWrong(true);
        } else {
            getUserByEmailAndPassword(user.email, currentPassword)
                .then(response => {
                    if (!response.length) {
                        setErrorMessage('The current password is wrong!')
                        setIsSomethingWrong(true);
                    } else {
                        const newUser: IUser = Object.create(user);
                        newUser.password = newPassword;
                        
                        updateUserById(newUser)
                            .then(response => {
                                console.log(response);
                                setCurrentPassword('');
                                setNewPassword('');
                                setNewPasswordRepeat('');

                                setErrorMessage('Password has been updated successfully!');
                                setIsPasswordChangingWentWell(true);

                                setTimeout(() => {
                                    setIsPasswordChangingWentWell(false);
                                    setErrorMessage('');
                                }, 3000);
                            })
                    }
                })
        }
    }

    useEffect(() => {
        changeTab(0);
        getCommentsByUserEmail(user.email)
            .then(userComments => {
                setComments(userComments);
                
                const cardIDs: string[] = userComments.map((comment: IComment) => comment.cardId);

                findAllCardsByIds(cardIDs)
                    .then(cards => {
                        setCards(cards);
                    })
            })
    }, [user]);
    
    return (
        <ProfileWrapper theme={activeTheme} onClick={() => hideAllOverlays()}>
            <div className="container">
                <ProfileHeader theme={activeTheme} style={{backgroundColor: activeTheme.itemBackgroundColor}}>
                    <ProfileImageContainer>
                        <ProfileImage
                            theme={activeTheme}
                            alt=""
                            src="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.0-9/50301926_2008315502577520_6292845245826596864_o.jpg?_nc_cat=108&_nc_sid=09cbfe&_nc_ohc=W1h3tRUxJ_YAX-4NbZt&_nc_ht=scontent.fsbz1-2.fna&oh=f7dd068014a8c7f25ffad13c33e64997&oe=5F24D323"
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
                            <AlertMessage>0</AlertMessage>
                        </Notification>
                    </ProfileOption>
                </ProfileHeader>
                <MainBD>
                    <LeftSide>
                        <ProfileSide theme={activeTheme} style={{backgroundColor: activeTheme.itemBackgroundColor}}>
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
                                    { getPercentageOfTheHelpfulComments().toFixed(2) }
                                </h3>
                                <Rate>
                                    <div className="stars">
                                        {
                                            [...Array(Math.round(getPercentageOfTheHelpfulComments()))].map((element, index) => <i key={index} className="fa fa-star"></i>)
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
                    </LeftSide>
                    <RightSide>
                        <Nav className="nav" theme={activeTheme}>
                            <ul style={{marginBottom: "0px"}}>
                                <li onClick={() => changeTab(0)}> About </li>
                                <li onClick={() => changeTab(1)}> Reviews </li>
                                <li onClick={() => changeTab(2)}> Settings </li>
                            </ul>
                        </Nav>
                        <ProfileBody>
                            <Tab theme={activeTheme} className="tab">
                                <h1> About the game</h1>
                                <p>
                                    Yu-Gi-Oh![a] is a Japanese manga series about gaming written and illustrated by Kazuki Takahashi. It was serialized in Shueisha's Weekly Shōnen Jump magazine between September 30, 1996 and March 8, 2004. The plot follows the story of a boy named Yugi Mutou, who solves the ancient Millennium Puzzle. Yugi awakens a gambling alter-ego within his body that solves his conflicts using various games.
                                    Two anime adaptations were produced; one by Toei Animation, which aired from April 4, 1998 to October 10, 1998,[2] and another produced by NAS and animated by Studio Gallop titled Yu-Gi-Oh! Duel Monsters, which aired between April 2000 and September 2004. The manga series has spawned a media franchise that includes multiple spin-off manga and anime series, a trading card game, and numerous video games. Most of the incarnations of the franchise involve the fictional trading card game known as Duel Monsters, where each player uses cards to "duel" each other in a mock battle of fantasy "monsters". This forms the basis for the real life Yu-Gi-Oh! Trading Card Game. As of 2018, Yu-Gi-Oh is one of the highest-grossing media franchises of all time.
                                    Yu-Gi-Oh! tells the tale of Yugi Mutou, a timid young boy who loves all sorts of games, but is often bullied around. One day, he solves an ancient puzzle known as the Millennium Puzzle (千年パズル, Sennen Pazuru), causing his body to play host to a mysterious spirit with the personality of a gambler. From that moment onwards, whenever Yugi or one of his friends is threatened by those with darkness in their hearts, this other Yugi shows himself and challenges them to dangerous Shadow Games (闇のゲーム, 
                                    Yami no Gēmu, lit. "Games of Darkness") which reveal the true nature of someone's heart, the losers of these contests often being subjected to a dark punishment called a Penalty Game (罰ゲーム, Batsu Gēmu). Whether it be cards, dice, or role-playing board games, he will take on challenges from anyone, anywhere. As the series progresses, Yugi and his friends learn that this person inside of his puzzle is actually the spirit of a nameless Pharaoh from Ancient Egyptian times, who had lost his memories. As Yugi and his companions attempt to help the Pharaoh regain his memories, they find themselves going through many trials as they wager their lives facing off against gamers that wield the mysterious Millennium Items (千年アイテム, Sennen Aitemu) and the dark power of the Shadow Games.
                                </p>
                            </Tab>
                            <Tab theme={activeTheme} className="tab">
                                <h1> Your Reviews</h1>
                                <ReviewsSection>
                                    {
                                        comments.map((comment: IComment, index: number) => {
                                            return (
                                                <ReviewItem key={comment._id} href={`/card/${cards[index]?._id}`}>
                                                    <Col sm={4}>
                                                        <ReviewCardName> {cards[index]?.name} </ReviewCardName>
                                                        <a href={`/card/${cards[index]?._id}`}>
                                                            <ReviewCardImage src={cards[index]?.card_images[0].image_url} alt="" />
                                                        </a>
                                                    </Col>
                                                    <ReviewCol sm={4}>
                                                        <div>
                                                            <ReviewTitle> {comment.title} </ReviewTitle>
                                                            <ReviewMessage> {comment.message} </ReviewMessage>
                                                        </div>
                                                    </ReviewCol>
                                                    <ReviewCol sm={4}>
                                                        <div>
                                                            <p>Your rated this card with:</p>
                                                            {
                                                                [...Array(comment.stars)].map((element, index) => <i key={index} style={{color: "#E40046"}} className="fa fa-star"></i>)
                                                            }
                                                            <ReviewLikeWrapper>
                                                                <i className="fa fa-thumbs-up" aria-hidden="true">
                                                                    <sub>
                                                                        {comment.votes.filter((vote: IVote) => vote.isHelpful).length}
                                                                    </sub>
                                                                </i>
                                                                <i className="fa fa-thumbs-down" aria-hidden="true">
                                                                    <sub>
                                                                        {comment.votes.filter((vote: IVote) => !vote.isHelpful).length}
                                                                    </sub>
                                                                </i>
                                                            </ReviewLikeWrapper>
                                                            <p>(Reactions on your comment)</p>
                                                            <ReviewDate>
                                                                {comment.date}
                                                            </ReviewDate>
                                                        </div>
                                                    </ReviewCol>
                                                </ReviewItem>
                                            );
                                        })
                                    }
                                </ReviewsSection>
                            </Tab>
                            <Tab theme={activeTheme} className="tab">
                                <h1> Account Settins </h1>
                                <p>
                                    The <strong style={{fontSize: "16px"}}>privacy policy</strong> is one of the most essential legal requirements for websites.
                                    Even if you just have a small business or a blog with no income at all, you might be surprised to discover that you still need a privacy policy.
                                    Basically, if your website collects personal data, you need a privacy policy that informs your users about this according to privacy laws in most jurisdictions, including the EU and the US.
                                    Almost all modern websites function with the use of cookies, so chances are high that your website is collecting personal data, for example for statistical, functional or marketing purposes.
                                </p>
                                <SavePasswordTitle>Want to change you password?</SavePasswordTitle>
                                <Form>
                                    <Form.Group controlId="currentPassword">
                                        <Form.Control type="password" placeholder="Current Password" value={currentPassword} required onChange={(e) => setCurrentPassword(e.target.value)}/>
                                    </Form.Group>
                                    <Form.Group controlId="newPassword1">
                                        <Form.Control type="password" placeholder="New Password" value={newPassword} required onChange={(e) => setNewPassword(e.target.value)}/>
                                    </Form.Group>
                                    <Form.Group controlId="newPassword2">
                                        <Form.Control type="password" placeholder="Repeat your new Password" value={newPasswordRepeat} required onChange={(e) => setNewPasswordRepeat(e.target.value)}/>
                                    </Form.Group>
                                    <CustomButton type="button" onClick={() => changePassword()}>
                                        Change password
                                    </CustomButton>
                                    {
                                        isSomethingWrong ?
                                            <Alert variant={'danger'}>
                                                { errorMessage }
                                            </Alert> :
                                            null
                                    }
                                    {
                                        isPasswordChangingWentWell ?
                                            <Alert variant={'success'}>
                                                { errorMessage }
                                            </Alert> :
                                        null
                                    }
                                </Form>
                            </Tab>
                        </ProfileBody>
                    </RightSide>
                </MainBD>
            </div>
        </ProfileWrapper>
    );
}

export default Profile;