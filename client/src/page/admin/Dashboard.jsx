import axios from 'axios';
import { useEffect, useState } from 'react';
import cartBlackIcon from './../../assets/cart-black.svg';
import humanBlackIcon from './../../assets/humanBlack.svg';

function Dashboard() {
    const [history, setHistory] = useState([]);
    const [countHistory, setCountHistory] = useState([]);
    const [onlineData, setOnlineData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await axios.get(`${import.meta.env.VITE_API_URL}/rest/api/cart/history/get/10`);
                if (data.data) setHistory(data.data);

                const fullHistoryData = await axios.get(`${import.meta.env.VITE_API_URL}/rest/api/cart/history/count/get`);
                if (!fullHistoryData.status === 200) console.log('gagal get history');
                setCountHistory(fullHistoryData.data[0].count);

                const getOnlineData = await axios.get(`${import.meta.env.VITE_API_URL}/rest/api/accounts/get/online`);
                if (!getOnlineData.status === 200) console.log('gagal get online');
                setOnlineData(getOnlineData.data[0].count);
            } catch (err) {
                console.log(`err on dashboard, fetchData: ${err.message || err}`);
            }
        }

        fetchData();
    }, [onlineData, countHistory, history]);
    return (
        <>
            <div className="p-10 flex flex-col gap-8">
                <div className="flex justify-between">
                    <div className="w-[50%] border-2 border-deepdark p-6 flex flex-col">
                        <div className="text-3xl text-center">Product Sold</div>
                        <div className="flex justify-center items-center">
                            <img
                                src={cartBlackIcon}
                                alt="cart icon"
                                className="w-40"
                            />
                        </div>
                        <div className="flex justify-center items-center text-4xl">{countHistory}</div>
                    </div>
                    <div className="w-[50%] border-2 border-deepdark p-6 flex flex-col">
                        <div className="text-3xl text-center">Online</div>
                        <div className="flex justify-center items-center">
                            <img
                                src={humanBlackIcon}
                                alt="cart icon"
                                className="w-40"
                            />
                        </div>
                        <div className="flex justify-center items-center text-4xl">{onlineData}</div>
                    </div>
                </div>
                <div className="border-2 border-deepdark w-full">
                    <div className="flex flex-col gap-5 bg-lightwhite">
                        <div className="p-3 text-2xl bg-deepdark text-lightyellow">History</div>
                        <div className="">
                            <table className="table-auto w-full">
                                <thead>
                                    <tr className="">
                                        <th className="border-r-2">ID</th>
                                        <th className="border-r-2">ID ACCOUNT</th>
                                        <th className="border-r-2">PRODUCTS</th>
                                        <th className="border-r-2">TOTAL</th>
                                        <th className="border-r-2">METODE</th>
                                        <th className="border-r-2">NOMOR KARTU</th>
                                        <th className="border-r-2">NAMA DEPAN</th>
                                        <th className="border-r-2">NAMA BELAKANG</th>
                                        <th className="">TANGGAL</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {history.map((item) => {
                                        return (
                                            <tr
                                                key={item.id}
                                                className="text-center">
                                                <td className="border-r-2">{item.id}</td>
                                                <td className="border-r-2">{item.id_account}</td>
                                                <td className="border-r-2">{item.products}</td>
                                                <td className="border-r-2">Rp. {item.harga}</td>
                                                <td className="border-r-2">{item.metode}</td>
                                                <td className="border-r-2">{item.nomor_kartu}</td>
                                                <td className="border-r-2">{item.nama_depan}</td>
                                                <td className="border-r-2">{item.nama_belakang}</td>
                                                <td>{item.tanggal}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
