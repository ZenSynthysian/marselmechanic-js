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
import ManageProduct from '../page/admin/ManageProduct';
import EditProduct from '../page/admin/EditProduct';
import AddProduct from '../page/admin/AddProduct';
import ManageAccount from '../page/admin/ManageAccount';
import EditAccount from '../page/admin/EditAccount';
import AddAccount from '../page/admin/AddAccount';

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
            {
                path: '/admin/products',
                element: <ManageProduct />,
            },
            {
                path: '/admin/products/manage',
                element: <EditProduct />,
            },
            {
                path: '/admin/products/add',
                element: <AddProduct />,
            },
            {
                path: '/admin/accounts',
                element: <ManageAccount />,
            },
            {
                path: '/admin/accounts/manage',
                element: <EditAccount />,
            },
            {
                path: '/admin/accounts/add',
                element: <AddAccount />,
            },
        ],
    },
]);
