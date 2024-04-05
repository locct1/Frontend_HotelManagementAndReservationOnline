import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { stringToSlug } from '~/helpers/covertString';
import {
    getAllCategories,
    addCategory,
    deleteCategory,
    getCategoryById,
    updateCategory,
} from '~/services/category.service';
import InputSearch from '~/components/InputSearch';
import AddCategoryModal from '~/components/Host/Category/AddCategoryModal';
import UpdateCategoryModal from '~/components/Host/Category/UpdateCategoryModal';
import { Pagination } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '~/components/Loading';
function Category() {
    const pageSize = 5;
    let i = 1;
    // State
    const [categories, setCategories] = useState([]);
    const [filterCategories, setFilterCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalPage, setTotalPage] = useState(0);
    const [current, setCurrent] = useState(1);
    const [minIndex, setMinIndex] = useState(0);
    const [maxIndex, setMaxIndex] = useState(0);

    const [showAdd, setShowAdd] = useState(false);
    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);

    const [category, setCategory] = useState();
    const [showUpdate, setShowUpdate] = useState(false);
    const handleCloseUpdate = () => setShowUpdate(false);
    const handleShowUpdate = () => setShowUpdate(true);

    useEffect(() => {
        fetchData();
        setTotalPage(filterCategories.data / pageSize);
        setMinIndex(0);
        setMaxIndex(pageSize);
    }, []);
    const fetchData = async () => {
        let response = await getAllCategories();
        if (response.success) {
            setCategories(response.data);
            setFilterCategories(response.data);
            if (isLoading)
                setTimeout(() => {
                    setIsLoading(false);
                }, 400);
            return;
        }
        toast.error(response.message);
    };
    const handleSubmitAdd = async (data) => {
        let response = await addCategory(data);
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
    const handleGetCategory = async (id) => {
        let response = await getCategoryById(id);
        if (response.success) {
            setCategory(response.data);
            handleShowUpdate();
        }
    };
    const handleSubmitUpdate = async (data) => {
        let response = await updateCategory(data);
        if (response.success) {
            fetchData();
            toast.success(response.message);
            return true;
        }
        toast.error(response.message);
        return false;
    };
    const handDeleteCategory = async (id) => {
        let response = await deleteCategory(id);
        if (response.success) {
            toast.success('Xóa thành công', {
                position: 'bottom-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
            });
            fetchData();
            return;
        }
        toast.error('Đã xảy ra lỗi,vui lòng thử lại');
        return false;
    };
    const handleChangeSearch = (data) => {
        if (data === '') return setFilterCategories(categories);
        else {
            let newArray = categories.filter((category) => {
                return stringToSlug(category.name).includes(stringToSlug(data));
            });

            setFilterCategories(newArray);
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
                            <h6 className="m-0 font-weight-bold text-primary">Quản lý loại dịch vụ</h6>
                        </div>
                        <div className="card-body">
                            <button className="btn btn-success mb-3" onClick={handleShowAdd}>
                                <i className="fas fa-plus"></i> Thêm loại dịch vụ
                            </button>
                            <InputSearch onSearch={handleChangeSearch} />
                            <div className="table-responsive">
                                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                                    <thead>
                                        <tr className="bg bg-dark text-light">
                                            <th width="4%">STT</th>
                                            <th>Loại dịch vụ</th>
                                            <th width="10%">Quản lý</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <AddCategoryModal
                                            showAdd={showAdd}
                                            onCloseAdd={handleCloseAdd}
                                            onSubmitAdd={handleSubmitAdd}
                                        />
                                        {category && (
                                            <UpdateCategoryModal
                                                showUpdate={showUpdate}
                                                onCloseUpdate={handleCloseUpdate}
                                                onSubmitUpdate={handleSubmitUpdate}
                                                category={category}
                                            />
                                        )}
                                        {filterCategories && filterCategories.length > 0 ? (
                                            <>
                                                {filterCategories.map(
                                                    (category, index) =>
                                                        index >= minIndex &&
                                                        index < maxIndex && (
                                                            <tr key={category.id}>
                                                                <td>{++index}</td>
                                                                <td>{category.name}</td>
                                                                <td>
                                                                    <button
                                                                        className="btn btn-primary ml-2"
                                                                        onClick={() => handleGetCategory(category.id)}
                                                                    >
                                                                        <i className="fas fa-edit"></i>
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handDeleteCategory(category.id)}
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
                                                <td colSpan="3" className="text-center">
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
                                total={filterCategories.length}
                                onChange={handleChangePage}
                            />
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default Category;
