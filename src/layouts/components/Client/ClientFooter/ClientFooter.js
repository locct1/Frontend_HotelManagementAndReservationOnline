import { NavLink, Link } from 'react-router-dom';

function ClientFooter() {
    return (
        <>
            <footer className="footer-section">
                <div className="container">
                    <div className="footer-text">
                        <div className="row">
                            <div className="col-lg-4">
                                <div className="ft-about">
                                    <div className="logo">
                                        <Link href="#">
                                            <img style={{ width: '45%' }} src="img/Logo2.PNG" alt="" />
                                        </Link>
                                    </div>
                                    <p>
                                        Chúng tôi truyền cảm hứng và tiếp cận hàng triệu du khách trên 90 trang web địa
                                        phương
                                    </p>
                                    <div className="fa-social">
                                        <Link href="#">
                                            <i className="fa fa-facebook" />
                                        </Link>
                                        <Link href="#">
                                            <i className="fa fa-twitter" />
                                        </Link>
                                        <Link href="#">
                                            <i className="fa fa-tripadvisor" />
                                        </Link>
                                        <Link href="#">
                                            <i className="fa fa-instagram" />
                                        </Link>
                                        <Link href="#">
                                            <i className="fa fa-youtube-play" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 offset-lg-1">
                                <div className="ft-contact">
                                    <h6>Liên hệ chúng tôi</h6>
                                    <ul>
                                        <li>0120 676 5410</li>
                                        <li>locb1909942@student.ctu.edu.vn</li>
                                        <li>Ninh Kiều, Cần Thơ, Việt Nam</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-3 offset-lg-1">
                                <div className="ft-newslatter">
                                    <h6>TIN TỨC MỚI NHẤT</h6>
                                    <p>Nhận các bản cập nhật và cung cấp mới nhất</p>
                                    <form action="#" className="fn-form">
                                        <input type="text" placeholder="Email" />
                                        <button type="submit">
                                            <i className="fa fa-send" />
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="copyright-option">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-7">
                                <ul>
                                    <li>
                                        <Link href="#">Liên hệ</Link>
                                    </li>
                                    <li>
                                        <Link href="#">Điều khoản sử dụng</Link>
                                    </li>
                                    <li>
                                        <Link href="#">Riêng tư</Link>
                                    </li>
                                    <li>
                                        <Link href="#">Chính sách môi trường</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-lg-5">
                                <div className="co-text">
                                    <p>
                                        {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                                        Copyright © All rights reserved | Sản phẩm thực hiện{' '}
                                        <i className="fa fa-heart" aria-hidden="true" /> bởi{' '}
                                        <Link href="https://colorlib.com" target="_blank">
                                            Lê Nguyễn Phúc Lộc
                                        </Link>
                                        {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <div className="search-model">
                <div className="h-100 d-flex align-items-center justify-content-center">
                    <div className="search-close-switch">
                        <i className="icon_close" />
                    </div>
                    <form className="search-model-form">
                        <input type="text" id="search-input" placeholder="Search here....." />
                    </form>
                </div>
            </div>
        </>
    );
}

export default ClientFooter;
