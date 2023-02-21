import axios, { AxiosRequestConfig } from 'axios';


// export const servicesApi = axios.create({
//     // baseURL: 'http://192.168.0.100:4000/api/v1',
//     baseURL: 'http://localhost:4000/api',
// });

// // 
// export const servicesApiToken = axios.create({
//     // baseURL: 'http://192.168.0.100:4000/api/v1',
//     baseURL: 'http://localhost:4000/api',
//     headers: { Authorization: `Bearer ${localStorage.getItem('x-token')}` }
//     // headers: {
//     //     'x-token': localStorage.getItem('x-token')!
//     // }
// });

// const baseUrl = 'http://localhost:5000'; // Obtener de el sistema
// const baseUrl = 'http://localhost:4000/api';
const baseUrl = process.env.REACT_APP_API_URL;//'http://sistemascbs.dynns.com:4000'; //  
// const baseUrl = 'http://sistemascbs.dynns.com:9001';
// const baseUrl = 'http://localhost:4000';
// console.log("Conectado en el 5000");
export const servicesApiToken = (endpoint: string, method = "GET", data?: Object) => {
    const url = `${baseUrl}${endpoint}`;
    console.log(url);
    return axios(url, {
        method,
        data,
        headers: { Authorization: `Bearer ${localStorage.getItem('x-token')}` }
    });
}

export const servicesApi = (endpoint: string, method = "GET", data?: Object) => {
    const url = `${baseUrl}${endpoint}`;
    console.log(url);
    return axios(url, {
        method,
        data
    });
}