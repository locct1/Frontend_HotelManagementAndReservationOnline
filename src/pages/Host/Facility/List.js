import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { stringToSlug } from '~/helpers/covertString';
import { getAllTypesAndFacilities, addFacilitiesForHotel, getHotelFacilities } from '~/services/hostfacilities.service';
import InputSearch from '~/components/InputSearch';

import { Pagination } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '~/components/Loading';
function HostFacility() {
    // State
    const [faciltyTypes, setFacilityTypes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [check, setCheck] = useState([]);
    const handleChange = (id) => {
        if (check.includes(id)) {
            setCheck(check.filter((value) => value !== id));
        } else {
            setCheck([...check, id]);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        let response = await getAllTypesAndFacilities();
        let responseFacilities = await getHotelFacilities();
        if (response.success && responseFacilities.success) {
            setFacilityTypes(response.data);
            let facilityIds = responseFacilities.data.map((item) => item.facilityId);
            setCheck(facilityIds);
            if (isLoading)
                setTimeout(() => {
                    setIsLoading(false);
                }, 400);
            return;
        }
        toast.error(response.message);
    };
    const handleSubmit = async () => {
        if (check <= 0) {
            toast.error('Vui lòng chọn ít nhất một tiện nghi cho khách sạn');
            return;
        }
        let data = {};
        data.facilities = check;
        let response = await addFacilitiesForHotel(data);
        if (response.success) {
            fetchData();
            toast.success(response.message);
            return true;
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
                            <h6 className="m-0 font-weight-bold text-primary">Quản lý tiện nghi</h6>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                {faciltyTypes && faciltyTypes.length > 0 ? (
                                    <>
                                        {faciltyTypes.map((facilityType, index) => {
                                            return (
                                                <div className="col-6 mt-2 mb-2" key={facilityType.id}>
                                                    <h5>
                                                        <img src={facilityType.icon} /> {facilityType.name}
                                                    </h5>

                                                    {facilityType.facilities.map((facility, index) => (
                                                        <div key={facility.id} className="ml-5">
                                                            <label className="form-check-label">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    onChange={() => handleChange(facility.id)}
                                                                    checked={check.includes(facility.id)}
                                                                />
                                                                {facility.name}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            );
                                        })}
                                    </>
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center">
                                            Không có dữ liệu
                                        </td>
                                    </tr>
                                )}
                            </div>
                            <button className="btn btn-primary mt-5 ml-3" onClick={handleSubmit}>
                                Lưu
                            </button>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default HostFacility;
