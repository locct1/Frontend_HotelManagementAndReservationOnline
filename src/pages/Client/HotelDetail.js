import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { getHotelDetail } from '~/services/client.service';
import { ToastContainer, toast } from 'react-toastify';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { LINK_HOTEL_IMAGE } from '~/helpers/constants';
import ClientLoading from '~/components/ClientLoading';
import RoomTypeDetail from '~/components/Client/RoomTypeDetail';
function HotelDetail() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    let { hotelId } = useParams();
    const [hotel, setHotel] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [imagesHotel, setImagesHotel] = useState([]);
    const [roomTypes, setRoomTypes] = useState([]);
    const [listFacilityTypes, setListFacilityTypes] = useState([]);
    const [showInfo, setShowInfo] = useState(false);
    const [showFacility, setShowFacility] = useState(false);
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        let response = await getHotelDetail(hotelId);
        if (response.success) {
            setHotel(response.data.hotel);
            setListFacilityTypes(response.data.listFacilities);
            let i;
            let array = response.data.hotel.hotelPhotos.map((o) => o.fileName);
            for (i = 0; i < array.length; i++) {
                let object = {
                    original: LINK_HOTEL_IMAGE + array[i],
                    thumbnail: LINK_HOTEL_IMAGE + array[i],
                };
                setImagesHotel((prev) => [...prev, object]);
            }
            setRoomTypes(response.data.hotel.roomTypes);
            if (isLoading)
                setTimeout(() => {
                    setIsLoading(false);
                }, 300);
            return;
        }
        toast.error(response.message);
    };
    const firstItemRef = useRef(null);
    const handleShowInfo = () => {
        setShowInfo(true);
    };
    const handleHideInfo = () => {
        setShowInfo(false);
        const mainRoot = document.getElementById('locationInfo');
        mainRoot.scrollIntoView({ block: 'center' });
    };
    const handleShowFacility = () => {
        setShowFacility(true);
    };
    const handleHideFacility = () => {
        setShowFacility(false);
        const mainRoot = document.getElementById('locationFacility');
        mainRoot.scrollIntoView({ block: 'center' });
    };
    return (
        <>
            {isLoading ? (
                <>
                    <ClientLoading />
                </>
            ) : (
                <>
                    <div className="breadcrumb-section">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="breadcrumb-text">
                                        <h2>{hotel.name}</h2>
                                        <div className="bt-option">
                                            <Link to="/">Trang chủ</Link>
                                            <Link to="/hotels">Khách sạn</Link>
                                            <span>{hotel.name}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container shadow-lg p-3 mb-5 bg-white rounded">
                        <h5 className="mb-5 mt-2">
                            <span className="font-weight-bold">Địa chỉ:</span>{' '}
                            <p className="d-inline">{hotel.address}</p>
                        </h5>
                        <ImageGallery items={imagesHotel} autoPlay={true} />
                        <div className="row mt-3">
                            <div className="col-4">
                                <h5 className="font-weight-bold" id="locationInfo">
                                    Mô tả khách sạn
                                </h5>
                            </div>
                            <div className="col-8">
                                <h6 className="font-weight-bold">Vị trí</h6>
                                <p>{hotel.description}</p>

                                {showInfo ? (
                                    <>
                                        <h6 className="font-weight-bold mb-3">Thông tin về {hotel.name}</h6>
                                        <div dangerouslySetInnerHTML={{ __html: hotel.info }} />
                                        <button className="btn btn-primary" onClick={handleHideInfo}>
                                            Ẩn nội dung
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button className="btn btn-primary" onClick={handleShowInfo} ref={firstItemRef}>
                                            Xem thêm
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="row mt-3 mb-3">
                            <div className="col-4">
                                <h5 className="font-weight-bold" id="locationFacility">
                                    Tiện nghi khách sạn
                                </h5>
                            </div>
                        </div>
                        {showFacility ? (
                            <>
                                <div className="row">
                                    {listFacilityTypes &&
                                        listFacilityTypes.length > 0 &&
                                        listFacilityTypes.slice(0, 5).map((facilityType, index) => (
                                            <>
                                                {hotel.hotelFacilities.find(
                                                    (item) => item.facility.facilityTypeId === facilityType.id,
                                                ) ? (
                                                    <>
                                                        <div className="col-4">
                                                            <img src={facilityType.icon} alt="" width="20%" />
                                                            <span className="mt-1" style={{ fontWeight: '600' }}>
                                                                {facilityType.name}
                                                            </span>
                                                            <ul className="mt-2">
                                                                {hotel.hotelFacilities &&
                                                                    hotel.hotelFacilities.length > 0 &&
                                                                    hotel.hotelFacilities.map((Facility, index) => (
                                                                        <>
                                                                            {Facility.facility.facilityTypeId ===
                                                                            facilityType.id ? (
                                                                                <>
                                                                                    <li className="ml-5">
                                                                                        {Facility.facility.name}
                                                                                    </li>
                                                                                </>
                                                                            ) : (
                                                                                <></>
                                                                            )}
                                                                        </>
                                                                    ))}
                                                            </ul>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <></>
                                                )}
                                            </>
                                        ))}
                                </div>
                                <div className="row">
                                    <div className="col-12 text-center mt-2">
                                        <button className="btn btn-primary" onClick={handleHideFacility}>
                                            Ẩn tất cả tiện nghị
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="row">
                                    {hotel.hotelFacilities &&
                                        hotel.hotelFacilities.length > 0 &&
                                        hotel.hotelFacilities.map((Facility, index) =>
                                            Facility.facility.icon ? (
                                                <>
                                                    <div className="col-2 text-center">
                                                        <img src={Facility.facility.icon} alt="" width="30%" />
                                                        <h5 className="mt-1" style={{ fontWeight: '600' }}>
                                                            {Facility.facility.name}
                                                        </h5>
                                                    </div>
                                                </>
                                            ) : (
                                                <></>
                                            ),
                                        )}
                                </div>
                                <div className="row mt-4">
                                    <div className="col-12 text-center">
                                        <span className="btn btn-primary" onClick={handleShowFacility}>
                                            Xem tất cả tiện nghi
                                        </span>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                    <section className="rooms-section spad">
                        <div className="container">
                            {roomTypes &&
                                roomTypes.length > 0 &&
                                roomTypes.map((roomType, index) => (
                                    <RoomTypeDetail roomType={roomType} hotel={hotel} key={roomType.id} />
                                ))}
                            {/* <RoomTypeDetail roomType={roomTypes[0]} hotel={hotel}  /> */}
                        </div>
                    </section>
                </>
            )}
        </>
    );
}

export default HotelDetail;
