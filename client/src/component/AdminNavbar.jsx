import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import dashboardIcon from './../assets/dashboard.svg';
import boxIcon from './../assets/box.svg';
import historyIcon from './../assets/history.svg';
import humanIcon from './../assets/human.svg';
// import bellIcon from './../assets/bell.svg';
// import messageIcon from './../assets/message.svg';
function AdminNavbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [userData, setUserData] = useState([]);
    useEffect(() => {
        async function fetchData() {
            try {
                const isLoggedIn = await axios.get(`${import.meta.env.VITE_API_URL}/rest/api/accounts/isloggedin`, { withCredentials: true });
                if (isLoggedIn.data.isLoggedIn === false) window.location.replace('/login');
                if (isLoggedIn.data.role !== 'admin') window.location.replace('/');

                setUserData(isLoggedIn.data);
            } catch (err) {
                console.log(`err on AdminNavbar, fetchData: ${err.message || err}`);
            }
        }

        fetchData();
    }, [userData]);

    async function logout() {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/rest/api/accounts/logout`, { withCredentials: true });
            if (!response.status === 200) console.log('gagal logout');
        } catch (err) {
            console.log(`err on AdminNavbar, logout: ${err.message || err}`);
        }
    }

    function setOpen(e) {
        e.preventDefault();
        setIsOpen(!isOpen);
    }

    return (
        <>
            <div>
                <div
                    className={`z-50 border-r-4 border-lightyellow transition-all duration-300 ease-in-out fixed h-full flex flex-col backdrop-blur-sm overflow-hidden ${
                        isOpen ? 'visible w-64' : 'invisible w-0'
                    }`}>
                    <div className={`bg-deepdark text-lightyellow h-[150px] flex justify-center items-center`}>
                        <div className="flex justify-center items-center">
                            <div className={`text-6xl duration-0 `}>MM{'>'}</div>
                            <div className={`flex flex-col mt-4`}>
                                <span>{userData.user}</span>
                                <div className="flex justify-center items-center gap-3">
                                    <span className="rounded-full bg-green w-2 h-2" />
                                    <span className="text-green">Online</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-grow text-lightyellow">
                        <Link to={'/admin'}>
                            <button className="transition-all duration-100 ease-in-out p-3 flex items-center gap-4 w-full opacity-90 hover:opacity-100 hover:border-b-4 hover:border-lightyellow bg-deepdark">
                                <img
                                    src={dashboardIcon}
                                    alt="dashboardLogo"
                                    className="w-9"
                                />
                                <span>Dashboard</span>
                            </button>
                        </Link>
                        <Link to={'/admin/products'}>
                            <button className="transition-all duration-100 ease-in-out p-3 flex items-center gap-4 w-full opacity-90 hover:opacity-100 hover:border-b-4 hover:border-lightyellow bg-deepdark">
                                <img
                                    src={boxIcon}
                                    alt="boxIcon"
                                    className="w-9"
                                />
                                <span>manage Product</span>
                            </button>
                        </Link>
                        <button className="transition-all duration-100 ease-in-out p-3 flex items-center gap-4 w-full opacity-90 hover:opacity-100 hover:border-b-4 hover:border-lightyellow bg-deepdark">
                            <img
                                src={humanIcon}
                                alt="humanIcon"
                                className="w-9"
                            />
                            <span>Manage Account</span>
                        </button>
                        <button className="transition-all duration-100 ease-in-out p-3 flex items-center gap-4 w-full opacity-90 hover:opacity-100 hover:border-b-4 hover:border-lightyellow bg-deepdark">
                            <img
                                src={historyIcon}
                                alt="historyIcon"
                                className="w-9"
                            />
                            <span>History</span>
                        </button>
                        <span className="flex bg-deepdark opacity-90 h-full"></span>
                    </div>
                </div>
                <nav className="border-b-4 border-deepdark">
                    <div className={`${isOpen ? 'ml-72' : 'ml-6'} transition-all duration-300 ease-in-out flex justify-between`}>
                        <button
                            onClick={setOpen}
                            className="h-16 w-[5%] flex justify-center items-center text-3xl">
                            =
                        </button>
                        <div className="h-16 flex flex-row justify-center items-center gap-5 pr-12">
                            {/* <button>
                                <img
                                    src={bellIcon}
                                    alt="bellIcon"
                                    className="w-10"
                                />
                            </button>
                            <button>
                                <img
                                    src={messageIcon}
                                    alt="messageIcon"
                                    className="w-8"
                                />
                            </button> */}
                            <button onClick={logout}>
                                <span className="text-xl">Logout</span>
                            </button>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    );
}

export default AdminNavbar;
