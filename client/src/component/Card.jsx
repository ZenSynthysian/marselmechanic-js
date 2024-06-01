import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function Card({ nama, harga, foto }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        async function checkLoggedIn() {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/rest/api/accounts/isloggedin`);
            setIsLoggedIn(response.data.isLoggedIn);
        }
        checkLoggedIn();
    }, []);

    return (
        <div className="border-2 rounded-xl flex flex-col mb-3 w-52">
            <div className="bg-deepdark text-lightwhite h-16 text-center justify-center items-center flex">
                <span className="truncate pl-3">{nama}</span>
            </div>
            <div className="flex justify-center">
                <img
                    src={foto}
                    alt={nama}
                    width={'150px'}
                />
            </div>
            <div className="text-center bg-lightdark text-lightwhite">
                <p>{harga}</p>
            </div>
            {!isLoggedIn ? (
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
                    <button className="text-lightwhite transition-all delay-100 ease-in-out p-1 rounded-lg border-lightyellow hover:border">Cart</button>
                    <button className="text-lightwhite hover:text-lightyellow">-</button>
                    <span className="text-lightwhite">0</span>
                    <button className="text-lightwhite hover:text-lightyellow">+</button>
                </div>
            )}
        </div>
    );
}

Card.propTypes = {
    nama: PropTypes.string,
    harga: PropTypes.number,
    foto: PropTypes.string,
};

export default Card;
