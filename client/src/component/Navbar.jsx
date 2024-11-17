import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import cartPNG from './../assets/cart.png';

function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(null);
    const [status, setStatus] = useState({});
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
        getStatus();
    }, []);

    const getStatus = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/rest/api/accounts/isLoggedIn`, { withCredentials: true });
            if (!response.status === 200) {
                console.error('gagal mengambil data');
            } else {
                setStatus(response.data);
            }
        } catch (err) {
            console.error(err);
        }
    };

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
                    <span>KONTOL IRENG</span>
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
            {status.isLoggedIn && (
                <div className="transition-all ease-in-out delay-75 text-[#FFD369] bg-[#222831] h-10 border-b-4 border-[#393E46] flex justify-between items-center ">
                    <div className="pl-32 text-[20px]">
                        <span>{`${status.user}`}</span>
                    </div>
                    <div className="flex pr-32 text-xl gap-10 ">
                        <Link to={'/store/history'}>
                            <span>History</span>
                        </Link>
                        <Link to={'/store/keranjang'}>
                            <img
                                src={cartPNG}
                                alt=""
                                width={'25px'}
                            />
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
}

export default Navbar;
