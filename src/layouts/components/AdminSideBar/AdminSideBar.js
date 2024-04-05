import classNames from 'classnames/bind';
import styles from './AdminSideBar.module.scss';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { infoAdminSelector } from '~/redux/selectors';
import './AdminSideBar.scss';
function AdminSideBar({ sidebarToggle, toggled }) {
    const cx = classNames.bind(styles);
    const infoAdmin = useSelector(infoAdminSelector);
    const classNameFunc = ({ isActive }) => (isActive ? 'nav-link admin-active' : 'nav-link');
    return (
        <ul className={`navbar-nav bg-primary-custom sidebar sidebar-dark accordion ${toggled}`} id="accordionSidebar">
            {/* Sidebar - Brand */}
            <NavLink className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-laugh-wink" />
                </div>

                <div className="sidebar-brand-text mx-3"> Quản trị viên</div>
            </NavLink>
            {/* Divider */}
            <hr className="sidebar-divider my-0" />
            {/* Nav Item - Dashboard */}
            <li className="nav-item">
                <NavLink to="/admin-dashboard" className="nav-link">
                    <i className="fas fa-fw fa-tachometer-alt"></i>
                    Tổng quan
                </NavLink>
            </li>
            {/* Divider */}
            <hr className="sidebar-divider" />
            {/* Heading */}
            <div className="sidebar-heading">Quản lý</div>
            {/* Nav Item - Pages Collapse Menu */}
            {/* Nav Item - Charts */}
            <li className="nav-item">
                <NavLink to="/admin-hotel-list" className={classNameFunc}>
                    <i className="fas fa-fw fa-chart-area" />
                    <span>Quản lý chủ khách sạn</span>
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/admin-bedtype-list" className={classNameFunc}>
                    <i className="fas fa-fw fa-chart-area" />
                    <span>Quản lý kiểu giường</span>
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/admin-facilitytype-list" className={classNameFunc}>
                    <i className="fas fa-fw fa-chart-area" />
                    <span>Quản lý loại tiện nghi</span>
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/admin-facility-list" className={classNameFunc}>
                    <i className="fas fa-fw fa-chart-area" />
                    <span>Quản lý tiện nghi</span>
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/admin-device-list" className={classNameFunc}>
                    <i className="fas fa-fw fa-chart-area" />
                    <span>Quản lý thiết bị</span>
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/admin-manage-booking-online" className={classNameFunc}>
                    <i className="fas fa-fw fa-chart-area" />
                    <span>Quản lý đặt phòng Online</span>
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/" className={classNameFunc}>
                    <i className="fas fa-fw fa-chart-area" />
                    <span>Website</span>
                </NavLink>
            </li>
            {/* Divider */}
            <hr className="sidebar-divider d-none d-md-block" />
            {/* Sidebar Toggler (Sidebar) */}
            <div className="text-center d-none d-md-inline">
                <button
                    className="rounded-circle border-0"
                    onClick={() => {
                        sidebarToggle();
                    }}
                    id="sidebarToggle"
                />
            </div>
        </ul>
    );
}

export default AdminSideBar;
