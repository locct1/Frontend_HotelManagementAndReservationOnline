import { NavLink, Link } from 'react-router-dom';
import { getAllHotelsWithRoomTypes } from '~/services/client.service';
import ClientLoading from '~/components/ClientLoading';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { LINK_HOTEL_AVATAR_IMAGE } from '~/helpers/constants';
import ClientInputSearch from '~/components/ClientInputSearch';
import { stringToSlug } from '~/helpers/covertString';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
function Hotel() {
    const [hotels, setHotels] = useState([]);
    const [filterHotels, setFilterHotels] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        fetchData();
    }, []);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const fetchData = async () => {
        let response = await getAllHotelsWithRoomTypes();
        if (response.success) {
            setHotels(response.data);
            setFilterHotels(response.data);
            if (isLoading)
                setTimeout(() => {
                    setIsLoading(false);
                }, 500);
            return;
        }
        toast.error(response.message);
    };
    const [search, setSearch] = useState('');
    const [value, setValue] = useState([0, 25000000]);
    const handleChangeSearch = (data) => {
        if (data === '') {
            let newArray = hotels.filter((hotel) => {
                return (
                    (hotel.roomTypes[0].price >= value[0] && hotel.roomTypes[0].price <= value[1]) ||
                    (hotel.roomTypes[hotel.roomTypes.length - 1].price >= value[0] &&
                        hotel.roomTypes[hotel.roomTypes.length - 1].price <= value[1])
                );
            });
            setFilterHotels(newArray);
        } else {
            let newArray = hotels.filter((hotel) => {
                return stringToSlug(hotel.address).includes(stringToSlug(data));
            });
            if (newArray.length <= 0) {
                newArray = hotels.filter((hotel) => {
                    return stringToSlug(hotel.name).includes(stringToSlug(data));
                });
            }
            newArray = newArray.filter((hotel) => {
                return (
                    (hotel.roomTypes[0].price >= value[0] && hotel.roomTypes[0].price <= value[1]) ||
                    (hotel.roomTypes[hotel.roomTypes.length - 1].price >= value[0] &&
                        hotel.roomTypes[hotel.roomTypes.length - 1].price <= value[1])
                );
            });
            setFilterHotels(newArray);
            setSearch(data);
        }
    };

    const rangeSelector = (event, newValue) => {
        setValue(newValue);
        let newArray = hotels.filter((hotel) => {
            return (
                (hotel.roomTypes[0].price >= newValue[0] && hotel.roomTypes[0].price <= newValue[1]) ||
                (hotel.roomTypes[hotel.roomTypes.length - 1].price >= newValue[0] &&
                    hotel.roomTypes[hotel.roomTypes.length - 1].price <= newValue[1])
            );
        });
        if (search === '') return setFilterHotels(newArray);
        else {
            let secondArray = [...newArray];
            newArray = newArray.filter((hotel) => {
                return stringToSlug(hotel.address).includes(stringToSlug(search));
            });
            if (newArray.length <= 0) {
                newArray = secondArray.filter((hotel) => {
                    return stringToSlug(hotel.name).includes(stringToSlug(search));
                });
            }
            setFilterHotels(newArray);
        }
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
                                        <h2>Khách sạn của chúng tôi</h2>
                                        <div className="bt-option">
                                            <Link to="/">Trang chủ</Link>
                                            <span>Khách sạn</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <section className="rooms-section spad">
                        <div className="container">
                            <div className="row">
                                <div className="col-4">
                                    <div className="row">
                                        <ClientInputSearch onSearch={handleChangeSearch} />
                                    </div>
                                    <div
                                        style={{
                                            display: 'block',
                                        }}
                                    >
                                        <Typography id="range-slider" gutterBottom>
                                            Khoảng giá phòng mỗi đêm:
                                        </Typography>
                                        <Slider
                                            value={value}
                                            onChange={rangeSelector}
                                            step={80000}
                                            min={0}
                                            max={25000000}
                                        />
                                        {String(value[0]).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}đ -{' '}
                                        {String(value[1]).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}đ
                                    </div>
                                </div>
                                <div className="col-8">
                                    {' '}
                                    {filterHotels && filterHotels.length > 0 ? (
                                        <>
                                            <h4 className="mt-2 mb-4 font-weight-bold">
                                                Có {filterHotels.length} khách sạn phù hợp
                                            </h4>
                                            {filterHotels.map((hotel, index) => (
                                                <div className="row" key={hotel.id}>
                                                    <div className="card mb-3 shadow-lg p-3 mb-5 bg-white rounded">
                                                        <div className="row no-gutters ">
                                                            <div className="col-md-4">
                                                                <img
                                                                    src={LINK_HOTEL_AVATAR_IMAGE + hotel.fileName}
                                                                    className="card-img"
                                                                    style={{ width: '100%', height: '50%' }}
                                                                    alt="..."
                                                                />
                                                            </div>
                                                            <div className="col-md-8">
                                                                <div className="card-body">
                                                                    <h5 className="card-title font-weight-bold">
                                                                        {hotel.name}
                                                                    </h5>
                                                                    <p className="card-text">
                                                                        <span className="font-weight-bold mr-1">
                                                                            Địa chỉ:
                                                                        </span>
                                                                        {hotel.address}
                                                                    </p>
                                                                    <p className="card-text">
                                                                        <span className="font-weight-bold mr-1">
                                                                            Miêu tả:
                                                                        </span>
                                                                        {hotel.description}
                                                                    </p>
                                                                    <p className="card-text">
                                                                        <small className="text-muted text-danger">
                                                                            <span className="font-weight-bold mr-1">
                                                                                Giá chỉ từ:
                                                                            </span>
                                                                            <span
                                                                                className="font-weight-bold text-danger"
                                                                                style={{ fontSize: '25px' }}
                                                                            >
                                                                                {hotel.roomTypes &&
                                                                                hotel.roomTypes.length > 0 &&
                                                                                hotel.roomTypes[0].price
                                                                                    ? String(
                                                                                          hotel.roomTypes[0].price,
                                                                                      ).replace(
                                                                                          /(\d)(?=(\d\d\d)+(?!\d))/g,
                                                                                          '$1,',
                                                                                      ) + ' đ'
                                                                                    : 'Chưa thiết lập'}
                                                                            </span>
                                                                        </small>
                                                                    </p>
                                                                    <p className="card-text">
                                                                        <Link
                                                                            to={`/hotel-detail/${hotel.id}`}
                                                                            className="btn btn-primary"
                                                                        >
                                                                            Xem chi tiết
                                                                        </Link>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </>
                                    ) : (
                                        <>
                                            <div className="container">
                                                <div className="row mt-2 font-weight-bold">
                                                    <h4>Không tìm thấy thông tin tìm kiếm</h4>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <div className="row">
                                <div className="col-6"></div>
                            </div>
                        </div>
                        <div className="container"></div>
                    </section>
                </>
            )}
        </>
    );
}

export default Hotel;
