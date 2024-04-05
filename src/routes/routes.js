// Layouts

// Pages
import listCategory from '~/pages/Host/Category/List';
import listProduct from '~/pages/Host/Product/List';
import listImages from '~/pages/Host/Image/List';
import listRoomType from '~/pages/Host/RoomType/List';
import listRoom from '~/pages/Host/Room/List';
import listBedType from '~/pages/Admin/BedType/List';
import listFacility from '~/pages/Admin/Facility/List';
import listFacilityType from '~/pages/Admin/FacilityType/List';
import listHostFacilities from '~/pages/Host/Facility/List';
import listDevices from '~/pages/Admin/Device/List';
import listHotels from '~/pages/Admin/Hotel/List';
import Login from '~/pages/Host/Auth/Login';
import AdminLogin from '~/pages/Admin/Auth/Login';
import Register from '~/pages/Host/Auth/Register';
import AdminLayout from '~/layouts/AdminLayout';
import HomeLayout from '~/layouts/HomeLayout';

import Home from '~/pages/Client/Home';
import Hotel from '~/pages/Client/Hotel';
import HotelDetail from '~/pages/Client/HotelDetail';
import ClientLogin from '~/pages/Client/Auth/ClientLogin';
import ClientRegister from '~/pages/Client/Auth/ClientRegister';
import BookingNow from '~/pages/Client/BookingNow';
import SuccessfulBooking from '~/pages/Client/SuccessfulBooking';
import HostBooking from '~/pages/Host/HostBooking/List';
import ReviewBooking from '~/pages/Client/ReviewBooking';
import ClientEdit from '~/pages/Client/Auth/ClientEdit';
import AboutUs from '~/pages/Client/AboutUs';
import BusinessCooperation from '~/pages/Client/BusinessCooperation';
import HostEdit from '~/pages/Host/Auth/Edit';
import ReservationAtTheHotel from '~/pages/Host/Reservation/ReservationAtTheHotel';
import HostReservation from '~/pages/Host/Reservation/List';
import UpdateReservationAtTheHotel from '~/pages/Host/Reservation/UpdateReservationAtTheHotel';
import PrintReservation from '~/pages/Host/Reservation/PrintReservation';
import HostDashBoard from '~/pages/Host/DashBoard/HostDashBoard';
import AdminDashBoard from '~/pages/Admin/DashBoard/AdminDashBoard';
import AdminBooking from '~/pages/Admin/AdminBooking/List';
import SuccessfulBookingVnPay from '~/pages/Client/SuccessFullBookingVnPay';
// Public routesS
const publicRoutes = [
    { path: '/host-login', component: Login, layout: null },
    { path: '/host-register', component: Register, layout: null },
    { path: '/admin-login', component: AdminLogin, layout: null },
    { path: '/', component: Home, layout: HomeLayout },
    { path: '/hotels', component: Hotel, layout: HomeLayout },
    { path: '/hotel-detail/:hotelId', component: HotelDetail, layout: HomeLayout },
    { path: '/login', component: ClientLogin, layout: HomeLayout },
    { path: '/register', component: ClientRegister, layout: HomeLayout },
    { path: '/edit-info', component: ClientEdit, layout: HomeLayout },
    { path: '/booking-now', component: BookingNow, layout: HomeLayout },
    { path: '/successful-booking', component: SuccessfulBooking, layout: HomeLayout },
    { path: '/successful-booking-vnpay', component: SuccessfulBookingVnPay, layout: HomeLayout },
    { path: '/review-booking', component: ReviewBooking, layout: HomeLayout },
    { path: '/about-us', component: AboutUs, layout: HomeLayout },
    { path: '/business-cooperation', component: BusinessCooperation, layout: HomeLayout },
];
const privateRoutes = [
    { path: '/host-category-list', component: listCategory },
    { path: '/host-product-list', component: listProduct },
    { path: '/host-roomtype-list', component: listRoomType },
    { path: '/host-room-list', component: listRoom },
    { path: '/host-facility-list', component: listHostFacilities },
    { path: '/host-image-list', component: listImages },
    { path: '/host-manage-booking-online', component: HostBooking },
    { path: '/host-edit-info', component: HostEdit },
    { path: '/host-reservation-at-the-hotel', component: ReservationAtTheHotel, layout: null },
    { path: '/host-reservation-list', component: HostReservation },
    { path: '/host-update-reservation-at-the-hotel', component: UpdateReservationAtTheHotel, layout: null },
    { path: '/host-print-reservation', component: PrintReservation, layout: null },
    { path: '/host-dashboard', component: HostDashBoard },
];
const adminPrivateRoutes = [
    { path: '/admin-bedtype-list', component: listBedType, layout: AdminLayout },
    { path: '/admin-facility-list', component: listFacility, layout: AdminLayout },
    { path: '/admin-facilitytype-list', component: listFacilityType, layout: AdminLayout },
    { path: '/admin-hotel-list', component: listHotels, layout: AdminLayout },
    { path: '/admin-device-list', component: listDevices, layout: AdminLayout },
    { path: '/admin-manage-booking-online', component: AdminBooking, layout: AdminLayout },
    { path: '/admin-dashboard', component: AdminDashBoard, layout: AdminLayout },
];
export { publicRoutes, privateRoutes, adminPrivateRoutes };
