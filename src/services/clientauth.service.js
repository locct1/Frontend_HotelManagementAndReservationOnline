import api from './apiclient.service';
const END_POINT = {
    CLIENT_AUTH: 'client-accounts',
};

export const Register = (data) => {
    return api.post(`${END_POINT.CLIENT_AUTH}/signup`, data);
};
export const Login = (data) => {
    return api.post(`${END_POINT.CLIENT_AUTH}/signin`, data);
};
export const GetInfo = (data) => {
    return api.get(`${END_POINT.CLIENT_AUTH}/get-info-client`, data);
};
export const UpdateClientInfo = (data) => {
    return api.put(`${END_POINT.CLIENT_AUTH}/update/${data.id}`, data);
};
