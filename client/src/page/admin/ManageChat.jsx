import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ManageChat() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        try {
            axios.get(`${import.meta.env.VITE_API_URL}/rest/api/chats/geteach`).then((response) => {
                setMessages(response.data);
            });
        } catch (error) {
            console.error(error);
        }
    }, []);

    return (
        <>
            <div className="p-10 grow flex flex-col justify-center items-center">
                <div className="w-full flex justify-between bg-deepdark text-lightyellow p-3">
                    <span className="p-3">CHATROOM MANAGEMENT</span>
                    <Link to={'/admin/accounts/add'}>
                        <button className="transition-all duration-75 ease-in-out hover:bg-lightyellow hover:text-deepdark rounded-full p-3">Add Account</button>
                    </Link>
                </div>
                <table className="table-auto">
                    <thead className="bg-deepdark bg-opacity-80 text-lightyellow">
                        <tr>
                            <td className="border-r-2 border-deepdark p-3 pb-4">ID CHATROOM</td>
                            <td className="border-r-2 border-deepdark p-3 pb-4">PENGIRIM</td>
                            <td className="border-r-2 border-deepdark p-3 pb-4">CLASS</td>
                            <td className="border-r-2 border-deepdark p-3 pb-4">TIER</td>
                            <td className="border-r-2 border-deepdark p-3 pb-4 w-[10%]">TOOLS</td>
                        </tr>
                    </thead>
                    <tbody>
                        {messages.map((message) => {
                            return (
                                <tr
                                    key={message.id}
                                    className="transition-all duration-75 ease-in-out hover:border-b-4 hover:text-lightyellow hover:bg-deepdark hover:bg-opacity-80 hover:border-lightyellow">
                                    <td className="border-r-2 p-3">{message.id_chat_room}</td>
                                    <td className="border-r-2 p-3">{message.username}</td>
                                    <td className="border-r-2 p-3">{message.class}</td>
                                    <td className="border-r-2 p-3">{message.tier}</td>
                                    <td className="border-r-2 p-3">
                                        <Link
                                            to={'/admin/chat/open/' + message.id_chat_room}
                                            state={{ message: { id: message.id, sender_id: message.sender_id, id_chat_room: message.id_chat_room } }}>
                                            <button className="transition-all duration-75 ease-in-out p-3 border-l-2 border-lightyellow hover:bg-lightyellow hover:text-deepdark w-[80%]">OPEN</button>
                                        </Link>
                                        <Link
                                            to={'/admin/chat/manage'}
                                            state={{ message: { id_chat_room: message.id_chat_room } }}>
                                            <button className="transition-all duration-75 ease-in-out p-3 border-l-2 border-lightyellow hover:bg-lightyellow hover:text-deepdark w-[80%]">
                                                MANAGE
                                            </button>
                                        </Link>
                                        <button
                                            onClick={() => message(message.id)}
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

export default ManageChat;
