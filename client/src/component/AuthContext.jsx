import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [resData, setResData] = useState(null);

    useEffect(() => {
        // Periksa sesi saat komponen dimuat
        axios
            .get(`${import.meta.env.VITE_API_URL}/rest/api/accounts/isloggedin`, { withCredentials: true })
            .then((response) => {
                if (response.data.isLoggedIn) {
                    setUser(response.data.user);
                }
            })
            .catch((error) => {
                console.log(error.message);
            });
    }, []);
};
