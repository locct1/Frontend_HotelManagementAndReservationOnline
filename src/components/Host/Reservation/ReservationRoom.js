import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { stringToSlug } from '~/helpers/covertString';
import { getAllRooms, addRoom, deleteRoom, getRoomById, updateRoom } from '~/services/room.service';
import { getAllRoomTypes } from '~/services/roomtype.service';
import InputSearch from '~/components/InputSearch';
import AddRoomModal from '~/components/Host/Room/AddRoomModal';
import UpdateRoomModal from '~/components/Host/Room/UpdateRoomModal';
import { Pagination } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '~/components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { hostReservationListRoomsSelector } from '~/redux/selectors';
import HostReservationSlice from '~/redux/Slices/HostReservationSlice';
function ReservationRoom({ rooms, roomTypes, roomIndex }) {
    const pageSize = 5;
    let i = 1;

    // State

    const [filterRooms, setFilterRooms] = useState([]);
    const [roomChildren, setRoomChildren] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [totalPage, setTotalPage] = useState(0);
    const [current, setCurrent] = useState(1);
    const [minIndex, setMinIndex] = useState(0);
    const [maxIndex, setMaxIndex] = useState(0);

    const [showAdd, setShowAdd] = useState(false);

    const listRooms = useSelector(hostReservationListRoomsSelector);

    const dispatch = useDispatch();
    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => {
        if (roomTypes <= 0) {
            toast.error('Vui lòng điền ít nhất một loại phòng');
            return;
        }
        setShowAdd(true);
    };

    const [showUpdate, setShowUpdate] = useState(false);
    const handleCloseUpdate = () => setShowUpdate(false);
    const handleShowUpdate = () => setShowUpdate(true);

    useEffect(() => {
        fetchData();
        setTotalPage(filterRooms.data / pageSize);
        setMinIndex(0);
        setMaxIndex(pageSize);
    }, [rooms, roomTypes]);
    useEffect(() => {
        if (isLoading)
            setTimeout(() => {
                setIsLoading(false);
            }, 400);
    }, []);
    useEffect(() => {
        if (roomIndex.room) {
            let newArray = [...filterRooms];
            newArray.splice(roomIndex.check, 0, roomIndex.room);
            newArray.sort(function (a, b) {
                return a.id - b.id || a.name.localeCompare(b.name);
            });
            setFilterRooms(newArray);
            setRoomChildren(newArray);
        }
    }, [roomIndex]);
    const fetchData = async () => {
        setRoomChildren(rooms);
        setFilterRooms(rooms);
        return;
    };
    const handleSubmitAdd = async (data) => {
        let response = await addRoom(data);
        if (response.success) {
            fetchData();
            toast.success(response.message);
            return true;
        }
        toast.error(response.message);
        return false;
    };
    const handleChangePage = (page) => {
        setCurrent(page);
        setMinIndex((page - 1) * pageSize);
        setMaxIndex(page * pageSize);
    };
    const handleAddRoom = async (room) => {
        let dataRoom = {
            ...room,
            roomTypeName: room.roomType.name,
            roomName: room.name,
            bedTypeName: room.roomType.bedType.name,
            price: room.roomType.price,
            roomId: room.id,
        };
        dataRoom.listProducts = [];
        dispatch(HostReservationSlice.actions.addRoom(dataRoom));
        let data = filterRooms;
        data = data.filter((record) => record.id !== room.id);
        setFilterRooms(data);
        setRoomChildren(data);
    };
    const handleSubmitUpdate = async (data) => {
        let response = await updateRoom(data);
        if (response.success) {
            fetchData();
            toast.success(response.message);
            return true;
        }
        toast.error(response.message);
        return false;
    };
    const handleChangeSearch = (data) => {
        if (data === '') return setFilterRooms(roomChildren);
        else {
            let newArray = roomChildren.filter((room) => {
                return stringToSlug(room.name).includes(stringToSlug(data));
            });
            if (newArray.length <= 0) {
                newArray = roomChildren.filter((room) => {
                    return stringToSlug(room.roomType.name).includes(stringToSlug(data));
                });
            }
            setFilterRooms(newArray);
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
                            <h6 className="m-0 font-weight-bold text-primary">Danh sách phòng</h6>
                        </div>
                        <div className="card-body">
                            <InputSearch onSearch={handleChangeSearch} />
                            <div className="table-responsive">
                                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                                    <thead>
                                        <tr className="bg bg-dark text-light">
                                            <th width="4%">STT</th>
                                            <th>Tên phòng</th>
                                            <th>Loại phòng</th>
                                            <th>Giá</th>
                                            <th>Ghi chú</th>
                                            <th>Trạng thái</th>
                                            <th width="10%">Quản lý</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {roomTypes && roomTypes.length > 0 && (
                                            <AddRoomModal
                                                showAdd={showAdd}
                                                onCloseAdd={handleCloseAdd}
                                                onSubmitAdd={handleSubmitAdd}
                                                roomTypes={roomTypes}
                                            />
                                        )}

                                        {filterRooms && filterRooms.length > 0 ? (
                                            <>
                                                {filterRooms.map(
                                                    (room, index) =>
                                                        index >= minIndex &&
                                                        index < maxIndex && (
                                                            <tr key={room.name}>
                                                                <td>{++index}</td>
                                                                <td>{room.name}</td>
                                                                <td>
                                                                    {room.roomType
                                                                        ? room.roomType.name
                                                                        : 'Chưa thiết lập'}
                                                                </td>
                                                                <td>
                                                                    {room.roomType ? (
                                                                        <>
                                                                            {String(room.roomType.price).replace(
                                                                                /(\d)(?=(\d\d\d)+(?!\d))/g,
                                                                                '$1,',
                                                                            )}
                                                                            <sup>đ</sup>
                                                                        </>
                                                                    ) : (
                                                                        'Chưa thiết lập'
                                                                    )}
                                                                </td>
                                                                <td>{room.note}</td>
                                                                <td>
                                                                    {room.status === 0 ? (
                                                                        <>
                                                                            <span className="badge badge-danger">
                                                                                Chưa dọn
                                                                            </span>
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <span className="badge badge-success">
                                                                                Đã dọn
                                                                            </span>
                                                                        </>
                                                                    )}
                                                                </td>
                                                                <td>
                                                                    <button
                                                                        className="btn btn-success ml-2"
                                                                        onClick={() => handleAddRoom(room)}
                                                                    >
                                                                        <i className="fas fa-plus"></i>
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ),
                                                )}
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

                        <div className="mb-5  d-flex justify-content-end mr-3">
                            <Pagination
                                pageSize={pageSize}
                                current={current}
                                total={filterRooms.length}
                                onChange={handleChangePage}
                            />
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default ReservationRoom;
