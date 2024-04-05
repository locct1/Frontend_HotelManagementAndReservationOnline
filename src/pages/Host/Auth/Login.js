import './Auth.scss';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { useEffect, useLayoutEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { HostLogin } from '~/services/hostauth.service';
import { LOCAL_STORAGE_TOKEN_HOST } from '~/helpers/constants';
import { HostLoadUser } from '~/redux/Slices/HostAuthSlice';
import { isAuthenticatedSelector } from '~/redux/selectors';
import { Navigate, Outlet, useNavigate, useLocation } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || '/host-category-list';
    const isAuthenticated = useSelector(isAuthenticatedSelector);
    useEffect(() => {
        if (isAuthenticated) {
            return navigate(from, { replace: true });
        }
    }, [isAuthenticated]);
    const [user, setUser] = useState({
        email: '',
        password: '',
    });
    const { email, password } = user;
    const dispatch = useDispatch();
    const onChangeUser = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };
    const validateEasy = (user) => {
        const { email, password } = user;
        if (email === '' || password === '') {
            toast.error('Các trường không được để trống');
            return false;
        }
        return true;
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        let check = validateEasy(user);
        if (!check) {
            return;
        }
        try {
            let response = await HostLogin(user);
            if (!response.success) {
                toast.error(response.message);
                return;
            }
            localStorage.setItem(LOCAL_STORAGE_TOKEN_HOST, response.accessToken);
            dispatch(HostLoadUser());
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <div className="host-auth">
                <div className="landing-login">
                    <div className="dark-overlay">
                        <div className="landing-inner">
                            <div className="mt-5 container">
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
                            <div className="container mt-5">
                                <div className="row justify-content-center">
                                    <div className="col-lg-5">
                                        <Form onSubmit={onSubmit}>
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
                                            <Button variant="success" className="mb-3 w-100" type="submit">
                                                Đăng nhập
                                            </Button>
                                            <div className="text-light">
                                                Bạn chưa có tài khoản doanh nghiệp?
                                                <Link to="/host-register">
                                                    <Button variant="primary" className="ml-3">
                                                        Đăng ký tại đây
                                                    </Button>
                                                </Link>
                                            </div>
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
