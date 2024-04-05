import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

function AddRoomModal({ showAdd, onCloseAdd, onSubmitAdd, roomTypes }) {
    // State
    const [newRoom, setNewRoom] = useState({
        name: '',
        note: '',
        roomTypeId: roomTypes[0].id,
    });
    const { name, note, roomTypeId } = newRoom;
    const onChangeNewRoomForm = (e) => {
        setNewRoom({
            ...newRoom,
            [e.target.name]: e.target.value,
        });
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        let checkvalidate = validateEasy(newRoom);
        if (!checkvalidate) {
            return;
        }
        let check = await onSubmitAdd(newRoom);
        if (check) {
            onCloseAdd();
            resetAddRoomData();
        }
    };
    const validateEasy = (newRoom) => {
        const { name, note, roomTypeId } = newRoom;
        if (name === '') {
            toast.error('Vui lòng nhập tên');
            return false;
        }
        return true;
    };
    const resetAddRoomData = () => {
        setNewRoom({ name: '', note: '', roomTypeId: roomTypes[0].id });
    };
    return (
        <Modal show={showAdd} onHide={onCloseAdd} animation={false}>
            <Modal.Header closeButton className="bg-primary">
                <Modal.Title className="font-weight-bold text-light">Thêm phòng</Modal.Title>
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
                    <Button variant="secondary" onClick={onCloseAdd}>
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

export default AddRoomModal;
