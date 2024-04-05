import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import 'react-toastify/dist/ReactToastify.css';
import Loading from '~/components/Loading';
import { infoHostSelector } from '~/redux/selectors';
import { HostLoadUser } from '~/redux/Slices/HostAuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { updateHotel } from '~/services/hostauth.service';
import { toast } from 'react-toastify';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function Edit() {
    // State
    const [isLoading, setIsLoading] = useState(true);
    const [check, setCheck] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        if (isLoading)
            setTimeout(() => {
                setIsLoading(false);
            }, 400);
    }, []);
    const [editorLoaded, setEditorLoaded] = useState(false);
    const [data, setData] = useState('');

    useEffect(() => {
        setEditorLoaded(true);
    }, []);
    const schema = yup
        .object()
        .shape({
            id: yup.number(),
            name: yup.string().required('Vui lòng nhập tên khách sạn'),
            description: yup.string().required('Vui lòng nhập thông tin vị trí'),
            phoneNumber: yup.string().matches(/((09|03|07|08|05)+([0-9]{8})\b)/g, 'Số điện thoại không hợp lệ.'),
            address: yup.string().required('Vui lòng nhập địa chỉ'),
            info: yup.string(),
        })
        .required();
    const infoHost = useSelector(infoHostSelector);
    const {
        register,
        reset,
        handleSubmit,
        resetField,
        setValue,
        trigger,
        getValues,
        formState: { errors },
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
        defaultValues: infoHost.hotel,
    });
    const onSubmit = async (data) => {
        data.fileName = infoHost.hotel.fileName;
        let response = await updateHotel(data);
        if (response.success) {
            toast.success(response.message);
            dispatch(HostLoadUser());
            return;
        }
        toast.error(response.message);
    };

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-primary">Cập nhật thông tin khách sạn</h6>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-12 col-sm-8">
                                    <Form onSubmit={handleSubmit(onSubmit)}>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label className="text-dark font-weight-bold">
                                                Tên khách sạn:
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Nhập tên khách sạn"
                                                {...register('name')}
                                            />
                                            {errors.name?.message && (
                                                <p className="mt-2 text-danger">{errors.name?.message}</p>
                                            )}
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label className="text-dark font-weight-bold">
                                                Số điện thoại:
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Nhập số điện thoai"
                                                {...register('phoneNumber')}
                                            />
                                            {errors.phoneNumber?.message && (
                                                <p className="mt-2 text-danger">{errors.phoneNumber?.message}</p>
                                            )}
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label className="text-dark font-weight-bold">Địa chỉ:</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Nhập địa chỉ"
                                                {...register('address')}
                                            />
                                            {errors.address?.message && (
                                                <p className="mt-2 text-danger">{errors.address?.message}</p>
                                            )}
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label className="text-dark font-weight-bold">
                                                Thông tin vị trí:
                                            </Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={10}
                                                placeholder="Nhập thông tin vị trí"
                                                {...register('description')}
                                            />
                                            {errors.address?.message && (
                                                <p className="mt-2 text-danger">{errors.description?.message}</p>
                                            )}
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label className="text-dark font-weight-bold">
                                                Thông tin về: {infoHost.hotel.name}:
                                            </Form.Label>
                                            <CKEditor
                                                editor={ClassicEditor}
                                                data={getValues('info')}
                                                onReady={(editor) => {
                                                    // You can store the "editor" and use when it is needed.
                                                    console.log('Editor is ready to use!', editor);
                                                }}
                                                onChange={(event, editor) => {
                                                    setValue('info', editor.getData());
                                                    trigger('info');
                                                }}
                                            />
                                        </Form.Group>

                                        <Button variant="success" className="mb-3 w-100" type="submit">
                                            Cập nhật thông tin
                                        </Button>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default Edit;
