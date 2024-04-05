import api from './apiadmin.service';
const END_POINT = {
    ADMIN_DASHBOARDs: 'admin-dashboards',
};

export const getAllDashBoards = () => {
    return api.get(`${END_POINT.ADMIN_DASHBOARDs}`);
};
