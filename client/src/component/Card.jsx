import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function Card({ nama, harga, foto, id }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [elementValue, setElementValue] = useState(0);
    const [loading, setLoading] = useState(true);
    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                // First, check if the user is logged in
                const responseLoggedIn = await axios.get(`${import.meta.env.VITE_API_URL}/rest/api/accounts/isloggedin`, { withCredentials: true });
                setIsLoggedIn(responseLoggedIn.data);

                // Then, fetch the initial value if the user is logged in
                if (responseLoggedIn.data.isLoggedIn) {
                    const data = {
                        idSparepart: id,
                        user: responseLoggedIn.data.user,
                    };
                    const responseInitialValue = await axios.post(`${import.meta.env.VITE_API_URL}/rest/api/cart/amount/account/get`, data);
                    // console.log('Response:', responseInitialValue); // Log response here
                    if (responseInitialValue.status === 200 && responseInitialValue.data.amount) {
                        setElementValue(responseInitialValue.data.amount);
                    }
                }
                setLoading(false);
            } catch (err) {
                console.error('Error fetching data:', err);
            }
        }

        fetchData();
    }, [id]);

    function handlePlus() {
        setElementValue((prevValue) => prevValue + 1);
    }

    function handleMinus() {
        if (elementValue === 0) return;
        setElementValue((prevValue) => prevValue - 1);
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
                if (response.status !== 200) {
                    console.error('gagal mengirim data');
                }
            };

            await sendData();
            setIsClicked(true);
            setTimeout(() => {
                setIsClicked(false);
            }, 2000);
        } catch (err) {
            console.log(err.message || err);
        }
    }

    function handleClass() {
        return elementValue > 0 ? 'border-2 border-lightyellow' : 'border-2';
    }

    if (loading) {
        return (
            <div className={`${handleClass()} blur-sm rounded-xl flex flex-col mb-3 w-52`}>
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
                            {elementValue}
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

    return (
        <div className={`${handleClass()} rounded-xl flex flex-col mb-3 w-52`}>
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
                        {isClicked ? 'O' : 'Cart'}
                    </button>
                    <button
                        className="text-lightwhite hover:text-lightyellow"
                        onClick={handleMinus}>
                        -
                    </button>
                    <span
                        className="text-lightwhite"
                        id={id}>
                        {elementValue}
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
    id: PropTypes.string,
};

export default Card;
