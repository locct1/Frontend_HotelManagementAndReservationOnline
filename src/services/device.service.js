import apiAdmin from './apiadmin.service';
const END_POINT = {
    DEVICES: 'devices',
};

export const getAllDevices = () => {
    return apiAdmin.get(`${END_POINT.DEVICES}`);
};
export const addDevice = (data) => {
    return apiAdmin.post(`${END_POINT.DEVICES}`, data);
};
export const deleteDevice = (id) => {
    return apiAdmin.delete(`${END_POINT.DEVICES}/${id}`);
};
export const updateDevice = (data) => {
    return apiAdmin.put(`${END_POINT.DEVICES}/${data.id}`, data);
};
export const getDeviceById = (id) => {
    return apiAdmin.get(`${END_POINT.DEVICES}/${id}`);
};
