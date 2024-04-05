import api from './api.service';
const END_POINT = {
    HOST_FACILITIES: 'hotel-facilities',
};

export const getAllTypesAndFacilities = () => {
    return api.get(`${END_POINT.HOST_FACILITIES}/get-all-types-and-facilities`);
};
export const getHotelFacilities = () => {
    return api.get(`${END_POINT.HOST_FACILITIES}/get-hotel-faticities`);
};
export const addFacilitiesForHotel = (data) => {
    return api.post(`${END_POINT.HOST_FACILITIES}/add-facilities-for-hotel`, data);
};
