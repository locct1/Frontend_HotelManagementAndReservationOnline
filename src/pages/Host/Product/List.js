import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { stringToSlug } from '~/helpers/covertString';
import { getAllProducts, addProduct, deleteProduct, getProductById, updateProduct } from '~/services/product.service';
import { getAllCategories } from '~/services/category.service';
import InputSearch from '~/components/InputSearch';
import AddProductModal from '~/components/Host/Product/AddProductModal';
import UpdateProductModal from '~/components/Host/Product/UpdateProductModal';
import { Pagination } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '~/components/Loading';
function Product() {
    const pageSize = 5;
    let i = 1;
    // State
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filterProducts, setFilterProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [totalPage, setTotalPage] = useState(0);
    const [current, setCurrent] = useState(1);
    const [minIndex, setMinIndex] = useState(0);
    const [maxIndex, setMaxIndex] = useState(0);

    const [showAdd, setShowAdd] = useState(false);
    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => {
        if (categories <= 0) {
            toast.error('Vui lòng điền ít nhất một loại dịch vụ');
            return;
        }
        setShowAdd(true);
    };

    const [product, setProduct] = useState();
    const [showUpdate, setShowUpdate] = useState(false);
    const handleCloseUpdate = () => setShowUpdate(false);
    const handleShowUpdate = () => setShowUpdate(true);

    useEffect(() => {
        fetchData();
        setTotalPage(filterProducts.data / pageSize);
        setMinIndex(0);
        setMaxIndex(pageSize);
    }, []);
    const fetchData = async () => {
        let response = await getAllProducts();
        let responseCategory = await getAllCategories();
        if (response.success && responseCategory.success) {
            setProducts(response.data);
            setFilterProducts(response.data);
            setCategories(responseCategory.data);
            if (isLoading)
                setTimeout(() => {
                    setIsLoading(false);
                }, 400);
            return;
        }
        toast.error(response.message);
    };
    const handleSubmitAdd = async (data) => {
        let response = await addProduct(data);
        if (response.success) {
            fetchData();
            toast.success(response.message);
            return true;
        }
        toast.error(response.message);
        return false;
    };
    const handleChangePage = (page) => {
        setCurrent(page);
        setMinIndex((page - 1) * pageSize);
        setMaxIndex(page * pageSize);
    };
    const handleGetProduct = async (id) => {
        let response = await getProductById(id);
        if (response.success) {
            response.data.categoryId = response.data.category.id;
            delete response.data['category'];
            setProduct(response.data);
            handleShowUpdate();
        }
    };
    const handleSubmitUpdate = async (data) => {
        let response = await updateProduct(data);
        if (response.success) {
            fetchData();
            toast.success(response.message);
            return true;
        }
        toast.error(response.message);
        return false;
    };
    const handDeleteProduct = async (id) => {
        let response = await deleteProduct(id);
        if (response.success) {
            toast.success(response.message);
            fetchData();
            return;
        }
        toast.error(response.message);
        return false;
    };
    const handleChangeSearch = (data) => {
        if (data === '') return setFilterProducts(products);
        else {
            let newArray = products.filter((product) => {
                return stringToSlug(product.name).includes(stringToSlug(data));
            });
            if (newArray.length <= 0) {
                newArray = products.filter((product) => {
                    return stringToSlug(product.category.name).includes(stringToSlug(data));
                });
            }
            setFilterProducts(newArray);
            handleChangePage(1);
        }
    };
    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-primary">Quản lý dịch vụ</h6>
                        </div>
                        <div className="card-body">
                            <button className="btn btn-success mb-3" onClick={handleShowAdd}>
                                <i className="fas fa-plus"></i> Thêm dịch vụ
                            </button>
                            <InputSearch onSearch={handleChangeSearch} />
                            <div className="table-responsive">
                                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                                    <thead>
                                        <tr className="bg bg-dark text-light">
                                            <th width="4%">STT</th>
                                            <th>Dịch vụ</th>
                                            <th>Loại dịch vụ</th>
                                            <th>Giá</th>
                                            <th width="10%">Quản lý</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {categories && categories.length > 0 && (
                                            <AddProductModal
                                                showAdd={showAdd}
                                                onCloseAdd={handleCloseAdd}
                                                onSubmitAdd={handleSubmitAdd}
                                                categories={categories}
                                            />
                                        )}
                                        {product && categories && (
                                            <UpdateProductModal
                                                showUpdate={showUpdate}
                                                onCloseUpdate={handleCloseUpdate}
                                                onSubmitUpdate={handleSubmitUpdate}
                                                product={product}
                                                categories={categories}
                                            />
                                        )}
                                        {filterProducts && filterProducts.length > 0 ? (
                                            <>
                                                {' '}
                                                {filterProducts.map(
                                                    (product, index) =>
                                                        index >= minIndex &&
                                                        index < maxIndex && (
                                                            <tr key={product.id}>
                                                                <td>{++index}</td>
                                                                <td>{product.name}</td>
                                                                <td>{product.category.name}</td>
                                                                <td>
                                                                    {String(product.price).replace(
                                                                        /(\d)(?=(\d\d\d)+(?!\d))/g,
                                                                        '$1,',
                                                                    )}
                                                                    <sup>đ</sup>
                                                                </td>
                                                                <td>
                                                                    <button
                                                                        className="btn btn-primary ml-2"
                                                                        onClick={() => handleGetProduct(product.id)}
                                                                    >
                                                                        <i className="fas fa-edit"></i>
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handDeleteProduct(product.id)}
                                                                        className="btn btn-danger ml-2"
                                                                    >
                                                                        <i className="fas fa-trash-alt"></i>
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ),
                                                )}
                                            </>
                                        ) : (
                                            <tr>
                                                <td colSpan="6" className="text-center">
                                                    Không có dữ liệu
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="mb-5  d-flex justify-content-end mr-3">
                            <Pagination
                                pageSize={pageSize}
                                current={current}
                                total={filterProducts.length}
                                onChange={handleChangePage}
                            />
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default Product;
