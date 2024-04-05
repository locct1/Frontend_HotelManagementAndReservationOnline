import { NavLink, Link } from 'react-router-dom';
import { getAllHotelsWithRoomTypes } from '~/services/client.service';
import ClientLoading from '~/components/ClientLoading';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { LINK_HOTEL_AVATAR_IMAGE } from '~/helpers/constants';

function SuccessfulBooking() {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        window.scrollTo(0, 0);
        if (isLoading)
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
    }, []);

    return (
        <>
            {isLoading ? (
                <>
                        <ClientLoading />
                </>
            ) : (
                <>
                    <div className="breadcrumb-section">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="breadcrumb-text">
                                        <h2>Bạn đã đặt phòng khách sạn thành công</h2>
                                        <div className="bt-option">
                                            <Link to="/">Về Trang chủ</Link>
                                            <Link to="/review-booking">Xem đơn đặt phòng</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default SuccessfulBooking;
