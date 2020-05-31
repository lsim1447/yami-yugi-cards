import axios from 'axios';

export const getAllCards = () => {
    return axios.get(`/api/cards`)
        .then(response => response.data);
}

export const getCardById = (ID: string) => {
    return axios.get(`/api/cards/${ID}`)
        .then(response => response.data);
}

export const findAllCardsByIds = (ids: string[]) => {
    return axios.post(`/api/cards/findAllByIds`, {
        "ids": ids
    }).then(response => response.data);
}

export const findAllCardsByTypeAndRace = (type: string, race: string, limit: number) => {
    return axios.post(`/api/cards/findByTypeAndRace`, {
        "type": type,
        "race": race,
        "limit": limit
    }).then(response => response.data.slice(0, limit));
}

export const findCardsPaginated = (page: number, limit: number) => {
    return axios.post(`/api/cards/paginate`, {
        "page": page,
        "limit": limit
    }).then(response => response.data);
}

export const findCardsByTypePaginated = (type: string, page: number, limit: number) => {
    return axios.post(`/api/cards/paginate/findByType`, {
        "type": type,
        "page": page,
        "limit": limit
    }).then(response => response.data);
}