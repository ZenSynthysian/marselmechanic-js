import Navbar from '../component/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../component/Footer';

function Layout() {
    return (
        <>
            <div className="flex flex-col min-h-screen scrollbar-thin">
                <Navbar />
                <Outlet />
                <Footer />
            </div>
        </>
    );
}

export default Layout;
