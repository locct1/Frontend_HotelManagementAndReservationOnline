import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { stringToSlug } from '~/helpers/covertString';
import {
    getAllBedTypes,
    addBedType,
    deleteBedType,
    getBedTypeById,
    updateBedType,
} from '~/services/bedtype.service';
import InputSearch from '~/components/InputSearch';
import AddBedTypeModal from '~/components/Admin/BedType/AddBedTypeModal';
import UpdateBedTypeModal from '~/components/Admin/BedType/UpdateBedTypeModal';
import { Pagination } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '~/components/Loading';
function BedType() {
    const pageSize = 5;
    let i = 1;
    // State
    const [bedtypes, setBedTypes] = useState([]);
    const [filterBedTypes, setFilterBedTypes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalPage, setTotalPage] = useState(0);
    const [current, setCurrent] = useState(1);
    const [minIndex, setMinIndex] = useState(0);
    const [maxIndex, setMaxIndex] = useState(0);

    const [showAdd, setShowAdd] = useState(false);
    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);

    const [bedtype, setBedType] = useState();
    const [showUpdate, setShowUpdate] = useState(false);
    const handleCloseUpdate = () => setShowUpdate(false);
    const handleShowUpdate = () => setShowUpdate(true);

    useEffect(() => {
        fetchData();
        setTotalPage(filterBedTypes.data / pageSize);
        setMinIndex(0);
        setMaxIndex(pageSize);
    }, []);
    const fetchData = async () => {
        let response = await getAllBedTypes();
        if (response.success) {
            setBedTypes(response.data);
            setFilterBedTypes(response.data);
            if (isLoading)
                setTimeout(() => {
                    setIsLoading(false);
                }, 400);
            return;
        }
        toast.error(response.message);
    };
    const handleSubmitAdd = async (data) => {
        let response = await addBedType(data);
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
    const handleGetBedType = async (id) => {
        let response = await getBedTypeById(id);
        if (response.success) {
            setBedType(response.data);
            handleShowUpdate();
        }
    };
    const handleSubmitUpdate = async (data) => {
        let response = await updateBedType(data);
        if (response.success) {
            fetchData();
            toast.success(response.message);
            return true;
        }
        toast.error(response.message);
        return false;
    };
    const handDeleteBedType = async (id) => {
        let response = await deleteBedType(id);
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
        if (data === '') return setFilterBedTypes(bedtypes);
        else {
            let newArray = bedtypes.filter((bedtype) => {
                return stringToSlug(bedtype.name).includes(stringToSlug(data));
            });

            setFilterBedTypes(newArray);
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
                            <h6 className="m-0 font-weight-bold text-primary">Quản lý kiểu giường</h6>
                        </div>
                        <div className="card-body">
                            <button className="btn btn-success mb-3" onClick={handleShowAdd}>
                                <i className="fas fa-plus"></i> Thêm loại kiểu giường
                            </button>
                            <InputSearch onSearch={handleChangeSearch} />
                            <div className="table-responsive">
                                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                                    <thead>
                                        <tr className="bg bg-primary-custom text-light">
                                            <th width="4%">STT</th>
                                            <th>Loại kiểu giường</th>
                                            <th width="10%">Quản lý</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <AddBedTypeModal
                                            showAdd={showAdd}
                                            onCloseAdd={handleCloseAdd}
                                            onSubmitAdd={handleSubmitAdd}
                                        />
                                        {bedtype && (
                                            <UpdateBedTypeModal
                                                showUpdate={showUpdate}
                                                onCloseUpdate={handleCloseUpdate}
                                                onSubmitUpdate={handleSubmitUpdate}
                                                bedtype={bedtype}
                                            />
                                        )}
                                        {filterBedTypes.map(
                                            (bedtype, index) =>
                                                index >= minIndex &&
                                                index < maxIndex && (
                                                    <tr key={bedtype.id}>
                                                        <td>{++index}</td>
                                                        <td>{bedtype.name}</td>
                                                        <td>
                                                            <button
                                                                className="btn btn-primary ml-2"
                                                                onClick={() => handleGetBedType(bedtype.id)}
                                                            >
                                                                <i className="fas fa-edit"></i>
                                                            </button>
                                                            <button
                                                                onClick={() => handDeleteBedType(bedtype.id)}
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
                                total={filterBedTypes.length}
                                onChange={handleChangePage}
                            />
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default BedType;
