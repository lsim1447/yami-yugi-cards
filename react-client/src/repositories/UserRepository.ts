import axios from 'axios';
import { IUser } from '../components/models/User';

export const getAllUsers = () => {
    return axios.get(`/api/users`)
        .then(response => response.data);
}

export const getUserById = (ID: string) => {
    return axios.get(`/api/users/${ID}`)
        .then(response => response.data);
}

export const getUserByEmailAndPassword = (email: string, password: string) => {
    return axios.post(`/api/users/auth`, {
            email: email,
            password: password
        }).then(response => response.data);
}

export const updateUserById = (user: IUser) => {
    return axios.post(`/api/users/update/${user._id}`, {
            accountBalance: user.accountBalance,
            username: user.username,
            password: user.password,
            deck: user.deck
        }).then(response => response.data);
}

export const saveUser = (newUser: IUser) => {
    return axios.post(`/api/users/add`, {
            accountBalance: newUser.accountBalance,
            username: newUser.username,
            email: newUser.email,
            password: newUser.password,
            deck: newUser.deck
        }).then(response => response.data);
}