import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';

function HotelDetailModal({ show, onClose, hotel }) {
    return (
        <Modal show={show} onHide={onClose} dialogClassName="modal-70w">
            <Modal.Header closeButton className="bg-primary">
                <Modal.Title className="font-weight-bold text-light">Thông tin khách sạn: {hotel.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <h5 className="mb-3 font-weight-bold">Thông tin chủ khách sạn</h5>
                            <div class="table-responsive">
                                <table class="table table-striped">
                                    <thead></thead>
                                    <tbody>
                                        <tr>
                                            <th width="50%">Họ và tên</th>
                                            <td>{hotel.hotelAccount.fullName}</td>
                                        </tr>
                                        <tr>
                                            <th>Email</th>
                                            <td>{hotel.hotelAccount.email}</td>
                                        </tr>
                                        <tr>
                                            <th>Số điện thoại</th>
                                            <td>{hotel.hotelAccount.phoneNumber}</td>
                                        </tr>
                                        <tr>
                                            <th>Địa chỉ</th>
                                            <td>{hotel.hotelAccount.address}</td>
                                        </tr>
                                        <tr>
                                            <th>Trạng thái</th>
                                            <td>
                                                {hotel.hotelAccount.disabled ? (
                                                    <>
                                                        <span class="badge badge-danger">Chưa kích hoạt</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <span class="badge badge-success">Đã kích hoạt</span>
                                                    </>
                                                )}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <h5 className="mb-3 font-weight-bold">Thông tin khách sạn</h5>
                            <div class="table-responsive">
                                <table class="table table-striped">
                                    <thead></thead>
                                    <tbody>
                                        <tr>
                                            <th width="50%">Tên khách sạn</th>
                                            <td>{hotel.name}</td>
                                        </tr>
                                        <tr>
                                            <th>Số điện thoại</th>
                                            <td>{hotel.phoneNumber}</td>
                                        </tr>
                                        <tr>
                                            <th>Địa chỉ</th>
                                            <td>{hotel.address}</td>
                                        </tr>
                                        <tr>
                                            <th>Vị trí</th>
                                            <td>{hotel.description}</td>
                                        </tr>
                                        <tr>
                                            <th>Miêu tả</th>
                                            <td>
                                                <div dangerouslySetInnerHTML={{ __html: hotel.info }} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Trạng thái</th>
                                            <td>
                                                {hotel.disabled ? (
                                                    <>
                                                        <span class="badge badge-danger">Chưa kích hoạt</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <span class="badge badge-success">Đã kích hoạt</span>
                                                    </>
                                                )}
                                            </td>
                                        </tr>
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

export default HotelDetailModal;
