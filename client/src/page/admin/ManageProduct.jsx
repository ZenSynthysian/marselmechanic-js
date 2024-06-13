import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ManageProduct() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        async function fetchData() {
            try {
                const getProductsData = await axios.get(`${import.meta.env.VITE_API_URL}/rest/api/spareparts/get`);
                if (!getProductsData.status === 200) console.log('gagal get products');
                setProducts(getProductsData.data);
            } catch (err) {
                console.log(`err on ManageProducts, fetchData: ${err.message || err}`);
            }
        }

        fetchData();
    }, [products]);

    async function deleteProduct(id) {
        try {
            const data = {
                idSparepart: id,
            };
            const deleteProductData = await axios.post(`${import.meta.env.VITE_API_URL}/rest/api/spareparts/delete`, data, { withCredentials: true });
            if (!deleteProductData.status === 200) console.log('gagal delete product');
        } catch (err) {
            console.log(`err on ManageProducts, deleteProduct: ${err.message || err}`);
        }
    }

    return (
        <>
            <div className="p-10 grow flex flex-col justify-center items-center">
                <div className="w-full flex justify-between bg-deepdark text-lightyellow p-3">
                    <span className="p-3">PRODUCTS MANAGEMENT</span>
                    <Link to={'/admin/products/add'}>
                        <button className="transition-all duration-75 ease-in-out hover:bg-lightyellow hover:text-deepdark rounded-full p-3">Add Product</button>
                    </Link>
                </div>
                <table className="table-auto">
                    <thead className="bg-deepdark bg-opacity-80 text-lightyellow">
                        <tr>
                            <td className="border-r-2 border-deepdark p-3 pb-4">ID</td>
                            <td className="border-r-2 border-deepdark p-3 pb-4">NAMA</td>
                            <td className="border-r-2 border-deepdark p-3 pb-4">HARGA</td>
                            <td className="border-r-2 border-deepdark p-3 pb-4">FOTO</td>
                            <td className="border-r-2 border-deepdark p-3 pb-4 w-[10%]">TOOLS</td>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => {
                            return (
                                <tr
                                    key={product.id}
                                    className="transition-all duration-75 ease-in-out hover:border-b-4 hover:text-lightyellow hover:bg-deepdark hover:bg-opacity-80 hover:border-lightyellow">
                                    <td className="border-r-2 p-3">{product.id}</td>
                                    <td className="border-r-2 p-3">{product.nama}</td>
                                    <td className="border-r-2 p-3">{product.harga}</td>
                                    <td className="border-r-2 p-3">{product.foto}</td>
                                    <td className="border-r-2 p-3">
                                        <Link
                                            to={'/admin/products/manage'}
                                            state={{ product: { id: product.id, nama: product.nama, harga: product.harga, foto: product.foto } }}>
                                            <button className="transition-all duration-75 ease-in-out p-3 border-l-2 border-lightyellow hover:bg-lightyellow hover:text-deepdark w-[80%]">
                                                MANAGE
                                            </button>
                                        </Link>
                                        <button
                                            onClick={() => deleteProduct(product.id)}
                                            className="transition-all duration-75 ease-in-out p-3 border-l-2 border-lightyellow hover:bg-lightyellow hover:text-deepdark w-[80%]">
                                            DELETE
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default ManageProduct;
