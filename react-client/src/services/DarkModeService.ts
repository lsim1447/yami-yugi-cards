export const isDarkModeActive = () => {
    if (localStorage.getItem('isDarkModeOn') === 'YES') {
        return true;
    } else {
        return false;
    }
}

export const toggleMode = () => {
    if (localStorage.getItem('isDarkModeOn') === 'YES') {
        localStorage.setItem('isDarkModeOn', 'NO');
    } else {
        localStorage.setItem('isDarkModeOn', 'YES');
    }
}