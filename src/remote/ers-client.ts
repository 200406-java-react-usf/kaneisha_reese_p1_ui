import axios from 'axios';

export const ersClient = axios.create({
    //baseURL: 'http://localhost:8080',
    baseURL: 'http://kaneishareesep1api-env.eba-3t4z8zub.us-east-1.elasticbeanstalk.com',
    headers: {
        'Content-Type': 'application/json'
    },

    withCredentials: true
 
})
