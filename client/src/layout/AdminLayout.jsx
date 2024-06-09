import { Outlet } from 'react-router-dom';
import AdminNavbar from '../component/AdminNavbar';

function AdminLayout() {
    return (
        <>
            <div className="flex flex-col min-h-screen scrollbar-thin">
                <AdminNavbar />
                <Outlet />
            </div>
        </>
    );
}

export default AdminLayout;
