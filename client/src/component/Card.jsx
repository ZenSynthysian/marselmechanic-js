import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { formatCurrency } from '../helper/formatCurrency';

function Card({ nama, harga, harga2, foto, id, width, lists = [], note }) {
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
                        idPlan: id,
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
            if (amount < 1) {
                alert('Jumlah tidak boleh kurang dari 1');
                return; // Exit the function early to stop the rest of the code from running
            }
            const sendData = async () => {
                const data = {
                    idPlan: id,
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
        return elementValue > 0 ? 'border-4 border-deepdark border-dotted' : 'border-2';
    }

    if (loading) {
        return (
            <div className={`${handleClass()} blur-sm rounded-xl flex flex-col mb-3 w-[${width}]`}>
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
                    <p>
                        {formatCurrency(harga)} {harga2 ? `- ${formatCurrency(harga2)}` : ''}
                    </p>
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
        <div className={`${handleClass()} rounded-xl flex h-full flex-col mb-3 w-[${width}]`}>
            <div className="bg-deepdark text-lightwhite h-16 text-center justify-center items-center flex">
                <span className="truncate pl-3">{nama}</span>
            </div>
            <div className="flex justify-center items-center p-3">
                <img
                    src={foto}
                    alt={nama}
                    width={'150px'}
                />
            </div>
            <div className="flex flex-col justify-center items-center text-center pt-4 h-full">
                {lists.map((list, index) => (
                    <span
                        className="border-dotted border-b-2 border-deepdark text-deepdark hover:text-lightyellow hover:bg-deepdark w-full transition-all delay-10 ease-in-out p-4"
                        key={index}>
                        {list}
                    </span>
                ))}
            </div>
            {note ? (
                <div className="flex justify-center items-center text-center">
                    <div className="w-full bg-lightdark text-lightyellow border-b-2 border-lightwhite p-2">
                        <span className="animate-pulse">{note}</span>
                    </div>
                </div>
            ) : (
                ''
            )}
            <div className="text-center bg-lightdark text-lightwhite">
                <p>
                    {formatCurrency(harga)} {harga2 ? `- ${formatCurrency(harga2)}` : ''}
                </p>
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
    harga2: PropTypes.number,
    foto: PropTypes.string,
    id: PropTypes.string,
    width: PropTypes.string,
    note: PropTypes.string,
    lists: PropTypes.array,
};

export default Card;
