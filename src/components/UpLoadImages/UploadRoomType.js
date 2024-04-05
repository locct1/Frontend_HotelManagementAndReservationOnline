import React, { useState, useEffect } from 'react';
import './UploadRoomType.scss';
import { ToastContainer, toast } from 'react-toastify';
import { uploadRoomType, getRoomTypeImage, deleteRoomTypeImage } from '~/services/image.service';
import Loading from '~/components/Loading';
import { LINK_ROOMTYPE_IMAGE } from '~/helpers/constants';
function UploadRoomType({ roomTypeId }) {
    const [linkImages, setLinkImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        let response = await getRoomTypeImage(roomTypeId);
        if (response.success) {
            setLinkImages(response.data);
            if (isLoading)
                setTimeout(() => {
                    setIsLoading(false);
                }, 400);

            return;
        }
        toast.error(response.message);
    };
    const onSelectFile = async (event) => {
        const selectedFiles = event.target.files;
        const selectedFilesArray = Array.from(selectedFiles);
        if (linkImages.length >= 5 || linkImages.length + selectedFilesArray.length > 5) {
            event.target.value = '';
            toast.error('Tối đa 5 ảnh');
            return;
        }
        const formData = new FormData();
        for (let i = 0; i < selectedFilesArray.length; i++) {
            formData.append(`FileUpload`, selectedFilesArray[i]);
        }
        let response = await uploadRoomType(roomTypeId, formData);
        // FOR BUG IN CHROME
        if (response.success) {
            fetchData();
            toast.success(response.message);
            event.target.value = '';
            return true;
        }
        event.target.value = '';

        toast.error(response.message);
    };

    const deleteHandler = async (image) => {
        let response = await deleteRoomTypeImage(image.id);
        if (response.success) {
            fetchData();
            toast.success(response.message);
            return true;
        }
        toast.error(response.message);
    };

    return (
        <>
            {isLoading ? (
                <>
                    <div className="d-flex justify-content-center">
                        <button className="btn btn-primary" type="button" disabled>
                            <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                            Loading...
                        </button>
                    </div>
                </>
            ) : (
                <section className="upload-image">
                    <label className="upload-plus bg bg-success text-light">
                        <span>+</span>
                        <span>tối đa 5 ảnh</span>
                        <input
                            type="file"
                            name="images"
                            onChange={onSelectFile}
                            multiple
                            accept="image/png , image/jpeg, image/webp"
                        />
                    </label>
                    <br />

                    <input type="file" multiple />
                    <div className="images">
                        {linkImages &&
                            linkImages.map((image, index) => {
                                return (
                                    <div key={image.id} className="image">
                                        <img src={LINK_ROOMTYPE_IMAGE + image.fileName} height="200" alt="upload" />
                                        <button onClick={() => deleteHandler(image)}>Xóa</button>
                                        <p>{index + 1}</p>
                                    </div>
                                );
                            })}
                    </div>
                </section>
            )}{' '}
        </>
    );
}

export default UploadRoomType;
