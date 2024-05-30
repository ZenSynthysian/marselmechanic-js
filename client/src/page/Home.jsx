import Navbar from './../component/Navbar';

function Home() {
    return (
        <div>
            <Navbar />
            <div className="bg-lightwhite">
                <div className="pl-3 pr-3">
                    <div className="flex justify-between items-center">
                        <div className="flex flex-col md:pl-32 ">
                            <span className="text-8xl text-center">MM</span>
                            <hr />
                            <span className="text-5xl">Marsel Mechanic</span>
                        </div>
                        <div className="flex flex-col 2xl:pr-32 text-xl">
                            <p>Selamat datang di Marsel Mechanic.</p>
                            <p>kami menawarkan sparepart motor dengan harga yang sangat terjangkau</p>
                            <p>tidak hanya terjangkau, sparepart motor yang kami jual juga terjamin ORI</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
