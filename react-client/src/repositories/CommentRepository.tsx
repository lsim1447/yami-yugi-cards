import axios from 'axios';
import { IComment } from '../components/models/Comment';

export const getAllComments = () => {
    return axios.get(`/api/comments`)
        .then(response => response.data);
}

export const getCommentById = (ID: string) => {
    return axios.get(`/api/comments/${ID}`)
        .then(response => response.data);
}

export const getCommentsByCardId = (cardId: string) => {
    return axios.post(`/api/comments/findByCardId`, {
        cardId: cardId
    }).then(response => response.data);
}

export const saveComment = (newComment: IComment) => {
    return axios.post(`/api/comments/add`, {
        cardId: newComment.cardId,
        date: newComment.date,
        email: newComment.email,
        message: newComment.message,
        stars: newComment.stars,
        title: newComment.title,
        username: newComment.username
    }).then(response => response.data);
}