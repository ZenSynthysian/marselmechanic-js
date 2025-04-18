import axios from 'axios';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

function EditProduct() {
    const location = useLocation();
    const { product } = location.state;
    const [formData, setFormData] = useState({
        id: product?.id,
        nama: product?.nama,
        harga: product?.harga,
        foto: product?.foto,
    });

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const sendData = await axios.post(`${import.meta.env.VITE_API_URL}/rest/api/spareparts/edit/`, formData, { withCredentials: true });
            if (!sendData.status === 200) console.log('gagal edit product');
            window.location.replace('/admin/products');
        } catch (err) {
            console.log(`err on AddProduct, handleSubmit: ${err.message || err}`);
        }
    }

    console.log(formData);
    // console.log(product);

    return (
        <>
            <div className="flex justify-center items-center grow ">
                <div className="flex flex-col gap-5 w-full justify-center items-center">
                    <span className="text-6xl">Add New Product</span>
                    <div className=" flex bg-deepdark pt-7 pb-7 rounded-xl w-[60rem] justify-center items-center">
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-3 w-[80%] p-3">
                            <input
                                onChange={handleChange}
                                type="text"
                                className="transition-all text-lightyellow duration-75 ease-in-out border-2 hover:border-lightyellow bg-transparent placeholder:text-lightyellow focus:placeholder:text-deepdark placeholder:text-opacity-65 focus:bg-lightyellow focus:text-deepdark outline-none rounded-xl p-3 "
                                placeholder="Nama Sparepart"
                                inputMode="text"
                                name="nama"
                                value={formData.nama}
                                required
                            />
                            <input
                                onChange={handleChange}
                                type="number"
                                className="appearance-none transition-all text-lightyellow duration-75 ease-in-out border-2 hover:border-lightyellow bg-transparent placeholder:text-lightyellow focus:placeholder:text-deepdark placeholder:text-opacity-65 focus:bg-lightyellow focus:text-deepdark outline-none rounded-xl p-3 "
                                placeholder="Harga Sparepart"
                                inputMode="numeric"
                                name="harga"
                                value={formData.harga}
                                required
                            />
                            <input
                                onChange={handleChange}
                                type="text"
                                className="transition-all text-lightyellow duration-75 ease-in-out border-2 hover:border-lightyellow bg-transparent placeholder:text-lightyellow focus:placeholder:text-deepdark placeholder:text-opacity-65 focus:bg-lightyellow focus:text-deepdark outline-none rounded-xl p-3 "
                                placeholder="Foto Sparepart (gunakan url)"
                                inputMode="url"
                                name="foto"
                                value={formData.foto}
                                required
                            />
                            <input
                                type="submit"
                                className="transition-all duration-75 ease-in-out border-2 text-lightyellow hover:text-deepdark hover:border-lightyellow hover:bg-lightyellow bg-transparen rounded-xl p-3"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditProduct;
