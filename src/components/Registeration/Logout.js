import { logout } from '../../config/shorten_URL_API';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
export default function Logout({ setIsAuth }) {

    const navigate = useNavigate();
    // async function _logout() {
    //     try {
    //         await logout();
    //         localStorage.setItem("isAuthenticated", false);
    //         localStorage.removeItem("acess_token");
    //         setIsAuth(false);
    //         navigate('../', { replace: true });
    //     } catch (error) {
    //         console.log(error.message)
    //     }
    // }
    // _logout();

    useEffect(() => {
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("acess_token");
        localStorage.removeItem('user_info');
        setIsAuth(false);
        navigate('../', { replace: true });
    })
}