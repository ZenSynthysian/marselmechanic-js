import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';
function Recommendation() {
    const [products, setProducts] = useState([]);

    async function getProducts() {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/rest/api/spareparts/get/9`, { withCredentials: true });
        setProducts(response.data);
    }

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div className="hover:border-solid border-t-4 border-dotted flex-grow p-8">
            <div className="text-center text-2xl">Our Plans</div>
            <div className="flex flex-col gap-3 justify-center items-center pt-8">
                <div className="w-[90vw] bg-lightyellow rounded-lg border-dotted border-4 hover:border-solid p-3">
                    <div className="text-center text-2xl p-4 font-bold">Frontend</div>
                    <div className="grid grid-cols-3 gap-4">
                        <Card
                            key={'frontend-basic'}
                            id={'1'}
                            nama={'Basic'}
                            foto={'frontend-basic.png'}
                            lists={['Desain Responsif', 'UI Sederhana', 'Optimisasi SEO Dasar']}
                            harga={2000000}
                            harga2={4000000}
                            note={'Cocok untuk landing page atau website portofolio dengan beberapa halaman'}
                        />
                        <Card
                            key={'frontend-intermediate'}
                            id={'2'}
                            nama={'Intermediate'}
                            foto={'frontend-basic.png'}
                            lists={['Semua Keuntungan Basic', 'UI/UX Lebih Kompleks', 'Efek Visual', 'Optimisasi Performa', 'Animasi Dasar', 'Optimisasi SEO Lanjut']}
                            harga={4000000}
                            harga2={7000000}
                            note={'Cocok untuk website bisnis kecil yang membutuhkan tampilan lebih interaktif'}
                        />
                        <Card
                            key={'frontend-advanced'}
                            id={'3'}
                            nama={'Advanced'}
                            foto={'frontend-basic.png'}
                            lists={['Semua Keuntungan Basic dan Intermediate', 'Desain Kustom Penuh', 'Efek Animasi Yang Kompleks', 'Integrasi Frontend Dengan API']}
                            harga={7000000}
                            harga2={12000000}
                            note={'Cocok untuk website perusahaan dengan tampilan kustom yang unik dan beberapa interaksi yang kompleks'}
                        />
                    </div>
                    {/* {products.map((product, index) => {
                        return (
                            <Card
                                key={index}
                                id={product.id}
                                nama={product.nama}
                                foto={product.foto}
                                harga={product.harga}
                            />
                        );
                    })} */}
                </div>
                <div className="w-[90vw] bg-lightyellow rounded-lg border-dotted border-4 hover:border-solid p-3">
                    <div className="text-center text-2xl p-4 font-bold">Backend</div>
                    <div className="grid grid-cols-3 gap-4">
                        <Card
                            key={'backend-basic'}
                            id={'4'}
                            nama={'Basic'}
                            foto={'backend-basic.png'}
                            lists={['CRUD Sederhana', 'Database Dasar', 'Autentikasi Dasar']}
                            harga={3000000}
                            harga2={6000000}
                            note={'Cocok untuk aplikasi sederhana seperti sistem absensi atau manajemen inventori kecil'}
                        />
                        <Card
                            key={'backend-intermediate'}
                            id={'5'}
                            nama={'Intermediate'}
                            foto={'backend-basic.png'}
                            lists={['API Lengkap', 'Autentikasi Lebih Aman', 'Manajemen Data Yang Kompleks']}
                            harga={6000000}
                            harga2={10000000}
                            note={'Cocok untuk aplikasi bisnis yang memerlukan database lebih besar atau kompleks'}
                        />
                        <Card
                            key={'backend-advanced'}
                            id={'6'}
                            nama={'Advanced'}
                            foto={'backend-basic.png'}
                            lists={['Sistem Backend Yang Lebih Kompleks', 'Autentikasi Multi-Faktor', 'Optimisasi Performa', 'Integrasi Dengan Pihak Ketiga']}
                            harga={10000000}
                            harga2={20000000}
                            note={'Cocok untuk E-commerce atau aplikasi bisnis besar dengan data yang sensitif dan transaksi real-time'}
                        />
                    </div>
                </div>
                <div className="w-[90vw] bg-lightyellow rounded-lg border-dotted border-4 hover:border-solid p-3">
                    <div className="text-center text-2xl p-4 font-bold">Fullstack</div>
                    <div className="grid grid-cols-3 gap-4">
                        <Card
                            key={'Fullstack-basic'}
                            id={'7'}
                            nama={'Basic'}
                            foto={'Fullstack-basic.png'}
                            lists={['Integrasi Frontend-Backend Sederhana', 'Desain Responsif', 'CMS Dasar']}
                            harga={7000000}
                            harga2={12000000}
                            note={'Cocok untuk website bisnis kecil yang memerlukan frontend dan backend sederhana, seperti blog atau website berita'}
                        />
                        <Card
                            key={'Fullstack-intermediate'}
                            id={'8'}
                            nama={'Intermediate'}
                            foto={'Fullstack-basic.png'}
                            lists={['Desain dan Backend Yang Lebih Kompleks', 'Panel Admin Kustom', 'Fitur Interaktif Lebih Lengkap']}
                            harga={12000000}
                            harga2={25000000}
                            note={'Cocok untuk aplikasi bisnis atau startup yang memerlukan website fungsional dan kustom'}
                        />
                        <Card
                            key={'Fullstack-advanced'}
                            id={'9'}
                            nama={'Advanced'}
                            foto={'Fullstack-basic.png'}
                            lists={['Sistem Fullstack Yang Terintegrasi Penuh', 'Keamanan Tingkat Lanjut', 'Fitur Kustom', 'Dukungan Penuh']}
                            harga={25000000}
                            harga2={50000000}
                            note={'Cocok untuk E-commerce skala besar, aplikasi booking, atau platform bisnis yang memerlukan solusi lengkap dengan banyak fitur'}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Recommendation;
