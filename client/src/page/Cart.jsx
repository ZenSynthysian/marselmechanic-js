import WelcomeBanner from '../component/WelcomeBanner';
import ProductBar from '../component/ProductBar';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Cart() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [cart, setCart] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const responseLoggedIn = await axios.get(`${import.meta.env.VITE_API_URL}/rest/api/accounts/isloggedin`, { withCredentials: true });
                if (responseLoggedIn.data.isLoggedIn === false) window.location.replace('/login');
                setIsLoggedIn(responseLoggedIn.data);

                if (responseLoggedIn.data.isLoggedIn) {
                    const data = {
                        user: responseLoggedIn.data.user,
                    };
                    const responseGetAll = await axios.post(`${import.meta.env.VITE_API_URL}/rest/api/cart/account/getall`, data, { withCredentials: true });
                    if (responseGetAll.status === 200 && responseGetAll.data) {
                        setCart(responseGetAll.data);
                    }

                    const responseProducts = await axios.post(`${import.meta.env.VITE_API_URL}/rest/api/cart/account/get/value`, data, { withCredentials: true });
                    if (responseProducts.status === 200 && responseProducts.data) {
                        setProducts(responseProducts.data);
                        setLoading(false);
                    }
                }
            } catch (err) {
                console.log(err.message);
            }
        }

        fetchData();
    }, []);

    if (loading) {
        return (
            <>
                <WelcomeBanner
                    header={'MM'}
                    semiHeader={'Masih Mikir?'}
                    description={
                        <>
                            <p>Cepetan checkout sparepart mu sekarang! Kalo lama lama stoknya keburu habis!</p>
                            <p>Biasanya ada diskon juga lho!</p>
                        </>
                    }
                />
            </>
        );
    } else {
        return (
            <>
                <WelcomeBanner
                    header={'MM'}
                    semiHeader={'Masih Mikir?'}
                    description={
                        <>
                            <p>Cepetan checkout sparepart mu sekarang! Kalo lama lama stoknya keburu habis!</p>
                            <p>Biasanya ada diskon juga lho!</p>
                        </>
                    }
                />
                <div className="border-t-4 border-dotted hover:border-solid">
                    {products.map((product, index) => {
                        return (
                            <ProductBar
                                key={index}
                                nama={product.nama}
                                foto={product.foto}
                                harga={product.harga}
                                id={product.id}
                                list={index + 1}
                                jumlah={cart[index].amount}
                            />
                        );
                    })}
                </div>
            </>
        );
    }
}

export default Cart;
