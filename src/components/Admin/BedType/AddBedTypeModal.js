import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

function AddBedTypeModal({ showAdd, onCloseAdd, onSubmitAdd }) {
    // State
    const [newBedType, setNewBedType] = useState({
        name: '',
    });
    const { name } = newBedType;
    const onChangeNewBedTypeForm = (e) => {
        setNewBedType({
            ...newBedType,
            [e.target.name]: e.target.value,
        });
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        let check = await onSubmitAdd(newBedType);
        if (check) {
            onCloseAdd();
            resetAddBedTypeData();
        }
    };
    const resetAddBedTypeData = () => {
        setNewBedType({ name: '' });
    };
    return (
        <Modal show={showAdd} onHide={onCloseAdd} animation={false}>
            <Modal.Header closeButton className="bg-primary">
                <Modal.Title className="font-weight-bold text-light">Thêm kiểu giường</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="font-weight-bold">Tên kiểu giường:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập kiểu giường"
                            name="name"
                            value={name}
                            onChange={(e) => onChangeNewBedTypeForm(e)}
                        />
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

export default AddBedTypeModal;
