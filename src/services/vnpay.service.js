import apiClient from './apiclient.service';
const END_POINT = {
    VN_PAY: 'vnpay',
};
export const checkOutByVnPay = (data) => {
    return apiClient.post(`${END_POINT.VN_PAY}/create-order`, data);
};

