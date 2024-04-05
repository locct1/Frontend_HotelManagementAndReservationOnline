import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { stringToSlug } from '~/helpers/covertString';
import { getAllDevices, addDevice, deleteDevice, getDeviceById, updateDevice } from '~/services/device.service';
import InputSearch from '~/components/InputSearch';
import AddDeviceModal from '~/components/Admin/Device/AddDeviceModal';
import UpdateDeviceModal from '~/components/Admin/Device/UpdateDeviceModal';
import { Pagination } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '~/components/Loading';
function Device() {
    const pageSize = 5;
    let i = 1;
    // State
    const [devices, setDevices] = useState([]);
    const [filterDevices, setFilterDevices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalPage, setTotalPage] = useState(0);
    const [current, setCurrent] = useState(1);
    const [minIndex, setMinIndex] = useState(0);
    const [maxIndex, setMaxIndex] = useState(0);

    const [showAdd, setShowAdd] = useState(false);
    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);

    const [device, setDevice] = useState();
    const [showUpdate, setShowUpdate] = useState(false);
    const handleCloseUpdate = () => setShowUpdate(false);
    const handleShowUpdate = () => setShowUpdate(true);

    useEffect(() => {
        fetchData();
        setTotalPage(filterDevices.data / pageSize);
        setMinIndex(0);
        setMaxIndex(pageSize);
    }, []);
    const fetchData = async () => {
        let response = await getAllDevices();
        if (response.success) {
            setDevices(response.data);
            setFilterDevices(response.data);
            if (isLoading)
                setTimeout(() => {
                    setIsLoading(false);
                }, 400);
            return;
        }
        toast.error(response.message);
    };
    const handleSubmitAdd = async (data) => {
        let response = await addDevice(data);
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
    const handleGetDevice = async (id) => {
        let response = await getDeviceById(id);
        if (response.success) {
            setDevice(response.data);
            handleShowUpdate();
        }
    };
    const handleSubmitUpdate = async (data) => {
        let response = await updateDevice(data);
        if (response.success) {
            fetchData();
            toast.success(response.message);
            return true;
        }
        toast.error(response.message);
        return false;
    };
    const handDeleteDevice = async (id) => {
        let response = await deleteDevice(id);
        if (response.success) {
            toast.success('Xóa thành công', {
                position: 'bottom-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
            });
            fetchData();
            return;
        }
        toast.error('Đã xảy ra lỗi,vui lòng thử lại');
        return false;
    };
    const handleChangeSearch = (data) => {
        if (data === '') return setFilterDevices(devices);
        else {
            let newArray = devices.filter((device) => {
                return stringToSlug(device.name).includes(stringToSlug(data));
            });
            setFilterDevices(newArray);
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
                            <h6 className="m-0 font-weight-bold text-primary">Quản lý thiết bị</h6>
                        </div>
                        <div className="card-body">
                            <button className="btn btn-success mb-3" onClick={handleShowAdd}>
                                <i className="fas fa-plus"></i> Thêm thiết bị
                            </button>
                            <InputSearch onSearch={handleChangeSearch} />
                            <div className="table-responsive">
                                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                                    <thead>
                                        <tr className="bg bg-dark text-light">
                                            <th width="4%">STT</th>
                                            <th>Thiết bị</th>
                                            <th width="10%">Quản lý</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <AddDeviceModal
                                            showAdd={showAdd}
                                            onCloseAdd={handleCloseAdd}
                                            onSubmitAdd={handleSubmitAdd}
                                        />
                                        {device && (
                                            <UpdateDeviceModal
                                                showUpdate={showUpdate}
                                                onCloseUpdate={handleCloseUpdate}
                                                onSubmitUpdate={handleSubmitUpdate}
                                                device={device}
                                            />
                                        )}
                                        {filterDevices && filterDevices.length > 0 ? (
                                            <>
                                                {filterDevices.map(
                                                    (device, index) =>
                                                        index >= minIndex &&
                                                        index < maxIndex && (
                                                            <tr key={device.id}>
                                                                <td>{++index}</td>
                                                                <td>{device.name}</td>
                                                                <td>
                                                                    <button
                                                                        className="btn btn-primary ml-2"
                                                                        onClick={() => handleGetDevice(device.id)}
                                                                    >
                                                                        <i className="fas fa-edit"></i>
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handDeleteDevice(device.id)}
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
                                                <td colSpan="3" className="text-center">
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
                                total={filterDevices.length}
                                onChange={handleChangePage}
                            />
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default Device;
