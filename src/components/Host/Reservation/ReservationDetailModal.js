import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import Room from '~/pages/Host/Room/List';
import { ToastContainer, toast } from 'react-toastify';
import { capitalizeFirstLetter } from '~/helpers/covertString';
import React, { Fragment } from 'react';
import moment from 'moment';
import 'moment/locale/vi';
function ReservationDetailModal({ show, onClose, reservation }) {
    const classNameStatus = [
        '',
        'badge badge-warning text-dark',
        'badge badge-info text-light',
        'badge badge-danger text-light',
        'badge badge-primary text-light',
        'badge badge-secondary text-light',
        '',
        'badge badge-warning text-dark',
        'badge badge-info text-light',
        'badge badge-success text-light',
        'badge badge-danger text-light',
        'badge badge-danger text-light',
        'badge badge-danger text-light',
        '',
        '',
    ];
    const [totalProduct, setTotalProduct] = useState(1);
    useEffect(() => {
        let total = 0;
        reservation.roomReservations.forEach((element) => {
            element.roomReservationProducts.forEach((product) => {
                total = total + product.price * product.quantity;
            });
        });
        setTotalProduct(total);
    }, [reservation]);
    // State
    return (
        <Modal show={show} onHide={onClose} dialogClassName="modal-70w">
            <Modal.Header closeButton className="bg-primary">
                <Modal.Title className="font-weight-bold text-light">
                    Chi tiết đơn đặt phòng: {reservation.id}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container">
                    <p>
                        <span className="font-weight-bold"> Ngày tạo:</span>
                        <span className="ml-1">{moment(reservation.createdAt).format('DD/MM/YYYY HH:mm:ss')} </span>
                    </p>
                    <p className="mb-3">
                        <span className="font-weight-bold"> Ngày cập nhật:</span>
                        <span className="ml-1">{moment(reservation.updatedAt).format('DD/MM/YYYY HH:mm:ss')} </span>
                    </p>
                    <div class="row">
                        <div className="col-6">
                            <h5 className="mb-3 font-weight-bold">Thông tin người nhận phòng</h5>
                            <div class="table-responsive">
                                <table class="table table-striped">
                                    <thead></thead>
                                    <tbody>
                                        <tr>
                                            <th width="50%">Họ tên khách hàng</th>
                                            <td>{reservation.clientOffline.fullName}</td>
                                        </tr>
                                        <tr>
                                            <th>Email</th>
                                            <td>{reservation.clientOffline.email}</td>
                                        </tr>
                                        <tr>
                                            <th>Địa chỉ</th>
                                            <td>{reservation.clientOffline.phoneNumber}</td>
                                        </tr>
                                        <tr>
                                            <th>Số điện thoại</th>
                                            <td>{reservation.clientOffline.address}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="col-6">
                            <h5 className="mb-3 font-weight-bold">Thông tin khách sạn</h5>
                            <div class="table-responsive">
                                <table class="table table-striped">
                                    <thead></thead>
                                    <tbody>
                                        <tr>
                                            <th width="50%">Tên khách sạn</th>
                                            <td>{reservation.hotelName}</td>
                                        </tr>
                                        <tr>
                                            <th>Địa chỉ</th>
                                            <td>{reservation.hotelAddress}</td>
                                        </tr>
                                        <tr>
                                            <th>Số điện thoại</th>
                                            <td>{reservation.hotelPhoneNumber}</td>
                                        </tr>
                                        <tr>
                                            <th>Trạng thái đơn đặt phòng</th>
                                            <td>
                                                <span className={classNameStatus[reservation.statusId]}>
                                                    {reservation.status.name}
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <h5 className="mb-3 font-weight-bold">Thông tin đặt phòng</h5>
                            <div class="table-responsive">
                                <table class="table table-striped">
                                    <thead></thead>
                                    <tbody>
                                        <tr>
                                            <th width="50%">Ngày nhận phòng</th>
                                            <td>
                                                {capitalizeFirstLetter(
                                                    moment(reservation.startDate).format('dddd DD/MM/YYYY'),
                                                )}{' '}
                                                sau {moment(reservation.startDate).format('HH:mm')}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Ngày trả phòng</th>
                                            <td>
                                                {capitalizeFirstLetter(
                                                    moment(reservation.endDate).format('dddd DD/MM/YYYY'),
                                                )}{' '}
                                                trước {moment(reservation.endDate).format('HH:mm')}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Số đêm</th>
                                            <td>{reservation.amountOfNight} đêm </td>
                                        </tr>
                                        <tr>
                                            <th>Số lượng khách</th>
                                            <td>{reservation.amountOfPeople} khách</td>
                                        </tr>
                                        <tr>
                                            <th>Tổng tiền phòng</th>
                                            <td>
                                                {String(reservation.total).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}
                                                <sup>đ</sup>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Ghi chú</th>
                                            <td> {reservation.note}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <h5 className="font-w">Danh sách phòng đặt</h5>
                            <div className="table-responsive">
                                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                                    <thead>
                                        <tr className="bg bg-dark text-light">
                                            <th>Tên phòng</th>
                                            <th>Tên loại phòng</th>
                                            <th>Kiểu giường</th>
                                            <th>Giá</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reservation.roomReservations && reservation.roomReservations.length > 0 ? (
                                            <>
                                                {reservation.roomReservations.map((roomReservation, index) => (
                                                    <tr key={roomReservation.id}>
                                                        <td>{roomReservation.roomName}</td>
                                                        <td>{roomReservation.roomTypeName}</td>
                                                        <td>{roomReservation.bedTypeName}</td>
                                                        <td>
                                                            {String(roomReservation.price).replace(
                                                                /(\d)(?=(\d\d\d)+(?!\d))/g,
                                                                '$1,',
                                                            )}
                                                            <sup>đ</sup>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </>
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="text-center">
                                                    Không có dữ liệu
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <h5 className="font-w">Danh sách sản phẩm-dịch vụ</h5>
                            <div className="table-responsive">
                                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                                    <thead>
                                        <tr className="bg bg-dark text-light">
                                            <th>Tên phòng</th>
                                            <th>Sản phẩm</th>
                                            <th>Giá</th>
                                            <th>Số lượng</th>
                                            <th>Thành tiền</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reservation.roomReservations && reservation.roomReservations.length > 0 ? (
                                            reservation.roomReservations.map((room, indexRoom) => (
                                                <Fragment key={room.name}>
                                                    {room.roomReservationProducts &&
                                                    room.roomReservationProducts.length > 0 ? (
                                                        <>
                                                            {room.roomReservationProducts.map((product, index) => (
                                                                <tr key={product.name}>
                                                                    <td>{room.roomName}</td>
                                                                    <td>{product.productName}</td>
                                                                    <td>
                                                                        {product.price ? (
                                                                            <>
                                                                                {String(product.price).replace(
                                                                                    /(\d)(?=(\d\d\d)+(?!\d))/g,
                                                                                    '$1,',
                                                                                )}
                                                                                <sup>đ</sup>
                                                                            </>
                                                                        ) : (
                                                                            'Chưa thiết lập'
                                                                        )}
                                                                    </td>
                                                                    <td>{product.quantity}</td>
                                                                    <td>
                                                                        {String(
                                                                            product.price * product.quantity,
                                                                        ).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}
                                                                        <sup>đ</sup>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </>
                                                    ) : (
                                                        <>
                                                            <tr key={room.id}>
                                                                <td colSpan="5">{room.roomName}</td>
                                                            </tr>
                                                        </>
                                                    )}
                                                </Fragment>
                                            ))
                                        ) : (
                                            <>
                                                <tr>
                                                    <td colSpan="6" className="text-center">
                                                        Không có dữ liệu
                                                    </td>
                                                </tr>
                                            </>
                                        )}
                                        <tr>
                                            <td colSpan="6" className="">
                                                <span className="font-weight-bold">Tổng tiền sản phẩm-dịch vụ: </span>
                                                {String(totalProduct).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}
                                                <sup>đ</sup>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <p>
                                <span class="font-weight-bold">Tổng thanh toán:</span>{' '}
                                {String(reservation.total + totalProduct).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}
                                <sup>đ</sup>
                            </p>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Hủy
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ReservationDetailModal;
