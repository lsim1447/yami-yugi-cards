import React, { useContext, useState, useEffect } from 'react';
import  { ThemeContext }  from "../../../contexts/ThemeContext";
import  { SettingsContext }  from "../../../contexts/SettingsContext";
import  { UserContext }  from "../../../contexts/UserContext";
import { isDarkModeActive, toggleMode } from '../../../services/DarkModeService';
import { isUserSignedIn, userSignOut } from "../../../services/UserService";
import { Image, Row } from 'react-bootstrap';
import { CustomCol1, CustomCol2, CustomCol3, CustomCol4, CustomCol5, CustomCol6, CustomCol7, CustomCol10 } from '../../internal/CustomComponents';
import Switch from "react-switch";
import styled from 'styled-components';

const SettingsOverlayWrapper = styled.div`
    background-color: ${props => (props && props.theme && props.theme.backgroundColor) ? props.theme.backgroundColor : '#FFFFFF'};
    color: ${props => (props && props.theme && props.theme.color) ? props.theme.color : '#000000'};
    max-width: 400px;
    padding: 12px;
    position: fixed;
    right: 0;
    top: 7%;
    transition: all .6s ease-in-out;
    z-index: 99999;
    width: 100%;

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        display: none;
    }

    &::-webkit-scrollbar {
        display: none;
    }

    @media (max-width: 576px) {
        height: 100vh;
        min-width: 100%;
        width: 100%;
    }
`;

const LinkWrapper = styled.a `
    &:hover {
        color: ${props => (props && props.theme && props.theme.color) ? props.theme.color : '#000000'};
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

const CloseWrapper = styled.div `
    padding: 18px;
    text-align: center;

    @media (min-width: 576px) {
        display: none;
    }
`;

const CloseButton = styled.button `
    background-color: ${props => (props && props.theme && props.theme.backgroundColor) ? props.theme.backgroundColor : '#FFFFFF'};
    border: 1px solid #D3D3D3;
    border-radius: 5%;
    color: ${props => (props && props.theme && props.theme.color) ? props.theme.color : '#000000'};
    font-size: 16px;
    padding: 6px 16px;
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
                <LinkWrapper theme={activeTheme}>
                    <SettingsRow onClick={() => toggleDarkMode()}>
                        <CustomCol2 sm={2}>
                            <i style={{fontSize: "28px"}} className="fa fa-moon-o" aria-hidden="true"></i>
                        </CustomCol2>
                        <CustomCol7 sm={7}>
                            <SettingsText> Dark mode</SettingsText>
                        </CustomCol7>
                        <CustomCol1 sm={1}>
                            <Switch onChange={() => toggleDarkMode()} checked={isDarkModeVisible} />
                        </CustomCol1>
                    </SettingsRow>
                </LinkWrapper>
                <LinkWrapper href={"/signin"} theme={activeTheme}>
                    <SettingsRow>
                        <CustomCol2 sm={2}>
                            <i style={{fontSize: "28px"}} className="fa fa-sign-in" aria-hidden="true"></i>
                        </CustomCol2>
                        <CustomCol10 sm={10}>
                            <SettingsText> Sign In </SettingsText>
                            <SettingsSubText> Please Sign In before going forward </SettingsSubText>
                        </CustomCol10>
                    </SettingsRow>
                </LinkWrapper>
            </SettingsOverlayWrapper>
        )
    } else {
        return (
            <SettingsOverlayWrapper theme={{backgroundColor: activeTheme.itemBackgroundColor, color: activeTheme.color}}>
                <LinkWrapper href={"/profile"} theme={activeTheme}>
                    <ProfileRow>
                        <CustomCol4 sm={4}>
                            <Image 
                                src="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.0-9/50301926_2008315502577520_6292845245826596864_o.jpg?_nc_cat=108&_nc_sid=09cbfe&_nc_ohc=W1h3tRUxJ_YAX-4NbZt&_nc_ht=scontent.fsbz1-2.fna&oh=f7dd068014a8c7f25ffad13c33e64997&oe=5F24D323"
                                height="100px"
                                width="100px"
                                roundedCircle
                            />
                        </CustomCol4>
                        <CustomCol5 sm={5}>
                            <UserName> {user.username} </UserName>
                            <SeeYourProfile> See your profile </SeeYourProfile>
                        </CustomCol5>
                        <CustomCol3 sm={3}>
                            <AccountBalance> {user.accountBalance.toFixed(2)} $ </AccountBalance>
                        </CustomCol3>
                    </ProfileRow>
                </LinkWrapper>
                <LinkWrapper href={"/feedback"} theme={activeTheme}>
                    <SettingsRow>
                        <CustomCol2 sm={2}>
                            <i style={{fontSize: "28px"}} className="fa fa-comments" aria-hidden="true"></i>
                        </CustomCol2>
                        <CustomCol10 sm={10}>
                            <SettingsText> Give feedback</SettingsText>
                            <SettingsSubText> Help us improve the new Yami Yugi Cards </SettingsSubText>
                        </CustomCol10>
                    </SettingsRow>
                </LinkWrapper>
                <LinkWrapper theme={activeTheme}>
                    <SettingsRow onClick={() => toggleDarkMode()}>
                        <CustomCol2 sm={2}>
                            <i style={{fontSize: "28px"}} className="fa fa-moon-o" aria-hidden="true"></i>
                        </CustomCol2>
                        <CustomCol7 sm={7}>
                            <SettingsText> Dark mode</SettingsText>
                        </CustomCol7>
                        <CustomCol1 sm={1}>
                            <Switch onChange={() => {}} checked={isDarkModeVisible} />
                        </CustomCol1>
                    </SettingsRow>
                </LinkWrapper>
                <LinkWrapper href={"/orders"} theme={activeTheme}>
                    <SettingsRow>
                        <CustomCol2 sm={2}>
                            <i style={{fontSize: "28px"}} className="fa fa-shopping-cart" aria-hidden="true"></i>
                        </CustomCol2>
                        <CustomCol6 sm={6}>
                            <SettingsText> Orders </SettingsText>
                        </CustomCol6>
                    </SettingsRow>
                </LinkWrapper>
                
                <LinkWrapper onClick={() => signOut()} theme={activeTheme}>
                    <SettingsRow>
                        <CustomCol2 sm={2}>
                            <i style={{fontSize: "28px"}} className="fa fa-sign-out" aria-hidden="true"></i>
                        </CustomCol2>
                        <CustomCol10 sm={10}>
                            <SettingsText> Sign out</SettingsText>
                        </CustomCol10>
                    </SettingsRow>
                </LinkWrapper>

                <CloseWrapper>
                    <CloseButton theme={activeTheme} onClick={() => setShowSettingsOverlay(false)}>Close Settings</CloseButton>
                </CloseWrapper>
            </SettingsOverlayWrapper>
        );
    }
}

export default SettingsOverlay;