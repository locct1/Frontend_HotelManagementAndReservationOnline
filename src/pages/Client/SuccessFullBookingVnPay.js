import { NavLink, Link } from 'react-router-dom';
import { getAllHotelsWithRoomTypes } from '~/services/client.service';
import ClientLoading from '~/components/ClientLoading';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { LINK_HOTEL_AVATAR_IMAGE } from '~/helpers/constants';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    infoClientBookingSelector,
    infoNoteBookingSelector,
    infoBookingDetailsSelector,
    infoCheckOutSelector,
} from '~/redux/selectors';
import { bookingNow } from '~/services/client.service';
import { useNavigate } from 'react-router-dom';

import moment from 'moment';
import 'moment/locale/vi';
import { capitalizeFirstLetter } from '~/helpers/covertString';
import BookingNowSlice from '~/redux/Slices/BookingNowSlice';

function SuccessfulBookingVnPay() {
    const [isLoading, setIsLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [vnpay, setVnPay] = useState(Object.fromEntries([...searchParams]));
    const infoClientBooking = useSelector(infoClientBookingSelector);
    const infoBookingDetails = useSelector(infoBookingDetailsSelector);
    const note = useSelector(infoNoteBookingSelector);
    const isCheckOut = useSelector(infoCheckOutSelector);
    const [success, setSuccess] = useState(false);
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        if (isCheckOut === false && vnpay.vnp_TransactionStatus === '00') {
            let response = await bookingNow({
                infoClient: infoClientBooking,
                bookingOnline: {
                    hotelId: infoBookingDetails.id,
                    hotelName: infoBookingDetails.name,
                    hotelAddress: infoBookingDetails.address,
                    hotelPhoneNumber: infoBookingDetails.phoneNumber,
                    total: infoBookingDetails.total,
                    amountOfPeople: infoBookingDetails.amountOfPeople,
                    amountOfNight: infoBookingDetails.amountOfNight,
                    note: note,
                    startDate: infoBookingDetails.startDate,
                    endDate: infoBookingDetails.endDate,
                    methodPaymentId: 2,
                    roomTypeBookingOnline: {
                        roomTypeId: infoBookingDetails.roomType.id,
                        roomTypeName: infoBookingDetails.roomType.name,
                        price: infoBookingDetails.roomType.price,
                        amountOfRoom: infoBookingDetails.amountOfRoom,
                        bedTypeName: infoBookingDetails.roomType.bedType.name,
                    },
                    onl_Amount: vnpay.vnp_Amount,
                    onl_BankCode: vnpay.vnp_BankCode,
                    onl_OrderInfo: vnpay.vnp_OrderInfo,
                    onl_PayDate: vnpay.vnp_PayDate,
                    onl_TransactionStatus: vnpay.vnp_TransactionStatus,
                    onl_SecureHash: vnpay.vnp_SecureHash,
                    onl_TransactionNo: vnpay.vnp_TransactionNo,
                    onl_OrderId: vnpay.vnp_TxnRef,
                },
            });
            if (response.success) {
                toast.success(response.message);
                setSuccess(true);
            } else {
                toast.error(response.message);
            }
            dispatch(
                BookingNowSlice.actions.updateCheckOut({
                    isCheckOut: true,
                }),
            );
            if (isLoading)
                setTimeout(() => {
                    setIsLoading(false);
                }, 100);

            return;
        }
        if (isLoading)
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
    };
    return (
        <>
            {isLoading ? (
                <>
                    <ClientLoading />
                </>
            ) : (
                <>
                    <div className="breadcrumb-section">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="breadcrumb-text">
                                        <h2>
                                            {vnpay.vnp_TransactionStatus === '00' && success === true
                                                ? 'Bạn đã đặt phòng thành công'
                                                : 'Đơn đặt phòng bị lỗi hoặc đã được xử lý'}
                                        </h2>
                                        <div className="bt-option">
                                            <Link to="/">Về Trang chủ</Link>
                                            <Link to="/review-booking">Xem đơn đặt phòng</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-12 mb-5">
                                <div class="card">
                                    <h5 class="card-header">Thông tin giao dịch</h5>
                                    <div class="card-body">
                                        <h5 class="card-title">
                                            Trạng thái:{' '}
                                            {vnpay.vnp_TransactionStatus === '00'
                                                ? 'Giao dịch thành công'
                                                : 'Giao dịch không hợp lệ'}{' '}
                                        </h5>
                                        <h5 class="card-title">
                                            Mô tả: {vnpay.vnp_OrderInfo ? vnpay.vnp_OrderInfo : ''}
                                        </h5>
                                        <h5 class="card-title">
                                            Tổng tiền thanh toán:{' '}
                                            {vnpay.vnp_Amount
                                                ? String(parseInt(vnpay.vnp_Amount) / 100).replace(
                                                      /(\d)(?=(\d\d\d)+(?!\d))/g,
                                                      '$1,',
                                                  ) + ' đ'
                                                : ''}
                                        </h5>
                                        <h5 class="card-title">
                                            Thời gian giao dịch:{' '}
                                            {vnpay.vnp_PayDate
                                                ? moment(vnpay.vnp_PayDate, 'YYYYMMDDHHmmss').format(
                                                      'DD/MM/YYYY HH:mm:ss',
                                                  )
                                                : 'Giao dịch không hợp lệ'}
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default SuccessfulBookingVnPay;
