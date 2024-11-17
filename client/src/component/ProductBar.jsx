import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

function ProductBar({ nama, harga, foto, id, list, jumlah, cartId, title, id_chat_room }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [elementValue, setElementValue] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/rest/api/accounts/isloggedin`, { withCredentials: true });
                if (response.status === 200) {
                    setIsLoggedIn(response.data);
                }
            } catch (err) {
                console.log(err.message);
            }
        };
        fetchData();
        setElementValue(jumlah);
    }, [jumlah]);

    async function plusHandle() {
        const newValue = elementValue + 1;
        setElementValue(newValue);

        const data = {
            idPlan: id,
            amount: newValue,
            user: isLoggedIn.user,
        };

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/rest/api/cart/insert`, data, { withCredentials: true });
            if (response.status !== 200) {
                console.error('Gagal menambahkan ke keranjang');
            }
        } catch (err) {
            console.error(err.message);
        }
    }

    function minusHandle() {
        if (elementValue === 0) return;

        const newValue = elementValue - 1;
        setElementValue(newValue);

        const data = {
            idPlan: id,
            amount: newValue,
            user: isLoggedIn.user,
        };
        console.log(data);

        try {
            axios.post(`${import.meta.env.VITE_API_URL}/rest/api/cart/insert`, data, { withCredentials: true }).then((response) => {
                if (response.status !== 200) {
                    console.error('Gagal mengurangi dari keranjang');
                }
            });
        } catch (err) {
            console.error(err.message);
        }
    }

    function deleteHandle(id) {
        const data = {
            id: id,
        };

        confirm('Apakah anda yakin ingin menghapus?');

        axios
            .post(`${import.meta.env.VITE_API_URL}/rest/api/cart/delete`, data, { withCredentials: true })
            .then((response) => {
                if (response.status !== 200) {
                    console.error('Gagal mengurangi dari keranjang');
                }
            })
            .catch((err) => {
                console.error(err.message);
            });

        window.location.reload();
    }

    return (
        <div>
            <div className="flex-grow p-8">
                <div className="flex justify-center items-center">
                    <div className="flex justify-center gap-5 gap-x-40 w-[1200px]">
                        <div className="delay-100 ease-out hover:ease-in group flex border-2 w-[1200px] h-24">
                            <div className="transition-all group-hover:bg-lightyellow text-2xl group-hover:text-deepdark w-24 bg-deepdark text-lightyellow items-center justify-center flex">
                                {list}
                            </div>
                            <div className="transition-all border-r-2 w-[200px] text-2xl border-lightyellow items-center justify-center flex overflow-hidden">
                                {foto ? (
                                    <img
                                        src={foto}
                                        alt={nama}
                                        className="w-[100px]"
                                    />
                                ) : (
                                    ''
                                )}
                                {title ? title : ''}
                            </div>
                            <div className="transition-all border-r-2 w-[800px] text-xl pl-4 items-center flex truncate">{nama}</div>
                            <div className="group/d1 transition-all w-[100px] text-2xl hover:w-[1500px] max-w-[1500px] items-center flex flex-row overflow-hidden">
                                <div className="transition-all h-full group-hover:bg-deepdark group-hover:text-lightyellow w-[100px] flex justify-center items-center">::</div>
                                <div className="transition-all h-full group-hover/d1:p-3 group-hover:bg-deepdark group-hover:text-lightyellow w-0 border-l-2 group-hover/d1:w-[100px] flex justify-center items-center invisible group-hover/d1:visible">
                                    <button
                                        onClick={() => deleteHandle(cartId)}
                                        type="button"
                                        className="p-3">
                                        Delete
                                    </button>
                                </div>
                                <div className="transition-all h-full group-hover/d1:p-3 group-hover:bg-deepdark group-hover:text-lightyellow w-0 border-l-2 group-hover/d1:w-[300px] flex justify-center items-center invisible group-hover/d1:visible">
                                    {harga ? harga : 'Waiting..'}
                                </div>
                                <div className="group-hover/d1:p-3 gap-10 transition-all h-full group-hover:bg-lightyellow w-0 group-hover:text-deepdark group-hover/d1:w-[200px] flex flex-row justify-center items-center invisible group-hover/d1:visible">
                                    <button
                                        className="bg-deepdark text-lightyellow w-[30px] rounded-xl hover:text-lightwhite"
                                        onClick={minusHandle}>
                                        {'<'}
                                    </button>
                                    <span
                                        className="text-deepdark text-center w-[30px]"
                                        id={id}>
                                        {elementValue}
                                    </span>
                                    <button
                                        className="bg-deepdark text-lightyellow w-[30px] rounded-xl hover:text-lightwhite"
                                        onClick={plusHandle}>
                                        {'>'}
                                    </button>
                                </div>
                                <div className="group-hover/d1:p-3 gap-10 transition-all h-full group-hover:bg-deepdark w-0 group-hover:text-lightyellow border-r-2 border-r-lightyellow group-hover/d1:w-[200px] flex flex-row justify-center items-center invisible group-hover/d1:visible">
                                    <Link to={`/chat/${id_chat_room}`}>
                                        <button
                                            type="button"
                                            className="h-full">
                                            Chat
                                        </button>
                                    </Link>
                                </div>
                                <Link
                                    to={harga ? `/store/singlecheckout` : ''}
                                    state={{ products: { id, nama, harga, foto, jumlah, cartId } }}
                                    onClick={
                                        harga
                                            ? ''
                                            : () => {
                                                  alert('Harga Belum Ditentukan');
                                              }
                                    }
                                    className={`transition-all h-full group-hover:bg-deepdark hover:text-lightwhite text-lightyellow group-hover/d1:w-full w-0 flex justify-center items-center invisible group-hover/d1:visible`}>
                                    <button>{'=>'}</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

ProductBar.propTypes = {
    nama: PropTypes.string,
    harga: PropTypes.number,
    foto: PropTypes.string,
    id: PropTypes.any,
    title: PropTypes.string,
    list: PropTypes.any,
    jumlah: PropTypes.number,
    cartId: PropTypes.any,
};

export default ProductBar;
