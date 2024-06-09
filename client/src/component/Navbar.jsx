import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(null);
    useEffect(() => {
        const url = `${import.meta.env.VITE_API_URL}/rest/api/accounts/isloggedin`;
        const checkLoggedIn = async () => {
            try {
                const response = await axios.get(url, { withCredentials: true });
                setIsLoggedIn(response.data.isLoggedIn);
                setIsAdmin(response.data.role);
                console.log(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        checkLoggedIn();
    }, []);

    const logout = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/rest/api/accounts/logout`, { withCredentials: true });
            if (!response.status === 200) {
                console.error('gagal logout');
            } else {
                setIsLoggedIn(false);
                window.location.replace('/');
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <div className="transition-all ease-in-out delay-75 hover:text-[#FFD369] hover:bg-[#222831] h-20 border-b-4 border-[#393E46] flex justify-between items-center ">
                <div className="pl-32 text-xl">
                    <span className="text-5xl">{'MM>'}</span>
                    <span>Marsel Mechanic</span>
                </div>
                <div className="flex pr-32 text-xl gap-10 ">
                    <Link to={'/'}>
                        <span className=" hover:text-[#FEEFAD]">Home</span>
                    </Link>
                    <Link to={'/store'}>
                        <span className=" hover:text-[#FEEFAD]">Store</span>
                    </Link>
                    <Link to={'/about'}>
                        <span className=" hover:text-[#FEEFAD]">About</span>
                    </Link>
                    {isAdmin === 'admin' ? (
                        <Link to={'/admin'}>
                            <span className=" hover:text-[#FEEFAD]">Dashboard</span>
                        </Link>
                    ) : null}
                    {!isLoggedIn ? (
                        <>
                            <Link to={'/login'}>
                                <span className=" hover:text-[#FEEFAD]">SignIn</span>
                            </Link>
                            <Link to={'/register'}>
                                <span className=" hover:text-[#FEEFAD]">SignUp</span>
                            </Link>
                        </>
                    ) : (
                        <button onClick={logout}>
                            <span className=" hover:text-[#FEEFAD]">SignOut</span>
                        </button>
                    )}
                </div>
            </div>
        </>
    );
}

export default Navbar;
