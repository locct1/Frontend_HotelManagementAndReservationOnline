import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

function UpdateFacilityModal({ showUpdate, onCloseUpdate, onSubmitUpdate, facility, facilityTypes }) {
    // State
    const [newFacility, setNewFacility] = useState(facility);
    const { name, icon, facilityTypeId } = newFacility;
    useEffect(() => setNewFacility(facility), [facility]);
    const onChangeNewFacilityForm = (e) => {
        setNewFacility({
            ...newFacility,
            [e.target.name]: e.target.value,
        });
    };
    const validateEasy = (newFacility) => {
        const { name, icon, facilityTypeId } = newFacility;
        if (name === '') {
            toast.error('Các trường không được để trống');
            return false;
        }
        return true;
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        let checkvalidate = validateEasy(newFacility);
        if (!checkvalidate) {
            return;
        }
        let check = await onSubmitUpdate(newFacility);
        if (check) {
            onCloseUpdate();
        }
    };
    return (
        <Modal show={showUpdate} onHide={onCloseUpdate} animation={false}>
            <Modal.Header closeButton className="bg-primary">
                <Modal.Title className="font-weight-bold text-light">Cập nhật tiện nghi</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="font-weight-bold">Tên tiện nghi:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập tên tiện nghi"
                            value={name}
                            name="name"
                            onChange={(e) => onChangeNewFacilityForm(e)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="font-weight-bold">Icon:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập icon"
                            name="icon"
                            value={icon}
                            onChange={(e) => onChangeNewFacilityForm(e)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="font-weight-bold">Loại tiện nghi:</Form.Label>
                        <Form.Control
                            as="select"
                            value={facilityTypeId}
                            name="facilityTypeId"
                            onChange={(e) => onChangeNewFacilityForm(e)}
                        >
                            {facilityTypes.map((facilityType, index) => (
                                <option value={facilityType.id} key={facilityType.id}>
                                    {facilityType.name}
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

export default UpdateFacilityModal;
