import apiClient from './apiclient.service';
const END_POINT = {
    PAGES: 'pages',
};

export const getAllHotelsWithRoomTypes = () => {
    return apiClient.get(`${END_POINT.PAGES}/get-all-hotels-with-roomtypes`);
};
export const getHotelDetail = (hotelId) => {
    return apiClient.get(`${END_POINT.PAGES}/get-hotel-detail/${hotelId}`);
};
export const getBedTypeByRoomType = (roomTypeId) => {
    return apiClient.get(`${END_POINT.PAGES}/get-bedtype-by-roomtype/${roomTypeId}`);
};
export const bookingNow = (data) => {
    return apiClient.post(`${END_POINT.PAGES}/booking-now`, data);
};
export const checkRoomAvailability = (data) => {
    return apiClient.post(`${END_POINT.PAGES}/check-roomtype-availability`, data);
};
export const getBookingByUser = () => {
    return apiClient.get(`${END_POINT.PAGES}/get-booking-by-user`);
};
export const getBookingDetailsById = (id) => {
    return apiClient.get(`${END_POINT.PAGES}/get-booking-details-by-id/${id}`);
};
export const cancelBooking = (id) => {
    return apiClient.get(`${END_POINT.PAGES}/cancel-booking/${id}`);
};
