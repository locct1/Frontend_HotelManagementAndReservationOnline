import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import Category from '~/pages/Host/Category/List';

function AddCategoryModal({ showAdd, onCloseAdd, onSubmitAdd }) {
    // State
    const [newCategory, setNewCategory] = useState({
        name: '',
    });
    const { name } = newCategory;
    const onChangeNewCategoryForm = (e) => {
        setNewCategory({
            ...newCategory,
            [e.target.name]: e.target.value,
        });
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        let check = await onSubmitAdd(newCategory);
        if (check) {
            onCloseAdd();
            resetAddCategoryData();
        }
    };
    const resetAddCategoryData = () => {
        setNewCategory({ name: '' });
    };
    return (
        <Modal show={showAdd} onHide={onCloseAdd} animation={false}>
            <Modal.Header closeButton className="bg-primary">
                <Modal.Title className="font-weight-bold text-light">Thêm loại dịch vụ</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="font-weight-bold">Tên loại dịch vụ:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập loại dịch vụ"
                            name="name"
                            value={name}
                            onChange={(e) => onChangeNewCategoryForm(e)}
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

export default AddCategoryModal;
