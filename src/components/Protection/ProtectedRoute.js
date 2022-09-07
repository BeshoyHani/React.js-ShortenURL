import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({child}) => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    return child;
};

export const ProtectRegisterationRoute = ({ path, child }) => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated === true) {
        return <Navigate to={'../'} replace />;
    }
    return child;
};

