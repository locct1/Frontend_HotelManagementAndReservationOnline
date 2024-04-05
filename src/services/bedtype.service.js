import apiAdmin from './apiadmin.service';
const END_POINT = {
    BEDTYPES: 'bedtypes',
};

export const getAllBedTypes = () => {
    return apiAdmin.get(`${END_POINT.BEDTYPES}`);
};
export const addBedType = (data) => {
    return apiAdmin.post(`${END_POINT.BEDTYPES}`, data);
};
export const deleteBedType = (id) => {
    return apiAdmin.delete(`${END_POINT.BEDTYPES}/${id}`);
};
export const updateBedType = (data) => {
    return apiAdmin.put(`${END_POINT.BEDTYPES}/${data.id}`, data);
};
export const getBedTypeById = (id) => {
    return apiAdmin.get(`${END_POINT.BEDTYPES}/${id}`);
};
