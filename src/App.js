import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { privateRoutes, publicRoutes, adminPrivateRoutes } from '~/routes';
import DefaultLayout from '~/layouts';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import ProtectedRoutes from './routes/ProtectedRoutes';
import AdminProtectedRoutes from './routes/AdminProtectedRoutes';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { HostLoadUser } from '~/redux/Slices/HostAuthSlice';
import { AdminLoadUser } from '~/redux/Slices/AdminAuthSlice';
import { ClientLoadUser } from '~/redux/Slices/ClientAuthSlice';

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(HostLoadUser());
        dispatch(AdminLoadUser());
        dispatch(ClientLoadUser());
    }, []);
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                        return (
                            <Route
                                exact
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                    {privateRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                        return (
                            <Route element={<ProtectedRoutes />} key={index}>
                                <Route
                                    exact
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            </Route>
                        );
                    })}
                    {adminPrivateRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                        return (
                            <Route element={<AdminProtectedRoutes />} key={index}>
                                <Route
                                    exact
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            </Route>
                        );
                    })}
                </Routes>
                <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
            </div>
        </Router>
    );
}

export default App;
