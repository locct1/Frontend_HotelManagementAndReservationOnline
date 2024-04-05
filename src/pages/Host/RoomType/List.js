import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { stringToSlug } from '~/helpers/covertString';
import {
    getAllRoomTypes,
    addRoomType,
    deleteRoomType,
    getRoomTypeById,
    updateRoomType,
} from '~/services/roomtype.service';
import { getAllDevices, addDeviceRoomTypes, getAllDeviceRoomType } from '~/services/deviceroomtype.service';
import { getAllBedTypes } from '~/services/bedtype.service';
import InputSearch from '~/components/InputSearch';
import AddRoomTypeModal from '~/components/Host/RoomType/AddRoomTypeModal';
import UpdateRoomTypeModal from '~/components/Host/RoomType/UpdateRoomTypeModal';
import UpdateDeviceRoomTypeModal from '~/components/Host/RoomType/UpdateDeviceRoomTypeModal';
import { Pagination } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '~/components/Loading';
function RoomType() {
    const pageSize = 5;
    let i = 1;
    // State
    const [roomTypes, setRoomTypes] = useState([]);
    const [bedtypes, setBedTypes] = useState([]);
    const [devices, setDevices] = useState([]);
    const [deviceRoomType, setDeviceRoomType] = useState([]);
    const [filterRoomTypes, setFilterRoomTypes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [totalPage, setTotalPage] = useState(0);
    const [current, setCurrent] = useState(1);
    const [minIndex, setMinIndex] = useState(0);
    const [maxIndex, setMaxIndex] = useState(0);

    const [showAdd, setShowAdd] = useState(false);
    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => {
        if (bedtypes <= 0) {
            toast.error('Vui lòng điền ít nhất một kiểu giường');
            return;
        }
        setShowAdd(true);
    };

    const [roomType, setRoomType] = useState();
    const [showUpdate, setShowUpdate] = useState(false);
    const handleCloseUpdate = () => setShowUpdate(false);
    const handleShowUpdate = () => setShowUpdate(true);

    const [showUpdateDevice, setShowUpdateDevice] = useState(false);
    const handleCloseUpdateDevice = () => setShowUpdateDevice(false);
    const handleShowUpdateDevice = () => setShowUpdateDevice(true);

    useEffect(() => {
        fetchData();
        setTotalPage(filterRoomTypes.data / pageSize);
        setMinIndex(0);
        setMaxIndex(pageSize);
    }, []);
    const fetchData = async () => {
        let response = await getAllRoomTypes();
        let responseCategory = await getAllBedTypes();
        let responseDevice = await getAllDevices();
        if (response.success && responseCategory.success) {
            setRoomTypes(response.data);
            setFilterRoomTypes(response.data);
            setBedTypes(responseCategory.data);
            setDevices(responseDevice.data);
            if (isLoading)
                setTimeout(() => {
                    setIsLoading(false);
                }, 400);
            return;
        }
        toast.error(response.message);
    };
    const handleSubmitAdd = async (data) => {
        let response = await addRoomType(data);
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
    const handleGetRoomType = async (id) => {
        if (bedtypes <= 0) {
            toast.error('Vui lòng điền ít nhất một kiểu giường');
            return;
        }
        let response = await getRoomTypeById(id);
        if (response.success) {
            response.data.bedTypeId = response.data.bedType ? response.data.bedType.id : bedtypes[0].id;
            delete response.data['bedType'];
            setRoomType(response.data);
            handleShowUpdate();
        }
    };
    const handleGetDeviceRoomType = async (id) => {
        if (bedtypes <= 0) {
            toast.error('Vui lòng điền ít nhất một kiểu giường');
            return;
        }
        let response = await getRoomTypeById(id);
        let responseDevice = await getAllDeviceRoomType(id);
        if (response.success) {
            response.data.bedTypeId = response.data.bedType ? response.data.bedType.id : bedtypes[0].id;
            delete response.data['bedType'];
            setRoomType(response.data);
            let deviceIds = responseDevice.data.map((item) => item.deviceId);
            setDeviceRoomType(deviceIds);
            handleShowUpdateDevice();
        }
    };
    const handleSubmitUpdate = async (data) => {
        let response = await updateRoomType(data);
        if (response.success) {
            fetchData();
            toast.success(response.message);
            return true;
        }
        toast.error(response.message);
        return false;
    };
    const handleSubmitUpdateDevice = async (data) => {
        let response = await addDeviceRoomTypes(data);
        if (response.success) {
            fetchData();
            toast.success(response.message);
            return true;
        }
        toast.error(response.message);
        return false;
    };
    const handDeleteRoomType = async (id) => {
        let response = await deleteRoomType(id);
        if (response.success) {
            toast.success(response.message);
            fetchData();
            return;
        }
        toast.error(response.message);
        return false;
    };
    const handleChangeSearch = (data) => {
        if (data === '') return setFilterRoomTypes(roomTypes);
        else {
            let newArray = roomTypes.filter((roomType) => {
                return stringToSlug(roomType.name).includes(stringToSlug(data));
            });
            if (newArray.length <= 0) {
                newArray = roomTypes.filter((roomType) => {
                    return stringToSlug(roomType.bedType.name).includes(stringToSlug(data));
                });
            }
            setFilterRoomTypes(newArray);
            handleChangePage(1);
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
                            <h6 className="m-0 font-weight-bold text-primary">Quản lý loại phòng</h6>
                        </div>
                        <div className="card-body">
                            <button className="btn btn-success mb-3" onClick={handleShowAdd}>
                                <i className="fas fa-plus"></i> Thêm loại phòng
                            </button>
                            <InputSearch onSearch={handleChangeSearch} />
                            <div className="table-responsive">
                                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                                    <thead>
                                        <tr className="bg bg-dark text-light">
                                            <th width="4%">STT</th>
                                            <th>Loại phòng</th>
                                            <th>Kiểu giường</th>
                                            <th>Số người ở</th>
                                            <th>Giá</th>
                                            <th>Số lượng bán</th>
                                            <th>Thiết bị</th>
                                            <th width="15%">Quản lý</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bedtypes && bedtypes.length > 0 && (
                                            <AddRoomTypeModal
                                                showAdd={showAdd}
                                                onCloseAdd={handleCloseAdd}
                                                onSubmitAdd={handleSubmitAdd}
                                                bedtypes={bedtypes}
                                            />
                                        )}
                                        {roomType && bedtypes && (
                                            <UpdateRoomTypeModal
                                                showUpdate={showUpdate}
                                                onCloseUpdate={handleCloseUpdate}
                                                onSubmitUpdate={handleSubmitUpdate}
                                                roomType={roomType}
                                                bedtypes={bedtypes}
                                            />
                                        )}
                                        {roomType && deviceRoomType && (
                                            <UpdateDeviceRoomTypeModal
                                                showUpdate={showUpdateDevice}
                                                onCloseUpdate={handleCloseUpdateDevice}
                                                onSubmitUpdate={handleSubmitUpdateDevice}
                                                roomType={roomType}
                                                devices={devices}
                                                deviceRoomType={deviceRoomType}
                                            />
                                        )}

                                        {filterRoomTypes && filterRoomTypes.length > 0 ? (
                                            <>
                                                {filterRoomTypes.map(
                                                    (roomType, index) =>
                                                        index >= minIndex &&
                                                        index < maxIndex && (
                                                            <tr key={roomType.id}>
                                                                <td>{++index}</td>
                                                                <td>{roomType.name}</td>
                                                                <td>
                                                                    {roomType.bedType
                                                                        ? roomType.bedType.name
                                                                        : 'Chưa thiết lập'}
                                                                </td>
                                                                <td>{roomType.max}</td>
                                                                <td>
                                                                    {String(roomType.price).replace(
                                                                        /(\d)(?=(\d\d\d)+(?!\d))/g,
                                                                        '$1,',
                                                                    )}
                                                                    <sup>đ</sup>
                                                                </td>
                                                                <td>{roomType.amountOfSold}</td>
                                                                <td>
                                                                    {roomType.deviceRoomTypes &&
                                                                    roomType.deviceRoomTypes.length > 0 ? (
                                                                        <>
                                                                            <ul>
                                                                                {roomType.deviceRoomTypes.map(
                                                                                    (record, index) => (
                                                                                        <>
                                                                                            <li
                                                                                                className="text-dark font-weight-bold"
                                                                                                key={record.device.id}
                                                                                            >
                                                                                                {record.device.name}
                                                                                            </li>
                                                                                        </>
                                                                                    ),
                                                                                )}
                                                                            </ul>
                                                                        </>
                                                                    ) : (
                                                                        <div className="text-danger ml-2 font-weight-bold">
                                                                            Chưa thiết lập
                                                                        </div>
                                                                    )}
                                                                </td>
                                                                <td>
                                                                    <button
                                                                        className="btn btn-success ml-2"
                                                                        onClick={() =>
                                                                            handleGetDeviceRoomType(roomType.id)
                                                                        }
                                                                    >
                                                                        <i className="fas fa-wrench"></i>
                                                                    </button>
                                                                    <button
                                                                        className="btn btn-primary ml-2"
                                                                        onClick={() => handleGetRoomType(roomType.id)}
                                                                    >
                                                                        <i className="fas fa-edit"></i>
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handDeleteRoomType(roomType.id)}
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

                        <div className="mb-5  d-flex justify-content-end mr-3">
                            <Pagination
                                pageSize={pageSize}
                                current={current}
                                total={filterRoomTypes.length}
                                onChange={handleChangePage}
                            />
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default RoomType;
