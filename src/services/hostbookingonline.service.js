import api from './api.service';
const END_POINT = {
    BOOKING_ONLINES: 'host-manage-booking-online',
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
