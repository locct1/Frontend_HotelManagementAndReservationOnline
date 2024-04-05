import api from './api.service';
const END_POINT = {
    HOST_AUTH: 'host-accounts',
};

export const HostRegister = (data) => {
    return api.post(`${END_POINT.HOST_AUTH}/signup`, data);
};
export const HostLogin = (data) => {
    return api.post(`${END_POINT.HOST_AUTH}/signin`, data);
};
export const HostGetInfo = (data) => {
    return api.get(`${END_POINT.HOST_AUTH}/get-info-host`, data);
};
export const updateHotel = (data) => {
    return api.put(`${END_POINT.HOST_AUTH}/update-hotel/${data.id}`, data);
};
