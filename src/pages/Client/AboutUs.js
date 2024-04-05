import { NavLink, Link } from 'react-router-dom';
import { getAllHotelsWithRoomTypes } from '~/services/client.service';
import ClientLoading from '~/components/ClientLoading';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { LINK_HOTEL_AVATAR_IMAGE } from '~/helpers/constants';

function AboutUs() {
    const [hotels, setHotels] = useState([]);
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
            if (isLoading)
                setTimeout(() => {
                    setIsLoading(false);
                }, 500);
            return;
        }
        toast.error(response.message);
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
                                        <h2>Về chúng tôi</h2>
                                        <div className="bt-option">
                                            <Link to="/">Trang chủ</Link>
                                            <span>Về chúng tôi</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Breadcrumb Section End */}
                    {/* About Us Page Section Begin */}
                    <section className="aboutus-page-section spad">
                        <div className="container">
                            <div className="about-page-text">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="ap-title">
                                            <h3 className="mb-2">Chào mừng đến với FastTravel.</h3>
                                            <p>
                                                FastTravel là siêu ứng dụng du lịch và tiện ích sống hàng đầu Đông Nam
                                                Á, chúng tôi giúp bạn khám phá và mua đa dạng các loại sản phẩm du lịch,
                                                dịch vụ địa phương và dịch vụ tài chính. Danh mục sản phẩm toàn diện của
                                                FastTravel bao gồm các dịch vụ đặt phương tiện đi lại như vé máy bay, xe
                                                buýt, tàu hỏa, cho thuê ô tô, đưa đón sân bay, cũng như kho khách sạn
                                                chỗ ở lớn nhất Đông Nam Á. Không chỉ vậy, để giúp bạn thực hiện nhiều
                                                ước vọng về phong cách sống của mình, chúng tôi còn hoàn thiện các dịch
                                                vụ của mình với một loạt các điểm tham quan, hoạt động địa phương cũng
                                                như các spa chăm sóc sức khỏe và sắc đẹp. Vì vậy, bất kể lựa chọn lối
                                                sống của bạn là gì, bạn chỉ cần một cú nhấp chuột!
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-lg-5 offset-lg-1">
                                        <ul className="ap-services">
                                            <li>
                                                <i className="icon_check" /> Giảm 20% cho chỗ ở.
                                            </li>
                                            <li>
                                                <i className="icon_check" /> Bữa sáng hàng ngày miễn phí
                                            </li>
                                            <li>
                                                <i className="icon_check" /> Miễn phí Wifi.
                                            </li>
                                            <li>
                                                <i className="icon_check" /> Giảm giá 20% trên F&amp;B
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="about-page-services">
                                <div className="row">
                                    <div className="col-md-4">
                                        <div
                                            className="ap-service-item set-bg"
                                            data-setbg=""
                                            style={{
                                                backgroundImage:
                                                    'url(' + 'http://localhost:3000/img/about/about-p1.jpg' + ')',
                                                backgroundPosition: 'center',
                                                backgroundSize: 'cover',
                                                backgroundRepeat: 'no-repeat',
                                            }}
                                        >
                                            <div className="api-text">
                                                <h3>Dịch vụ nhà hàng</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div
                                            className="ap-service-item set-bg"
                                            style={{
                                                backgroundImage:
                                                    'url(' + 'http://localhost:3000/img/about/about-p2.jpg' + ')',
                                                backgroundPosition: 'center',
                                                backgroundSize: 'cover',
                                                backgroundRepeat: 'no-repeat',
                                            }}
                                        >
                                            <div className="api-text">
                                                <h3>Du lịch &amp; Cắm trại</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div
                                            className="ap-service-item set-bg"
                                            style={{
                                                backgroundImage:
                                                    'url(' + 'http://localhost:3000/img/about/about-p3.jpg' + ')',
                                                backgroundPosition: 'center',
                                                backgroundSize: 'cover',
                                                backgroundRepeat: 'no-repeat',
                                            }}
                                        >
                                            <div className="api-text">
                                                <h3>Sự kiện &amp; Buổi tiện</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* About Us Page Section End */}
                    {/* Video Section Begin */}
                    <section
                        className="video-section set-bg"
                        style={{
                            backgroundImage: 'url(' + 'http://localhost:3000/img/video-bg.jpg' + ')',
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                        }}
                    >
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="video-text">
                                        <h2>Khám phá khách sạn &amp; dịch vụ của chúng tôi.</h2>
                                        <p>Đó là mùa bão nhưng chúng tôi đang đến thăm Đảo Hilton Head</p>
                                        <a
                                            href="https://www.youtube.com/watch?v=EzKkl64rRbM"
                                            className="play-btn video-popup"
                                        >
                                            <img src="/img/play.png" alt="" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* Video Section End */}
                    {/* Gallery Section Begin */}
                    <section className="gallery-section spad">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="section-title">
                                        <span>THƯ VIỆN CỦA CHÚNG TÔI</span>
                                        <h2>Khám phá công việc của chúng tôi</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6">
                                    <div
                                        className="gallery-item set-bg"
                                        style={{
                                            backgroundImage:
                                                'url(' + 'http://localhost:3000/img/gallery/gallery-1.jpg' + ')',
                                            backgroundPosition: 'center',
                                            backgroundSize: 'cover',
                                            backgroundRepeat: 'no-repeat',
                                        }}
                                    >
                                        <div className="gi-text">
                                            <h3>Room Luxury</h3>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div
                                                className="gallery-item set-bg"
                                                style={{
                                                    backgroundImage:
                                                        'url(' +
                                                        'http://localhost:3000/img/gallery/gallery-3.jpg' +
                                                        ')',
                                                    backgroundPosition: 'center',
                                                    backgroundSize: 'cover',
                                                    backgroundRepeat: 'no-repeat',
                                                }}
                                            >
                                                <div className="gi-text">
                                                    <h3>Room Luxury</h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div
                                                className="gallery-item set-bg"
                                                style={{
                                                    backgroundImage:
                                                        'url(' +
                                                        'http://localhost:3000/img/gallery/gallery-4.jpg' +
                                                        ')',
                                                    backgroundPosition: 'center',
                                                    backgroundSize: 'cover',
                                                    backgroundRepeat: 'no-repeat',
                                                }}
                                            >
                                                <div className="gi-text">
                                                    <h3>Room Luxury</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div
                                        className="gallery-item large-item set-bg"
                                        style={{
                                            backgroundImage:
                                                'url(' + 'http://localhost:3000/img/gallery/gallery-2.jpg' + ')',
                                            backgroundPosition: 'center',
                                            backgroundSize: 'cover',
                                            backgroundRepeat: 'no-repeat',
                                        }}
                                    >
                                        <div className="gi-text">
                                            <h3>Room Luxury</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            )}
        </>
    );
}

export default AboutUs;
