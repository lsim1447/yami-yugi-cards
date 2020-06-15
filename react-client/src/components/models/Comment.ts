import moment from 'moment';

export interface IVote
{
    email: string,
    isHelpful: boolean
} 

export interface IComment
{
    _id: string,
    cardId: string,
    date: Date,
    email: string,
    message: string,
    stars: number,
    title: string,
    username: string,
    votes: Array<IVote>
}

export const DEFAULT_COMMENT_VALUE: IComment = {
    _id: '',
    cardId: '5ebc4b9b221c162fa4dcaeb3',
    date: new Date(),
    email: 'noname@yahoo.com',
    message: "This is a default comment message.",
    stars: 5,
    title: 'This is a title.',
    username: "Username",
    votes: [],
}