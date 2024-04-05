import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { stringToSlug } from '~/helpers/covertString';
import {
    getAllFacilityTypes,
    addFacilityType,
    deleteFacilityType,
    getFacilityTypeById,
    updateFacilityType,
} from '~/services/facilitytype.service';
import InputSearch from '~/components/InputSearch';
import AddFacilityTypeModal from '~/components/Admin/FacilityType/AddFacilityTypeModal';
import UpdateFacilityTypeModal from '~/components/Admin/FacilityType/UpdateFacilityTypeModal';
import { Pagination } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '~/components/Loading';
function FacilityType() {
    const pageSize = 5;
    let i = 1;
    // State
    const [facilityTypes, setFacilityTypes] = useState([]);
    const [filterFacilityTypes, setFilterFacilityTypes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalPage, setTotalPage] = useState(0);
    const [current, setCurrent] = useState(1);
    const [minIndex, setMinIndex] = useState(0);
    const [maxIndex, setMaxIndex] = useState(0);

    const [showAdd, setShowAdd] = useState(false);
    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);

    const [facilityType, setFacilityType] = useState();
    const [showUpdate, setShowUpdate] = useState(false);
    const handleCloseUpdate = () => setShowUpdate(false);
    const handleShowUpdate = () => setShowUpdate(true);

    useEffect(() => {
        fetchData();
        setTotalPage(filterFacilityTypes.data / pageSize);
        setMinIndex(0);
        setMaxIndex(pageSize);
    }, []);
    const fetchData = async () => {
        let response = await getAllFacilityTypes();
        if (response.success) {
            setFacilityTypes(response.data);
            setFilterFacilityTypes(response.data);
            if (isLoading)
                setTimeout(() => {
                    setIsLoading(false);
                }, 400);
            return;
        }
        toast.error(response.message);
    };
    const handleSubmitAdd = async (data) => {
        let response = await addFacilityType(data);
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
    const handleGetFacilityType = async (id) => {
        let response = await getFacilityTypeById(id);
        if (response.success) {
            setFacilityType(response.data);
            handleShowUpdate();
        }
    };
    const handleSubmitUpdate = async (data) => {
        let response = await updateFacilityType(data);
        if (response.success) {
            fetchData();
            toast.success(response.message);
            return true;
        }
        toast.error(response.message);
        return false;
    };
    const handDeleteFacilityTypes = async (id) => {
        let response = await deleteFacilityType(id);
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
        if (data === '') return setFilterFacilityTypes(facilityTypes);
        else {
            let newArray = facilityTypes.filter((facilityType) => {
                return stringToSlug(facilityType.name).includes(stringToSlug(data));
            });

            setFilterFacilityTypes(newArray);
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
                            <h6 className="m-0 font-weight-bold text-primary">Quản lý loại tiện nghi</h6>
                        </div>
                        <div className="card-body">
                            <button className="btn btn-success mb-3" onClick={handleShowAdd}>
                                <i className="fas fa-plus"></i> Thêm loại tiện nghi
                            </button>
                            <InputSearch onSearch={handleChangeSearch} />
                            <div className="table-responsive">
                                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                                    <thead>
                                        <tr className="bg bg-primary-custom text-light">
                                            <th width="4%">STT</th>
                                            <th>Loại tiện nghi</th>
                                            <th>Icon</th>
                                            <th width="10%">Quản lý</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <AddFacilityTypeModal
                                            showAdd={showAdd}
                                            onCloseAdd={handleCloseAdd}
                                            onSubmitAdd={handleSubmitAdd}
                                        />
                                        {facilityType && (
                                            <UpdateFacilityTypeModal
                                                showUpdate={showUpdate}
                                                onCloseUpdate={handleCloseUpdate}
                                                onSubmitUpdate={handleSubmitUpdate}
                                                facilityType={facilityType}
                                            />
                                        )}
                                        {filterFacilityTypes.map(
                                            (facilityType, index) =>
                                                index >= minIndex &&
                                                index < maxIndex && (
                                                    <tr key={facilityType.id}>
                                                        <td>{++index}</td>
                                                        <td>{facilityType.name}</td>
                                                        <td>
                                                            <img src={facilityType.icon} width="10%" />
                                                        </td>
                                                        <td>
                                                            <button
                                                                className="btn btn-primary ml-2"
                                                                onClick={() => handleGetFacilityType(facilityType.id)}
                                                            >
                                                                <i className="fas fa-edit"></i>
                                                            </button>
                                                            <button
                                                                onClick={() => handDeleteFacilityTypes(facilityType.id)}
                                                                className="btn btn-danger ml-2"
                                                            >
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
                                total={filterFacilityTypes.length}
                                onChange={handleChangePage}
                            />
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default FacilityType;
