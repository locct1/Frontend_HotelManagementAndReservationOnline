import { Link } from 'react-router-dom';
import { useEffect, useState, useLayoutEffect } from 'react';

import 'react-toastify/dist/ReactToastify.css';
import Loading from '~/components/Loading';
import React, { Fragment } from 'react';
import ReservationProductUpdate from '~/components/Host/Reservation/ReservationProductUpdate';
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
import { UpdateReservationAtTheHotelService, checkRoomAvailability } from '~/services/hostreservation.service';
import { infoHostSelector } from '~/redux/selectors';

import { hostUpdateReservationSelector } from '~/redux/selectors';
import HostUpdateReservationSlice from '~/redux/Slices/HostUpdateReservationSlice';
import ReservationRoomUpdate from '~/components/Host/Reservation/ReservationRoomUpdate';
registerLocale('vi', vi);
function UpdateReservationAtTheHotel() {
    const reservation = useSelector(hostUpdateReservationSelector);
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
        defaultValues: reservation.clientOffline,
    });
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [startDate, setStartDate] = useState(new Date(reservation.startDate));
    const [rooms, setRooms] = useState([]);
    const [filterRooms, setFilterRooms] = useState([]);
    const [roomTypes, setRoomTypes] = useState([]);
    const [endDate, setEndDate] = useState(new Date(reservation.endDate));
    const [totalDay, setTotalDay] = useState(reservation.amountOfNight);
    const [roomIndex, setRoomIndex] = useState({});
    const [roomMoved, setRoomMoved] = useState({});
    const [checkedRoom, setCheckedRoom] = useState();
    const [amountOfPeople, setAmountOfPeople] = useState(reservation.amountOfPeople);
    const [note, setNote] = useState(reservation.note);
    const [checkUpdate, setCheckUpdate] = useState(true);
    useLayoutEffect(() => {
        let result = Math.round((endDate.valueOf() - startDate.valueOf()) / (60 * 60 * 1000 * 24));
        if (result < 1) {
            setTotalDay(1);
        } else {
            setTotalDay(Math.round((endDate.valueOf() - startDate.valueOf()) / (60 * 60 * 1000 * 24)));
        }
    }, [startDate, endDate]);
    const handleSetStartDate = (date) => {
        if (date.getDate() === endDate.getDate() || date > endDate) {
            setEndDate(new Date(new Date(date).setDate(new Date(date).getDate() + 1)));
        }
        const d = new Date();
        date.setMinutes(d.getMinutes());
        date.setSeconds(d.getSeconds());
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
        fetchData();
    }, []);
    const fetchData = async () => {
        let response = await getAllRooms();
        let responseCategory = await getAllRoomTypes();
        if (response.success && responseCategory.success) {
            setRooms(response.data);
            setRoomTypes(responseCategory.data);
            setStartDate(new Date(reservation.startDate));
            return;
        }
        toast.error(response.message);
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
    // useEffect(() => {
    //     handleCheckRoomAvailability();
    // }, [startDate]);
    // const handleCheckRoomAvailability = async () => {
    //     let response = await checkRoomAvailability({ startDate: startDate });
    //     console.log(response);
    //     let arr = [...rooms];
    //     response.data.forEach((element) => {
    //         arr = arr.filter((x) => x.id !== element.roomId);
    //     });
    //     setFilterRooms(arr);
    // };
    const handleShowModal = async (room) => {
        let response = await checkRoomAvailability({ startDate: startDate });
        let arr = [...rooms];
        response.data.forEach((element) => {
            arr = arr.filter((x) => x.id !== element.roomId);
        });
        let filterRoom = rooms.find((item) => item.id === room.roomId);
        setFilterRooms(arr.filter((x) => x.roomType.id === filterRoom.roomType.id));
        setRoomMoved(room);
        setShow(true);
    };
    const handleDeleteProductFromUpdateRoom = async (room, product) => {
        let data = { room: room, product: product };
        if (checkedRoom === room.id) {
            setRoomIndex(-1);
        }
        dispatch(HostUpdateReservationSlice.actions.removeProductInUpdateRoom(data));
    };
    const handleAddProductFromUpdateRoom = async (room, product) => {
        let quantity = 1;
        let data = { room: room, product: product, quantity: quantity };
        dispatch(HostUpdateReservationSlice.actions.addProductFromUpdateRoom(data));
    };
    const handleSetCheckedRoom = (room) => {
        dispatch(HostUpdateReservationSlice.actions.addCheckRoom(room.id));
        setCheckedRoom(room.id);
    };
    const infoHost = useSelector(infoHostSelector);
    const onSubmit = async (infoClientOffline) => {
        // if (reservation.r && listRooms.length > 0) {
        let data = {
            infoClientOffline: infoClientOffline,
            updateReservation: {
                id: reservation.id,
                hotelId: infoHost.hotel.id,
                hotelName: infoHost.hotel.name,
                hotelAddress: infoHost.hotel.address,
                hotelPhoneNumber: infoHost.hotel.phoneNumber,
                statusId: reservation.status.id,
                total:
                    reservation.roomReservations.map((item) => item.price).reduce((prev, next) => prev + next) *
                    totalDay,
                amountOfPeople: amountOfPeople,
                amountOfNight: totalDay,
                note: note,
                startDate: startDate,
                endDate: endDate,
                roomReservations: reservation.roomReservations,
            },
        };
        let response = await UpdateReservationAtTheHotelService(data);
        if (response.success) {
            toast.success(response.message);
            dispatch(HostUpdateReservationSlice.actions.resetHostUpdateReservation());
            return navigate('/host-reservation-list');
        }
        toast.error(response.message);
        // } else {
        //     toast.warning('Vui lòng chọn tối thiểu một phòng');
        // }
    };

    return (
        <>
            <>
                <></>
                <Header />
                <div className="container-fluid reservation-at-the-hotel">
                    <div className="row">
                        <div className="col-5">
                            <ReservationProductUpdate checkUpdate={checkUpdate} />
                        </div>
                        <div className="col-7">
                            <div className="card shadow mb-4">
                                <div className="card-header py-3">
                                    <h6 className="m-0 font-weight-bold text-primary">
                                        Cập nhật thông tin đặt phòng tại khách sạn
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
                                                            <th>Quản lý</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <ReservationRoomUpdate
                                                            rooms={filterRooms}
                                                            roomTypes={roomTypes}
                                                            roomIndex={roomIndex}
                                                            roomMoved={roomMoved}
                                                            show={show}
                                                            handleClose={handleClose}
                                                        />
                                                        {reservation.roomReservations &&
                                                        reservation.roomReservations.length > 0 ? (
                                                            <>
                                                                {reservation.roomReservations.map((room, index) => (
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
                                                                        <td>{room.roomName}</td>
                                                                        <td>
                                                                            {room.roomTypeName
                                                                                ? room.roomTypeName
                                                                                : 'Chưa thiết lập'}
                                                                        </td>
                                                                        <td>
                                                                            {room.price ? (
                                                                                <>
                                                                                    {String(room.price).replace(
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
                                                                            <Button
                                                                                variant="primary"
                                                                                onClick={() => handleShowModal(room)}
                                                                            >
                                                                                <i className="fas fa-exchange-alt"></i>{' '}
                                                                                {'  '}
                                                                                Chuyển phòng
                                                                            </Button>
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
                                                        {reservation.roomReservations &&
                                                        reservation.roomReservations.length > 0 ? (
                                                            reservation.roomReservations.map((room, indexRoom) => (
                                                                <Fragment key={room.id}>
                                                                    {room.roomReservationProducts &&
                                                                    room.roomReservationProducts.length > 0 ? (
                                                                        <>
                                                                            {room.roomReservationProducts.map(
                                                                                (product, index) => (
                                                                                    <tr key={product.id}>
                                                                                        <td>{room.roomName}</td>
                                                                                        <td>{product.productName}</td>
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
                                                                                                    handleDeleteProductFromUpdateRoom(
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
                                                                                                    handleAddProductFromUpdateRoom(
                                                                                                        room,
                                                                                                        product,
                                                                                                    )
                                                                                                }
                                                                                            >
                                                                                                <i className="fas fa-plus"></i>
                                                                                            </button>
                                                                                        </td>
                                                                                    </tr>
                                                                                ),
                                                                            )}
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <tr key={room.id}>
                                                                                <td colSpan="5">{room.roomName}</td>
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
                                                    Xác nhận cập nhật đơn đặt phòng
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

export default UpdateReservationAtTheHotel;
