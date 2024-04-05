import { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isAuthenticatedSelector } from '~/redux/selectors';
const useAuthHost = () => {
    const isAuthenticated = useSelector(isAuthenticatedSelector);
    if (isAuthenticated) {
        return true;
    }
    return false;
};

const ProtectedRoutes = () => {
    const location = useLocation();
    const isAuth = useAuthHost();
    return isAuth ? <Outlet /> : <Navigate to="/host-login" state={{ from: location }} replace />;
};

export default ProtectedRoutes;
