import apiUpload from './apiupload.service';
const END_POINT = {
    UPLOAD_IMAGES: 'upload-images',
};

export const uploadRoomType = (id, data) => {
    return apiUpload.post(`${END_POINT.UPLOAD_IMAGES}/roomtype/${id}`, data);
};
export const getRoomTypeImage = (id) => {
    return apiUpload.get(`${END_POINT.UPLOAD_IMAGES}/roomtype/${id}`);
};
export const deleteRoomTypeImage = (id) => {
    return apiUpload.delete(`${END_POINT.UPLOAD_IMAGES}/roomtype/${id}`);
};

export const uploadHotel = (data) => {
    return apiUpload.post(`${END_POINT.UPLOAD_IMAGES}/hotel`, data);
};
export const getHotelImage = (id) => {
    return apiUpload.get(`${END_POINT.UPLOAD_IMAGES}/hotel`);
};
export const deleteHotelImage = (id) => {
    return apiUpload.delete(`${END_POINT.UPLOAD_IMAGES}/hotel/${id}`);
};

export const uploadHotelAvatar = (data) => {
    return apiUpload.post(`${END_POINT.UPLOAD_IMAGES}/hotel-avatar`, data);
};
export const getHotelAvatar = () => {
    return apiUpload.get(`${END_POINT.UPLOAD_IMAGES}/hotel-avatar`);
};
export const deleteHotelAvatar = () => {
    return apiUpload.delete(`${END_POINT.UPLOAD_IMAGES}/hotel-avatar`);
};
