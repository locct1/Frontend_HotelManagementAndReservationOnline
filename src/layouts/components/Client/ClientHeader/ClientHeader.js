import { NavLink, Link } from 'react-router-dom';
import { HostLogout } from '~/redux/Slices/HostAuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import { infoClientSelector } from '~/redux/selectors';
import { Dropdown } from 'react-bootstrap';
import { ClientLogout } from '~/redux/Slices/ClientAuthSlice';

function ClientHeader() {
    const classNameFunc = ({ isActive }) => (isActive ? 'active' : '');
    const classNameLogin = ({ isActive }) => (isActive ? 'client-active-login' : '');
    const dispatch = useDispatch();
    const Logout = async () => {
        dispatch(ClientLogout());
    };
    const infoClient = useSelector(infoClientSelector);
    return (
        <>
            <div className="offcanvas-menu-overlay" />
            <div className="canvas-open">
                <i className="icon_menu" />
            </div>
            <div className="offcanvas-menu-wrapper">
                <div className="canvas-close">
                    <i className="icon_close" />
                </div>
                <div className="search-icon  search-switch">
                    <i className="icon_search" />
                </div>
                <div className="header-configure-area">
                    <div className="language-option">
                        <span>Đăng nhập</span>
                    </div>
                    <Link className="bk-btn">Booking Now</Link>
                </div>
                <nav className="mainmenu mobile-menu">
                    <ul>
                        <li className="active">
                            <Link href="./index.html">Home</Link>
                        </li>
                        <li>
                            <Link href="./rooms.html">Rooms</Link>
                        </li>
                        <li>
                            <Link href="./about-us.html">About Us</Link>
                        </li>
                        <li>
                            <Link href="./pages.html">Pages</Link>
                            <ul className="dropdown">
                                <li>
                                    <Link href="./room-details.html">Room Details</Link>
                                </li>
                                <li>
                                    <Link href="#">Deluxe Room</Link>
                                </li>
                                <li>
                                    <Link href="#">Family Room</Link>
                                </li>
                                <li>
                                    <Link href="#">Premium Room</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link href="./blog.html">News</Link>
                        </li>
                        <li>
                            <Link href="./contact.html">Contact</Link>
                        </li>
                    </ul>
                </nav>
                <div id="mobile-menu-wrap" />
                <div className="top-social">
                    <Link href="#">
                        <i className="fa fa-facebook" />
                    </Link>
                    <Link href="#">
                        <i className="fa fa-twitter" />
                    </Link>
                    <Link href="#">
                        <i className="fa fa-instagram" />
                    </Link>
                </div>
                <ul className="top-widget">
                    <li>
                        <i className="fa fa-phone" />
                        01206765410
                    </li>
                    <li>
                        <i className="fa fa-envelope" /> locb1909942@student.ctu.edu.vn
                    </li>
                </ul>
            </div>
            {/* Offcanvas Menu Section End */}
            {/* Header Section Begin */}
            <header className="header-section header-normal sticky">
                <div className="top-nav">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6">
                                <ul className="tn-left">
                                    <li>
                                        <i className="fa fa-phone" />
                                        0120 676 5410
                                    </li>
                                    <li>
                                        <i className="fa fa-envelope" /> locb1909942@student.ctu.edu.vn
                                    </li>
                                </ul>
                            </div>
                            <div className="col-lg-6">
                                <div className="tn-right">
                                    <div className="top-social">
                                        <Link href="#">
                                            <i className="fa fa-facebook" />
                                        </Link>
                                        <Link href="#">
                                            <i className="fa fa-twitter" />
                                        </Link>
                                        <Link href="#">
                                            <i className="fa fa-instagram" />
                                        </Link>
                                    </div>
                                    <Link href="#" className="bk-btn">
                                        Đặt ngay
                                    </Link>
                                    <div className="language-option">
                                        {infoClient !== null ? (
                                            <>
                                                <Dropdown>
                                                    <Dropdown.Toggle
                                                        variant="light"
                                                        bg="light"
                                                        id="dropdown-basic"
                                                        size="sm"
                                                        style={{ backgroundColor: 'white' }}
                                                    >
                                                        <span
                                                            className={classNameFunc}
                                                            style={{ textTransform: 'capitalize' }}
                                                        >
                                                            {infoClient.fullName}
                                                        </span>
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu>
                                                        <Dropdown.Item>
                                                            <NavLink to="/edit-info">
                                                                <span
                                                                    style={{ textTransform: 'capitalize' }}
                                                                    className={classNameFunc}
                                                                >
                                                                    Cập nhật thông tin
                                                                </span>
                                                            </NavLink>
                                                        </Dropdown.Item>
                                                        <Dropdown.Item>
                                                            <NavLink to="/review-booking">
                                                                <span
                                                                    style={{ textTransform: 'capitalize' }}
                                                                    className={classNameFunc}
                                                                >
                                                                    Xem đơn đặt phòng
                                                                </span>
                                                            </NavLink>
                                                        </Dropdown.Item>
                                                        <Dropdown.Item onClick={() => Logout()}>
                                                            Đăng xuất
                                                        </Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </>
                                        ) : (
                                            <>
                                                <NavLink to="/login">
                                                    <span className={classNameFunc}>Đăng nhập</span>
                                                </NavLink>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="menu-item">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-2">
                                <div className="logo">
                                    <Link to="/">
                                        <img style={{ width: '70%' }} src="/img/Logo3.PNG" alt="" />
                                    </Link>
                                </div>
                            </div>
                            <div className="col-lg-10">
                                <div className="nav-menu">
                                    <nav className="mainmenu">
                                        <ul>
                                            <li className={classNameFunc}>
                                                <NavLink to="/">Trang chủ</NavLink>
                                            </li>
                                            <li className={classNameFunc}>
                                                <NavLink to="/hotels">Khách sạn</NavLink>
                                            </li>
                                            <li className={classNameFunc}>
                                                <NavLink to="/about-us">Về chúng tôi</NavLink>
                                            </li>
                                            <li className={classNameFunc}>
                                                <NavLink to="/business-cooperation">Hợp tác doanh nghiệp</NavLink>
                                            </li>
                                            <li className={classNameFunc}>
                                                <NavLink to="/news">Tin tức</NavLink>
                                            </li>
                                            <li className={classNameFunc}>
                                                <NavLink to="/contact">Liên hệ</NavLink>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}

export default ClientHeader;
