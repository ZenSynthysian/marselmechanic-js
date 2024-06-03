import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Outlet } from 'react-router-dom';

function Store() {
    const [status, setStatus] = useState({});
    const [products, setProducts] = useState([]);

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

    const getProducts = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/rest/api/products`, { withCredentials: true });
            if (!response.status === 200) {
                console.error('gagal mengambil data');
            } else {
                setProducts(response.data);
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getStatus();
        getProducts();
    }, []);

    return (
        <>
            <div className="transition-all ease-in-out delay-75 text-[#FFD369] bg-[#222831] h-10 border-b-4 border-[#393E46] flex justify-between items-center ">
                <div className="pl-32 text-[20px]">
                    <span>{`${status.user}`}</span>
                </div>
                <div className="flex pr-32 text-xl gap-10 ">
                    <Link to={'/store/keranjang'}>
                        <span className=" hover:text-[#FEEFAD]">Keranjang</span>
                    </Link>
                    <Link to={'/store'}>
                        <span className=" hover:text-[#FEEFAD]">Store</span>
                    </Link>
                    <Link to={'/about'}>
                        <span className=" hover:text-[#FEEFAD]">About</span>
                    </Link>
                    {!status.isLoggedIn ? (
                        <>
                            <Link to={'/login'}>
                                <span className=" hover:text-[#FEEFAD]">SignIn</span>
                            </Link>
                            <Link to={'/register'}>
                                <span className=" hover:text-[#FEEFAD]">SignUp</span>
                            </Link>
                        </>
                    ) : (
                        <button>
                            <span className=" hover:text-[#FEEFAD]">SignOut</span>
                        </button>
                    )}
                </div>
            </div>{' '}
            <Outlet />
        </>
    );
}
export default Store;
