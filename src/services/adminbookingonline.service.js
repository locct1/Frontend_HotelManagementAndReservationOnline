import api from './apiadmin.service';
const END_POINT = {
    BOOKING_ONLINES: 'admin-manage-booking-online',
};

export const getAllBookingOnlines = () => {
    return api.get(`${END_POINT.BOOKING_ONLINES}`);
};
export const updateStatus = (data, id) => {
    return api.put(`${END_POINT.BOOKING_ONLINES}/${id}`, data);
};
export const getBookingOnline = (id) => {
    return api.get(`${END_POINT.BOOKING_ONLINES}/${id}`);
};
