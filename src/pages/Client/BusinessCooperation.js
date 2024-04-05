import { NavLink, Link } from 'react-router-dom';
import { getAllHotelsWithRoomTypes } from '~/services/client.service';
import ClientLoading from '~/components/ClientLoading';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { LINK_HOTEL_AVATAR_IMAGE } from '~/helpers/constants';

function BusinessCooperation() {
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
                                        <h2>Hợp tác doanh nghiệp</h2>
                                        <div className="bt-option">
                                            <Link to="/">Trang chủ</Link>
                                            <span>Hợp tác doanh nghiệp</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
                                        <h2>Hợp tác với Nền tảng du lịch hàng đầu Việt Nam</h2>
                                        <p>
                                            Với hơn 5 triệu người dùng hoạt động hàng tháng ở Việt Nam và hơn thế nữa,
                                            Traveloka luôn sẵn sàng hỗ trợ sự phát triển của doanh nghiệp bạn. Chọn đối
                                            tác phù hợp nhất với nhu cầu của bạn từ các tùy chọn khác nhau bên dưới.
                                        </p>
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
                    <section className="gallery-section spad">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="section-title">
                                        <span>Mở rộng thị trường của bạn</span>
                                        <h3>
                                            Đăng ký doanh nghiệp của bạn với ứng dụng của chúng tôi và có được nhiều
                                            khách hàng hơn.
                                        </h3>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="card-deck">
                                    <div className="card">
                                        <img
                                            className="card-img-top"
                                            src="https://ik.imagekit.io/tvlk/image/imageResource/2022/11/25/1669408945187-b2bef22a888e0eef95e09501314030c6.jpeg?tr=q-75"
                                            alt=""
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title text-justify">
                                                {' '}
                                                Nâng doanh nghiệp của bạn lên một tầm cao mới Liệt kê cơ sở kinh doanh
                                                của bạn và giới thiệu doanh nghiệp của bạn với hàng triệu khách tiềm
                                                năng. Traveloka cũng cho phép bạn quản lý chỗ ở của mình một cách dễ
                                                dàng; không rắc rối và không ồn ào.
                                            </h5>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <img
                                            className="card-img-top"
                                            src="https://ik.imagekit.io/tvlk/image/imageResource/2022/11/26/1669476005279-93b102e5ab06dd9693df122a93cae191.jpeg?tr=q-75"
                                            alt=""
                                        />

                                        <div className="card-body">
                                            <h5 className="card-title text-justify">
                                                Trở thành đối tác của chúng tôi ngay hôm nay và có cơ hội tiếp cận hàng
                                                triệu khách hàng
                                            </h5>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <img
                                            className="card-img-top"
                                            src="https://ik.imagekit.io/tvlk/image/imageResource/2022/11/26/1669475953629-969792847b44e7bfe19dc1d3b1d6bad8.jpeg?tr=q-75"
                                            alt=""
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title text-justify">
                                                {' '}
                                                Kiếm tiền từ chỗ nghỉ của bạn bằng cách niêm yết chỗ nghỉ với chúng tôi
                                                và được hàng triệu người dùng Traveloka khám phá!
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <Link to="/host-login" className="btn btn-primary">Đăng nhập/Đăng ký doanh nghiệp trở thành đối tác tại đây.</Link>
                            </div>
                        </div>
                    </section>
                </>
            )}
        </>
    );
}

export default BusinessCooperation;
