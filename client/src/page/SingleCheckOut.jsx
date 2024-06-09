import WelcomeBanner from '../component/WelcomeBanner';
import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function SingleCheckOut() {
    const [loading, setLoading] = useState(true);
    const [totalHarga, setTotalHarga] = useState(0);
    const [metodePembayaran, setMetodePembayaran] = useState('');
    const [userData, setUserData] = useState({});
    const [namaDepan, setNamaDepan] = useState('');
    const [namaBelakang, setNamaBelakang] = useState('');
    const [nomorKartu, setNomorKartu] = useState('');
    const location = useLocation();
    const products = useMemo(() => {
        return location.state?.products || {};
    }, [location.state?.products]);

    useEffect(() => {
        async function fetchData() {
            try {
                const responseLoggedIn = await axios.get(`${import.meta.env.VITE_API_URL}/rest/api/accounts/isloggedin`, { withCredentials: true });
                if (responseLoggedIn.data.isLoggedIn === false) window.location.replace('/login');

                if (responseLoggedIn.data.isLoggedIn) {
                    setUserData(responseLoggedIn.data.user);

                    setLoading(false);
                }
            } catch (err) {
                console.log(err.message);
            }
        }

        fetchData();
    }, [totalHarga]);

    const handleMetodePembayaran = (e) => {
        setMetodePembayaran(e.target.value);
    };

    const handleNomorKartu = (e) => {
        setNomorKartu(e.target.value);
    };

    const handleNamaDepan = (e) => {
        setNamaDepan(e.target.value);
    };

    const handleNamaBelakang = (e) => {
        setNamaBelakang(e.target.value);
    };

    useEffect(() => {
        if (products?.harga && products?.jumlah) {
            setTotalHarga(products.harga * products.jumlah);
        }
    }, [products]);

    const checkout = async (e) => {
        e.preventDefault();
        try {
            const data = {
                user: userData,
                totalHarga: totalHarga,
                metodePembayaran: metodePembayaran,
                nomorKartu: nomorKartu,
                namaDepan: namaDepan,
                namaBelakang: namaBelakang,
                idCart: products.cartId,
                singleProductId: products.id,
            };
            const responseCheckout = await axios.post(`${import.meta.env.VITE_API_URL}/rest/api/cart/account/pay`, data, { withCredentials: true });
            if (responseCheckout.status === 200 && responseCheckout.data) {
                window.location.replace('/');
            }
        } catch (err) {
            console.log(err.message || err);
        }
    };

    if (loading) {
        return (
            <>
                <WelcomeBanner header={'CheckOut'} />
                <div>Loading...</div>
            </>
        );
    }

    return (
        <>
            <WelcomeBanner header={'CheckOut'} />
            <div className="flex justify-center items-center p-10 border-t-4 border-dotted hover:border-solid">
                <div className="border-2 p-10 w-[1000px] flex-row rounded-lg space-y-5">
                    <div className="flex justify-between text-xl">
                        <div className="flex w-[500px] justify-between">
                            <div>No</div>
                            <div className="text-center translate-x-4">Nama</div>
                            <div className="text-center">Jumlah</div>
                        </div>
                        <div>
                            <div className="-translate-x-5">Harga</div>
                        </div>
                    </div>
                    <div className="space-y-1">
                        {products && (
                            <div className="flex justify-between text-lg">
                                <div className="flex w-[530px] justify-between">
                                    <div className="truncate border-r-2 border-l-2 w-10 pl-1">1</div>
                                    <div className="truncate border-r-2 border-l-2 w-80 text-center pl-3">{products.nama}</div>
                                    <div className="truncate border-r-2 border-l-2 w-32 text-center">{products.jumlah}</div>
                                </div>
                                <div>
                                    <div className="truncate border-r-2 w-64 text-end pr-3">Rp. {products.harga * products.jumlah}</div>
                                </div>
                            </div>
                        )}
                        <hr />
                        <div className="flex flex-row justify-between text-xl p-3">
                            <div>Total:</div>
                            <div>Rp. {totalHarga}</div>
                        </div>
                    </div>
                    <div>
                        <form
                            className="flex flex-row justify-between"
                            onSubmit={checkout}>
                            <div className="border-2 w-[40%]">
                                <div className="p-2 text-center text-xl bg-deepdark text-lightyellow">Metode Pembayaran</div>
                                <div className="delay-100 ease-in-out flex flex-col justify-center items-center p-3 gap-3">
                                    <label
                                        className={`${
                                            metodePembayaran === 'kartukredit' ? 'bg-deepdark text-lightyellow' : 'bg-lightwhite'
                                        } flex flex-row items-center h-10 border-2 rounded-lg justify-between w-full pl-3 pr-8`}>
                                        <input
                                            type="radio"
                                            id="kartukredit"
                                            name="metode"
                                            value={'kartukredit'}
                                            onClick={handleMetodePembayaran}
                                            required
                                            className="transition-all border w-3 h-3 rounded-full checked:bg-lightyellow appearance-none"
                                        />
                                        <div>Kartu Kredit</div>
                                    </label>
                                    <label
                                        className={`${
                                            metodePembayaran === 'kartudebit' ? 'bg-deepdark text-lightyellow' : 'bg-lightwhite'
                                        } flex flex-row items-center  h-10 border-2 rounded-lg justify-between w-full pl-3 pr-8`}>
                                        <input
                                            type="radio"
                                            name="metode"
                                            id="kartudebit"
                                            value={'kartudebit'}
                                            onClick={handleMetodePembayaran}
                                            required
                                            className="transition-all border w-3 h-3 rounded-full checked:bg-lightyellow appearance-none"
                                        />
                                        <div>Kartu Debit</div>
                                    </label>
                                    <label
                                        className={`${
                                            metodePembayaran === 'PayPal' ? 'bg-deepdark text-lightyellow' : 'bg-lightwhite'
                                        } flex flex-row items-center  h-10 border-2 rounded-lg justify-between w-full pl-3 pr-8`}>
                                        {' '}
                                        <input
                                            type="radio"
                                            name="metode"
                                            id="PayPal"
                                            value={'PayPal'}
                                            onClick={handleMetodePembayaran}
                                            required
                                            className="transition-all border w-3 h-3 rounded-full checked:bg-lightyellow appearance-none"
                                        />
                                        <div>PayPal</div>
                                    </label>
                                </div>
                            </div>
                            <div className="w-[50%]">
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Masukkan Nomor Kartu"
                                        onChange={handleNomorKartu}
                                        className="w-full placeholder:text-center outline-none border-b-2 focus:border-lightyellow"
                                        required
                                    />
                                    <div className="grid grid-cols-2 gap-2 pb-8">
                                        <input
                                            type="text"
                                            placeholder="00/00"
                                            className="outline-none border-b-2 focus:border-lightyellow"
                                            required
                                        />
                                        <input
                                            type="text"
                                            placeholder="CVV"
                                            className="outline-none border-b-2 focus:border-lightyellow"
                                            required
                                        />
                                        <input
                                            type="text"
                                            placeholder="Nama Depan"
                                            onChange={handleNamaDepan}
                                            className="outline-none border-b-2 focus:border-lightyellow"
                                            required
                                        />
                                        <input
                                            type="text"
                                            placeholder="Nama Belakang"
                                            onChange={handleNamaBelakang}
                                            className="outline-none border-b-2 focus:border-lightyellow"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="flex justify-center items-center cursor-grab transition-all delay-75 ease-in-out border-solid border-2 rounded-lg p-2 w-full hover:bg-deepdark hover:text-lightyellow">
                                        CheckOut
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SingleCheckOut;
