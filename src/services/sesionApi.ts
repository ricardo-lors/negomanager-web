import axios from 'axios';


export const servicesApi = axios.create({
    baseURL: 'http://localhost:4000/api/v1',
});

// 
export const servicesApiToken = axios.create({
    baseURL: 'http://localhost:4000/api/v1',
    headers: {
        'x-token': localStorage.getItem('x-token')!
    }
});