import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://api.tonixhub.com/api/v1/',
    withCredentials : false,
    headers : {},
});

export {instance};
