import api from './api.service';
const END_POINT = {
    HOTEL_RESERVATIONS: 'hotel-reservations',
};

export const ReservationAtTheHotelService = (data) => {
    return api.post(`${END_POINT.HOTEL_RESERVATIONS}/add-reservation`, data);
};
export const UpdateReservationAtTheHotelService = (data) => {
    return api.put(`${END_POINT.HOTEL_RESERVATIONS}/update-reservation/${data.updateReservation.id}`, data);
};
export const getAllReservations = () => {
    return api.get(`${END_POINT.HOTEL_RESERVATIONS}`);
};
export const updateReservationStatus = (data, id) => {
    return api.put(`${END_POINT.HOTEL_RESERVATIONS}/update-reservation-status/${id}`, data);
};
export const checkRoomAvailability = (data) => {
    return api.post(`${END_POINT.HOTEL_RESERVATIONS}/check-room-availability`, data);
};
