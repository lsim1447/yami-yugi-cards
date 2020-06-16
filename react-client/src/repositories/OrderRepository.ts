import axios from 'axios';
import { IOrder } from '../models/Order';

export const getAllOrders = () => {
    return axios.get(`/api/orders`)
        .then(response => response.data);
}

export const getOrderById = (ID: string) => {
    return axios.get(`/api/orders/${ID}`)
        .then(response => response.data);
}

export const getOrdersByUserId = (userId: string) => {
    return axios.post(`/api/orders/findByUserId`, {
        userId: userId
    }).then(response => response.data);
}

export const saveOrder = (newOrder: IOrder) => {
    return axios.post(`/api/orders/add`, {
        date: newOrder.date,
        products: newOrder.products,
        totalPrice: newOrder.totalPrice,
        userId: newOrder.userId
    }).then(response => response.data);
}

export const updateOrder = (order: IOrder) => {
    return axios.post(`/api/orders/update/${order._id}`, {
        date: order.date,
        products: order.products,
        totalPrice: order.totalPrice,
        userId: order.userId
    }).then(response => response.data);
}

export const deleteOrderById = (orderId: string) => {
    return axios.delete(`/api/orders/${orderId}`)
        .then(response => response.data);
}