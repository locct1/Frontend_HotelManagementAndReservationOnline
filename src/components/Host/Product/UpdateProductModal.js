import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import Product from '~/pages/Host/Product/List';
import { ToastContainer, toast } from 'react-toastify';

function UpdateProductModal({ showUpdate, onCloseUpdate, onSubmitUpdate, product, categories }) {
    // State
    const [newProduct, setNewProduct] = useState(product);
    const { name, price, categoryId } = newProduct;
    useEffect(() => setNewProduct(product), [product]);
    const onChangeNewProductForm = (e) => {
        setNewProduct({
            ...newProduct,
            [e.target.name]: e.target.value,
        });
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
    const onSubmit = async (event) => {
        event.preventDefault();
        let checkvalidate = validateEasy(newProduct);
        if (!checkvalidate) {
            return;
        }
        let check = await onSubmitUpdate(newProduct);
        if (check) {
            onCloseUpdate();
        }
    };
    return (
        <Modal show={showUpdate} onHide={onCloseUpdate} animation={false}>
            <Modal.Header closeButton className="bg-primary">
                <Modal.Title className="font-weight-bold text-light">Cập nhật dịch vụ</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="font-weight-bold">Tên dịch vụ:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập loại dịch vụ"
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

export default UpdateProductModal;
