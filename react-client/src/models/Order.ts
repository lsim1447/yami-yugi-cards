import moment from 'moment';

export interface IOrder
{
    _id: string,
    date: string,
    products: string[],
    totalPrice: number,
    userId: string
}

export const DEFAULT_ORDER_VALUE: IOrder = {
    _id: '',
    date: moment(new Date()).format('MMMM Do YYYY, h:mm:ss a'),
    products: [],
    totalPrice: 0,
    userId: ''
}