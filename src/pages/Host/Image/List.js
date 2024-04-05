import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { stringToSlug } from '~/helpers/covertString';
import { getAllRoomTypes } from '~/services/roomtype.service';
import { uploadRoomType } from '~/services/image.service';
import { getAllBedTypes } from '~/services/bedtype.service';
import InputSearch from '~/components/InputSearch';
import AddRoomTypeModal from '~/components/Host/RoomType/AddRoomTypeModal';
import UpdateRoomTypeModal from '~/components/Host/RoomType/UpdateRoomTypeModal';
import { Pagination } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '~/components/Loading';
import UploadRoomType from '~/components/UpLoadImages/UploadRoomType';
import UploadHotel from '~/components/UpLoadImages/UploadHotel';
import UploadHotelAvatar from '~/components/UpLoadImages/UploadHotelAvatar';
function RoomType() {
    const pageSize = 5;
    let i = 1;
    // State
    const [roomTypes, setRoomTypes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        let response = await getAllRoomTypes();
        if (response.success) {
            setRoomTypes(response.data);
            if (isLoading)
                setTimeout(() => {
                    setIsLoading(false);
                }, 400);
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
                    <h2>Thư viện ảnh</h2>
                    <div className="mt-3 mb-3">
                        <span className="bg bg-info text-light p-2 rounded tag-library-image">Hình ảnh đại diện</span>
                    </div>
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-primary">Avatar</h6>
                        </div>
                        <div className="card-body">
                            <UploadHotelAvatar />
                        </div>
                    </div>
                    <div className="mt-3 mb-3">
                        <span className="bg bg-info text-light p-2 rounded tag-library-image">Hình ảnh khách sạn</span>
                    </div>
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-primary">Banner</h6>
                        </div>
                        <div className="card-body">
                            <UploadHotel />
                        </div>
                    </div>

                    <div className="mt-3 mb-3">
                        <span className="bg bg-info text-light p-2 rounded tag-library-image">Hình ảnh loại phòng</span>
                    </div>
                    {roomTypes.length <= 0 && <h2>Vui lòng thiết lập loại phòng để thêm ảnh</h2>}
                    {roomTypes &&
                        roomTypes.length > 0 &&
                        roomTypes.map((roomType, index) => (
                            <div key={roomType.id} className="card shadow mb-4">
                                <div className="card-header py-3">
                                    <h6 className="m-0 font-weight-bold text-primary">{roomType.name}</h6>
                                </div>
                                <div className="card-body">
                                    <UploadRoomType roomTypeId={roomType.id} />
                                </div>
                            </div>
                        ))}
                </>
            )}{' '}
        </>
    );
}

export default RoomType;
