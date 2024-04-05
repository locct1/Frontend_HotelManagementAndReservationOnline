import api from './api.service';
const END_POINT = {
    STATUSES: 'statuses',
};

export const getAllStatuses = () => {
    return api.get(`${END_POINT.STATUSES}`);
};

