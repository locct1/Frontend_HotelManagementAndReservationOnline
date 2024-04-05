import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

function AddFacilityTypeModal({ showAdd, onCloseAdd, onSubmitAdd }) {
    // State
    const [newFacilityType, setNewFacilityType] = useState({
        name: '',
        icon: '',
    });
    const { name, icon } = newFacilityType;
    const onChangeNewFacilityTypeForm = (e) => {
        setNewFacilityType({
            ...newFacilityType,
            [e.target.name]: e.target.value,
        });
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        let check = await onSubmitAdd(newFacilityType);
        if (check) {
            onCloseAdd();
            resetAddFacilityTypeData();
        }
    };
    const resetAddFacilityTypeData = () => {
        setNewFacilityType({ name: '', icon:'' });
    };
    return (
        <Modal show={showAdd} onHide={onCloseAdd} animation={false}>
            <Modal.Header closeButton className="bg-primary">
                <Modal.Title className="font-weight-bold text-light">Thêm loại tiện nghi</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="font-weight-bold">Tên loại tiện nghi:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập loại tiện nghi"
                            name="name"
                            value={name}
                            onChange={(e) => onChangeNewFacilityTypeForm(e)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="font-weight-bold">Icon:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập icon"
                            name="icon"
                            value={icon}
                            onChange={(e) => onChangeNewFacilityTypeForm(e)}
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

export default AddFacilityTypeModal;
