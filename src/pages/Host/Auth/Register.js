import './Auth.scss';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HostRegister } from '~/services/hostauth.service';
import { Navigate, Outlet, useNavigate, useLocation } from 'react-router-dom';
function Register() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        address: '',
        password: '',
        confirmPassword: '',
    });
    const [hotel, setHotel] = useState({
        nameHotel: '',
        addressHotel: '',
        descriptionHotel: '',
        phoneNumberHotel: '',
    });

    const { fullName, email, phoneNumber, address, password, confirmPassword } = user;
    const { nameHotel, addressHotel, descriptionHotel, phoneNumberHotel } = hotel;

    const onChangeUser = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };
    const onChangeHotel = (e) => {
        setHotel({
            ...hotel,
            [e.target.name]: e.target.value,
        });
    };
    const validateEasy = (user, hotel) => {
        const { fullName, email, phoneNumber, address, password, confirmPassword } = user;
        const { nameHotel, addressHotel, descriptionHotel, phoneNumberHotel } = hotel;
        if (
            fullName === '' ||
            email === '' ||
            phoneNumber === '' ||
            address === '' ||
            password === '' ||
            confirmPassword === '' ||
            nameHotel === '' ||
            addressHotel === '' ||
            descriptionHotel === '' ||
            phoneNumberHotel === ''
        ) {
            toast.error('Các trường không được để trống', {
                position: 'bottom-right',
                autoClose: 7000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
            });
            return false;
        }
        if (password !== confirmPassword) {
            toast.error('Mật khẩu không khớp', {
                position: 'bottom-right',
                autoClose: 7000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
            });
            return false;
        }
        return true;
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        let check = validateEasy(user, hotel);
        if (!check) {
            return;
        }
        let data = {};
        data.user = user;
        data.hotel = {
            name: hotel.nameHotel,
            address: hotel.addressHotel,
            description: hotel.descriptionHotel,
            phoneNumber: hotel.phoneNumberHotel,
        };
        let response = await HostRegister(data);
        if (response.success) {
            toast.success(response.message);
            navigate('/host-login');
            return;
        }
        toast.error(response.message);
    };
    const resetData = async (event) => {
        setUser({
            fullName: '',
            email: '',
            phoneNumber: '',
            address: '',
            password: '',
            confirmPassword: '',
        });
        setHotel({
            nameHotel: '',
            addressHotel: '',
            descriptionHotel: '',
            phoneNumberHotel: '',
        });
    };
    return (
        <>
            <div className="host-auth">
                <div className="landing">
                    <div className="dark-overlay">
                        <div className="landing-inner">
                            <div className="mt-4 container">
                                <div className="row  d-flex justify-content-center">
                                    <h1>Hợp tác với Nền tảng du lịch hàng đầu Đông Nam Á</h1>
                                </div>
                                <div className="row  d-flex justify-content-center">
                                    <h4 className="text-center">
                                        Với hơn 50 triệu người dùng hoạt động hàng tháng ở Châu Á - Thái Bình Dương và
                                        hơn thế nữa, Fast Travel luôn sẵn sàng hỗ trợ sự phát triển của doanh nghiệp
                                        bạn.
                                    </h4>
                                </div>
                            </div>
                            <div className="container mt-4">
                                <Form onSubmit={onSubmit}>
                                    <div className="row justify-content-center">
                                        <div className="col-lg-5">
                                            <div className="text-light text-center p-2 bg bg-primary rounded mb-3">
                                                THÔNG TIN CHỦ DOANH NGHIỆP
                                            </div>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label className="text-light">Họ và tên:</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Nhập họ tên"
                                                    name="fullName"
                                                    value={fullName}
                                                    onChange={(e) => onChangeUser(e)}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label className="text-light">Email:</Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    placeholder="Nhập email"
                                                    name="email"
                                                    value={email}
                                                    onChange={(e) => onChangeUser(e)}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label className="text-light">Điện thoại:</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Nhập số điện thoại"
                                                    name="phoneNumber"
                                                    value={phoneNumber}
                                                    onChange={(e) => onChangeUser(e)}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label className="text-light">Điạ chỉ:</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={3}
                                                    name="address"
                                                    value={address}
                                                    onChange={(e) => onChangeUser(e)}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                                <Form.Label className="text-light">Mật khẩu: </Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    placeholder="Nhập mật khẩu"
                                                    name="password"
                                                    value={password}
                                                    onChange={(e) => onChangeUser(e)}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                                <Form.Label className="text-light">Xác nhận mật khẩu: </Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    placeholder="Nhập lại mật khẩu"
                                                    name="confirmPassword"
                                                    value={confirmPassword}
                                                    onChange={(e) => onChangeUser(e)}
                                                />
                                            </Form.Group>
                                        </div>
                                        <div className="col-lg-5">
                                            <div className="text-light text-center p-2 bg bg-primary rounded mb-3">
                                                THÔNG TIN KHÁCH SẠN
                                            </div>
                                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                                <Form.Label className="text-light">Tên khách sạn: </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Nhập tên khách sạn"
                                                    name="nameHotel"
                                                    value={nameHotel}
                                                    onChange={(e) => onChangeHotel(e)}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                                <Form.Label className="text-light">Điện thoại khách sạn: </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Nhập số điện thoại"
                                                    name="phoneNumberHotel"
                                                    value={phoneNumberHotel}
                                                    onChange={(e) => onChangeHotel(e)}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                                <Form.Label className="text-light">Địa chỉ: </Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={3}
                                                    placeholder="Nhập địa chi"
                                                    name="addressHotel"
                                                    value={addressHotel}
                                                    onChange={(e) => onChangeHotel(e)}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                                <Form.Label className="text-light">Mô tả: </Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={7}
                                                    name="descriptionHotel"
                                                    value={descriptionHotel}
                                                    onChange={(e) => onChangeHotel(e)}
                                                />
                                            </Form.Group>
                                        </div>
                                    </div>
                                    <div className="row justify-content-center mb-5">
                                        <Button variant="success" className="w-25" type="submit">
                                            Đăng ký
                                        </Button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;
