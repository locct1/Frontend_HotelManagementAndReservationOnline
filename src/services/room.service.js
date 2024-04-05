import api from './api.service';
const END_POINT = {
    ROOMS: 'rooms',
};

export const getAllRooms = () => {
    return api.get(`${END_POINT.ROOMS}`);
};
export const addRoom = (data) => {
    return api.post(`${END_POINT.ROOMS}`, data);
};
export const deleteRoom = (id) => {
    return api.delete(`${END_POINT.ROOMS}/${id}`);
};
export const updateRoom = (data) => {
    return api.put(`${END_POINT.ROOMS}/${data.id}`, data);
};
export const getRoomById = (id) => {
    return api.get(`${END_POINT.ROOMS}/${id}`);
};
export const changeStatusRoom = (id) => {
    return api.put(`${END_POINT.ROOMS}/change-status-room/${id}`);
};
