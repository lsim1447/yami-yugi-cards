import React, { useState, useEffect } from 'react';
import { DEFAULT_USER_VALUE } from '../components/models/User';
import {
    getUserById
} from '../repositories/UserRepository';

const initialState = {
    user: DEFAULT_USER_VALUE,
    setUser: (a: any) => {},
}

export const UserContext = React.createContext(initialState);
export const UserContextConsumer = UserContext.Consumer;

export const UserProvider = (props: any) => {
    const USER_ID = '5ecb7b7fa49d6637d033359d';
    const [user, setUser] = useState(DEFAULT_USER_VALUE);

    useEffect(() => {
        getUserById(USER_ID)
            .then(currentUser => {
                setUser(currentUser);
            })
            .catch(error => {
                console.log('Error(/api/users/): ', error);
            })
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