import apiAdmin from './apiadmin.service';
const END_POINT = {
    HOTELS: 'hotels',
};

export const getAllHotels = () => {
    return apiAdmin.get(`${END_POINT.HOTELS}`);
};
export const getHotelById = (id) => {
    return apiAdmin.get(`${END_POINT.HOTELS}/${id}`);
};
export const changeStatusHostAccount = (id) => {
    return apiAdmin.put(`${END_POINT.HOTELS}/change-status-host-account/${id}`);
};
export const changeStatusHotel = (id) => {
    return apiAdmin.put(`${END_POINT.HOTELS}/change-status-hotel/${id}`);
};
