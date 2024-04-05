import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { stringToSlug } from '~/helpers/covertString';
import {
    getAllFacilities,
    addFacility,
    deleteFacility,
    getFacilityById,
    updateFacility,
} from '~/services/facility.service';
import { getAllFacilityTypes } from '~/services/facilitytype.service';
import InputSearch from '~/components/InputSearch';
import AddFacilityModal from '~/components/Admin/Facility/AddFacilityModal';
import UpdateFacilityModal from '~/components/Admin/Facility/UpdateFacilityModal';
import { Pagination } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '~/components/Loading';
function Facility() {
    const pageSize = 5;
    let i = 1;
    // State
    const [facilities, setFacilities] = useState([]);
    const [facilityTypes, setFacilityTypes] = useState([]);
    const [filterFacilities, setFilterFacilities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [totalPage, setTotalPage] = useState(0);
    const [current, setCurrent] = useState(1);
    const [minIndex, setMinIndex] = useState(0);
    const [maxIndex, setMaxIndex] = useState(0);

    const [showAdd, setShowAdd] = useState(false);
    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => {
        if (facilityTypes <= 0) {
            toast.error('Vui lòng điền ít nhất một loại tiện nghi');
        }
        setShowAdd(true);
    };

    const [facility, setFacility] = useState();
    const [showUpdate, setShowUpdate] = useState(false);
    const handleCloseUpdate = () => setShowUpdate(false);
    const handleShowUpdate = () => setShowUpdate(true);

    useEffect(() => {
        fetchData();
        setTotalPage(filterFacilities.data / pageSize);
        setMinIndex(0);
        setMaxIndex(pageSize);
    }, []);
    const fetchData = async () => {
        let response = await getAllFacilities();
        let responseCategory = await getAllFacilityTypes();
        if (response.success && responseCategory.success) {
            setFacilities(response.data);
            setFilterFacilities(response.data);
            setFacilityTypes(responseCategory.data);
            if (isLoading)
                setTimeout(() => {
                    setIsLoading(false);
                }, 400);
            return;
        }
        toast.error(response.message);
    };
    const handleSubmitAdd = async (data) => {
        let response = await addFacility(data);
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
    const handleGetFacility = async (id) => {
        let response = await getFacilityById(id);
        if (response.success) {
            response.data.facilityTypeId = response.data.facilityType.id;
            delete response.data['facilityType'];
            setFacility(response.data);
            handleShowUpdate();
        }
    };
    const handleSubmitUpdate = async (data) => {
        let response = await updateFacility(data);
        if (response.success) {
            fetchData();
            toast.success(response.message);
            return true;
        }
        toast.error(response.message);
        return false;
    };
    const handDeleteFacility = async (id) => {
        let response = await deleteFacility(id);
        if (response.success) {
            toast.success(response.message);
            fetchData();
            return;
        }
        toast.error(response.message);
        return false;
    };
    const handleChangeSearch = (data) => {
        if (data === '') return setFilterFacilities(facilities);
        else {
            let newArray = facilities.filter((facility) => {
                return stringToSlug(facility.name).includes(stringToSlug(data));
            });
            if (newArray.length <= 0) {
                newArray = facilities.filter((facility) => {
                    return stringToSlug(facility.facilityType.name).includes(stringToSlug(data));
                });
            }
            setFilterFacilities(newArray);
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
                            <h6 className="m-0 font-weight-bold text-primary">Quản lý tiện nghi</h6>
                        </div>
                        <div className="card-body">
                            <button className="btn btn-success mb-3" onClick={handleShowAdd}>
                                <i className="fas fa-plus"></i> Thêm tiện nghi
                            </button>
                            <InputSearch onSearch={handleChangeSearch} />
                            <div className="table-responsive">
                                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                                    <thead>
                                        <tr className="bg bg-primary-custom text-light">
                                            <th width="4%">STT</th>
                                            <th>Tên tiện nghi</th>
                                            <th>Icon</th>
                                            <th>Loại tiện nghi</th>
                                            <th width="10%">Quản lý</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {facilityTypes && facilityTypes.length > 0 && (
                                            <AddFacilityModal
                                                showAdd={showAdd}
                                                onCloseAdd={handleCloseAdd}
                                                onSubmitAdd={handleSubmitAdd}
                                                facilityTypes={facilityTypes}
                                            />
                                        )}
                                        {facility && facilityTypes && (
                                            <UpdateFacilityModal
                                                showUpdate={showUpdate}
                                                onCloseUpdate={handleCloseUpdate}
                                                onSubmitUpdate={handleSubmitUpdate}
                                                facility={facility}
                                                facilityTypes={facilityTypes}
                                            />
                                        )}
                                        {filterFacilities.map(
                                            (facility, index) =>
                                                index >= minIndex &&
                                                index < maxIndex && (
                                                    <tr key={facility.id}>
                                                        <td>{++index}</td>
                                                        <td>{facility.name}</td>
                                                        <td>
                                                            <img src={facility.icon} width="15%" />
                                                        </td>
                                                        <td>{facility.facilityType.name}</td>
                                                        <td>
                                                            <button
                                                                className="btn btn-primary ml-2"
                                                                onClick={() => handleGetFacility(facility.id)}
                                                            >
                                                                <i className="fas fa-edit"></i>
                                                            </button>
                                                            <button
                                                                onClick={() => handDeleteFacility(facility.id)}
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
                                total={filterFacilities.length}
                                onChange={handleChangePage}
                            />
                        </div>
                    </div>
                </>
            )}{' '}
        </>
    );
}

export default Facility;
