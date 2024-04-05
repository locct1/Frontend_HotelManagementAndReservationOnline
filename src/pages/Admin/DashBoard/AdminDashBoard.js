import React from 'react';
import { useEffect, useState } from 'react';
import { getAllDashBoards } from '~/services/admindashboard.service';
import { ToastContainer, toast } from 'react-toastify';
const AdminDashBoard = () => {
    const [dashboards, setDashBoards] = useState({});

    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        let response = await getAllDashBoards();
        if (response.success) {
            setDashBoards(response.data);
            return;
        }
        toast.error(response.message);
    };
    return (
        <>
            <div className="row mb-2">
                <div className="col-12">
                    <h4>Tổng quan</h4>
                </div>
            </div>

            <div className="row">
                {/* Earnings (Monthly) Card Example */}
                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-primary shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                        Tổng số loại tiện nghi
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                                        {dashboards.amountOfFacilityTypes ? dashboards.amountOfFacilityTypes : 0} loại
                                        tiện nghi
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Earnings (Monthly) Card Example */}
                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-success shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                        Tổng số tiện nghi
                                    </div>

                                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                                        {dashboards.amountOfFacilities ? dashboards.amountOfFacilities : 0} tiện nghi
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-info shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                                        Tổng số thiết bị
                                    </div>

                                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                                        {dashboards.amountOfDevices ? dashboards.amountOfDevices : 0} thiết bị
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-warning shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                        Tổng số tài khoản
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                                        {dashboards.amountOfUser ? dashboards.amountOfUser : 0} tài khoản
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-secondary shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-secondary text-uppercase mb-1">
                                        Tổng số khách sạn
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                                        {dashboards.amountOfHotelActives ? dashboards.amountOfHotelActives : 0}/
                                        {dashboards.amountOfHotels ? dashboards.amountOfHotels : 0} khách sạn hoạt động
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-danger shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-danger text-uppercase mb-1">
                                        Tổng số đơn đặt phòng Online
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                                        {dashboards.amountOfBookingOnlines ? dashboards.amountOfBookingOnlines : 0} đơn
                                        đặt phòng Online
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-success shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                        Tổng doanh thu đặt phòng Online
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                                        {String(
                                            dashboards.totalBookingOnline ? dashboards.totalBookingOnline : 0,
                                        ).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}
                                        <sup>đ</sup>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminDashBoard;
