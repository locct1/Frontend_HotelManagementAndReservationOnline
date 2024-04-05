import { hostUpdateReservationSelector } from '~/redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { capitalizeFirstLetter } from '~/helpers/covertString';
import React, { Fragment } from 'react';
import { useEffect, useState } from 'react';
import moment from 'moment';
import 'moment/locale/vi';
import './PrintReservation.scss';
function PrintReservation() {
    const reservation = useSelector(hostUpdateReservationSelector);
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
    useEffect(() => {
        document.body.setAttribute('style', 'background-color: #e0e0e0 !important;');
        return function cleanup() {
            document.body.setAttribute('style', 'background-color:#fff !important;');
        };
    }, []);
    return (
        <>
            <body className="A4 print-reservation">
                <section className="sheet padding-10mm">
                    <table border="0" width="100%" cellspacing="0">
                        <tbody>
                            <tr>
                                <td align="center">
                                    <img style={{ width: '70%' }} src="/img/Logo3.PNG" alt="" />
                                </td>
                                <td align="center">
                                    <b>{reservation.hotelName}</b>
                                    <br />
                                    <small align="left">
                                        <b>Số địa thoại:</b> {reservation.hotelPhoneNumber}
                                    </small>

                                    <br />
                                    <small>
                                        <b>Địa chỉ:</b> {reservation.hotelAddress}
                                    </small>
                                    <br />
                                    <small>
                                        Cung cấp dịch vụ chăm sóc khách hàng 24/7, với uy tín của chúng tôi và kinh
                                        nghiệm hơn 10 năm, chúng tôi hứa hẹn với bạn một loạt các lựa chọn phong phú để
                                        thắp sáng trạng thái hạnh phúc của chính bạn.
                                    </small>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <p>
                        <i>
                            <u>Thông tin Khách hàng</u>
                        </i>
                    </p>
                    <table border="0" width="100%" cellspacing="0">
                        <tbody>
                            <tr>
                                <td width="30%" className="font-weight-bold">
                                    Họ tên khách hàng:
                                </td>
                                <td>{reservation.clientOffline.fullName}</td>
                            </tr>
                            <tr>
                                <td className="font-weight-bold">Email:</td>
                                <td>{reservation.clientOffline.email}</td>
                            </tr>
                            <tr>
                                <td className="font-weight-bold">Địa chỉ:</td>
                                <td>{reservation.clientOffline.phoneNumber}</td>
                            </tr>
                            <tr>
                                <td className="font-weight-bold">Số điện thoại:</td>
                                <td>{reservation.clientOffline.address}</td>
                            </tr>
                        </tbody>
                    </table>

                    <p>
                        <i>
                            <u>Thông tin Đặt phòng</u>
                        </i>
                    </p>
                    <table border="0" width="100%" cellspacing="0">
                        <tbody>
                            <tr>
                                <th width="30%">Ngày nhận phòng:</th>
                                <td>
                                    {capitalizeFirstLetter(moment(reservation.startDate).format('dddd DD/MM/YYYY'))}{' '}
                                    {moment(reservation.startDate).format('HH:mm:ss')}
                                </td>
                            </tr>
                            <tr>
                                <th>Ngày trả phòng:</th>
                                <td>
                                    {capitalizeFirstLetter(moment(reservation.endDate).format('dddd DD/MM/YYYY'))}{' '}
                                    {moment(reservation.endDate).format('HH:mm:ss')}
                                </td>
                            </tr>
                            <tr>
                                <th>Số đêm:</th>
                                <td>{reservation.amountOfNight} đêm </td>
                            </tr>
                            <tr>
                                <th>Số lượng khách:</th>
                                <td>{reservation.amountOfPeople} khách</td>
                            </tr>
                            <tr>
                                <th>Tổng tiền phòng:</th>
                                <td>
                                    {String(reservation.total).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}
                                    <sup>đ</sup>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <p>
                        <i>
                            <u>Danh sách phòng đặt</u>
                        </i>
                    </p>
                    <table border="1" width="100%" cellspacing="0" cellpadding="5">
                        <thead>
                            <tr>
                                <th>Tên phòng</th>
                                <th>Loại phòng</th>
                                <th>Kiểu giường</th>
                                <th>Đơn giá</th>
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

                    <p>
                        <i>
                            <u>Danh sách sản phẩm dịch vụ</u>
                        </i>
                    </p>
                    <table border="1" width="100%" cellspacing="0" cellpadding="5">
                        <thead>
                            <tr>
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
                                        {room.roomReservationProducts && room.roomReservationProducts.length > 0 ? (
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
                                                            {String(product.price * product.quantity).replace(
                                                                /(\d)(?=(\d\d\d)+(?!\d))/g,
                                                                '$1,',
                                                            )}
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
                    <br></br>
                    <p>
                        <span class="font-weight-bold">Tổng thanh toán:</span>{' '}
                        {String(reservation.total + totalProduct).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}
                        <sup>đ</sup>
                    </p>
                    <br />
                    <table border="0" width="100%">
                        <tbody>
                            <tr>
                                <td align="center">
                                    <small>
                                        Xin cám ơn Quý khách đã ủng hộ Khách sạn, Chúc Quý khách An Khang, Thịnh Vượng!
                                    </small>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </body>
        </>
    );
}

export default PrintReservation;
