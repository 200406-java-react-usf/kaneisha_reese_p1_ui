import axios from 'axios';

export const ersClient = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json'
    },

    withCredentials: true
 
})