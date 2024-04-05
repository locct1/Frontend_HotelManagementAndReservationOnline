import classNames from 'classnames/bind';
import styles from './SideBar.module.scss';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { infoHostSelector } from '~/redux/selectors';
import './SideBar.scss';
function SideBar({ sidebarToggle, toggled }) {
    const classNameFunc = ({ isActive }) => (isActive ? 'nav-link host-active' : 'nav-link');
    const cx = classNames.bind(styles);
    const infoHost = useSelector(infoHostSelector);
    return (
        <ul className={`navbar-nav bg-gradient-dark sidebar sidebar-dark accordion ${toggled}`} id="accordionSidebar">
            {/* Sidebar - Brand */}
            <NavLink className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-laugh-wink" />
                </div>
                <div className="sidebar-brand-text mx-3">
                    {' '}
                    {infoHost !== null ? <>{infoHost.hotel.name}</> : <>Chưa đăng nhập</>}
                </div>
            </NavLink>
            {/* Divider */}
            <hr className="sidebar-divider my-0" />
            {/* Nav Item - Dashboard */}
            <li className="nav-item">
                <NavLink to="/host-dashboard" className="nav-link">
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
                <NavLink className={classNameFunc} to="/host-edit-info">
                    <i className="fas fa-fw fa-chart-area" />
                    <span>Cập nhật thông tin khách </span>
                    <span className="ml-4">khách sạn</span>
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className={classNameFunc} to="/host-facility-list">
                    <i className="fas fa-fw fa-chart-area" />
                    <span>Quản lý tiện nghi</span>
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/host-category-list" className={classNameFunc}>
                    <i className="fas fa-fw fa-chart-area" />
                    <span>Quản lý loại dịch vụ</span>
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/host-product-list" className={classNameFunc}>
                    <i className="fas fa-fw fa-chart-area" />
                    <span>Quản lý dịch vụ</span>
                </NavLink>
            </li>

            <li className="nav-item">
                <NavLink to="/host-roomtype-list" className={classNameFunc}>
                    <i className="fas fa-fw fa-chart-area" />
                    <span>Quản lý loại phòng</span>
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/host-room-list" className={classNameFunc}>
                    <i className="fas fa-fw fa-chart-area" />
                    <span>Quản lý phòng</span>
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/host-manage-booking-online" className={classNameFunc}>
                    <i className="fas fa-fw fa-chart-area" />
                    <span>Quản lý đặt phòng Online</span>
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/host-reservation-list" className={classNameFunc}>
                    <i className="fas fa-fw fa-chart-area" />
                    <span className="">Quản lý đặt phòng tại</span> <span className="ml-4">khách sạn</span>
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/host-image-list" className={classNameFunc}>
                    <i className="fas fa-fw fa-chart-area" />
                    <span>Thư viện ảnh</span>
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

export default SideBar;
