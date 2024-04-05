import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { stringToSlug } from '~/helpers/covertString';
import { getAllBookingOnlines, updateStatus, getBookingOnline } from '~/services/adminbookingonline.service';
import { getAllStatuses } from '~/services/status.service';
import InputSearch from '~/components/InputSearch';

import { Pagination } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '~/components/Loading';
import Form from 'react-bootstrap/Form';
import BookingOnlineDetailModal from '~/components/Host/BookingOnline/BookingOnlineDetailModal';
import moment from 'moment';
import 'moment/locale/vi';
function AdminBooking() {
    const pageSize = 5;
    const classNameStatus = [
        '',
        'bg bg-warning text-dark',
        'bg bg-info text-light',
        'bg bg-danger text-light',
        'bg bg-primary text-light',
        'bg bg-secondary text-light',
        'bg bg-success text-light',
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
        fetchData();
        setTotalPage(filterBookingOnlines.data / pageSize);
        setMinIndex(0);
        setMaxIndex(pageSize);
    }, []);
    const fetchData = async () => {
        let response = await getAllBookingOnlines();
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
            let newArray = bookingOnlines.filter((id) => {
                return stringToSlug(bookingOnline.id).includes(stringToSlug(data));
            });

            setFilterBookingOnlines(newArray);
            handleChangePage(1);
        }
    };
    const onChangeStatus = async (e, bookingOnlineId) => {
        let response = await updateStatus(
            {
                statusId: parseInt(e.target.value),
            },
            bookingOnlineId,
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
    const handleGetBookingOnline = async (id) => {
        let response = await getBookingOnline(id);
        if (response.success) {
            setBookingOnline(response.data);
            handleShow();
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
                            <InputSearch onSearch={handleChangeSearch} />
                            <div className="table-responsive">
                                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                                    <thead>
                                        <tr className="bg bg-dark text-light">
                                            <th width="4%">STT</th>
                                            <th width="10%">Người nhận phòng</th>
                                            <th width="4%">Số điện thoại</th>
                                            <th width="10%">Ngày tạo</th>
                                            <th width="10%">Ngày cập nhật</th>
                                            <th width="15%">Trạng thái</th>
                                            <th width="10%">Quản lý</th>
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
                                                                <td>{bookingOnline.user.fullName}</td>
                                                                <td>{bookingOnline.user.phoneNumber}</td>
                                                                <td>
                                                                    {moment(bookingOnline.createdAt).format(
                                                                        'DD/MM/YYYY HH:mm:ss',
                                                                    )}
                                                                </td>
                                                                <td>
                                                                    {moment(bookingOnline.updatedAt).format(
                                                                        'DD/MM/YYYY HH:mm:ss',
                                                                    )}
                                                                </td>
                                                                <td>
                                                                    <Form.Control
                                                                        as="select"
                                                                        value={bookingOnline.status.id}
                                                                        onChange={(e) =>
                                                                            onChangeStatus(e, bookingOnline.id)
                                                                        }
                                                                        className={
                                                                            classNameStatus[bookingOnline.status.id]
                                                                        }
                                                                    >
                                                                        {statuses.slice(0, 6).map((status, index) => (
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
                                                                        className="btn btn-primary ml-2"
                                                                        onClick={() =>
                                                                            handleGetBookingOnline(bookingOnline.id)
                                                                        }
                                                                    >
                                                                        <i className="fas fa-eye"></i>
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
                                                <td colSpan="7" className="text-center">
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
                </>
            )}
        </>
    );
}

export default AdminBooking;
