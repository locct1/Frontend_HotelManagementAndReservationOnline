import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

function UpdateDeviceModal({ showUpdate, onCloseUpdate, onSubmitUpdate, device }) {
    const schema = yup
        .object()
        .shape({
            name: yup.string().required('Vui lòng nhập tên thiết bị'),
        })
        .required();
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
        defaultValues: device,
    });
    useEffect(() => {
        reset(device);
    }, [device]);
    const onSubmit = async (data) => {
        let check = await onSubmitUpdate(data);
        if (check) {
            onCloseUpdate();
        }
    };
    return (
        <Modal show={showUpdate} onHide={onCloseUpdate} animation={false}>
            <Modal.Header closeButton className="bg-primary">
                <Modal.Title className="font-weight-bold text-light">Cập nhật thiết bị</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="font-weight-bold">Tên thiết bị:</Form.Label>
                        <Form.Control type="text" placeholder="Nhập thiết bị" {...register('name')} />
                        {errors.name?.message && <p className="mt-2 text-danger">{errors.name?.message}</p>}
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onCloseUpdate}>
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

export default UpdateDeviceModal;
