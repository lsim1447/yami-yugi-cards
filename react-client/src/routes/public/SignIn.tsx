import React, { useContext, useState } from 'react';
import {Col, Row } from 'react-bootstrap';
import { UserContext } from "../../contexts/UserContext";
import { FacebookButton } from '../../components/internal/ButtonComponents';
import { DEFAULT_USER_VALUE, IUser } from '../../models/User';
import {
    getUserByEmailAndPassword,
    saveUser,
} from '../../repositories/UserRepository';
import { setSignedUserId } from '../../services/UserService';
import styled from 'styled-components';
import '../../special-styles/signin.css';

const SignInWrapper = styled(Row) `
    min-height: 80vh;
    min-width: 100%;
`;

const Container = styled(Col) `
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 
                0 10px 10px rgba(0,0,0,0.22);
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
    min-height: 80vh;
`;

const TitleWrapper = styled.p `
    font-size: 48px;
    font-weight: 800;
`;

const SignInButton = styled.div `
    border-radius: 20px;
    border: 1px solid #B42D00;
    background-color: #B42D00;
    color: white;
    font-size: 12px;
    font-weight: bold;
    padding: 12px 45px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: transform 80ms ease-in;

    &:active {
        transform: scale(0.95);
    }

    &:focus {
        outline: none;
    }

    &:hover {
        background-color: #EE2D00;
    }
`;

const Button = styled.button `
    border-radius: 20px;
    border: 1px solid #B42D00;
    background-color: #B42D00;
    color: #FFFFFF;
    font-size: 12px;
    font-weight: bold;
    padding: 12px 45px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: transform 80ms ease-in;

    &:active {
        transform: scale(0.95);
    }
    
    &:focus {
        outline: none;
    }

    &:hover {
        background-color: #EE2D00;
    }
`;

const GhostButton = styled(Button) `
	background-color: black;
	border-color: #FFFFFF;
`;

const CustomParagraph = styled.p `
    font-size: 18px;
	font-weight: 700;
	line-height: 20px;
	letter-spacing: 0.5px;
	margin: 20px 0 30px;
`;

const CustomLink = styled.a `
    color: #B42D00;
    font-size: 14px;
    text-decoration: none;
    margin: 15px 0; 
`;

const CustomForm = styled.form `
    background-image: url(https://png.pngitem.com/pimgs/s/205-2050568_yami-yugi-yu-gi-oh-png-transparent-images.png);
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    color: #B42D00;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	padding: 0 50px;
	height: 100%;
	text-align: center;
`;

const CustomInput = styled.input `
    background-color: #eee;
	border: none;
	padding: 12px 15px;
	margin: 8px 0;
	width: 100%;
`;

const CustomSpan = styled.div `
    font-style: italic;
    padding: 16px 0;
`;

const CustomFormContainer = styled.div `
    position: absolute;
	top: 0;
	height: 100%;
	transition: all 0.6s ease-in-out;
`;

const SignUpFormContainer = styled(CustomFormContainer) `
    left: 0;
    width: 50%;
    opacity: 0;
    z-index: 1;
`;

const SignInFormContainer = styled(CustomFormContainer) `
    left: 0;
    width: 50%;
    z-index: 2;
`;

const Overlay = styled.div `
    background: #FF416C;
	background: -webkit-linear-gradient(to right, #B42D00, #B22A00);
	background: linear-gradient(to right, #B42D00, #B22A00);
	background-repeat: no-repeat;
	background-size: cover;
	background-position: 0 0;
	color: #FFFFFF;
	position: relative;
	left: -100%;
	height: 100%;
	width: 200%;
  	transform: translateX(0);
	transition: transform 0.6s ease-in-out;
`;

const OverlayContainer = styled.div `
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: transform 0.6s ease-in-out;
    z-index: 100;
`;

const CustomOverlayPanel = styled.div `
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    top: 0;
    height: 100%;
    width: 50%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
`;

const OverlayLeft = styled(CustomOverlayPanel) `
    background-image: url(https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/84dc13b7-a2e7-4b45-83ec-311e72e82900/dcx3lvi-7ef7d529-3a4f-4844-a3f7-1d85e83f6939.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvODRkYzEzYjctYTJlNy00YjQ1LTgzZWMtMzExZTcyZTgyOTAwXC9kY3gzbHZpLTdlZjdkNTI5LTNhNGYtNDg0NC1hM2Y3LTFkODVlODNmNjkzOS5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.mhIbg2XlsWz5so2KXFGbwpgz_Yq24mAK8_XAf2zd2BU);
    color: black;
    transform: translateX(-20%);
`;

const OverlayRight = styled(CustomOverlayPanel) `
    background-image: url(https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/84dc13b7-a2e7-4b45-83ec-311e72e82900/dcx3lvi-7ef7d529-3a4f-4844-a3f7-1d85e83f6939.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvODRkYzEzYjctYTJlNy00YjQ1LTgzZWMtMzExZTcyZTgyOTAwXC9kY3gzbHZpLTdlZjdkNTI5LTNhNGYtNDg0NC1hM2Y3LTFkODVlODNmNjkzOS5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.mhIbg2XlsWz5so2KXFGbwpgz_Yq24mAK8_XAf2zd2BU);
    color: black;
    right: 0;
	transform: translateX(0);
`;

function SignIn() {
    const { setUser } = useContext(UserContext);
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [userName, setUserName] = useState('');
    

    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    const switchToSignUpPage = () => {
        const container = document.getElementById('container');
        
        if (container) {
            container.classList.add("right-panel-active");
        }
    }

    const switchToSignInPage = () => {
        const container = document.getElementById('container');
        
        if (container) {
            container.classList.remove("right-panel-active");
        }
    }
    
    const signIn = () => {
        getUserByEmailAndPassword(email, password)
            .then((response) => {
                const user: IUser = response[0];
                setUser(user);
                setSignedUserId(user._id);
                window.location.href='/';
            })
            .catch(error => {
                console.log('error = ', error);
            })
    }

    const signInWithFacebook = () => {
        console.log('SIGN IN WITH FACEBOOK');
    }

    const signUp = () => {
        const newUser = DEFAULT_USER_VALUE;
        newUser.address = address;
        newUser.email = email;
        newUser.password = password;
        newUser.phoneNumber = phoneNumber;
        newUser.username = userName;

        saveUser(newUser)
            .then(response => {
                setAddress('');
                setEmail('');
                setPassword('');
                setPhoneNumber('');
                setUserName('');

                if (signInButton && container) {
                    container.classList.remove("right-panel-active");
                }
            })
            .catch(error => {
                console.log('Error = ', error);
            })
    }

    return (
        <SignInWrapper>
            <Container className="container" id="container">
                <SignUpFormContainer className="sign-up-container">
                    <CustomForm action="#">
                        <TitleWrapper>Create Account</TitleWrapper>
                        <FacebookButton onClick={() => signInWithFacebook()}> Sign In With Facebook</FacebookButton>
                        <CustomSpan>or use your email for registration</CustomSpan>
                        <CustomInput type="text" placeholder="Name" onChange={(e) => setUserName(e.target.value)} />
                        <CustomInput type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                        <CustomInput type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                        <CustomInput type="text" placeholder="Address" onChange={(e) => setAddress(e.target.value)} />
                        <CustomInput type="text" placeholder="Phone Number ex. +40 755 748 574" onChange={(e) => setPhoneNumber(e.target.value)} />
                        <Button onClick={() => signUp()}>Sign Up</Button>
                    </CustomForm>
                </SignUpFormContainer>
                <SignInFormContainer className="sign-in-container">
                    <CustomForm>
                        <TitleWrapper>Sign In</TitleWrapper>
                        <FacebookButton onClick={() => signInWithFacebook()}> Sign In With Facebook</FacebookButton>
                        <CustomSpan>or use your account</CustomSpan>
                        <CustomInput type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                        <CustomInput type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                        <CustomLink href="#">Forgot your password?</CustomLink>
                        <SignInButton onClick={() => signIn()}>Sign In</SignInButton>
                    </CustomForm>
                </SignInFormContainer>
                <OverlayContainer className="overlay-container">
                    <Overlay className="overlay">
                        <OverlayLeft className="overlay-panel overlay-left">
                            <TitleWrapper>Welcome Back!</TitleWrapper>
                            <CustomParagraph>To keep connected with us please login with your personal info!</CustomParagraph>
                            <GhostButton id="signIn" onClick={() => switchToSignInPage()}>Sign In</GhostButton>
                        </OverlayLeft>
                        <OverlayRight className="overlay-panel overlay-right">
                            <TitleWrapper>Hello, Friend!</TitleWrapper>
                            <CustomParagraph>Enter your personal details and start  with us</CustomParagraph>
                            <GhostButton id="signUp" onClick={() => switchToSignUpPage()}>Sign Up</GhostButton>
                        </OverlayRight>
                    </Overlay>
                </OverlayContainer>
            </Container>
        </SignInWrapper>
    );
}

export default SignIn;