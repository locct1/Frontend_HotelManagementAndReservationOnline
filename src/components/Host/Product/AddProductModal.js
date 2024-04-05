import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import Product from '~/pages/Host/Product/List';
import { ToastContainer, toast } from 'react-toastify';

function AddProductModal({ showAdd, onCloseAdd, onSubmitAdd, categories }) {
    // State
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        categoryId: categories[0].id,
    });
    const { name, price, categoryId } = newProduct;
    const onChangeNewProductForm = (e) => {
        setNewProduct({
            ...newProduct,
            [e.target.name]: e.target.value,
        });
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        let checkvalidate = validateEasy(newProduct);
        if (!checkvalidate) {
            return;
        }
        let check = await onSubmitAdd(newProduct);
        if (check) {
            onCloseAdd();
            resetAddProductData();
        }
    };
    const validateEasy = (newProduct) => {
        const { name, price, categoryId } = newProduct;
        if (name === '' || price === '') {
            toast.error('Các trường không được để trống');
            return false;
        }
        if (isNaN(price)) {
            toast.error('Vui lòng nhập số');
            return false;
        }
        return true;
    };
    const resetAddProductData = () => {
        setNewProduct({ name: '', price: '', categoryId: categories[0].id });
    };
    return (
        <Modal show={showAdd} onHide={onCloseAdd} animation={false}>
            <Modal.Header closeButton className="bg-primary">
                <Modal.Title className="font-weight-bold text-light">Thêm dịch vụ</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="font-weight-bold">Tên dịch vụ:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập dịch vụ"
                            value={name}
                            name="name"
                            onChange={(e) => onChangeNewProductForm(e)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="font-weight-bold">Giá:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập giá"
                            value={price}
                            name="price"
                            onChange={(e) => onChangeNewProductForm(e)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="font-weight-bold">Loại dịch vụ:</Form.Label>
                        <Form.Control
                            as="select"
                            value={categoryId}
                            name="categoryId"
                            onChange={(e) => onChangeNewProductForm(e)}
                        >
                            {categories.map((category, index) => (
                                <option value={category.id} key={category.id}>
                                    {category.name}
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

export default AddProductModal;
