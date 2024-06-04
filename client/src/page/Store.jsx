import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Outlet } from 'react-router-dom';
import cartPNG from './../assets/cart.png';

function Store() {
    const [status, setStatus] = useState({});

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

    useEffect(() => {
        getStatus();
    }, []);

    return (
        <>
            {status.isLoggedIn && (
                <div className="transition-all ease-in-out delay-75 text-[#FFD369] bg-[#222831] h-10 border-b-4 border-[#393E46] flex justify-between items-center ">
                    <div className="pl-32 text-[20px]">
                        <span>{`${status.user}`}</span>
                    </div>
                    <div className="flex pr-32 text-xl gap-10 ">
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
            <Outlet />
        </>
    );
}
export default Store;
