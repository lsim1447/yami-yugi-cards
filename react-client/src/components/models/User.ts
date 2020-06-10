export interface IUser
{
    _id: string,
    accountBalance: number,
    address: string,
    username: string,
    email: string,
    password: string,
    phoneNumber: string,
    deck: string[];
}

export const DEFAULT_USER_VALUE: IUser = {
    _id: '',
    accountBalance: 50,
    address: '',
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
    deck: []
}