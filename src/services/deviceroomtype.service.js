import api from './api.service';
const END_POINT = {
    HOST_FACILITIES: 'device-roomtypes',
};

export const getAllDevices = () => {
    return api.get(`${END_POINT.HOST_FACILITIES}`);
};
export const getAllDeviceRoomType = (id) => {
    return api.get(`${END_POINT.HOST_FACILITIES}/get-all-device-roomtype/${id}`);
};
export const addDeviceRoomTypes = (data) => {
    return api.post(`${END_POINT.HOST_FACILITIES}`, data);
};
