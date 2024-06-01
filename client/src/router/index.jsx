import { createBrowserRouter } from 'react-router-dom';
import Home from './../page/Home';
import Layout from './../layout/Layout';
import Login from '../page/Login';

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
        ],
    },
]);
