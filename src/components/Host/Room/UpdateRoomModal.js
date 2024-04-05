import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import Room from '~/pages/Host/Room/List';
import { ToastContainer, toast } from 'react-toastify';

function UpdateRoomModal({ showUpdate, onCloseUpdate, onSubmitUpdate, room, roomTypes }) {
    // State
    const [newRoom, setNewRoom] = useState(room);
    const { name, note, roomTypeId } = newRoom;
    useEffect(() => setNewRoom(room), [room]);
    const onChangeNewRoomForm = (e) => {
        setNewRoom({
            ...newRoom,
            [e.target.name]: e.target.value,
        });
    };
    const validateEasy = (newRoom) => {
        const { name, note, roomTypeId } = newRoom;
        if (name === '') {
            toast.error('Các trường không được để trống');
            return false;
        }
        return true;
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        let checkvalidate = validateEasy(newRoom);
        if (!checkvalidate) {
            return;
        }
        let check = await onSubmitUpdate(newRoom);
        if (check) {
            onCloseUpdate();
        }
    };
    return (
        <Modal show={showUpdate} onHide={onCloseUpdate} animation={false}>
            <Modal.Header closeButton className="bg-primary">
                <Modal.Title className="font-weight-bold text-light">Cập nhật phòng</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="font-weight-bold">Tên phòng:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập tên phòng"
                            value={name}
                            name="name"
                            onChange={(e) => onChangeNewRoomForm(e)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="font-weight-bold">Ghi chú:</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="note"
                            value={note}
                            onChange={(e) => onChangeNewRoomForm(e)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="font-weight-bold">Loại phòng:</Form.Label>
                        <Form.Control
                            as="select"
                            value={roomTypeId}
                            name="roomTypeId"
                            onChange={(e) => onChangeNewRoomForm(e)}
                        >
                            {roomTypes.map((roomType, index) => (
                                <option value={roomType.id} key={roomType.id}>
                                    {roomType.name}
                                </option>
                            ))}
                        </Form.Control>
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

export default UpdateRoomModal;
