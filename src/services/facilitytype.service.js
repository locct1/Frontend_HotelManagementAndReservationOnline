import apiAdmin from './apiadmin.service';
const END_POINT = {
    FACILITYTYPES: 'facilitytypes',
};

export const getAllFacilityTypes = () => {
    return apiAdmin.get(`${END_POINT.FACILITYTYPES}`);
};
export const addFacilityType = (data) => {
    return apiAdmin.post(`${END_POINT.FACILITYTYPES}`, data);
};
export const deleteFacilityType = (id) => {
    return apiAdmin.delete(`${END_POINT.FACILITYTYPES}/${id}`);
};
export const updateFacilityType = (data) => {
    return apiAdmin.put(`${END_POINT.FACILITYTYPES}/${data.id}`, data);
};
export const getFacilityTypeById = (id) => {
    return apiAdmin.get(`${END_POINT.FACILITYTYPES}/${id}`);
};
export const getAllTypesAndFacilities = () => {
    return apiAdmin.get(`${END_POINT.FACILITYTYPES}/get-all-types-and-facilities`);
};
