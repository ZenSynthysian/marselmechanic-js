import axios from 'axios';
import { useEffect, useState } from 'react';
import Card from '../component/Card';

function StoreIndex() {
    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/rest/api/spareparts/get`, { withCredentials: true });
            if (response.status !== 200) {
                console.error('gagal mengambil data');
            } else {
                setProducts(response.data);
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getProducts();
    }, []); // Empty dependency array ensures this effect runs only once, when the component mounts

    return (
        <>
            <div className="flex-grow p-8 bg-lightwhite">
                <div className="flex justify-center items-center">
                    <div className="grid grid-cols-4 gap-5 gap-x-40 w-[1000px]">
                        {products.map((product, index) => {
                            return (
                                <Card
                                    key={index}
                                    nama={product.nama}
                                    harga={product.harga}
                                    foto={product.foto}
                                    id={product.id}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}

export default StoreIndex;
