import { Link } from 'react-router-dom';
import { useEffect, useState, useLayoutEffect } from 'react';

import 'react-toastify/dist/ReactToastify.css';
import Loading from '~/components/Loading';
import React, { Fragment } from 'react';
import ReservationProduct from '~/components/Host/Reservation/ReservationProduct';
import ReservationRoom from '~/components/Host/Reservation/ReservationRoom';
import { getAllRooms, addRoom, deleteRoom, getRoomById, updateRoom } from '~/services/room.service';
import { getAllRoomTypes } from '~/services/roomtype.service';
import './ReservationAtTheHotel.scss';
import Header from '~/layouts/components/Header';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import vi from 'date-fns/locale/vi';
import { ToastContainer, toast } from 'react-toastify';
import CheckableTag from 'antd/es/tag/CheckableTag';
import { useDispatch, useSelector } from 'react-redux';
import {
    hostReservationListRoomsSelector,
    hostReservationListProductsSelector,
    hostReservationCheckedRoomSelector,
} from '~/redux/selectors';
import HostReservationSlice from '~/redux/Slices/HostReservationSlice';
import { ReservationAtTheHotelService, checkRoomAvailability } from '~/services/hostreservation.service';
import { infoHostSelector } from '~/redux/selectors';
registerLocale('vi', vi);
function ReservationAtTheHotel() {
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
    const navigate = useNavigate();
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
        // defaultValues: infoClient,
    });
    const [show, setShow] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [rooms, setRooms] = useState([]);
    const [filterRooms, setFilterRooms] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [roomTypes, setRoomTypes] = useState([]);
    const [endDate, setEndDate] = useState(new Date(new Date().setDate(new Date().getDate() + 1)));
    const [totalDay, setTotalDay] = useState(1);
    const [roomIndex, setRoomIndex] = useState({});
    const [checkedRoom, setCheckedRoom] = useState();
    const [amountOfPeople, setAmountOfPeople] = useState(1);
    const [note, setNote] = useState('');
    useLayoutEffect(() => {
        setTotalDay(Math.round((endDate.valueOf() - startDate.valueOf()) / (60 * 60 * 1000 * 24)));
    }, [startDate, endDate]);
    const handleSetStartDate = (date) => {
        if (date.getDate() === endDate.getDate() || date > endDate) {
            setEndDate(new Date(new Date(date).setDate(new Date(date).getDate() + 1)));
        }
        setStartDate(date);
    };
    const handleSetEndDate = (date) => {
        if (date.getDate() === startDate.getDate() || date < startDate) {
            setStartDate(new Date(new Date(date).setDate(new Date(date).getDate() - 1)));
        }

        setEndDate(date);
    };
    const listRooms = useSelector(hostReservationListRoomsSelector);
    const checkedRoomReducer = useSelector(hostReservationCheckedRoomSelector);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(HostReservationSlice.actions.resetHostReservation());
    }, []);
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        let response = await getAllRooms();
        let responseCategory = await getAllRoomTypes();
        if (response.success && responseCategory.success) {
            setRooms(response.data);
            setFilterRooms(response.data);
            setRoomTypes(responseCategory.data);
            setStartDate(new Date());
            return;
        }
        toast.error(response.message);
    };
    useEffect(() => {
        handleCheckRoomAvailability();
    }, [startDate]);
    const handleCheckRoomAvailability = async () => {
        let response = await checkRoomAvailability({ startDate: startDate });
        let arr = [...rooms];
        response.data.forEach((element) => {
            arr = arr.filter((x) => x.id !== element.roomId);
        });
        setFilterRooms(arr);
    };
    const handlePlusAmountOfPeople = () => {
        setAmountOfPeople(amountOfPeople + 1);
    };
    const handleMinusAmountOfPeople = () => {
        if (amountOfPeople === 1) {
            return;
        }
        setAmountOfPeople(amountOfPeople - 1);
    };
    const handleDeleteRoom = async (room) => {
        let check = filterRooms.findIndex((x) => x.id === room.id);
        let data = { room: room, check: check };
        setRoomIndex(data);
        dispatch(HostReservationSlice.actions.removeRoom({ id: room.id }));
    };
    const handleDeleteProduct = async (room, product) => {
        let data = { room: room, product: product };
        if (checkedRoom === room.id) {
            setRoomIndex(-1);
        }
        dispatch(HostReservationSlice.actions.removeProductInRoom(data));
    };
    const handleAddProductFromRoom = async (room, product) => {
        let quantity = 1;
        let data = { room: room, product: product, quantity: quantity };

        dispatch(HostReservationSlice.actions.addProductFromRoom(data));
    };
    const handleSetCheckedRoom = (room) => {
        dispatch(HostReservationSlice.actions.addCheckRoom(room.id));
        setCheckedRoom(room.id);
    };
    const infoHost = useSelector(infoHostSelector);
    const onSubmit = async (infoClientOffline) => {
        if (listRooms && listRooms.length > 0) {
            let data = {
                infoClientOffline: infoClientOffline,
                addReservation: {
                    hotelId: infoHost.hotel.id,
                    hotelName: infoHost.hotel.name,
                    hotelAddress: infoHost.hotel.address,
                    hotelPhoneNumber: infoHost.hotel.phoneNumber,
                    total: listRooms.map((item) => item.roomType.price).reduce((prev, next) => prev + next) * totalDay,
                    amountOfPeople: amountOfPeople,
                    amountOfNight: totalDay,
                    note: note,
                    startDate: startDate,
                    endDate: endDate,
                    roomReservations: listRooms,
                },
            };
            let response = await ReservationAtTheHotelService(data);
            if (response.success) {
                toast.success(response.message);
                return navigate('/host-reservation-list');
            }
            toast.error(response.message);
        } else {
            toast.warning('Vui lòng chọn tối thiểu một phòng');
        }
    };

    return (
        <>
            <>
                <></>
                <Header />
                <div className="container-fluid reservation-at-the-hotel">
                    <div className="row">
                        <div className=" ml-3 mt-3 mb-3">
                            <Link to="/host-reservation-list">
                                <button className="btn btn-dark">
                                    <h5>Quay lại trang quản lý</h5>
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="row">
                        <div className=" ml-3 mt-3 mb-3">
                            <span className="bg bg-info text-light p-2 rounded tag-library-image">
                                Tạo đơn đặt phòng
                            </span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-5">
                            {filterRooms && roomTypes && (
                                <ReservationRoom rooms={filterRooms} roomTypes={roomTypes} roomIndex={roomIndex} />
                            )}
                            <div className="mt-5 mb-5"></div>
                            <ReservationProduct />
                        </div>
                        <div className="col-7">
                            <div className="card shadow mb-4">
                                <div className="card-header py-3">
                                    <h6 className="m-0 font-weight-bold text-primary">
                                        Tạo thông tin đặt phòng tại khách sạn
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <h6 className="ml-3 font-weight-bold">Thông tin đặt phòng</h6>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-8">
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <div className="row ml-1 mt-3">
                                                        <div className="mt-3 col-7 col-sm-7 ">
                                                            <span className="font-weight-bold">Ngày nhận phòng:</span>
                                                        </div>
                                                        <div className="col-5 col-sm-5">
                                                            <DatePicker
                                                                dayClassName={() => 'example-datepicker-day-class'}
                                                                popperClassName="example-datepicker-class"
                                                                todayButton="TODAY"
                                                                locale="vi"
                                                                className="mt-2 form-control"
                                                                selected={startDate}
                                                                onChange={(date) => handleSetStartDate(date)}
                                                                dateFormat="dd/MM/yyyy"
                                                                minDate={new Date()}
                                                            />
                                                            <span
                                                                style={{
                                                                    position: 'absolute',
                                                                    top: '33%',
                                                                    right: '25px',
                                                                }}
                                                            >
                                                                <i className="fas fa-calendar-alt"></i>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="row ml-1 mt-3">
                                                        <div className="mt-3 col-7 ">
                                                            <span className="font-weight-bold">Ngày trả phòng:</span>
                                                        </div>
                                                        <div className="col-5">
                                                            <DatePicker
                                                                dayClassName={() => 'example-datepicker-day-class'}
                                                                popperClassName="example-datepicker-class"
                                                                todayButton="TODAY"
                                                                locale="vi"
                                                                className="mt-2 form-control"
                                                                selected={endDate}
                                                                onChange={(date) => handleSetEndDate(date)}
                                                                dateFormat="dd/MM/yyyy"
                                                                minDate={
                                                                    new Date(
                                                                        new Date().setDate(new Date().getDate() + 1),
                                                                    )
                                                                }
                                                            />
                                                            <span
                                                                style={{
                                                                    position: 'absolute',
                                                                    top: '33%',
                                                                    right: '25px',
                                                                }}
                                                            >
                                                                <i className="fas fa-calendar-alt"></i>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="row ml-1 mt-3">
                                                        <div className="mt-3 col-7 ">
                                                            <span className="font-weight-bold">Số đêm:</span>
                                                        </div>
                                                        <div className="col-5 mt-3">
                                                            <span className="mr-1"> {totalDay}</span>
                                                            đêm
                                                        </div>
                                                    </div>
                                                    <div className="row ml-1">
                                                        <div className="mt-4 col-7">
                                                            <span className="font-weight-bold">Số người ở:</span>
                                                        </div>
                                                        <div className="col-5 float-right mt-3">
                                                            <div className="input-group w-100">
                                                                <span className="input-group-prepend">
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-outline-secondary btn-number"
                                                                        data-type="minus"
                                                                        data-field="quant[1]"
                                                                        onClick={handleMinusAmountOfPeople}
                                                                    >
                                                                        <span className="fa fa-minus" />
                                                                    </button>
                                                                </span>
                                                                <input
                                                                    type="text"
                                                                    name="quant[1]"
                                                                    className="form-control input-number host-input-number"
                                                                    value={amountOfPeople}
                                                                />
                                                                <span className="input-group-append">
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-outline-secondary btn-number"
                                                                        data-type="plus"
                                                                        data-field="quant[1]"
                                                                        onClick={handlePlusAmountOfPeople}
                                                                    >
                                                                        <span className="fa fa-plus" />
                                                                    </button>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-12">
                                            <h6 className="mt-3 font-weight-bold">Danh sách phòng đặt</h6>
                                            <div className="table-responsive">
                                                <table
                                                    className="table table-bordered"
                                                    id="dataTable"
                                                    width="100%"
                                                    cellSpacing={0}
                                                >
                                                    <thead>
                                                        <tr className="bg bg-dark text-light">
                                                            <th>Chọn</th>
                                                            <th>Tên phòng</th>
                                                            <th>Loại phòng</th>
                                                            <th>Giá</th>
                                                            <th width="10%">Quản lý</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {listRooms && listRooms.length > 0 ? (
                                                            <>
                                                                {listRooms.map((room, index) => (
                                                                    <tr key={room.id}>
                                                                        <td>
                                                                            <input
                                                                                type="radio"
                                                                                checked={checkedRoom === room.id}
                                                                                onChange={() =>
                                                                                    handleSetCheckedRoom(room)
                                                                                }
                                                                            />
                                                                        </td>
                                                                        <td>{room.name}</td>
                                                                        <td>
                                                                            {room.roomType
                                                                                ? room.roomType.name
                                                                                : 'Chưa thiết lập'}
                                                                        </td>
                                                                        <td>
                                                                            {room.roomType ? (
                                                                                <>
                                                                                    {String(
                                                                                        room.roomType.price,
                                                                                    ).replace(
                                                                                        /(\d)(?=(\d\d\d)+(?!\d))/g,
                                                                                        '$1,',
                                                                                    )}
                                                                                    <sup>đ</sup>
                                                                                </>
                                                                            ) : (
                                                                                'Chưa thiết lập'
                                                                            )}
                                                                        </td>
                                                                        <td>
                                                                            <button
                                                                                className="btn btn-danger ml-2"
                                                                                onClick={() => handleDeleteRoom(room)}
                                                                            >
                                                                                <i className="fas fa-trash"></i>
                                                                            </button>
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </>
                                                        ) : (
                                                            <tr>
                                                                <td colSpan="6" className="text-center">
                                                                    Không có dữ liệu
                                                                </td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-12">
                                            <h6 className="mt-3 font-weight-bold">Danh sách sản phẩm-dịch vụ</h6>
                                            <div className="table-responsive">
                                                <table
                                                    className="table table-bordered"
                                                    id="dataTable"
                                                    width="100%"
                                                    cellSpacing={0}
                                                >
                                                    <thead>
                                                        <tr className="bg bg-dark text-light">
                                                            <th>Tên phòng</th>
                                                            <th>Tên sản phẩm</th>
                                                            <th>Giá</th>
                                                            <th>Số lượng</th>
                                                            <th width="20%">Quản lý</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {listRooms && listRooms.length > 0 ? (
                                                            listRooms.map((room, indexRoom) => (
                                                                <Fragment key={room.name}>
                                                                    {room.listProducts &&
                                                                    room.listProducts.length > 0 ? (
                                                                        <>
                                                                            {room.listProducts.map((product, index) => (
                                                                                <tr key={product.name}>
                                                                                    <td>{room.name}</td>
                                                                                    <td>{product.name}</td>
                                                                                    <td>
                                                                                        {product.price ? (
                                                                                            <>
                                                                                                {String(
                                                                                                    product.price,
                                                                                                ).replace(
                                                                                                    /(\d)(?=(\d\d\d)+(?!\d))/g,
                                                                                                    '$1,',
                                                                                                )}
                                                                                                <sup>đ</sup>
                                                                                            </>
                                                                                        ) : (
                                                                                            'Chưa thiết lập'
                                                                                        )}
                                                                                    </td>
                                                                                    <td>{product.quantity}</td>
                                                                                    <td>
                                                                                        <button
                                                                                            className="btn btn-danger ml-2"
                                                                                            onClick={() =>
                                                                                                handleDeleteProduct(
                                                                                                    room,
                                                                                                    product,
                                                                                                )
                                                                                            }
                                                                                        >
                                                                                            <i className="fas fa-minus"></i>
                                                                                        </button>
                                                                                        <button
                                                                                            className="btn btn-success ml-2"
                                                                                            onClick={() =>
                                                                                                handleAddProductFromRoom(
                                                                                                    room,
                                                                                                    product,
                                                                                                )
                                                                                            }
                                                                                        >
                                                                                            <i className="fas fa-plus"></i>
                                                                                        </button>
                                                                                    </td>
                                                                                </tr>
                                                                            ))}
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <tr key={room.id}>
                                                                                <td colSpan="5">{room.name}</td>
                                                                            </tr>
                                                                        </>
                                                                    )}
                                                                </Fragment>
                                                            ))
                                                        ) : (
                                                            <>
                                                                <tr>
                                                                    <td colSpan="6" className="text-center">
                                                                        Không có dữ liệu
                                                                    </td>
                                                                </tr>
                                                            </>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <h6 className="ml-3 font-weight-bold">Thông tin khách hàng</h6>
                                    </div>
                                    <div className="row ml-1">
                                        <div className="col-12 col-sm-8">
                                            <Form onSubmit={handleSubmit(onSubmit)}>
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label className="text-dark font-weight-bold">
                                                        Họ và tên:
                                                    </Form.Label>
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
                                                    <Form.Label className="text-dark font-weight-bold">
                                                        Email:
                                                    </Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Nhập email"
                                                        {...register('email')}
                                                    />
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
                                                        <p className="mt-2 text-danger">
                                                            {errors.phoneNumber?.message}
                                                        </p>
                                                    )}
                                                </Form.Group>
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label className="text-dark font-weight-bold">
                                                        Địa chỉ:
                                                    </Form.Label>
                                                    <Form.Control
                                                        style={{ fontSize: '80%' }}
                                                        as="textarea"
                                                        rows={3}
                                                        placeholder="Nhập địa chỉ"
                                                        {...register('address')}
                                                    />
                                                    {errors.address?.message && (
                                                        <p className="mt-2 text-danger">{errors.address?.message}</p>
                                                    )}
                                                </Form.Group>
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label className="text-dark font-weight-bold">
                                                        Ghi chú:
                                                    </Form.Label>
                                                    <Form.Control
                                                    style={{ fontSize: '80%' }}
                                                        as="textarea"
                                                        rows={3}
                                                        value={note}
                                                        name="note"
                                                        onChange={(e) => setNote(e.target.value)}
                                                    />
                                                </Form.Group>
                                                <Button variant="success" className="mb-3 w-100" type="submit">
                                                    Xác nhận tạo đơn đặt phòng
                                                </Button>
                                            </Form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </>
    );
}

export default ReservationAtTheHotel;
