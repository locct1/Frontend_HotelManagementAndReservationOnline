import { LINK_ROOMTYPE_IMAGE } from '~/helpers/constants';
import ImageGallery from 'react-image-gallery';
import { useEffect, useLayoutEffect, useState } from 'react';
import { getBedTypeByRoomType, checkRoomAvailability } from '~/services/client.service';
import { useDispatch, useSelector } from 'react-redux';
import { isAuthenticatedClientSelector } from '~/redux/selectors';
import { ToastContainer, toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import DatePicker from 'react-datepicker';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import vi from 'date-fns/locale/vi';
import BookingNowSlice from '~/redux/Slices/BookingNowSlice';
import { infoClientSelector } from '~/redux/selectors';
import { useNavigate } from 'react-router-dom';
registerLocale('vi', vi);
function RoomTypeInfoModal({ bedType, imagesRoomType, roomTypeChild, hotel, devices, show, handleClose }) {
    return (
        <>
            <Modal dialogClassName="modal-70w" show={show} onHide={handleClose}>
                <Modal.Header style={{ backgroundColor: '#007bff' }} closeButton>
                    <Modal.Title className="text-light">Thông tin chi tiết: {hotel.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4 className="text-info">{roomTypeChild.name}</h4>
                    <div className="row">
                        <div className="col-5">
                            <ImageGallery
                                items={imagesRoomType}
                                autoPlay={true}
                                showNav={false}
                                thumbnailPosition={'left'}
                            />
                        </div>
                        <div className="col-1"></div>
                        <div className="col-sm-6">
                            <table>
                                <tbody>
                                    <tr>
                                        <td width="40%">
                                            <h5 className="font-weight-bold text-dark">Thông tin phòng:</h5>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="font-weight-bold text-dark">Số lượng khách:</td>
                                        <td> Tối đa {roomTypeChild.max} khách</td>
                                    </tr>
                                    <tr>
                                        <td className="font-weight-bold text-dark">Số phòng trống:</td>
                                        <td className="text-danger"> {roomTypeChild.amountOfSold} phòng trống</td>
                                    </tr>
                                    <tr>
                                        <td className="font-weight-bold text-dark" style={{ verticalAlign: 'top' }}>
                                            Thiết bị trong phòng:
                                        </td>
                                        <td>
                                            {devices &&
                                                devices.length > 0 &&
                                                devices.map((record, index) => (
                                                    <div className="row ml-1 " key={index}>
                                                        - {record.device.name}
                                                    </div>
                                                ))}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="font-weight-bold text-dark">Kiểu giường:</td>
                                        <td>{bedType.name}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-weight-bold text-dark">Giá:</td>
                                        <td className="font-weight-bold text-danger" style={{ fontSize: '25px' }} s>
                                            {' '}
                                            {String(roomTypeChild.price).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}đ
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default RoomTypeInfoModal;
