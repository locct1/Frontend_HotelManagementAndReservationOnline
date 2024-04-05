import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

function AddRoomTypeModal({ showAdd, onCloseAdd, onSubmitAdd, bedtypes }) {
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
        handleSubmit,
        clearErrors,
        formState: { errors },
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
        // defaultValues: user
    });
    const onSubmit = async (data) => {
        let check = await onSubmitAdd(data);
        if (check) {
            onCloseAdd();
            resetField('name');
            resetField('price');
            resetField('max');
            resetField('amountOfSold');
            resetField('bedTypeId');
        }
    };
    const handleCloseAdd = async () => {
        onCloseAdd();
        resetField('name');
        resetField('price');
        resetField('max');
        resetField('amountOfSold');
        resetField('bedTypeId');
    };

    return (
        <Modal show={showAdd} onHide={onCloseAdd} animation={false}>
            <Modal.Header closeButton className="bg-primary">
                <Modal.Title className="font-weight-bold text-light">Thêm loại phòng</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="font-weight-bold">Tên loại phòng:</Form.Label>
                        <Form.Control type="text" placeholder="Nhập tên loại phòng" {...register('name')} />
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
                        <Form.Control type="text" placeholder="Nhập số người ở" {...register('amountOfSold')} />
                        {errors.amountOfSold?.message && (
                            <p className="mt-2 text-danger">{errors.amountOfSold?.message}</p>
                        )}
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="font-weight-bold">Loại kiểu giường:</Form.Label>
                        <Form.Control as="select" name="bedTypeId" {...register('bedTypeId')}>
                            {bedtypes.map((bedType, index) => (
                                <option value={bedType.id} key={bedType.id}>
                                    {bedType.name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAdd}>
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

export default AddRoomTypeModal;
