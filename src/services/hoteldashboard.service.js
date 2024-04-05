import api from './api.service';
const END_POINT = {
    HOTEL_DASHBOARDs: 'hotel-dashboards',
};

export const getAllDashBoards = () => {
    return api.get(`${END_POINT.HOTEL_DASHBOARDs}`);
};
