import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import Room from '~/pages/Host/Room/List';
import { ToastContainer, toast } from 'react-toastify';
import { capitalizeFirstLetter } from '~/helpers/covertString';
import moment from 'moment';
import 'moment/locale/vi';
function BookingOnlineDetailModal({ show, onClose, bookingOnline }) {
    // State
    return (
        <Modal show={show} onHide={onClose} dialogClassName="modal-70w">
            <Modal.Header closeButton className="bg-primary">
                <Modal.Title className="font-weight-bold text-light">Chi tiết đặt phòng:{bookingOnline.id}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container">
                    <p>
                        <span className="font-weight-bold"> Ngày tạo:</span>
                        <span className="ml-1">{moment(bookingOnline.createdAt).format('DD/MM/YYYY HH:mm:ss')} </span>
                    </p>
                    <p className="mb-3">
                        <span className="font-weight-bold"> Ngày cập nhật:</span>
                        <span className="ml-1">{moment(bookingOnline.updatedAt).format('DD/MM/YYYY HH:mm:ss')} </span>
                    </p>
                    <div class="row">
                        <div className="col-6">
                            <h5 className="mb-3 font-weight-bold">Thông tin tài khoản đặt phòng</h5>
                            <div class="table-responsive">
                                <table class="table table-striped">
                                    <thead></thead>
                                    <tbody>
                                        <tr>
                                            <th width="50%">Họ và tên</th>
                                            <td>{bookingOnline.user.fullName}</td>
                                        </tr>
                                        <tr>
                                            <th>Email</th>
                                            <td>{bookingOnline.user.email}</td>
                                        </tr>
                                        <tr>
                                            <th>Địa chỉ</th>
                                            <td>{bookingOnline.user.phoneNumber}</td>
                                        </tr>
                                        <tr>
                                            <th>Số điện thoại</th>
                                            <td>{bookingOnline.user.address}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="col-6">
                            <h5 className="mb-3 font-weight-bold">Thông tin người nhận phòng</h5>
                            <div class="table-responsive">
                                <table class="table table-striped">
                                    <thead></thead>
                                    <tbody>
                                        <tr>
                                            <th width="50%">Tên tài khoản</th>
                                            <td>{bookingOnline.client.fullName}</td>
                                        </tr>
                                        <tr>
                                            <th>Email</th>
                                            <td>{bookingOnline.client.email}</td>
                                        </tr>
                                        <tr>
                                            <th>Địa chỉ</th>
                                            <td>{bookingOnline.client.phoneNumber}</td>
                                        </tr>
                                        <tr>
                                            <th>Số điện thoại</th>
                                            <td>{bookingOnline.client.address}</td>
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
                                                    moment(bookingOnline.startDate).format('dddd DD/MM/YYYY'),
                                                )}{' '}
                                                sau {moment(bookingOnline.startDate).format('HH:mm')}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Ngày trả phòng</th>
                                            <td>
                                                {capitalizeFirstLetter(
                                                    moment(bookingOnline.endDate).format('dddd DD/MM/YYYY'),
                                                )}{' '}
                                                trước {moment(bookingOnline.endDate).format('HH:mm')}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Số đêm</th>
                                            <td>{bookingOnline.amountOfNight} đêm </td>
                                        </tr>
                                        <tr>
                                            <th>Số lượng khách</th>
                                            <td>{bookingOnline.amountOfPeople} khách</td>
                                        </tr>
                                        <tr>
                                            <th>Tổng tiền</th>
                                            <td>
                                                {String(bookingOnline.total).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}
                                                <sup>đ</sup>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Hình thức thanh toán</th>
                                            <td> {bookingOnline.methodPayment.name}</td>
                                        </tr>
                                        {bookingOnline.methodPayment.id === 2 ||
                                        bookingOnline.methodPayment.id === 3 ? (
                                            <tr>
                                                <th>Trạng thái giao dịch</th>
                                                <td>
                                                    {' '}
                                                    {bookingOnline.onl_TransactionStatus === '00'
                                                        ? 'Giao dịch thành công'
                                                        : 'Giao dịch không hợp lệ'}
                                                </td>
                                            </tr>
                                        ) : (
                                            <></>
                                        )}
                                        {bookingOnline.onl_TransactionNo ? (
                                            <tr>
                                                <th>Mã giao dịch</th>
                                                <td>{bookingOnline.onl_TransactionNo}</td>
                                            </tr>
                                        ) : (
                                            <></>
                                        )}
                                        {bookingOnline.onl_OrderId ? (
                                            <tr>
                                                <th>Mã hóa đơn</th>
                                                <td>{bookingOnline.onl_OrderId}</td>
                                            </tr>
                                        ) : (
                                            <></>
                                        )}
                                        <tr>
                                            <th>Ghi chú</th>
                                            <td> {bookingOnline.note}</td>
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
                                            <td>{bookingOnline.hotelName}</td>
                                        </tr>
                                        <tr>
                                            <th>Địa chỉ</th>
                                            <td>{bookingOnline.hotelAddress}</td>
                                        </tr>
                                        <tr>
                                            <th>Số điện thoại</th>
                                            <td>{bookingOnline.hotelPhoneNumber} </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="table-responsive">
                                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                                    <thead>
                                        <tr className="bg bg-dark text-light">
                                            <th width="4%">STT</th>
                                            <th>Tên loại phòng</th>
                                            <th>Kiểu giường</th>
                                            <th>Giá</th>
                                            <th>Số lượng phòng</th>
                                            <th>Thành tiền/đêm</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bookingOnline.bookingOnlineDetails &&
                                        bookingOnline.bookingOnlineDetails.length > 0 ? (
                                            <>
                                                {bookingOnline.bookingOnlineDetails.map(
                                                    (bookingOnlineDetail, index) => (
                                                        <tr key={bookingOnlineDetail.id}>
                                                            <td>{++index}</td>
                                                            <td>{bookingOnlineDetail.roomTypeName}</td>
                                                            <td>{bookingOnlineDetail.bedTypeName}</td>
                                                            <td>
                                                                {String(bookingOnlineDetail.price).replace(
                                                                    /(\d)(?=(\d\d\d)+(?!\d))/g,
                                                                    '$1,',
                                                                )}
                                                            </td>
                                                            <td>{bookingOnlineDetail.amountOfRoom}</td>
                                                            <td>
                                                                {String(
                                                                    bookingOnlineDetail.price *
                                                                        bookingOnlineDetail.amountOfRoom,
                                                                ).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}{' '}
                                                                <sup>đ</sup>
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

export default BookingOnlineDetailModal;
