import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';
function Recommendation() {
    const [products, setProducts] = useState([]);

    async function getProducts() {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/rest/api/spareparts/get/9`, { withCredentials: true });
        setProducts(response.data);
    }

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div className="hover:border-solid border-t-4 border-dotted flex-grow p-8">
            <div className="text-center text-2xl">Our Product Recommendation</div>
            <div className="flex justify-center pt-8">
                <div className="columns-4 w-[1000px]">
                    {products.map((product) => {
                        return (
                            <Card
                                id={product.id}
                                nama={product.nama}
                                foto={product.foto}
                                harga={product.harga}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Recommendation;
