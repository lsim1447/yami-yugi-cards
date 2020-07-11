export const getCartItemIDs = () => {
    return localStorage.getItem('product_ids');
}

export const setCartItemIDs = (productIDs: string) => {
    return localStorage.setItem('product_ids', productIDs);
}

export const emptyBag = () => {
    localStorage.removeItem('product_ids');
}