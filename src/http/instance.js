import axios from 'axios';

const instance = axios.create({
    baseURL : 'http://5.42.101.72:8001/api/v1',
    withCredentials : false,
    headers : {},
});

export {instance};
