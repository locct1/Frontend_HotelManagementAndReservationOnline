import axios from 'axios';
import { LOCAL_STORAGE_TOKEN_HOST } from '~/helpers/constants';

const commonConfig = {
    headers: {
        'Content-Type': 'application/json',
    },
};
// eslint-disable-next-line import/no-anonymous-default-export
const api = axios.create({
    baseURL: process.env.REACT_APP_URL_API,
    timeout: 3000000,
    ...commonConfig,
});
api.interceptors.request.use(
    (config) => {
        config.headers['Authorization'] = `Bearer ${localStorage[LOCAL_STORAGE_TOKEN_HOST]}`;
        return config;
    },
    (error) => {
        Promise.reject(error);
    },
);
api.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        console.log(error);
        if (error.response.data) return error.response.data;
        else return { success: false, message: error.message };
    },
);
export default api;
