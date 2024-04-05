import React from 'react';
import { useEffect, useState } from 'react';
import { getAllDashBoards } from '~/services/hoteldashboard.service';
import { ToastContainer, toast } from 'react-toastify';
const HostDashBoard = () => {
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
                {/* Earnings (Monthly) Card Example */}
                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-success shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                        Tổng số loại sản phẩm
                                    </div>

                                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                                        {dashboards.amountOfCategory ? dashboards.amountOfCategory : 0} loại sản phẩm
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
                                        Tổng số sản phẩm
                                    </div>

                                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                                        {dashboards.amountOfProduct ? dashboards.amountOfProduct : 0} sản phẩm
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Pending Requests Card Example */}
                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-dark shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-dark text-uppercase mb-1">
                                        Tổng số loại phòng
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                                        {dashboards.amountOfRoomType ? dashboards.amountOfRoomType : 0} loại phòng
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
                                        Tổng số phòng
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                                        {dashboards.amountOfRoom ? dashboards.amountOfRoom : 0} phòng
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
                                        {dashboards.amountOfBookingOnline ? dashboards.amountOfBookingOnline : 0} đơn
                                        đặt phòng Online
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-primary shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                        Tổng số đơn đặt phòng tại khách sạn
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                                        {dashboards.amountOfReservation ? dashboards.amountOfReservation : 0} đơn đặt
                                        phòng
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
                                        Tổng số khách hàng
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                                        {dashboards.amountOfClientOffline ? dashboards.amountOfClientOffline : 0} khách
                                        hàng
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-primary shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                        Tổng doanh thu đặt phòng
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                                        {String(dashboards.totalReservation ? dashboards.totalReservation : 0).replace(
                                            /(\d)(?=(\d\d\d)+(?!\d))/g,
                                            '$1,',
                                        )}
                                        <sup>đ</sup>
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
                                        Tổng doanh thu sản phẩm - dịch vụ
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                                        {String(dashboards.totalService ? dashboards.totalService : 0).replace(
                                            /(\d)(?=(\d\d\d)+(?!\d))/g,
                                            '$1,',
                                        )}
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

export default HostDashBoard;
