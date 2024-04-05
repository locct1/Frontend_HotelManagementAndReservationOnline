import { NavLink, Link } from 'react-router-dom';
import { getAllHotelsWithRoomTypes } from '~/services/client.service';
import Loading from '~/components/Loading';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { LINK_HOTEL_AVATAR_IMAGE } from '~/helpers/constants';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Navigate, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { UpdateClientInfo } from '~/services/clientauth.service';
import { useDispatch, useSelector } from 'react-redux';
import { infoClientSelector, infoBookingDetailsSelector } from '~/redux/selectors';
import { ClientLoadUser } from '~/redux/Slices/ClientAuthSlice';
function ClientEdit() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const infoClient = useSelector(infoClientSelector);

    const schema = yup
        .object()
        .shape({
            fullName: yup.string().required('Vui lòng nhập họ và tên'),
            email: yup.string().email('Email không đúng định dạng').required('Vui lòng nhập email'),
            phoneNumber: yup.string().matches(/((09|03|07|08|05)+([0-9]{8})\b)/g, 'Số điện thoại không hợp lệ.'),
            address: yup.string().required('Vui lòng nhập địa chỉ'),
        })
        .required();
    const schemaPassword = yup
        .object()
        .shape({
            fullName: yup.string().required('Vui lòng nhập họ và tên'),
            email: yup.string().email('Email không đúng định dạng').required('Vui lòng nhập email'),
            phoneNumber: yup.string().matches(/((09|03|07|08|05)+([0-9]{8})\b)/g, 'Số điện thoại không hợp lệ.'),
            address: yup.string().required('Vui lòng nhập địa chỉ'),
            password: yup.string().required('Vui lòng nhập mật khẩu').min(6, 'Tối thiểu 6 ký tự'),
            confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Mật khẩu không khớp'),
        })
        .required();
    const [showChangePassword, setShowChangePassword] = useState(false);
    const {
        register,
        reset,
        handleSubmit,
        resetField,
        formState: { errors },
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(showChangePassword ? schemaPassword : schema),
        defaultValues: infoClient,
    });
    useEffect(() => {
        reset(infoClient);
    }, [infoClient]);
    const onSubmit = async (data) => {
        if (!showChangePassword) {
            resetField('password');
            resetField('confirmPassword');
            delete data.password;
            delete data.confirmPassword;
        }
        let response = await UpdateClientInfo(data);
        if (response.success) {
            toast.success(response.message);
            dispatch(ClientLoadUser());
            return;
        }
        toast.error(response.message);
    };
    const handleShowChangePassword = () => {
        setShowChangePassword(!showChangePassword);
        resetField('password');
        resetField('confirmPassword');
    };
    return (
        <>
            <div className="breadcrumb-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb-text">
                                <h2>Cập nhật thông tin của bạn</h2>
                                <div className="bt-option">
                                    <Link to="/">Trang chủ</Link>
                                    <span>Cập nhật thông tin của bạn</span>
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
                                <Form.Label className="text-dark font-weight-bold">Họ và tên:</Form.Label>
                                <Form.Control type="text" placeholder="Nhập họ tên" {...register('fullName')} />
                                {errors.fullName?.message && (
                                    <p className="mt-2 text-danger">{errors.fullName?.message}</p>
                                )}
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label className="text-dark font-weight-bold">Email:</Form.Label>
                                <Form.Control
                                    disabled={'disabled'}
                                    type="text"
                                    placeholder="Nhập email"
                                    {...register('email')}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label className="text-dark font-weight-bold">Số điện thoại:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Nhập số điện thoại"
                                    {...register('phoneNumber')}
                                />
                                {errors.phoneNumber?.message && (
                                    <p className="mt-2 text-danger">{errors.phoneNumber?.message}</p>
                                )}
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label className="text-dark font-weight-bold">Địa chỉ:</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Nhập số địa chỉ"
                                    {...register('address')}
                                />
                                {errors.address?.message && (
                                    <p className="mt-2 text-danger">{errors.address?.message}</p>
                                )}
                            </Form.Group>
                            <span className="btn btn-primary mb-3" onClick={handleShowChangePassword}>
                                Đổi mật khẩu
                            </span>
                            {showChangePassword === true ? (
                                <>
                                    <Form.Group className="mb-3 font-weight-bold" controlId="formBasicPassword">
                                        <Form.Label className="text-dark">Mật khẩu: </Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Nhập mật khẩu"
                                            {...register('password')}
                                        />
                                        {errors.password?.message && (
                                            <p className="mt-2 text-danger">{errors.password?.message}</p>
                                        )}
                                    </Form.Group>
                                    <Form.Group className="mb-3 font-weight-bold" controlId="formBasicPassword">
                                        <Form.Label className="text-dark">Nhập lại mật khẩu: </Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Nhập mật khẩu"
                                            {...register('confirmPassword')}
                                        />
                                        {errors.confirmPassword?.message && (
                                            <p className="mt-2 text-danger">{errors.confirmPassword?.message}</p>
                                        )}
                                    </Form.Group>
                                </>
                            ) : (
                                <></>
                            )}

                            <Button variant="success" className="mb-3 w-100" type="submit">
                                Cập nhật thông tin
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ClientEdit;
