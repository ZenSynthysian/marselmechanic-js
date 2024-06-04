import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

export function Card({ nama, harga, foto, id }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [elementStatus, setElementStatus] = useState(false);

    useEffect(() => {
        async function checkLoggedIn() {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/rest/api/accounts/isloggedin`, { withCredentials: true });
            setIsLoggedIn(response.data);
        }
        checkLoggedIn();
    }, []);

    function handlePlus() {
        const element = document.getElementById(id);
        if (element) {
            let elementValue = parseInt(element.innerText);
            elementValue += 1;
            element.innerHTML = elementValue;
        }
    }

    function handleMinus() {
        const element = document.getElementById(id);
        if (element) {
            let elementValue = parseInt(element.innerText);
            if (elementValue > 0) {
                elementValue -= 1;
                element.innerHTML = elementValue;
            }
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        // get sparepart id
        const element = document.getElementById(id);
        const amount = element.innerText;

        try {
            const sendData = async () => {
                const data = {
                    idSparepart: id,
                    user: isLoggedIn.user,
                    amount: amount,
                };

                const response = await axios.post(`${import.meta.env.VITE_API_URL}/rest/api/cart/insert`, data, { withCredentials: true });
                if (!response.status === 200) {
                    console.error('gagal mengirim data');
                }
            };

            await sendData();
        } catch (err) {
            console.log(err.message || err);
        }
    }

    const handleClass = useMemo(() => {
        const element = document.getElementById(id);
        const elementValue = parseInt(element.innerText);
        const elementStatus = elementValue > 0;
        return elementStatus ? 'border-4 border-lightyellow' : 'border-2';
    }, [id]);

    // handleClass();
    return (
        <div className={`${borderClass} rounded-xl flex flex-col mb-3 w-52`}>
            <div className="bg-deepdark text-lightwhite h-16 text-center justify-center items-center flex">
                <span className="truncate pl-3">{nama}</span>
            </div>
            <div className="flex justify-center bg-white">
                <img
                    src={foto}
                    alt={nama}
                    width={'150px'}
                />
            </div>
            <div className="text-center bg-lightdark text-lightwhite">
                <p>{harga}</p>
            </div>
            {!isLoggedIn.isLoggedIn ? (
                <div className="bg-deepdark h-16 flex flex-row gap-3 items-center p-2">
                    <Link
                        to={'/login'}
                        className="text-center bg-lightyellow w-full text-deepdark p-1 rounded-full">
                        SignIn
                    </Link>
                </div>
            ) : (
                <div className="bg-deepdark h-16 flex flex-row gap-3 items-center p-2">
                    <button className="bg-lightyellow text-deepdark p-1 rounded-full">Buy Now</button>
                    <button
                        className="text-lightwhite transition-all delay-100 ease-in-out p-1 rounded-lg border-lightyellow hover:border"
                        onClick={handleSubmit}>
                        Cart
                    </button>
                    <button
                        className="text-lightwhite hover:text-lightyellow"
                        onClick={handleMinus}>
                        -
                    </button>
                    <span
                        className="text-lightwhite"
                        id={id}>
                        0
                    </span>
                    <button
                        className="text-lightwhite hover:text-lightyellow"
                        onClick={handlePlus}>
                        +
                    </button>
                </div>
            )}
        </div>
    );
}
Card.propTypes = {
    nama: PropTypes.string,
    harga: PropTypes.number,
    foto: PropTypes.string,
    id: PropTypes.number,
};
