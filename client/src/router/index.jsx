import { createBrowserRouter } from 'react-router-dom';
import Home from './../page/Home';
import Layout from './../layout/Layout';
import Login from '../page/Login';
import Register from '../page/Register';
import Store from '../page/Store';
import StoreIndex from '../page/StoreIndex';
import Cart from '../page/Cart';
import CheckOut from '../page/CheckOut';

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
                children: [
                    {
                        path: '/store',
                        element: <StoreIndex />,
                    },
                    {
                        path: 'keranjang',
                        element: <Cart />,
                    },
                    {
                        path: 'checkout',
                        element: <CheckOut />,
                    },
                ],
            },
        ],
    },
]);
