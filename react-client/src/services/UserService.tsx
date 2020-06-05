export const isUserSignedIn = () => {
    return localStorage.getItem('user_id') ? true : false;
}

export const getSignedUserId = () => {
    return localStorage.getItem('user_id');
}

export const setSignedUserId = (userId: string) => {
    return localStorage.setItem('user_id', userId);
}

export const userSignOut = () => {
    localStorage.removeItem('user_id');
}