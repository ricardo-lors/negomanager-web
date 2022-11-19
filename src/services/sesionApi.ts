import axios from 'axios';


export const servicesApi = axios.create({
    // baseURL: 'http://192.168.0.100:4000/api/v1',
    baseURL: 'http://localhost:4000/api/v1',
});

// 
export const servicesApiToken = axios.create({
    // baseURL: 'http://192.168.0.100:4000/api/v1',
    baseURL: 'http://localhost:4000/api/v1',
    headers: {
        'x-token': localStorage.getItem('x-token')!
    }
});