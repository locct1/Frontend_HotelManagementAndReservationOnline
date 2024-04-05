import { NavLink, Link } from 'react-router-dom';
import { getAllHotelsWithRoomTypes } from '~/services/client.service';
import Loading from '~/components/Loading';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { LINK_HOTEL_AVATAR_IMAGE, LOCAL_STORAGE_TOKEN_CLIENT } from '~/helpers/constants';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Navigate, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Login } from '~/services/clientauth.service';
import { ClientLoadUser } from '~/redux/Slices/ClientAuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import { isAuthenticatedClientSelector } from '~/redux/selectors';

function ClientLogin() {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const isAuthenticated = useSelector(isAuthenticatedClientSelector);
    useEffect(() => {
        if (isAuthenticated) {
            return navigate('/');
        }
    }, [isAuthenticated]);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const schema = yup
        .object()
        .shape({
            email: yup.string().email('Email không đúng định dạng').required('Vui lòng nhập email'),
            password: yup.string().required('Vui lòng nhập mật khẩu').min(6, 'Tối thiểu 6 ký tự'),
        })
        .required();
    const {
        register,
        resetField,
        handleSubmit,
        clearErrors,
        formState: { errors },
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
        // defaultValues: user
    });
    const [user, setUser] = useState({
        email: '',
        password: '',
    });
    const { email, password } = user;
    const onChangeUser = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmit = async (data) => {
        try {
            let response = await Login(data);
            if (!response.success) {
                toast.error(response.message);
                return;
            }
            localStorage.setItem(LOCAL_STORAGE_TOKEN_CLIENT, response.accessToken);
            dispatch(ClientLoadUser());
            return navigate(-1);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <div className="breadcrumb-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb-text">
                                <h2>Đăng nhập</h2>
                                <div className="bt-option">
                                    <Link to="/">Trang chủ</Link>
                                    <span>Đăng nhập</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-5">
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label className="text-dark font-weight-bold">Email:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Nhập email"
                                    name="email"
                                    {...register('email')}
                                />
                                {errors.email?.message && <p className="mt-2 text-danger">{errors.email?.message}</p>}
                            </Form.Group>
                            <Form.Group className="mb-3 font-weight-bold" controlId="formBasicPassword">
                                <Form.Label className="text-dark">Mật khẩu: </Form.Label>
                                <Form.Control type="password" placeholder="Nhập mật khẩu" {...register('password')} />
                                {errors.password?.message && (
                                    <p className="mt-2 text-danger">{errors.password?.message}</p>
                                )}
                            </Form.Group>
                            <Button variant="success" className="mb-3 w-100" type="submit">
                                Đăng nhập
                            </Button>
                            <div className="text-dark mb-5">
                                <span className="mt-5">Bạn chưa có tài khoản đặt phòng?</span>
                                <Link to="/register">
                                    <Button variant="primary" className="float-right">
                                        Đăng ký tại đây
                                    </Button>
                                </Link>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ClientLogin;
