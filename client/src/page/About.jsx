import WelcomeBanner from '../component/WelcomeBanner';

function About() {
    return (
        <>
            <WelcomeBanner
                header={'Apa Itu MM?'}
                description={
                    <>
                        <p>Marsel Mechanic Inc</p>
                        <p>Kami adalah sebuah perusahaan yang berdedikasi untuk</p>
                        <p>mempermudah masyarakan, untuk mengakses sparepart motor Honda</p>
                    </>
                }
            />
            <div className="grow p-12 pl-10 pr-10 border-t-4 border-dotted hover:border-solid">
                <div className="flex flex-col gap-10">
                    <div>
                        <p className="text-center text-5xl">Tentang Kami</p>
                    </div>
                    <div>
                        <p className="text-xl pl-32 pr-32">
                            Marsel Mechanic adalah perusahaan yang menjual suku cadang Honda dengan kualitas yang sangat baik. Kami bangga menawarkan produk-produk unggulan yang dapat diandalkan untuk
                            memenuhi kebutuhan kendaraan Anda. Selain itu, kemudahan akses menjadi prioritas kami, sehingga pelanggan dapat dengan mudah menemukan dan mendapatkan sparepart yang
                            dibutuhkan. Dengan pelayanan terbaik dan produk berkualitas, Marsel Mechanic siap menjadi solusi terpercaya bagi para pemilik kendaraan Honda.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default About;
