import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ManageAccount() {
    const [accounts, setAccounts] = useState([]);
    useEffect(() => {
        async function fetchData() {
            try {
                const getAccountData = await axios.get(`${import.meta.env.VITE_API_URL}/rest/api/accounts/get`);
                if (!getAccountData.status === 200) console.log('gagal get Accounts');
                setAccounts(getAccountData.data);
            } catch (err) {
                console.log(`err on ManageAccounts, fetchData: ${err.message || err}`);
            }
        }

        fetchData();
    }, [accounts]);

    async function deleteAccount(id) {
        try {
            const data = {
                idAccount: id,
            };
            const deleteAccountData = await axios.post(`${import.meta.env.VITE_API_URL}/rest/api/accounts/delete`, data, { withCredentials: true });
            if (!deleteAccountData.status === 200) console.log('gagal delete Account');
        } catch (err) {
            console.log(`err on ManageAccounts, deleteAccount: ${err.message || err}`);
        }
    }

    return (
        <>
            <div className="p-10 grow flex flex-col justify-center items-center">
                <div className="w-full flex justify-between bg-deepdark text-lightyellow p-3">
                    <span className="p-3">ACCOUNTS MANAGEMENT</span>
                    <Link to={'/admin/accounts/add'}>
                        <button className="transition-all duration-75 ease-in-out hover:bg-lightyellow hover:text-deepdark rounded-full p-3">Add Account</button>
                    </Link>
                </div>
                <table className="table-auto">
                    <thead className="bg-deepdark bg-opacity-80 text-lightyellow">
                        <tr>
                            <td className="border-r-2 border-deepdark p-3 pb-4">ID</td>
                            <td className="border-r-2 border-deepdark p-3 pb-4">EMAIL</td>
                            <td className="border-r-2 border-deepdark p-3 pb-4">USERNAME</td>
                            <td className="border-r-2 border-deepdark p-3 pb-4">PASSWORD</td>
                            <td className="border-r-2 border-deepdark p-3 pb-4">ROLE</td>
                            <td className="border-r-2 border-deepdark p-3 pb-4">STATUS</td>
                            <td className="border-r-2 border-deepdark p-3 pb-4 w-[10%]">TOOLS</td>
                        </tr>
                    </thead>
                    <tbody>
                        {accounts.map((account) => {
                            return (
                                <tr
                                    key={account.id}
                                    className="transition-all duration-75 ease-in-out hover:border-b-4 hover:text-lightyellow hover:bg-deepdark hover:bg-opacity-80 hover:border-lightyellow">
                                    <td className="border-r-2 p-3">{account.id}</td>
                                    <td className="border-r-2 p-3">{account.email}</td>
                                    <td className="border-r-2 p-3">{account.username}</td>
                                    <td className="border-r-2 p-3">{account.password}</td>
                                    <td className="border-r-2 p-3">{account.role}</td>
                                    <td className="border-r-2 p-3">{account.status}</td>
                                    <td className="border-r-2 p-3">
                                        <Link
                                            to={'/admin/accounts/manage'}
                                            state={{ account: { id: account.id, email: account.email, username: account.username, password: account.password, role: account.role } }}>
                                            <button className="transition-all duration-75 ease-in-out p-3 border-l-2 border-lightyellow hover:bg-lightyellow hover:text-deepdark w-[80%]">
                                                MANAGE
                                            </button>
                                        </Link>
                                        <button
                                            onClick={() => deleteAccount(account.id)}
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

export default ManageAccount;
