import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
function UpdateRoomTypeModal({ showUpdate, onCloseUpdate, onSubmitUpdate, roomType, bedtypes }) {
    const schema = yup
        .object()
        .shape({
            name: yup.string().required('Vui lòng nhập tên loại phòng'),
            max: yup.number().typeError('Vui lòng nhập định dạng số').required('Vui lòng nhập số lượng người tối đa'),
            price: yup.number().typeError('Vui lòng nhập định dạng số').required('Vui lòng nhập giá'),
            amountOfSold: yup
                .number()
                .typeError('Vui lòng nhập định dạng số')
                .required('Vui lòng nhập số lượng phòng bán'),
            bedTypeId: yup.number().default(bedtypes[0].id),
        })
        .required();
    // State
    const {
        register,
        resetField,
        reset,
        handleSubmit,
        clearErrors,
        formState: { errors },
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
        defaultValues: roomType,
    });
    const onSubmit = async (data) => {
        let check = await onSubmitUpdate(data);
        if (check) {
            onCloseUpdate();
        }
    };
    const handleCloseUpdate = async () => {
        onCloseUpdate();
    };
    useEffect(() => {
        reset(roomType);
    }, [roomType]);
    return (
        <Modal show={showUpdate} onHide={onCloseUpdate} animation={false}>
            <Modal.Header closeButton className="bg-primary">
                <Modal.Title className="font-weight-bold text-light">Cập nhật loại phòng</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="font-weight-bold">Tên loại phòng:</Form.Label>
                        <Form.Control type="text" placeholder="Nhập loại loại phòng" {...register('name')} />
                        {errors.name?.message && <p className="mt-2 text-danger">{errors.name?.message}</p>}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="font-weight-bold">Giá:</Form.Label>
                        <Form.Control type="text" placeholder="Nhập giá" {...register('price')} />
                        {errors.price?.message && <p className="mt-2 text-danger">{errors.price?.message}</p>}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="font-weight-bold">Số người ở:</Form.Label>
                        <Form.Control type="text" placeholder="Nhập số người ở" {...register('max')} />
                        {errors.max?.message && <p className="mt-2 text-danger">{errors.max?.message}</p>}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="font-weight-bold">Số lượng phòng bán:</Form.Label>
                        <Form.Control type="text" placeholder="Nhập số lượng phòng bán" {...register('amountOfSold')} />
                        {errors.amountOfSold?.message && (
                            <p className="mt-2 text-danger">{errors.amountOfSold?.message}</p>
                        )}
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="font-weight-bold">Kiểu giường:</Form.Label>
                        <Form.Control as="select" {...register('bedTypeId')}>
                            {bedtypes.map((bedTypeId, index) => (
                                <option value={bedTypeId.id} key={bedTypeId.id}>
                                    {bedTypeId.name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseUpdate}>
                        Hủy
                    </Button>
                    <Button variant="primary" type="submit">
                        Lưu
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default UpdateRoomTypeModal;
