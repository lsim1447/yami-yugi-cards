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

export const updateUserById = (user: IUser) => {
    return axios.post(`/api/users/update/${user._id}`, {
            accountBalance: user.accountBalance,
            username: user.username,
            password: user.password,
            deck: user.deck
        }).then(response => response.data);
}