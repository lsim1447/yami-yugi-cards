type UserType = {
    _id: string,
    accountBalance: number,
    username: string,
    password: string,
    deck: string[]
}

export const DEFAULT_USER_VALUE: UserType = {
    _id: '',
    accountBalance: 50,
    username: '',
    password: '',
    deck: [
        ''
    ]
}