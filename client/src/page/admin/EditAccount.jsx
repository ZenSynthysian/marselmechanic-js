import axios from 'axios';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

function EditAccount() {
    const location = useLocation();
    const { account } = location.state;
    const [formData, setFormData] = useState({
        id: account?.id,
        email: account?.email,
        username: account?.username,
        password: account?.password,
        role: account?.role,
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
            const sendData = await axios.patch(`${import.meta.env.VITE_API_URL}/rest/api/accounts/edit`, formData, { withCredentials: true });
            if (!sendData.status === 200) console.log('gagal edit account');
            window.location.replace('/admin/accounts');
        } catch (err) {
            console.log(`err on AddProduct, handleSubmit: ${err.message || err}`);
        }
    }

    return (
        <>
            <div className="flex justify-center items-center grow ">
                <div className="flex flex-col gap-5 w-full justify-center items-center">
                    <span className="text-6xl">Edit Account</span>
                    <div className=" flex bg-deepdark pt-7 pb-7 rounded-xl w-[60rem] justify-center items-center">
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-3 w-[80%] p-3">
                            <input
                                onChange={handleChange}
                                type="email"
                                className="transition-all text-lightyellow duration-75 ease-in-out border-2 hover:border-lightyellow bg-transparent placeholder:text-lightyellow focus:placeholder:text-deepdark placeholder:text-opacity-65 focus:bg-lightyellow focus:text-deepdark outline-none rounded-xl p-3 "
                                placeholder="Email"
                                inputMode="email"
                                name="email"
                                value={formData.email}
                                required
                            />
                            <input
                                onChange={handleChange}
                                type="text"
                                className="appearance-none transition-all text-lightyellow duration-75 ease-in-out border-2 hover:border-lightyellow bg-transparent placeholder:text-lightyellow focus:placeholder:text-deepdark placeholder:text-opacity-65 focus:bg-lightyellow focus:text-deepdark outline-none rounded-xl p-3 "
                                placeholder="username"
                                inputMode="text"
                                name="username"
                                value={formData.username}
                                required
                            />
                            <input
                                onChange={handleChange}
                                type="text"
                                className="transition-all text-lightyellow duration-75 ease-in-out border-2 hover:border-lightyellow bg-transparent placeholder:text-lightyellow focus:placeholder:text-deepdark placeholder:text-opacity-65 focus:bg-lightyellow focus:text-deepdark outline-none rounded-xl p-3 "
                                placeholder="password"
                                inputMode="text"
                                name="password"
                                value={formData.password}
                                required
                            />
                            <select
                                name="role"
                                defaultValue={formData.role}
                                className="appearance-none  transition-all text-lightyellow duration-75 ease-in-out border-2 hover:border-lightyellow bg-transparent placeholder:text-lightyellow focus:placeholder:text-deepdark placeholder:text-opacity-65 focus:bg-lightyellow focus:text-deepdark outline-none rounded-xl p-3">
                                <option
                                    value="user"
                                    key="user">
                                    User
                                </option>
                                <option
                                    value="admin"
                                    key="admin">
                                    Admin
                                </option>
                            </select>
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

export default EditAccount;
