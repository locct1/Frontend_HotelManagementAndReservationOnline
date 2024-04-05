import { NavLink, Link } from 'react-router-dom';
import { bookingNow } from '~/services/client.service';
import ClientLoading from '~/components/ClientLoading';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { LINK_HOTEL_AVATAR_IMAGE } from '~/helpers/constants';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { infoClientSelector, infoBookingDetailsSelector } from '~/redux/selectors';
import { checkOutByVnPay } from '~/services/vnpay.service';
import moment from 'moment';
import 'moment/locale/vi';
import { capitalizeFirstLetter } from '~/helpers/covertString';
import BookingNowSlice from '~/redux/Slices/BookingNowSlice';
const methodPayments = [
    { id: 1, name: 'Thanh toán khi nhận phòng' },
    { id: 2, name: 'Thanh toán Online bằng VnPay' },
    { id: 3, name: 'Thanh toán Online bằng MoMo' },
];
function BookingNow() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const infoClient = useSelector(infoClientSelector);
    const infoBookingDetails = useSelector(infoBookingDetailsSelector);

    const phoneRegExp =
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    const schema = yup
        .object()
        .shape({
            fullName: yup.string().required('Vui lòng nhập họ và tên'),
            email: yup.string().email('Email không đúng định dạng').required('Vui lòng nhập email'),
            phoneNumber: yup
                .string()
                .required('Vui lòng số điện thoại')
                .matches(phoneRegExp, 'Số điện thoại không hợp lệ'),
            address: yup.string().required('Vui lòng nhập địa chỉ'),
        })
        .required();
    const {
        register,
        resetField,
        reset,
        handleSubmit,
        clearErrors,
        formState: { errors },
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
        defaultValues: infoClient,
    });
    const [isLoading, setIsLoading] = useState(true);
    const [note, setNote] = useState('');
    const [checkedMethodPayment, setCheckedMethodPayment] = useState(1);
    useEffect(() => {
        window.scrollTo(0, 0);
        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    }, []);
    useEffect(() => {
        reset(infoClient);
    }, [infoClient]);
    const onSubmit = async (infoClient) => {
        if (checkedMethodPayment === 1) {
            let response = await bookingNow({
                infoClient: infoClient,
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
                    methodPaymentId: checkedMethodPayment,
                    roomTypeBookingOnline: {
                        roomTypeId: infoBookingDetails.roomType.id,
                        roomTypeName: infoBookingDetails.roomType.name,
                        price: infoBookingDetails.roomType.price,
                        amountOfRoom: infoBookingDetails.amountOfRoom,
                        bedTypeName: infoBookingDetails.roomType.bedType.name,
                    },
                },
            });
            if (response.success) {
                toast.success(response.message);
                return navigate('/successful-booking');
            }
            toast.error(response.message);
        } else if (checkedMethodPayment === 2 || checkedMethodPayment === 3) {
            dispatch(
                BookingNowSlice.actions.updateInfoBooking({
                    note: note,
                    infoClientBooking: infoClient,
                }),
            );
            let response = await checkOutByVnPay({
                orderType: infoBookingDetails.roomType.name,
                amount: infoBookingDetails.total,
                orderDescription:
                    'Thanh toán đặt phòng ' +
                    infoBookingDetails.roomType.name +
                    ' ' +
                    infoBookingDetails.amountOfNight +
                    ' đêm',
                Name: infoClient.fullName,
            });
            window.location.replace(response);
        }
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
                                        <h2>Đặt phòng khách sạn</h2>
                                        <div className="bt-option">
                                            <Link to="/">Trang chủ</Link>
                                            <span>Đặt phòng khách sạn</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <section className="rooms-section spad">
                        <div className="container">
                            <div className="row">
                                <h4 className="p-2 bg bg-info d-inline rounded text-light">
                                    Điền thông tin người liên lạc và khách bên dưới
                                </h4>
                            </div>
                            <div className="row mt-3">
                                <div className="col-6">
                                    <h5 className="font-weight-bold mb-3">Thông tin của bạn</h5>
                                    <Form
                                        onSubmit={handleSubmit(onSubmit)}
                                        className="shadow-lg p-3 mb-4 bg-white rounded border"
                                    >
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label className="text-dark font-weight-bold">Họ và tên:</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Nhập họ tên"
                                                {...register('fullName')}
                                            />
                                            {errors.fullName?.message && (
                                                <p className="mt-2 text-danger">{errors.fullName?.message}</p>
                                            )}
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label className="text-dark font-weight-bold">Email:</Form.Label>
                                            <Form.Control type="text" placeholder="Nhập email" {...register('email')} />
                                            {errors.email?.message && (
                                                <p className="mt-2 text-danger">{errors.email?.message}</p>
                                            )}
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label className="text-dark font-weight-bold">
                                                Số điện thoại:
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Nhập số điện thoại"
                                                {...register('phoneNumber')}
                                            />
                                            {errors.phoneNumber?.message && (
                                                <p className="mt-2 text-danger">{errors.phoneNumber?.message}</p>
                                            )}
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label className="text-dark font-weight-bold">Địa chỉ:</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={3}
                                                placeholder="Nhập số địa chỉ"
                                                {...register('address')}
                                            />
                                            {errors.address?.message && (
                                                <p className="mt-2 text-danger">{errors.address?.message}</p>
                                            )}
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label className="text-dark font-weight-bold">Ghi chú:</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={3}
                                                value={note}
                                                name="note"
                                                onChange={(e) => setNote(e.target.value)}
                                            />
                                        </Form.Group>
                                        <h6 className="font-weight-bold mb-4">Hình thức thanh toán:</h6>
                                        <div className="shadow-lg p-3 mb-5 bg-white rounded border">
                                            {methodPayments.map((item) => {
                                                return (
                                                    <div key={item.id} className="mb-2">
                                                        <input
                                                            type="checkbox"
                                                            checked={checkedMethodPayment === item.id}
                                                            onChange={() => setCheckedMethodPayment(item.id)}
                                                        />
                                                        <span className="ml-3">{item.name}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <h6 className="font-weight-bold mb-4">Chi tiết giá:</h6>
                                        <div className="shadow-lg p-3 mb-5 bg-white rounded border">
                                            <h6 className="font-weight-bold d-inline mr-5">
                                                ({infoBookingDetails.amountOfRoom}X) {infoBookingDetails.roomType.name}
                                                <span className="ml-1">({infoBookingDetails.amountOfNight} đêm)</span>
                                            </h6>
                                            <h6 className="mt-1">
                                                <span className="font-weight-bold">Thành tiền:</span>
                                                <span className="ml-1 text-danger font-weight-bold">
                                                    {String(infoBookingDetails.total).replace(
                                                        /(\d)(?=(\d\d\d)+(?!\d))/g,
                                                        '$1,',
                                                    )}
                                                    đ
                                                </span>
                                            </h6>
                                        </div>
                                        <Button variant="success" className="mb-3 w-100" type="submit">
                                            Xác nhận đặt phòng
                                        </Button>
                                    </Form>
                                </div>
                                <div className="col-1"></div>
                                <div className="col-5">
                                    <h5 className="font-weight-bold mb-3">Thông tin đặt phòng</h5>
                                    <div className=" shadow-lg p-3 mb-5 bg-white rounded border">
                                        <div className="row">
                                            <img
                                                src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/6/6aa2fd01a9460e1a71bb0efb713f0212.svg"
                                                alt="..."
                                                className="img-thumbnail ml-2"
                                            />
                                            <span className="ml-2 font-weight-bold"> {infoBookingDetails.name}</span>
                                        </div>
                                        <div className="row ml-2 mt-2">
                                            <span className="font-weight-bold">Ngày nhận phòng:</span>
                                            <span className="float-right ml-4">
                                                {capitalizeFirstLetter(
                                                    moment(infoBookingDetails.startDate)
                                                        .format('dddd DD/MM/YYYY')
                                                        .toString(),
                                                )}
                                            </span>
                                        </div>
                                        <div className="row ml-2 mt-1">
                                            <span className="font-weight-bold mr-3">Ngày trả phòng: </span>
                                            <span className="float-right  ml-4">
                                                {capitalizeFirstLetter(
                                                    moment(infoBookingDetails.endDate)
                                                        .format('dddd DD/MM/YYYY')
                                                        .toString(),
                                                )}
                                            </span>
                                        </div>
                                        <div className="row ml-2 mt-3">
                                            <h5 className="font-weight-bold">
                                                ({infoBookingDetails.amountOfRoom}X)
                                                <span className="ml-1">{infoBookingDetails.roomType.name}</span>
                                            </h5>
                                        </div>
                                        <div className="row ml-2 mt-3">
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td className="font-weight-bold text-dark" width="50%">
                                                            Số lượng khách:
                                                        </td>
                                                        <td>{infoBookingDetails.amountOfPeople} khách</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="font-weight-bold text-dark">Kiểu giường:</td>
                                                        <td>{infoBookingDetails.roomType.bedType.name}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="font-weight-bold text-dark">Số đêm:</td>
                                                        <td>{infoBookingDetails.amountOfNight} đêm</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="font-weight-bold text-dark">Địa chỉ:</td>
                                                        <td>{infoBookingDetails.address} </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="font-weight-bold text-dark">Số điện thoại:</td>
                                                        <td>{infoBookingDetails.phoneNumber} </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="font-weight-bold text-dark">Giá phòng:</td>
                                                        <td className="text-danger font-weight-bold">
                                                            {' '}
                                                            {String(infoBookingDetails.roomType.price).replace(
                                                                /(\d)(?=(\d\d\d)+(?!\d))/g,
                                                                '$1,',
                                                            )}
                                                            đ
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                        <div className="row m-5">
                                            <img
                                                src={LINK_HOTEL_AVATAR_IMAGE + infoBookingDetails.fileName}
                                                alt="..."
                                                className="img-thumbnail"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            )}
        </>
    );
}

export default BookingNow;
