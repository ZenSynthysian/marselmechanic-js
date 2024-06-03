import { createBrowserRouter } from 'react-router-dom';
import Home from './../page/Home';
import Layout from './../layout/Layout';
import Login from '../page/Login';
import Register from '../page/Register';
import Store from '../page/Store';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: 'login',
                element: <Login />,
            },
            {
                path: 'register',
                element: <Register />,
            },
            {
                path: 'store',
                element: <Store />,
                // children: [
                //     {
                //         path: 'keranjang',
                //         element: <Home />,
                //     },
                // ],
            },
        ],
    },
]);
