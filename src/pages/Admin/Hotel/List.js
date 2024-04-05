import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { stringToSlug } from '~/helpers/covertString';
import { getAllHotels, getHotelById, changeStatusHostAccount, changeStatusHotel } from '~/services/hotel.service';
import InputSearch from '~/components/InputSearch';
import { Pagination } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '~/components/Loading';
import HotelDetailModal from '~/components/Admin/Hotel/HotelDetailModal';
function Hotel() {
    const pageSize = 5;
    let i = 1;
    // State
    const [hotels, setHotels] = useState([]);   
    const [filterHotels, setFilterHotels] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalPage, setTotalPage] = useState(0);
    const [current, setCurrent] = useState(1);
    const [minIndex, setMinIndex] = useState(0);
    const [maxIndex, setMaxIndex] = useState(0);

    const [showAdd, setShowAdd] = useState(false);
    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);

    const [hotel, setHotel] = useState();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        fetchData();
        setTotalPage(filterHotels.data / pageSize);
        setMinIndex(0);
        setMaxIndex(pageSize);
    }, []);
    const fetchData = async () => {
        let response = await getAllHotels();
        if (response.success) {
            setHotels(response.data);
            setFilterHotels(response.data);
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
    const handleGetHotel = async (id) => {
        let hotel = filterHotels.find((x) => x.id === id);
        if (hotel) {
            setHotel(hotel);
            handleShow();
        }
    };

    const handleChangeSearch = (data) => {
        if (data === '') return setFilterHotels(hotels);
        else {
            let newArray = hotels.filter((hotel) => {
                return stringToSlug(hotel.name).includes(stringToSlug(data));
            });
            if (newArray <= 0) {
                newArray = hotels.filter((hotel) => {
                    return stringToSlug(hotel.hotelAccount.fullName).includes(stringToSlug(data));
                });
            }
            if (newArray <= 0) {
                newArray = hotels.filter((hotel) => {
                    return stringToSlug(hotel.name).includes(stringToSlug(data));
                });
            }
            if (newArray <= 0) {
                newArray = hotels.filter((hotel) => {
                    return stringToSlug(hotel.address).includes(stringToSlug(data));
                });
            }
            setFilterHotels(newArray);
            handleChangePage(1);
        }
    };
    const handleChangeStatusHostAccount = async (userId) => {
        let response = await changeStatusHostAccount(userId);
        if (response.success) {
            toast.success(response.message);
            await fetchData();
            return;
        }
        toast.error(response.message);
    };
    const handleChangeStatusHotel = async (hotelId) => {
        let response = await changeStatusHotel(hotelId);
        if (response.success) {
            toast.success(response.message);
            await fetchData();
            return;
        }
        toast.error(response.message);
    };
    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-primary">Quản lý chủ khách sạn</h6>
                        </div>
                        <div className="card-body">
                            <InputSearch onSearch={handleChangeSearch} />
                            <div className="table-responsive">
                                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                                    <thead>
                                        <tr className="bg bg-primary-custom text-light">
                                            <th width="4%">STT</th>
                                            <th>Họ tên</th>
                                            <th>Email</th>
                                            <th>Tên khách sạn</th>
                                            <th>Địa chỉ</th>
                                            <th className="text-center">Trạng thái tài khoản</th>
                                            <th className="text-center">Trạng thái khách sạn</th>
                                            <th width="10%">Quản lý</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {hotel && (
                                            <HotelDetailModal show={show} onClose={handleClose} hotel={hotel} />
                                        )}
                                        {filterHotels.map(
                                            (hotel, index) =>
                                                index >= minIndex &&
                                                index < maxIndex && (
                                                    <tr key={hotel.id}>
                                                        <td>{++index}</td>
                                                        <td>{hotel.hotelAccount.fullName}</td>
                                                        <td>{hotel.hotelAccount.email}</td>
                                                        <td>{hotel.name}</td>
                                                        <td>{hotel.address}</td>
                                                        <td className="text-center">
                                                            {hotel.hotelAccount.disabled ? (
                                                                <button
                                                                    className="btn btn-outline-danger btn-sm"
                                                                    onClick={() =>
                                                                        handleChangeStatusHostAccount(
                                                                            hotel.hotelAccount.id,
                                                                        )
                                                                    }
                                                                >
                                                                    Chưa kích hoạt
                                                                </button>
                                                            ) : (
                                                                <button
                                                                    className="btn btn-outline-success btn-sm"
                                                                    onClick={() =>
                                                                        handleChangeStatusHostAccount(
                                                                            hotel.hotelAccount.id,
                                                                        )
                                                                    }
                                                                >
                                                                    Đã kích hoạt
                                                                </button>
                                                            )}
                                                        </td>
                                                        <td className="text-center">
                                                            {hotel.disabled ? (
                                                                <button
                                                                    className="btn btn-outline-danger btn-sm"
                                                                    onClick={() => handleChangeStatusHotel(hotel.id)}
                                                                >
                                                                    Ẩn
                                                                </button>
                                                            ) : (
                                                                <button
                                                                    className="btn btn-outline-success btn-sm"
                                                                    onClick={() => handleChangeStatusHotel(hotel.id)}
                                                                >
                                                                    Hiện
                                                                </button>
                                                            )}
                                                        </td>
                                                        <td>
                                                            <button
                                                                className="btn btn-primary ml-2"
                                                                onClick={() => handleGetHotel(hotel.id)}
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
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="mb-5  d-flex justify-content-end mr-3">
                            <Pagination
                                pageSize={pageSize}
                                current={current}
                                total={filterHotels.length}
                                onChange={handleChangePage}
                            />
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default Hotel;
