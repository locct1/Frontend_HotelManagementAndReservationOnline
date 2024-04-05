import api from './api.service';
const END_POINT = {
    ROOMTYPES: 'roomtypes',
};

export const getAllRoomTypes = () => {
    return api.get(`${END_POINT.ROOMTYPES}`);
};
export const addRoomType = (data) => {
    return api.post(`${END_POINT.ROOMTYPES}`, data);
};
export const deleteRoomType = (id) => {
    return api.delete(`${END_POINT.ROOMTYPES}/${id}`);
};
export const updateRoomType = (data) => {
    return api.put(`${END_POINT.ROOMTYPES}/${data.id}`, data);
};
export const getRoomTypeById = (id) => {
    return api.get(`${END_POINT.ROOMTYPES}/${id}`);
};
