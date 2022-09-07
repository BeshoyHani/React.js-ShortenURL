
import { useEffect } from 'react';
import { logout } from '../../config/shorten_URL_API';
import { useNavigate } from 'react-router-dom';
export default function Logout() {

    const navigate = useNavigate();

    useEffect(() => {
        async function _logout() {
            try {
                await logout();
                localStorage.setItem("isAuthenticated", "true");
                navigate('../', { replace: true });
            } catch (error) {
                console.log(error.message)
            }
        }
        _logout();
    });
}