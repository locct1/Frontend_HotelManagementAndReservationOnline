import api from './api.service';
const END_POINT = {
    PRODUCTS: 'products',
};

export const getAllProducts = () => {
    return api.get(`${END_POINT.PRODUCTS}`);
};
export const addProduct = (data) => {
    return api.post(`${END_POINT.PRODUCTS}`, data);
};
export const deleteProduct = (id) => {
    return api.delete(`${END_POINT.PRODUCTS}/${id}`);
};
export const updateProduct = (data) => {
    return api.put(`${END_POINT.PRODUCTS}/${data.id}`, data);
};
export const getProductById = (id) => {
    return api.get(`${END_POINT.PRODUCTS}/${id}`);
};
