import apiadmin from './apiadmin.service';
const END_POINT = {
    FACILITIES: 'facilities',
};

export const getAllFacilities = () => {
    return apiadmin.get(`${END_POINT.FACILITIES}`);
};
export const addFacility = (data) => {
    return apiadmin.post(`${END_POINT.FACILITIES}`, data);
};
export const deleteFacility = (id) => {
    return apiadmin.delete(`${END_POINT.FACILITIES}/${id}`);
};
export const updateFacility = (data) => {
    return apiadmin.put(`${END_POINT.FACILITIES}/${data.id}`, data);
};
export const getFacilityById = (id) => {
    return apiadmin.get(`${END_POINT.FACILITIES}/${id}`);
};
