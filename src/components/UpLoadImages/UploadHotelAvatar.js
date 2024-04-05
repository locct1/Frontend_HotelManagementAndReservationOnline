import React, { useState, useEffect } from 'react';
import './UploadRoomType.scss';
import { ToastContainer, toast } from 'react-toastify';
import { uploadHotelAvatar, getHotelAvatar, deleteHotelAvatar } from '~/services/image.service';
import Loading from '~/components/Loading';
import { LINK_HOTEL_AVATAR_IMAGE } from '~/helpers/constants';
function UploadHotelAvatar({ roomTypeId }) {
    const [linkImage, setLinkImage] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        let response = await getHotelAvatar();
        if (response.success) {
            setLinkImage(response.data);
            if (isLoading)
                setTimeout(() => {
                    setIsLoading(false);
                }, 400);

            return;
        }
        toast.error(response.message);
    };
    const onSelectFile = async (event) => {
        const selectedFile = event.target.files[0];

        if (linkImage.fileName) {
            event.target.value = '';
            toast.error('Tối đa 1 ảnh');
            return;
        }
        const formData = new FormData();
        formData.append(`FileUpload`, selectedFile);
        let response = await uploadHotelAvatar(formData);
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

    const deleteHandler = async (event) => {
        let response = await deleteHotelAvatar();
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
                        <span>tối đa 1 ảnh</span>
                        <input
                            type="file"
                            name="images"
                            onChange={onSelectFile}
                            accept="image/png , image/jpeg, image/webp"
                        />
                    </label>
                    <br />

                    <input type="file" multiple />
                    <div className="images">
                        {linkImage && linkImage.fileName && (
                            <>
                                <div className="image">
                                    <img src={LINK_HOTEL_AVATAR_IMAGE + linkImage.fileName} height="200" alt="upload" />
                                    <button onClick={() => deleteHandler()}>Xóa</button>
                                    <p>{1}</p>
                                </div>
                            </>
                        )}
                    </div>
                </section>
            )}{' '}
        </>
    );
}

export default UploadHotelAvatar;
