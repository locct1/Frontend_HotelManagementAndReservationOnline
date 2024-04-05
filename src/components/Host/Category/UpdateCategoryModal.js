import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import Category from '~/pages/Host/Category/List';

function UpdateCategoryModal({ showUpdate, onCloseUpdate, onSubmitUpdate, category }) {
    // State
    const [newCategory, setNewCategory] = useState(category);
    const { name } = newCategory;
    useEffect(() => setNewCategory(category), [category]);
    const onChangeNewCategoryForm = (e) => {
        setNewCategory({
            ...newCategory,
            [e.target.name]: e.target.value,
        });
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        let check = await onSubmitUpdate(newCategory);
        if (check) {
            onCloseUpdate();
        }
    };
    return (
        <Modal show={showUpdate} onHide={onCloseUpdate} animation={false}>
            <Modal.Header closeButton className="bg-primary">
                <Modal.Title className="font-weight-bold text-light">Cập nhật loại dịch vụ</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="font-weight-bold">Tên loại dịch vụ:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập loại dịch vụ"
                            value={name}
                            name="name"
                            onChange={(e) => onChangeNewCategoryForm(e)}
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

export default UpdateCategoryModal;
