import { useEffect, useState } from 'react';
import WelcomeBanner from '../component/WelcomeBanner';
import axios from 'axios';
import { Link } from 'react-router-dom';

function History() {
    const [historyData, setHistoryData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({});

    useEffect(() => {
        async function fetchData() {
            try {
                const resLoginData = await axios.get(`${import.meta.env.VITE_API_URL}/rest/api/accounts/isloggedin`, { withCredentials: true });
                if (resLoginData.data.isLoggedIn === false) window.location.replace('/login');

                if (resLoginData.data.isLoggedIn) {
                    setUser(resLoginData.data.user);
                    let data = {
                        user: resLoginData.data.user,
                    };
                    const resHistoryData = await axios.post(`${import.meta.env.VITE_API_URL}/rest/api/cart/account/history`, data, { withCredentials: true });
                    if (resHistoryData.status === 200 && resHistoryData.data) {
                        setHistoryData(resHistoryData.data);
                    }
                }

                setLoading(false);
            } catch (err) {
                if (err) console.log(err.message || err);
            }
        }

        fetchData();
    }, []);

    return (
        <>
            <WelcomeBanner
                header={'History'}
                description={
                    <>
                        <p>------------------------------------------------</p>
                        <p>_____------------_________----</p>
                        <p>__________________________________________________________________</p>
                    </>
                }
            />
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="flex justify-center items-center p-10 border-t-4 border-dotted hover:border-solid">
                    <div className="border-2 p-10 w-[1000px] flex-row rounded-lg space-y-5">
                        <div className="flex justify-between text-xl">
                            <div className="flex justify-between w-full">
                                <div>No</div>
                                <div className="text-center -translate-x-9">Products</div>
                                <div className="text-center -translate-x-12">Harga</div>
                                <div className="-translate-x-5">Tanggal</div>
                                <div className="-translate-x-5">Tools</div>
                            </div>
                        </div>
                        <div className="space-y-1">
                            {historyData.map((data, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="flex justify-between text-lg">
                                        <div className="flex  justify-between w-full">
                                            <div className="truncate border-r-2 border-l-2 w-10 pl-1">{index + 1}</div>
                                            <div className="truncate border-r-2 border-l-2 w-80 text-center pl-3">{data.products} </div>
                                            <div className="truncate border-r-2 border-l-2 w-32 text-center ">{data.harga}</div>
                                            <div className="truncate border-r-2 w-64 text-end pr-3">{data.tanggal}</div>
                                            <Link
                                                to={'/store/history/detail'}
                                                state={{ id: data.products, harga: data.harga }}>
                                                <button className="transition-all delay-75 ease-in-out truncate text-center border-2 border-dotted p-1 h-10 hover:border-solid hover:border-lightyellow hover:bg-deepdark hover:text-lightyellow">
                                                    Check
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default History;
