import axios from 'axios';
import { IComment } from '../models/Comment';

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

export const getCommentsByUserEmail = (email: string) => {
    return axios.post(`/api/comments/findByUserEmail`, {
        email: email
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
        username: newComment.username,
        votes: newComment.votes,
    }).then(response => response.data);
}

export const updateComment = (comment: IComment) => {
    return axios.post(`/api/comments/update/${comment._id}`, {
        cardId: comment.cardId,
        date: comment.date,
        email: comment.email,
        message: comment.message,
        stars: comment.stars,
        title: comment.title,
        username: comment.username,
        votes: comment.votes,
    }).then(response => response.data);
}

export const deleteCommentById = (commentId: string) => {
    return axios.delete(`/api/comments/${commentId}`)
        .then(response => response.data);
}