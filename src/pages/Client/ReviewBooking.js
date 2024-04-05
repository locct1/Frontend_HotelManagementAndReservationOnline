import { NavLink, Link } from 'react-router-dom';
import { getBookingByUser, getBookingDetailsById, cancelBooking } from '~/services/client.service';
import ClientLoading from '~/components/ClientLoading';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { LINK_HOTEL_AVATAR_IMAGE } from '~/helpers/constants';
import { Pagination } from 'antd';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '~/components/Loading';
import { getAllStatuses } from '~/services/status.service';
import { stringToSlug } from '~/helpers/covertString';
import moment from 'moment';
import 'moment/locale/vi';
import InputSearch from '~/components/InputSearch';
import { capitalizeFirstLetter } from '~/helpers/covertString';
import BookingOnlineDetailModal from '~/components/Client/BookingOnlineDetailModal';
function ReviewBooking() {
    const pageSize = 5;
    const classNameStatus = [
        '',
        'badge  badge-warning text-dark',
        'badge  badge-info text-light',
        'badge  badge-danger text-light',
        'badge  badge-primary text-light',
        'badge  badge-secondary text-light',
        'badge  badge-success text-light',
    ];
    let i = 1;
    // State
    const [bookingOnlines, setBookingOnlines] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [filterBookingOnlines, setFilterBookingOnlines] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalPage, setTotalPage] = useState(0);
    const [current, setCurrent] = useState(1);
    const [minIndex, setMinIndex] = useState(0);
    const [maxIndex, setMaxIndex] = useState(0);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [bookingOnline, setBookingOnline] = useState();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    useEffect(() => {
        fetchData();
        setTotalPage(filterBookingOnlines.data / pageSize);
        setMinIndex(0);
        setMaxIndex(pageSize);
    }, []);
    const fetchData = async () => {
        let response = await getBookingByUser();
        let responseStatus = await getAllStatuses();
        if (response.success && responseStatus.success) {
            setBookingOnlines(response.data.reverse());
            setStatuses(responseStatus.data);
            setFilterBookingOnlines(response.data);
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
        if (data === '') return setFilterBookingOnlines(bookingOnlines);
        else {
            let newArray = bookingOnlines.filter((bookingOnline) => {
                return stringToSlug(bookingOnline.hotelName).includes(stringToSlug(data));
            });

            setFilterBookingOnlines(newArray);
            handleChangePage(1);
        }
    };
    const handleGetBookingOnline = async (id) => {
        let response = await getBookingDetailsById(id);
        if (response.success) {
            setBookingOnline(response.data);
            handleShow();
        }
    };
    const handleCancelBooking = async (id) => {
        let response = await cancelBooking(id);
        if (response.success) {
            toast.success(response.message);
            fetchData();
            return;
        }
        toast.error(response.message);
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
                                        <h2>Xem đơn đặt phòng</h2>
                                        <div className="bt-option">
                                            <Link to="/">Trang chủ</Link>
                                            <span>Xem đơn đặt phòng</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container mt-4">
                            <div className="card shadow mb-4">
                                <div className="card-header py-3">
                                    <h6 className="m-0 font-weight-bold text-primary">
                                        Danh sách đặt phòng online của bạn
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <InputSearch onSearch={handleChangeSearch} />
                                    <div className="table-responsive">
                                        <table
                                            className="table table-bordered"
                                            id="dataTable"
                                            width="100%"
                                            cellSpacing={0}
                                        >
                                            <thead>
                                                <tr className="bg bg-dark text-light">
                                                    <th width="4%">STT</th>
                                                    <th width="10%">Khách sạn</th>
                                                    <th width="20%">Địa chỉ</th>
                                                    <th width="8%">Tông tiền</th>
                                                    <th width="15%">Ngày nhận phòng</th>
                                                    <th width="15%">Ngày trả phòng</th>
                                                    <th width="15%">Trạng thái</th>
                                                    <th width="15%">Hủy đặt phòng</th>
                                                    <th width="25%">Quản lý</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {bookingOnline && (
                                                    <BookingOnlineDetailModal
                                                        show={show}
                                                        onClose={handleClose}
                                                        bookingOnline={bookingOnline}
                                                    />
                                                )}
                                                {filterBookingOnlines && filterBookingOnlines.length > 0 ? (
                                                    <>
                                                        {filterBookingOnlines.map(
                                                            (bookingOnline, index) =>
                                                                index >= minIndex &&
                                                                index < maxIndex && (
                                                                    <tr key={bookingOnline.id}>
                                                                        <td>{++index}</td>
                                                                        <td>{bookingOnline.hotelName}</td>
                                                                        <td>{bookingOnline.hotelAddress}</td>
                                                                        <td>
                                                                            {String(bookingOnline.total).replace(
                                                                                /(\d)(?=(\d\d\d)+(?!\d))/g,
                                                                                '$1,',
                                                                            )}
                                                                            đ
                                                                        </td>
                                                                        <td>
                                                                            {capitalizeFirstLetter(
                                                                                moment(bookingOnline.startDate).format(
                                                                                    'dddd DD/MM/YYYY',
                                                                                ),
                                                                            )}{' '}
                                                                            sau{' '}
                                                                            {moment(bookingOnline.startDate).format(
                                                                                'HH:mm',
                                                                            )}
                                                                        </td>
                                                                        <td>
                                                                            {capitalizeFirstLetter(
                                                                                moment(bookingOnline.endDate).format(
                                                                                    'dddd DD/MM/YYYY',
                                                                                ),
                                                                            )}{' '}
                                                                            trước{' '}
                                                                            {moment(bookingOnline.endDate).format(
                                                                                'HH:mm',
                                                                            )}
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                <span
                                                                                    className={
                                                                                        classNameStatus[
                                                                                            bookingOnline.statusId
                                                                                        ]
                                                                                    }
                                                                                >
                                                                                    {bookingOnline.status.name}
                                                                                </span>
                                                                            }
                                                                        </td>
                                                                        <td className="text-center">
                                                                            <button
                                                                                disabled={
                                                                                    bookingOnline.statusId === 3 ||
                                                                                    bookingOnline.statusId === 4 ||
                                                                                    bookingOnline.statusId === 5 ||
                                                                                    bookingOnline.statusId === 6
                                                                                        ? 'true'
                                                                                        : ''
                                                                                }
                                                                                onClick={() =>
                                                                                    handleCancelBooking(
                                                                                        bookingOnline.id,
                                                                                    )
                                                                                }
                                                                                className="btn btn-danger"
                                                                            >
                                                                                <i class="fas fa-feather"></i>
                                                                            </button>
                                                                        </td>
                                                                        <td className="text-center">
                                                                            <button
                                                                                className="btn btn-primary ml-2"
                                                                                onClick={() =>
                                                                                    handleGetBookingOnline(
                                                                                        bookingOnline.id,
                                                                                    )
                                                                                }
                                                                            >
                                                                                <i className="fas fa-eye"></i>
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
                                        total={filterBookingOnlines.length}
                                        onChange={handleChangePage}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default ReviewBooking;
