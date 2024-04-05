import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { data } from 'jquery';
function UpdateDeviceRoomTypeModal({ showUpdate, onCloseUpdate, onSubmitUpdate, roomType, devices, deviceRoomType }) {
    const [roomTypeChild, setRoomType] = useState(roomType);
    const [check, setCheck] = useState(deviceRoomType);

    const handleChange = (id) => {
        if (check.includes(id)) {
            setCheck(check.filter((value) => value !== id));
        } else {
            setCheck([...check, id]);
        }
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        let data = {};
        data.devices = check;
        data.roomTypeId = roomType.id;
        let respone = await onSubmitUpdate(data);
        if (respone) {
            onCloseUpdate();
        }
    };
    const handleCloseUpdate = async () => {
        onCloseUpdate();
    };
    useEffect(() => setRoomType(roomTypeChild), [roomType]);
    useEffect(() => setCheck(deviceRoomType), [deviceRoomType]);
    return (
        <Modal show={showUpdate} onHide={onCloseUpdate} animation={false}>
            <Modal.Header closeButton className="bg-primary">
                <Modal.Title className="font-weight-bold text-light">Cập nhật thiết bị - {roomType.name}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <div className="row">
                        <div className="col-6">
                            {devices.map((device, index) => (
                                <div key={device.id} className="ml-5">
                                    <label className="form-check-label">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            onChange={() => handleChange(device.id)}
                                            checked={check.includes(device.id)}
                                        />
                                        <span className="ml-2 "> {device.name}</span>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
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

export default UpdateDeviceRoomTypeModal;
