import axios from 'axios';
import { useEffect, useState } from 'react';

function Login() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [resData, setResData] = useState(null);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const getStatus = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/rest/api/accounts/isLoggedIn`, { withCredentials: true });
            if (!response.status === 200) {
                console.error('gagal mengambil data');
            } else {
                setIsLoggedIn(response.data.user);
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getStatus();
    }, []);

    isLoggedIn ? window.location.replace('/') : false;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const sendData = async () => {
                const data = {
                    username: formData.username,
                    password: formData.password,
                };

                const response = await axios.post(`${import.meta.env.VITE_API_URL}/rest/api/accounts/login`, data, { withCredentials: true });
                if (!response.status === 200) {
                    console.error('gagal mengirim data');
                } else {
                    // setResData(response.data.message);
                    window.location.replace('/');
                }
                console.log(response.status);
            };

            sendData();
        } catch (err) {
            if (err) {
                setResData(err.response.data.error);
            }
        }
    }

    return (
        <>
            <div className="flex flex-col gap-20 p-20 grow">
                <div className="text-5xl text-center">
                    <span>SignIn</span>
                </div>
                <div className="flex justify-center items-center">
                    <div className="group transition-all delay-100 ease-in-out w-[42rem] p-3 hover:bg-deepdark hover:border-solid rounded-es-xl rounded-tr-xl flex flex-col border-deepdark border-4 border-dotted gap-10">
                        <div>
                            <form
                                onSubmit={handleSubmit}
                                className="flex flex-col justify-center items-center gap-3 pt-9 pb-9">
                                {resData == 'registrasi sukses' ? <span className="text-green">Login sukses</span> : <span className="text-red">{resData}</span>}
                                <input
                                    onChange={(e) => handleChange(e)}
                                    className="p-2 rounded-full border-2 w-96 hover:border-lightyellow placeholder:text-center text-center  outline-none"
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    autoComplete="username"
                                    placeholder="Username"
                                    required
                                />
                                <input
                                    onChange={(e) => handleChange(e)}
                                    className="p-2 rounded-full border-2 w-96 hover:border-lightyellow placeholder:text-center text-center  outline-none"
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    autoComplete="current-password"
                                    placeholder="Password"
                                    required
                                />
                                <input
                                    className="p-2 rounded-full border-2 w-96 group-hover:border-lightyellow group-last:hover:text-deepdark group-hover:text-lightyellow hover:bg-lightyellow  focus:bg-transparent focus:outline-none placeholder:text-center text-center  outline-none"
                                    type="submit"
                                    value={'SignIn'}
                                />
                            </form>
                            <div className="pb-3">
                                <p className="text-center text-lightdark group-hover:text-lightwhite">
                                    Belum Punya Akun?{' '}
                                    <a
                                        href="/register"
                                        className="hover:text-lightyellow">
                                        SignUp
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
