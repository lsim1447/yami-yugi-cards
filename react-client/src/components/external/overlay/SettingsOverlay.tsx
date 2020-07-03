import React, { useContext, useState, useEffect } from 'react';
import  { ThemeContext }  from "../../../contexts/ThemeContext";
import  { SettingsContext }  from "../../../contexts/SettingsContext";
import  { UserContext }  from "../../../contexts/UserContext";
import { isDarkModeActive, toggleMode } from '../../../services/DarkModeService';
import { isUserSignedIn, userSignOut } from "../../../services/UserService";
import { Col, Image, Row } from 'react-bootstrap';
import Switch from "react-switch";
import styled from 'styled-components';

const SettingsOverlayWrapper = styled.div`
    background-color: ${props => (props && props.theme && props.theme.backgroundColor) ? props.theme.backgroundColor : ''};
    color: ${props => (props && props.theme && props.theme.color) ? props.theme.color : ''};
    max-width: 400px;
    padding: 12px;
    position: fixed;
    right: 0;
    top: 7%;
    z-index: 50000;
    width: 100%;

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        display: none;
    }

    &::-webkit-scrollbar {
        display: none;
    }

    @media (max-width: 576px) {
        min-width: 100%;
        width: 100%;
    }
`;

const LinkWrapper = styled.a `
    &:hover {
        color: ${props => (props && props.theme && props.theme.color) ? props.theme.color : ''};
        cursor: pointer;
        text-decoration: none;
    }
`;

const ProfileRow = styled(Row) `
    border-bottom: 1px solid #D3D3D3;
    margin: 0px;
    padding-bottom: 12px;
`;

const UserName = styled.p `
    font-size: 18px;
    font-weight: 600;
    padding-top: 12px;
`;

const AccountBalance = styled.p `
    font-size: 18px;
    font-weight: 600;
    padding-top: 30px;
`;

const SeeYourProfile = styled.span `
    font-size: 16px;
    font-weight: 400;
`;

const SettingsRow = styled(Row) `
    border-bottom: 1px solid #D3D3D3;
    margin: 0px;
    padding: 18px;
`;

const SettingsText = styled.span `
    font-size: 20px;
    font-weight: 400;
    position: relative;
    top: -6px;
`;

const SettingsSubText = styled.p `
    font-size: 14px;
    font-weight: 400;
    margin-bottom: 0px;
`;


const SettingsOverlay = () => {
    const { activeTheme, setActiveThemeNow } = useContext(ThemeContext);
    const { setShowSettingsOverlay } = useContext(SettingsContext);
    const { user } = useContext(UserContext);
    const [isDarkModeVisible, setDarkMode] = useState<boolean>(isDarkModeActive());

    const toggleDarkMode = () => {
        setDarkMode(!isDarkModeVisible);
        toggleMode();
        setActiveThemeNow(isDarkModeActive());
    }

    const signOut = () => {
        userSignOut();
    }

    useEffect(() => {
        
    }, []);

    if (!isUserSignedIn()) {
        return (
            <SettingsOverlayWrapper theme={{backgroundColor: activeTheme.itemBackgroundColor, color: activeTheme.color}}>
                <LinkWrapper href={"/signin"} theme={activeTheme}>
                    <SettingsRow>
                        <Col sm={2}>
                            <i style={{fontSize: "28px"}} className="fa fa-sign-in" aria-hidden="true"></i>
                        </Col>
                        <Col sm={10}>
                            <SettingsText> Sign In </SettingsText>
                            <SettingsSubText> Please Sign In before going forward </SettingsSubText>
                        </Col>
                    </SettingsRow>
                </LinkWrapper>
            </SettingsOverlayWrapper>
        )
    } else {
        return (
            <SettingsOverlayWrapper theme={{backgroundColor: activeTheme.itemBackgroundColor, color: activeTheme.color}}>
                <LinkWrapper href={"/profile"} theme={activeTheme}>
                    <ProfileRow>
                        <Col sm={4}>
                            <Image 
                                src="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.0-9/50301926_2008315502577520_6292845245826596864_o.jpg?_nc_cat=108&_nc_sid=09cbfe&_nc_ohc=W1h3tRUxJ_YAX-4NbZt&_nc_ht=scontent.fsbz1-2.fna&oh=f7dd068014a8c7f25ffad13c33e64997&oe=5F24D323"
                                height="100px"
                                width="100px"
                                roundedCircle
                            />
                        </Col>
                        <Col sm={5}>
                            <UserName> {user.username} </UserName>
                            <SeeYourProfile> See your profile </SeeYourProfile>
                        </Col>
                        <Col sm={3}>
                            <AccountBalance> {user.accountBalance.toFixed(2)} $ </AccountBalance>
                        </Col>
                    </ProfileRow>
                </LinkWrapper>
                <LinkWrapper href={"/feedback"} theme={activeTheme}>
                    <SettingsRow>
                        <Col sm={2}>
                            <i style={{fontSize: "28px"}} className="fa fa-comments" aria-hidden="true"></i>
                        </Col>
                        <Col sm={10}>
                            <SettingsText> Give feedback</SettingsText>
                            <SettingsSubText> Help us improve the new Yami Yugi Cards </SettingsSubText>
                        </Col>
                    </SettingsRow>
                </LinkWrapper>
                <LinkWrapper theme={activeTheme}>
                    <SettingsRow onClick={() => toggleDarkMode()}>
                        <Col sm={2}>
                            <i style={{fontSize: "28px"}} className="fa fa-moon-o" aria-hidden="true"></i>
                        </Col>
                        <Col sm={7}>
                            <SettingsText> Dark mode</SettingsText>
                        </Col>
                        <Col sm={1}>
                            <Switch onChange={() => toggleDarkMode()} checked={isDarkModeVisible} />
                        </Col>
                    </SettingsRow>
                </LinkWrapper>
                <LinkWrapper href={"/orders"} theme={activeTheme}>
                    <SettingsRow>
                        <Col sm={2}>
                            <i style={{fontSize: "28px"}} className="fa fa-shopping-cart" aria-hidden="true"></i>
                        </Col>
                        <Col sm={6}>
                            <SettingsText> Orders </SettingsText>
                        </Col>
                    </SettingsRow>
                </LinkWrapper>
                
                <LinkWrapper onClick={() => signOut()} theme={activeTheme}>
                    <SettingsRow>
                        <Col sm={2}>
                            <i style={{fontSize: "28px"}} className="fa fa-sign-out" aria-hidden="true"></i>
                        </Col>
                        <Col sm={10}>
                            <SettingsText> Sign out</SettingsText>
                        </Col>
                    </SettingsRow>
                </LinkWrapper>
            </SettingsOverlayWrapper>
        );
    }
}

export default SettingsOverlay;