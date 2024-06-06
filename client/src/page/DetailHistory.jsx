import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function DetailHistory() {
    const [products, setProducts] = useState([]);
    const { state } = useLocation();
    let id = state?.id;
    let harga = state?.harga;

    useEffect(() => {
        async function fetchData() {
            try {
                const resLoginData = await axios.get(`${import.meta.env.VITE_API_URL}/rest/api/accounts/isloggedin`, { withCredentials: true });
                if (resLoginData.data.isLoggedIn === false) window.location.replace('/login');
                if (resLoginData.data.isLoggedIn) {
                    const data = {
                        id: JSON.parse(id),
                    };

                    const resData = await axios.post(`${import.meta.env.VITE_API_URL}/rest/api/spareparts/get/some`, data, { withCredentials: true });
                    if (resData.status === 200) {
                        setProducts(resData?.data);
                    }
                }
            } catch (err) {
                console.log(err.message || err);
            }
        }
        if (id) fetchData();
    }, [id]);

    return (
        <>
            <div className="grow flex justify-center items-center p-10 border-t-4 border-dotted hover:border-solid">
                <div className="border-2 p-10 w-[1000px] flex-row rounded-lg space-y-5">
                    <div className="flex justify-between text-xl">
                        <div className="flex w-[500px] justify-between">
                            <div>No</div>
                            <div className="text-center translate-x-4">Nama</div>
                        </div>
                        <div>
                            <div className="-translate-x-5">Harga</div>
                        </div>
                    </div>
                    <div className="space-y-1 ">
                        {products.map((product, index) => {
                            return (
                                <div
                                    key={index}
                                    className="flex justify-between text-lg">
                                    <div className="flex w-[100%] justify-between">
                                        <div className="truncate border-r-2 border-l-2 w-10 pl-1">{index + 1}</div>
                                        <div className="truncate border-r-2 border-l-2 w-[580px] text-center pl-3">{product.nama} </div>
                                    </div>
                                    <div>
                                        <div className="truncate border-r-2 w-64 text-end pr-3">Rp. {product.harga}</div>
                                    </div>
                                </div>
                            );
                        })}
                        <hr />
                        <div className="flex flex-row justify-between text-xl p-3 ">
                            <div>Total: </div>
                            <div>Rp. {harga}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DetailHistory;
