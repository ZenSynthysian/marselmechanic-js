import Recommendation from '../component/Recommendation';
import WelcomeBanner from '../component/WelcomeBanner';

function Home() {
    return (
        <>
            {/* <Navbar /> */}
            <WelcomeBanner
                header="MM"
                semiHeader={'Marsel Mechanic?'}
                description={
                    <>
                        <p>Selamat datang di Marsel Mechanic.</p>
                        <p>kami menawarkan sparepart motor Honda dengan harga yang sangat terjangkau</p>
                        <p>tidak hanya terjangkau, sparepart motor yang kami jual juga terjamin ORI</p>
                    </>
                }
            />
            <Recommendation />
        </>
    );
}

export default Home;
