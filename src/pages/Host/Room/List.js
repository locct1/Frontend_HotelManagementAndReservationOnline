import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { stringToSlug } from '~/helpers/covertString';
import { getAllRooms, addRoom, deleteRoom, getRoomById, updateRoom, changeStatusRoom } from '~/services/room.service';
import { getAllRoomTypes } from '~/services/roomtype.service';
import InputSearch from '~/components/InputSearch';
import AddRoomModal from '~/components/Host/Room/AddRoomModal';
import UpdateRoomModal from '~/components/Host/Room/UpdateRoomModal';
import { Pagination } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '~/components/Loading';
function Room() {
    const pageSize = 5;
    let i = 1;
    // State
    const [rooms, setRooms] = useState([]);
    const [roomTypes, setRoomTypes] = useState([]);
    const [filterRooms, setFilterRooms] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [totalPage, setTotalPage] = useState(0);
    const [current, setCurrent] = useState(1);
    const [minIndex, setMinIndex] = useState(0);
    const [maxIndex, setMaxIndex] = useState(0);

    const [showAdd, setShowAdd] = useState(false);
    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => {
        if (roomTypes <= 0) {
            toast.error('Vui lòng điền ít nhất một loại phòng');
            return;
        }
        setShowAdd(true);
    };

    const [room, setRoom] = useState();
    const [showUpdate, setShowUpdate] = useState(false);
    const handleCloseUpdate = () => setShowUpdate(false);
    const handleShowUpdate = () => setShowUpdate(true);

    useEffect(() => {
        fetchData();
        setTotalPage(filterRooms.data / pageSize);
        setMinIndex(0);
        setMaxIndex(pageSize);
    }, []);
    const fetchData = async () => {
        let response = await getAllRooms();
        let responseCategory = await getAllRoomTypes();
        if (response.success && responseCategory.success) {
            setRooms(response.data);
            setFilterRooms(response.data);
            setRoomTypes(responseCategory.data);
            if (isLoading)
                setTimeout(() => {
                    setIsLoading(false);
                }, 400);
            return;
        }
        toast.error(response.message);
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
    const handleGetRoom = async (id) => {
        if (roomTypes <= 0) {
            toast.error('Vui lòng điền ít nhất một loại phòng');
            return;
        }
        let response = await getRoomById(id);
        if (response.success) {
            response.data.roomTypeId = response.data.roomType ? response.data.roomType.id : roomTypes[0].id;
            delete response.data['roomType'];
            setRoom(response.data);
            handleShowUpdate();
        }
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
    const handDeleteRoom = async (id) => {
        let response = await deleteRoom(id);
        if (response.success) {
            toast.success(response.message);
            fetchData();
            return;
        }
        toast.error(response.message);
        return false;
    };
    const handleChangeSearch = (data) => {
        if (data === '') return setFilterRooms(rooms);
        else {
            let newArray = rooms.filter((room) => {
                return stringToSlug(room.name).includes(stringToSlug(data));
            });
            if (newArray.length <= 0) {
                newArray = rooms.filter((room) => {
                    return stringToSlug(room.roomType.name).includes(stringToSlug(data));
                });
            }
            setFilterRooms(newArray);
            handleChangePage(1);
        }
    };
    const handleChangeStatusRoom = async (id) => {
        let response = await changeStatusRoom(id);
        if (response.success) {
            toast.success(response.message);
            fetchData();
            return;
        }
        toast.error(response.message);
        return false;
    };
    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-primary">Quản lý phòng</h6>
                        </div>
                        <div className="card-body">
                            <button className="btn btn-success mb-3" onClick={handleShowAdd}>
                                <i className="fas fa-plus"></i> Thêm phòng
                            </button>
                            <InputSearch onSearch={handleChangeSearch} />
                            <div className="table-responsive">
                                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                                    <thead>
                                        <tr className="bg bg-dark text-light">
                                            <th width="4%">STT</th>
                                            <th>Tên phòng</th>
                                            <th>Loại phòng</th>
                                            <th>Ghi chú</th>
                                            <th width="10%">Trạng thái</th>
                                            <th width="15%">Quản lý</th>
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
                                        {room && roomTypes && (
                                            <UpdateRoomModal
                                                showUpdate={showUpdate}
                                                onCloseUpdate={handleCloseUpdate}
                                                onSubmitUpdate={handleSubmitUpdate}
                                                room={room}
                                                roomTypes={roomTypes}
                                            />
                                        )}
                                        {filterRooms && filterRooms.length > 0 ? (
                                            <>
                                                {filterRooms.map(
                                                    (room, index) =>
                                                        index >= minIndex &&
                                                        index < maxIndex && (
                                                            <tr key={room.id}>
                                                                <td>{++index}</td>
                                                                <td>{room.name}</td>
                                                                <td>
                                                                    {room.roomType
                                                                        ? room.roomType.name
                                                                        : 'Chưa thiết lập'}
                                                                </td>
                                                                <td>{room.note}</td>
                                                                <td>
                                                                    {room.status === 0 ? (
                                                                        <>
                                                                            <button
                                                                                class="btn btn-danger"
                                                                                onClick={() =>
                                                                                    handleChangeStatusRoom(room.id)
                                                                                }
                                                                            >
                                                                                Chưa dọn
                                                                            </button>
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <button
                                                                                class="btn btn-success"
                                                                                onClick={() =>
                                                                                    handleChangeStatusRoom(room.id)
                                                                                }
                                                                            >
                                                                                Đã dọn
                                                                            </button>
                                                                        </>
                                                                    )}
                                                                </td>
                                                                <td>
                                                                    <button
                                                                        className="btn btn-primary ml-2"
                                                                        onClick={() => handleGetRoom(room.id)}
                                                                    >
                                                                        <i className="fas fa-edit"></i>
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handDeleteRoom(room.id)}
                                                                        className="btn btn-danger ml-2"
                                                                    >
                                                                        <i className="fas fa-trash-alt"></i>
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ),
                                                )}
                                            </>
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="text-center">
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

export default Room;
