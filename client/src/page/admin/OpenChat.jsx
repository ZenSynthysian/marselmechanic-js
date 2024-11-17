import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

function OpenChat() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState('');
    const [receiverName, setReceiverName] = useState('');
    const { id_chat_room } = useParams();
    const [chatData, setChatData] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const chatContainerRef = useRef(null);
    const socketRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            const responseLoggedIn = await axios.get(`${import.meta.env.VITE_API_URL}/rest/api/accounts/isloggedin`, { withCredentials: true });
            if (responseLoggedIn.data.isLoggedIn === false) window.location.replace('/login');
            setIsLoggedIn(responseLoggedIn.data);
        };

        const getChatData = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/rest/api/chats/get/${id_chat_room}`, { withCredentials: true });
                setChatData(res.data);
                setReceiverName(res.data[0].username);
            } catch (err) {
                console.log(err.message || err);
            }
        };

        fetchData();
        getChatData();
    }, [id_chat_room]);

    useEffect(() => {
        if (isLoggedIn && isLoggedIn.user) {
            const fetchUserId = async () => {
                try {
                    const response = await axios.post(`${import.meta.env.VITE_API_URL}/rest/api/accounts/getID`, { nama: isLoggedIn.user }, { withCredentials: true });
                    if (response.status === 200 && response.data) {
                        setUserId(response.data[0].id);
                    }
                } catch (err) {
                    console.log(err.message || err);
                }
            };
            fetchUserId();
        }
    }, [isLoggedIn]);

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:3001'); // Connect to WebSocket server

        socketRef.current = socket;

        socket.onopen = () => {
            console.log('Connected to WebSocket server');
        };

        // Handle incoming messages from the WebSocket
        socket.onmessage = (event) => {
            console.log(event);
            const newMessage = JSON.parse(event.data);
            setChatData((prevChatData) => [...prevChatData, newMessage]);
        };

        // Clean up WebSocket on component unmount
        return () => {
            socket.close();
        };
    }, []);

    function handleSubmit(e) {
        e.preventDefault();

        if (inputValue.trim() === '') return;

        try {
            axios
                .post(
                    `${import.meta.env.VITE_API_URL}/rest/api/chats/add`,
                    { message: inputValue, receiver_id: receiverName, id_chat_room: id_chat_room, username_user: isLoggedIn.user },
                    { withCredentials: true }
                )
                .then((res) => {
                    console.log(res.data);
                });
        } catch (err) {
            console.log(err.message || err);
        }

        // Create a message object
        const message = {
            sender_id: userId,
            message: inputValue,
            chatRoomId: id_chat_room,
            receiverName: receiverName,
            username: isLoggedIn.user,
        };

        // Send the message through the WebSocket server
        if (socketRef.current) {
            socketRef.current.send(JSON.stringify(message)); // Send the message to the WebSocket server
            setInputValue(''); // Clear the input field
        }

        // axios
        //     .get(`${import.meta.env.VITE_API_URL}/rest/api/chats/get/${id_chat_room}`, { withCredentials: true })
        //     .then((res) => {
        //         setChatData(res.data); // Update the chat data
        //         console.log(res.data);
        //     })
        //     .catch((err) => {
        //         console.log(err.message || err);
        //     });
    }

    if (isLoggedIn) {
        return (
            <>
                <div className="flex flex-grow">
                    <div className="flex justify-center items-center w-full">
                        <div className="flex flex-col gap-3 bg-deepdark border-4 border-lightyellow w-[80%] h-[80%] rounded-lg text-lightyellow p-4">
                            <div className="text-center">
                                Room Id: <span className="font-bold">{id_chat_room}</span>
                            </div>
                            <div
                                className="flex flex-col gap-3 h-[85vh] w-full overflow-auto"
                                ref={chatContainerRef}>
                                {chatData.map((chat, index) =>
                                    chat.sender_id == userId ? (
                                        <div
                                            className="flex flex-col justify-end"
                                            key={index}>
                                            <div className="flex justify-end">{isLoggedIn.user}</div>
                                            <div className="flex justify-end">
                                                <div className="flex justify-end w-fit max-w-[70%] bg-lightyellow text-deepdark p-1 rounded-lg">
                                                    <span>{chat.message}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div
                                            className="flex flex-col"
                                            key={index}>
                                            <div>{chat.username}</div>
                                            <div className="w-fit max-w-[70%] bg-lightyellow text-deepdark p-1 rounded-lg">
                                                <span>{chat.message}</span>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                            <form
                                onSubmit={handleSubmit}
                                className="flex gap-3 justify-center items-center w-full h-[5%]">
                                <input
                                    className="bg-lightyellow h-full w-full text-deepdark p-3 rounded-full"
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                />
                                <input
                                    className="border-lightyellow border-2 rounded-full w-10 h-10 cursor-grab"
                                    type="submit"
                                    value={'>'}
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default OpenChat;
