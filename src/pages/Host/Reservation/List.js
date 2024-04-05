import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { stringToSlug } from '~/helpers/covertString';
import { updateStatus } from '~/services/hostbookingonline.service';
import { getAllReservations, updateReservationStatus } from '~/services/hostreservation.service';
import { getAllStatuses } from '~/services/status.service';
import InputSearch from '~/components/InputSearch';
import { Pagination } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '~/components/Loading';
import Form from 'react-bootstrap/Form';
import moment from 'moment';
import 'moment/locale/vi';
import ReservationDetailModal from '~/components/Host/Reservation/ReservationDetailModal';
import { useDispatch, useSelector } from 'react-redux';
import { hostUpdateReservationSelector } from '~/redux/selectors';
import HostUpdateReservationSlice from '~/redux/Slices/HostUpdateReservationSlice';
function HostReservation() {
    const pageSize = 5;
    const classNameStatus = [
        '',
        'bg bg-warning text-dark',
        'bg bg-info text-light',
        'bg bg-danger text-light',
        'bg bg-primary text-light',
        'bg bg-secondary text-light',
        '',
        'bg bg-warning text-dark',
        'bg bg-info text-light',
        'bg bg-success text-light',
        'bg bg-danger text-light',
        'bg bg-danger text-light',
        'bg bg-danger text-light',
        '',
        '',
    ];
    let i = 1;
    // State
    const [reservations, setReservations] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [filterReservations, setFilterReservations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalPage, setTotalPage] = useState(0);
    const [current, setCurrent] = useState(1);
    const [minIndex, setMinIndex] = useState(0);
    const [maxIndex, setMaxIndex] = useState(0);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [reservation, setReservation] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        fetchData();
        setTotalPage(filterReservations.data / pageSize);
        setMinIndex(0);
        setMaxIndex(pageSize);
    }, []);
    const fetchData = async () => {
        let response = await getAllReservations();
        let responseStatus = await getAllStatuses();
        if (response.success && responseStatus.success) {
            setReservations(response.data.reverse());
            setStatuses(responseStatus.data);
            setFilterReservations(response.data);
            if (isLoading)
                setTimeout(() => {
                    setIsLoading(false);
                }, 400);
            return;
        }
        toast.error(response.message);
    };

    const handleChangePage = (page) => {
        setCurrent(page);
        setMinIndex((page - 1) * pageSize);
        setMaxIndex(page * pageSize);
    };

    const handleChangeSearch = (data) => {
        if (data === '') return setFilterReservations(reservations);
        else {
            let newArray = reservations.filter((reservation) => {
                return stringToSlug(reservation.clientOffline.fullName).includes(stringToSlug(data));
            });

            setFilterReservations(newArray);
            handleChangePage(1);
        }
    };
    const onChangeStatus = async (e, reservationId) => {
        let response = await updateReservationStatus(
            {
                statusId: parseInt(e.target.value),
            },
            reservationId,
        );
        if (response.success) {
            toast.success(response.message, {
                autoClose: 2500,
            });
            fetchData();
            return;
        }
        toast.error(response.message);
    };
    const handleGetReservation = async (id) => {
        let response = filterReservations.find((x) => x.id === id);
        if (response) {
            setReservation(response);
            handleShow();
        }
    };
    const handleEditReservation = async (id) => {
        let reservation = filterReservations.find((x) => x.id === id);
        if (reservation) {
            dispatch(HostUpdateReservationSlice.actions.loadReservation({ reservation: reservation }));
            navigate('/host-update-reservation-at-the-hotel');
        }
    };
    const handlePrintReservation = async (id) => {
        let reservation = filterReservations.find((x) => x.id === id);
        if (reservation) {
            if (reservation.statusId === 9) {
                dispatch(HostUpdateReservationSlice.actions.loadReservation({ reservation: reservation }));
                navigate('/host-print-reservation');
            } else {
                toast.warning('Đơn đặt phòng hoàn thành mới in');
                return;
            }
        }
    };
    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-primary">Quản lý đặt phòng online</h6>
                        </div>
                        <div className="card-body">
                            <Link to="/host-reservation-at-the-hotel" className="btn btn-success mb-3">
                                <i className="fas fa-plus"></i> Tạo đơn đặt phòng
                            </Link>
                            <InputSearch onSearch={handleChangeSearch} />
                            <div className="table-responsive">
                                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                                    <thead>
                                        <tr className="bg bg-dark text-light">
                                            <th width="4%">STT</th>
                                            <th width="10%">Người nhận phòng</th>
                                            <th width="4%">Số điện thoại</th>
                                            <th width="10%">Ngày nhận phòng</th>
                                            <th width="10%">Ngày trả phòng</th>
                                            <th width="10%">Phòng thuê</th>
                                            <th width="12%">Trạng thái</th>
                                            <th width="15%">Quản lý</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reservation && (
                                            <ReservationDetailModal
                                                show={show}
                                                onClose={handleClose}
                                                reservation={reservation}
                                            />
                                        )}
                                        {filterReservations && filterReservations.length > 0 ? (
                                            <>
                                                {filterReservations.map(
                                                    (reservation, index) =>
                                                        index >= minIndex &&
                                                        index < maxIndex && (
                                                            <tr key={reservation.id}>
                                                                <td>{++index}</td>
                                                                <td>{reservation.clientOffline.fullName}</td>
                                                                <td>{reservation.clientOffline.phoneNumber}</td>
                                                                <td>
                                                                    {moment(reservation.startDate).format(
                                                                        'DD/MM/YYYY HH:mm:ss',
                                                                    )}
                                                                </td>
                                                                <td>
                                                                    {moment(reservation.endDate).format(
                                                                        'DD/MM/YYYY HH:mm:ss',
                                                                    )}
                                                                </td>
                                                                <td>
                                                                    {reservation.roomReservations.map((room, index) => (
                                                                        <>
                                                                            <p key={room.id}>{room.roomName}</p>
                                                                        </>
                                                                    ))}
                                                                </td>
                                                                <td>
                                                                    <Form.Control
                                                                        as="select"
                                                                        value={reservation.status.id}
                                                                        onChange={(e) =>
                                                                            onChangeStatus(e, reservation.id)
                                                                        }
                                                                        className={
                                                                            classNameStatus[reservation.status.id]
                                                                        }
                                                                    >
                                                                        {statuses
                                                                            .slice(6, statuses.length)
                                                                            .map((status, index) => (
                                                                                <option
                                                                                    value={status.id}
                                                                                    key={status.id}
                                                                                    className="text-dark bg bg-light"
                                                                                >
                                                                                    {status.name}
                                                                                </option>
                                                                            ))}
                                                                    </Form.Control>
                                                                </td>
                                                                <td>
                                                                    <button
                                                                        className="btn btn-success ml-2"
                                                                        onClick={() =>
                                                                            handleGetReservation(reservation.id)
                                                                        }
                                                                    >
                                                                        <i className="fas fa-eye"></i>
                                                                    </button>
                                                                    <button
                                                                        className="btn btn-primary ml-2"
                                                                        onClick={() =>
                                                                            handleEditReservation(reservation.id)
                                                                        }
                                                                    >
                                                                        <i className="fas fa-edit"></i>
                                                                    </button>
                                                                    <button
                                                                        className="btn btn-info ml-2"
                                                                        onClick={() =>
                                                                            handlePrintReservation(reservation.id)
                                                                        }
                                                                    >
                                                                        <i class="fas fa-print"></i>
                                                                    </button>
                                                                    <button className="btn btn-danger ml-2">
                                                                        <i className="fas fa-trash-alt"></i>
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ),
                                                )}
                                            </>
                                        ) : (
                                            <tr>
                                                <td colSpan="8" className="text-center">
                                                    Không có dữ liệu
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="mb-5  d-flex justify-content-end mr-3">
                            <Pagination
                                pageSize={pageSize}
                                current={current}
                                total={filterReservations.length}
                                onChange={handleChangePage}
                            />
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default HostReservation;
