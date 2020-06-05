import React, { useState, useEffect } from 'react';
import { DEFAULT_USER_VALUE } from '../components/models/User';
import {
    getUserById
} from '../repositories/UserRepository';
import {
    getSignedUserId
} from '../services/UserService';

const initialState = {
    user: DEFAULT_USER_VALUE,
    setUser: (a: any) => {},
}

export const UserContext = React.createContext(initialState);

export const UserContextConsumer = UserContext.Consumer;

export const UserProvider = (props: any) => {
    const USER_ID = getSignedUserId();
    const [user, setUser] = useState(DEFAULT_USER_VALUE);

    useEffect(() => {
        if (USER_ID){
            getUserById(USER_ID)
                .then(currentUser => {
                    setUser(currentUser);
                })
                .catch(error => {
                    console.log('Error(/api/users/): ', error);
                })
        }
    }, []);
    
    return (
        <UserContext.Provider value={{ 
            user: user,
            setUser: setUser
         }}>
            { props.children }
        </UserContext.Provider>
    );
}