import api from './api.service';
const END_POINT = {
    CATEGORIES: 'categories',
};

export const getAllCategories = () => {
    return api.get(`${END_POINT.CATEGORIES}`);
};
export const addCategory = (data) => {
    return api.post(`${END_POINT.CATEGORIES}`, data);
};
export const deleteCategory = (id) => {
    return api.delete(`${END_POINT.CATEGORIES}/${id}`);
};
export const updateCategory = (data) => {
    return api.put(`${END_POINT.CATEGORIES}/${data.id}`, data);
};
export const getCategoryById = (id) => {
    return api.get(`${END_POINT.CATEGORIES}/${id}`);
};
