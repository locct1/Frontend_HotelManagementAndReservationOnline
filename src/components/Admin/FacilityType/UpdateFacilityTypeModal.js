import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';

function UpdateFacilityTypeModal({ showUpdate, onCloseUpdate, onSubmitUpdate, facilityType }) {
    // State
    const [newFacilityType, setNewFacilityType] = useState(facilityType);
    const { name, icon } = newFacilityType;
    useEffect(() => setNewFacilityType(facilityType), [facilityType]);
    const onChangeNewFacilityTypeForm = (e) => {
        setNewFacilityType({
            ...newFacilityType,
            [e.target.name]: e.target.value,
        });
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        let check = await onSubmitUpdate(newFacilityType);
        if (check) {
            onCloseUpdate();
        }
    };
    return (
        <Modal show={showUpdate} onHide={onCloseUpdate} animation={false}>
            <Modal.Header closeButton className="bg-primary">
                <Modal.Title className="font-weight-bold text-light">Cập nhật loại tiện nghi</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="font-weight-bold">Tên loại tiện nghi:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập loại tiện nghi"
                            value={name}
                            name="name"
                            onChange={(e) => onChangeNewFacilityTypeForm(e)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="font-weight-bold">Tên loại Icon:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập loại Icon"
                            value={icon}
                            name="icon"
                            onChange={(e) => onChangeNewFacilityTypeForm(e)}
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

export default UpdateFacilityTypeModal;
