import React, { useState, useEffect } from 'react';
import './UploadRoomType.scss';
import { ToastContainer, toast } from 'react-toastify';
import { uploadRoomType, getRoomTypeImage } from '~/services/image.service';
import Loading from '~/components/Loading';
import { LINK_ROOMTYPE_IMAGE } from '~/helpers/constants';
function UploadRoomType({ roomTypeId }) {
    const [selectedImages, setSelectedImages] = useState([]);
    const [showUpload, setShowUpload] = useState(false);
    const [uploadImages, setUploadImages] = useState([]);
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
    const onSelectFile = (event) => {
        const selectedFiles = event.target.files;
        const selectedFilesArray = Array.from(selectedFiles);
        if (selectedImages.length >= 5 || selectedFilesArray.length > 5) {
            toast.error('Tối đa 5 ảnh');
            return;
        }
        setUploadImages([...uploadImages, ...selectedFilesArray]);
        const imagesArray = selectedFilesArray.map((file) => {
            return URL.createObjectURL(file);
        });
        setShowUpload(true);
        setSelectedImages((previousImages) => previousImages.concat(imagesArray));
        // FOR BUG IN CHROME
        event.target.value = '';
    };

    function deleteHandler(image) {
        setSelectedImages(selectedImages.filter((e) => e !== image));
        URL.revokeObjectURL(image);
    }
    const handleUploadImages = async (event) => {
        const formData = new FormData();
        for (let i = 0; i < uploadImages.length; i++) {
            formData.append(`FileUpload`, uploadImages[i]);
        }

        let response = await uploadRoomType(roomTypeId, formData);
        setUploadImages([]);
        setShowUpload(false);
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
                    <label className="upload-plus">
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

                    {selectedImages.length > 0 &&
                        showUpload === true &&
                        (selectedImages.length > 5 ? (
                            <p className="upload-error">
                                You can't upload more than 5 images! <br />
                                <p>
                                    please delete <b> {selectedImages.length - 5} </b> of them{' '}
                                </p>
                            </p>
                        ) : (
                            <button className="upload-btn" onClick={handleUploadImages}>
                                UPLOAD {uploadImages.length} IMAGE
                                {uploadImages.length === 1 ? '' : 'S'}
                            </button>
                        ))}

                    <div className="images">
                        {linkImages &&
                            linkImages.map((image, index) => {
                                return (
                                    <div key={image} className="image">
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
