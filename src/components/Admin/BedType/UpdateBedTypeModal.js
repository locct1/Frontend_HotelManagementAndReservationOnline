import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';

function UpdateBedTypeModal({ showUpdate, onCloseUpdate, onSubmitUpdate, bedtype }) {
    // State
    const [newBedType, setNewBedType] = useState(bedtype);
    const { name } = newBedType;
    useEffect(() => setNewBedType(bedtype), [bedtype]);
    const onChangeNewBedTypeForm = (e) => {
        setNewBedType({
            ...newBedType,
            [e.target.name]: e.target.value,
        });
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        let check = await onSubmitUpdate(newBedType);
        if (check) {
            onCloseUpdate();
        }
    };
    return (
        <Modal show={showUpdate} onHide={onCloseUpdate} animation={false}>
            <Modal.Header closeButton className="bg-primary">
                <Modal.Title className="font-weight-bold text-light">Cập nhật kiểu giường</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="font-weight-bold">Tên kiểu giường:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập kiểu giường"
                            value={name}
                            name="name"
                            onChange={(e) => onChangeNewBedTypeForm(e)}
                        />
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

export default UpdateBedTypeModal;
