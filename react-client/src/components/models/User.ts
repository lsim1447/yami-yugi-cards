export interface IUser
{
    _id: string,
    accountBalance: number,
    username: string,
    email: string,
    password: string,
    deck: string[];
}

export const DEFAULT_USER_VALUE: IUser = {
    _id: '',
    accountBalance: 50,
    username: '',
    email: '',
    password: '',
    deck: []
}