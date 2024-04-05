import { LINK_ROOMTYPE_IMAGE } from '~/helpers/constants';
import ImageGallery from 'react-image-gallery';
import { useEffect, useLayoutEffect, useState } from 'react';
import { getBedTypeByRoomType, checkRoomAvailability } from '~/services/client.service';
import { useDispatch, useSelector } from 'react-redux';
import { isAuthenticatedClientSelector } from '~/redux/selectors';
import { ToastContainer, toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import DatePicker from 'react-datepicker';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import BookingNowSlice from '~/redux/Slices/BookingNowSlice';
import { infoClientSelector } from '~/redux/selectors';
import { useNavigate } from 'react-router-dom';
import RoomTypeInfoModal from './RoomTypeInfoModal';
import vi from 'date-fns/locale/vi';
registerLocale('vi', vi);
function RoomTypeDetail({ roomType, hotel }) {
    const isAuthenticated = useSelector(isAuthenticatedClientSelector);
    const [imagesRoomType, setImagesRoomType] = useState([]);
    const [bedType, settBedType] = useState({});
    const [roomTypeChild, setRoomTypeChild] = useState(roomType);
    const [devices, setDevices] = useState([]);
    const [amountOfPeople, setAmountOfPeople] = useState(1);
    const [amountOfRoom, setAmountOfRoom] = useState(1);
    const [show, setShow] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date(new Date().setDate(new Date().getDate() + 1)));
    const [totalDay, setTotalDay] = useState(1);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCloseInfo = () => setShowInfo(false);
    const handleShowInfo = () => setShowInfo(true);
    const handleShowModal = () => {
        if (roomTypeChild.amountOfSold <= 0) {
            toast.warning('Rất tiếc đã hết phòng. Vui lòng chọn phòng khác');
            return;
        }
        setShow(true);
    };
    useEffect(() => {
        pushImages();
    }, []);
    useEffect(() => {
        handleCheckRoomAvailability();
    }, [startDate]);
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const infoClient = useSelector(infoClientSelector);
    const handleMinusAmountOfPeople = () => {
        if (amountOfPeople === 1) {
            return;
        }
        let result = (amountOfPeople - 1) / roomTypeChild.max;
        if (Number.isInteger(result)) {
            setAmountOfRoom(result);
        } else {
            setAmountOfRoom(Math.floor(result) + 1);
        }
        setAmountOfPeople(amountOfPeople - 1);
    };
    const handlePlusAmountOfPeople = () => {
        if (roomTypeChild.max * roomTypeChild.amountOfSold === amountOfPeople) {
            toast.warning('Số lượng phòng không đủ', {
                toastId: 'warning-amountOfPeople',
            });
            return;
        }
        setAmountOfPeople(amountOfPeople + 1);
        setAmountOfRoom(Math.floor(amountOfPeople / roomTypeChild.max) + 1);
    };
    const handleMinusAmountOfRoom = () => {
        if (amountOfRoom === 1) {
            return;
        }
        if ((amountOfRoom - 1) * roomTypeChild.max < amountOfPeople) {
            toast.warning(`Cần tối thiếu ${amountOfRoom} phòng cho ${amountOfPeople} người ở`, {
                toastId: 'warning-amountOfPeople-Minus',
            });
            return;
        }
        setAmountOfRoom(amountOfRoom - 1);
    };
    const handlePlusAmountOfRoom = () => {
        if (amountOfRoom === amountOfPeople || amountOfRoom > amountOfPeople) {
            toast.warning('Số lượng phòng không lớn hơn số người ở', {
                toastId: 'warning-amountOfPeople',
            });
            return;
        }
        if (amountOfRoom === roomTypeChild.amountOfSold) {
            toast.warning('Số lượng phòng không đủ', {
                toastId: 'warning-amountOfSold',
            });
            return;
        }
        setAmountOfRoom(amountOfRoom + 1);
    };
    useLayoutEffect(() => {
        setTotalDay(Math.round((endDate.valueOf() - startDate.valueOf()) / (60 * 60 * 1000 * 24)));
    }, [startDate, endDate]);
    const pushImages = async () => {
        if (roomTypeChild) {
            let response = await getBedTypeByRoomType(roomTypeChild.id);
            if (response.success) {
                settBedType(response.data.bedType);
                setDevices(response.data.deviceRoomTypes);
            }
            let i;
            let array = roomTypeChild.roomTypePhotos.map((o) => o.fileName);
            for (i = 0; i < array.length; i++) {
                let object = {
                    original: LINK_ROOMTYPE_IMAGE + array[i],
                    thumbnail: LINK_ROOMTYPE_IMAGE + array[i],
                };
                setImagesRoomType((prev) => [...prev, object]);
            }

            return;
        }
    };
    const handleCheckRoomAvailability = async () => {
        let response = await checkRoomAvailability({
            startDate: startDate,
            roomTypeId: roomTypeChild.id,
        });
        if (response.success) {
            let as = roomType.amountOfSold - response.data;
            setRoomTypeChild({
                ...roomTypeChild,
                amountOfSold: as,
            });
        }
    };
    const handleCheckLogin = async () => {
        toast.warning('Vui lòng đăng nhập hoặc đăng ký để đặt phòng', {
            toastId: 'warning',
        });
    };
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
    const handleBookingNow = () => {
        // var today = new Date();
        // alert(today.getHours() + 7);
        if (startDate.getDate() === endDate.getDate() || startDate > endDate) {
            toast.warning('Vui lòng chọn ngày nhận phòng ko lớn hơn hoặc bằng ngày trả phòng', {
                toastId: 'warning-setDate',
            });
            return;
        }
        dispatch(
            BookingNowSlice.actions.addInfoBooking({
                infoClientBooking: infoClient,
                bookingDetails: {
                    id: hotel.id,
                    name: hotel.name,
                    address: hotel.address,
                    phoneNumber: hotel.phoneNumber,
                    fileName: hotel.fileName,
                    total: roomTypeChild.price * amountOfRoom * totalDay,
                    amountOfRoom: amountOfRoom,
                    amountOfPeople: amountOfPeople,
                    amountOfNight: totalDay,
                    startDate: startDate,
                    endDate: endDate,
                    roomType: {
                        id: roomTypeChild.id,
                        name: roomTypeChild.name,
                        price: roomTypeChild.price,
                        bedType: {
                            id: bedType.id,
                            name: bedType.name,
                        },
                    },
                },
            }),
        );
        navigate('/booking-now');
    };
    return (
        <>
            <div className="row">
                <div className="card mb-3 shadow-lg p-3 mb-5 bg-white rounded w-100">
                    <h4 className="card-title font-weight-bold mb-3 bg-dark text-light p-3 rounded">
                        {roomTypeChild.name}
                    </h4>
                    <div className="row">
                        <div className="col-md-4">
                            <ImageGallery
                                items={imagesRoomType}
                                autoPlay={true}
                                showNav={false}
                                thumbnailPosition={'left'}
                            />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title font-weight-bold mb-3">{roomTypeChild.name}</h5>
                                <p className="card-text">
                                    <span>Kiểu giường: {bedType.name}</span>
                                </p>
                                <p className="card-text">
                                    <span>Số lượng khách: {roomTypeChild.max} khách</span>
                                </p>
                                <p className="card-text">
                                    <span className="float-right text-danger">
                                        ({roomTypeChild.amountOfSold} Phòng trống )
                                    </span>
                                </p>
                                <p className="card-text">
                                    <small className="text-muted text-danger">
                                        <span className="font-weight-bold mr-1">Giá:</span>
                                        <span className="font-weight-bold text-danger" style={{ fontSize: '25px' }}>
                                            {String(roomTypeChild.price).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}đ
                                        </span>
                                    </small>
                                </p>

                                <button className="btn btn-primary" onClick={handleShowInfo}>
                                    Xem chi tiết
                                </button>
                                {roomTypeChild && hotel && bedType && devices && imagesRoomType && (
                                    <RoomTypeInfoModal
                                        handleClose={handleCloseInfo}
                                        show={showInfo}
                                        roomTypeChild={roomTypeChild}
                                        hotel={hotel}
                                        bedType={bedType}
                                        devices={devices}
                                        imagesRoomType={imagesRoomType}
                                    />
                                )}
                                {isAuthenticated ? (
                                    <>
                                        <button
                                            onClick={handleShowModal}
                                            className="ml-2 btn text-light"
                                            style={{ backgroundColor: '#dfa974' }}
                                        >
                                            Đặt phòng ngay
                                        </button>
                                        <Modal dialogClassName="modal-70w" show={show} onHide={handleClose}>
                                            <Modal.Header style={{ backgroundColor: '#dfa974' }} closeButton>
                                                <Modal.Title className="text-light">
                                                    Thông tin đặt phòng: {hotel.name}
                                                </Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <h4 className="text-info">{roomTypeChild.name}</h4>
                                                <div className="row">
                                                    <div className="col-sm-5">
                                                        <div className="row ml-1">
                                                            <div className="mt-3 col-7">
                                                                <span className="font-weight-bold">Số người ở:</span>
                                                            </div>
                                                            <div className="col-5 float-right">
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
                                                                        className="form-control input-number client-input-number"
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
                                                        <div className="row ml-1 mt-3">
                                                            <div className="mt-3 col-7 ">
                                                                <span className="font-weight-bold">
                                                                    Số lượng phòng:
                                                                </span>
                                                            </div>
                                                            <div className="col-5">
                                                                <div className="input-group w-100">
                                                                    <span className="input-group-prepend">
                                                                        <button
                                                                            type="button"
                                                                            className="btn btn-outline-secondary btn-number"
                                                                            data-type="minus"
                                                                            data-field="quant[1]"
                                                                            onClick={handleMinusAmountOfRoom}
                                                                        >
                                                                            <span className="fa fa-minus" />
                                                                        </button>
                                                                    </span>
                                                                    <input
                                                                        type="text"
                                                                        name="quant[1]"
                                                                        className="form-control input-number client-input-number"
                                                                        value={amountOfRoom}
                                                                    />
                                                                    <span className="input-group-append">
                                                                        <button
                                                                            type="button"
                                                                            className="btn btn-outline-secondary btn-number"
                                                                            data-type="plus"
                                                                            data-field="quant[1]"
                                                                            onClick={handlePlusAmountOfRoom}
                                                                        >
                                                                            <span className="fa fa-plus" />
                                                                        </button>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row ml-1 mt-3">
                                                            <div className="mt-3 col-7 ">
                                                                <span className="font-weight-bold">
                                                                    Ngày nhận phòng:
                                                                </span>
                                                            </div>
                                                            <div className="col-5">
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
                                                                <span className="font-weight-bold">
                                                                    Ngày trả phòng:
                                                                </span>
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
                                                                            new Date().setDate(
                                                                                new Date().getDate() + 1,
                                                                            ),
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
                                                    </div>
                                                    <div className="col-sm-1"></div>
                                                    <div className="col-sm-6">
                                                        <table>
                                                            <tbody>
                                                                <tr>
                                                                    <td width="40%">
                                                                        <h5 className="font-weight-bold text-dark">
                                                                            Thông tin phòng:
                                                                        </h5>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="font-weight-bold text-dark">
                                                                        Số lượng khách:
                                                                    </td>
                                                                    <td> Tối đa {roomTypeChild.max} khách</td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="font-weight-bold text-dark">
                                                                        Số phòng trống:
                                                                    </td>
                                                                    <td className="text-danger">
                                                                        {roomTypeChild.amountOfSold} phòng trống
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td
                                                                        className="font-weight-bold text-dark"
                                                                        style={{ verticalAlign: 'top' }}
                                                                    >
                                                                        Thiết bị trong phòng:
                                                                    </td>
                                                                    <td>
                                                                        {devices &&
                                                                            devices.length > 0 &&
                                                                            devices.map((record, index) => (
                                                                                <div className="row ml-1 " key={index}>
                                                                                    - {record.device.name}
                                                                                </div>
                                                                            ))}
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="font-weight-bold text-dark">
                                                                        Kiểu giường:
                                                                    </td>
                                                                    <td>{bedType.name}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="font-weight-bold text-dark">Giá:</td>
                                                                    <td
                                                                        className="font-weight-bold text-danger"
                                                                        style={{ fontSize: '25px' }}
                                                                        s
                                                                    >
                                                                        {' '}
                                                                        {String(roomTypeChild.price).replace(
                                                                            /(\d)(?=(\d\d\d)+(?!\d))/g,
                                                                            '$1,',
                                                                        )}
                                                                        đ
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={handleClose}>
                                                    Đóng
                                                </Button>

                                                <button
                                                    className="btn text-light"
                                                    onClick={handleBookingNow}
                                                    style={{ backgroundColor: '#dfa974' }}
                                                >
                                                    Xác nhận đặt phòng
                                                </button>
                                            </Modal.Footer>
                                        </Modal>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={handleCheckLogin}
                                            className="ml-2 btn text-light"
                                            style={{ backgroundColor: '#dfa974' }}
                                        >
                                            Đặt phòng ngay
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RoomTypeDetail;
