import { createBrowserRouter } from 'react-router-dom';
import Home from './../page/Home';
import Layout from './../layout/Layout';
import Login from '../page/Login';
import Register from '../page/Register';
import Store from '../page/Store';
import StoreIndex from '../page/StoreIndex';
import Cart from '../page/Cart';
import CheckOut from '../page/CheckOut';
import SingleCheckOut from '../page/SingleCheckOut';
import History from '../page/History';
import DetailHistory from '../page/DetailHistory';
import About from '../page/About';
import Dashboard from '../page/admin/Dashboard';

// admin
import AdminLayout from '../layout/AdminLayout';

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
                path: 'about',
                element: <About />,
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
                    {
                        path: 'singlecheckout',
                        element: <SingleCheckOut />,
                    },
                    {
                        path: 'history',
                        element: <History />,
                    },
                    {
                        path: 'history/detail',
                        element: <DetailHistory />,
                    },
                ],
            },
        ],
    },
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            {
                path: '/admin',
                element: <Dashboard />,
            },
        ],
    },
]);
