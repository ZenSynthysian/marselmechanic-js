-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 15, 2024 at 12:43 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `marsel_mechanic`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `id` int(11) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` text NOT NULL,
  `role` enum('user','admin') NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `username` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`id`, `email`, `password`, `role`, `status`, `username`) VALUES
(1, 'admin@mail.com', 'admin', 'admin', 0, 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `id` int(11) NOT NULL,
  `amount` int(30) NOT NULL,
  `id_account` varchar(30) NOT NULL,
  `id_sparepart` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `history`
--

CREATE TABLE `history` (
  `id` int(11) NOT NULL,
  `harga` int(30) NOT NULL,
  `id_account` varchar(30) NOT NULL,
  `metode` varchar(30) NOT NULL,
  `nama_belakang` varchar(30) NOT NULL,
  `nama_depan` varchar(30) NOT NULL,
  `nomor_kartu` int(30) NOT NULL,
  `products` longtext NOT NULL,
  `tanggal` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sparepart`
--

CREATE TABLE `sparepart` (
  `id` varchar(50) NOT NULL,
  `nama` varchar(200) NOT NULL,
  `harga` int(30) NOT NULL,
  `foto` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sparepart`
--

INSERT INTO `sparepart` (`id`, `nama`, `harga`, `foto`) VALUES
('1', 'Jalu Stang (Weight A Handle) – PCX 150 K97 & PCX Hybrid', 25500, 'https://www.hondacengkareng.com/wp-content/uploads/2019/02/53102K97T00-GAMBAR.jpg'),
('2', 'Karet Body Case Grommet – BeAT CB150 Verza CS1 CBR 150, New CBR 250', 1500, 'https://www.hondacengkareng.com/wp-content/uploads/2017/12/Case-Grommet-83551300000-300x300.jpg'),
('3', 'Oil Seal ( Seal Crankshaft Kiri ) 20.8X52X6X7.5 – BeAT eSP, Scoopy eSP, Vario 110 eSP', 6500, 'https://www.hondacengkareng.com/wp-content/uploads/2017/07/Oil-Seal-20.8X52X6X7.5-91202K50T01-300x300.jpg'),
('4', 'Karet Dudukan Stang – New CB150R StreetFire K15G, New CB150R Streetfire K15M, CB150 Verza & CFR 150L', 2500, 'https://www.hondacengkareng.com/wp-content/uploads/2016/07/53133K18900-300x300.jpg'),
('5', 'Jalu Stang (End Steering Handle) – New CB150R StreetFire K15G & New CB150R Streetfire K15M', 20000, 'https://www.hondacengkareng.com/wp-content/uploads/2016/07/jalu-stang-end-steering-handle-53105KRC900-300x300.jpg'),
('6', 'Piece Slide – BeAT Karbu, BeAT FI, BeAT Sporty eSP & Vario 110 eSP', 9500, 'https://www.hondacengkareng.com/wp-content/uploads/2018/01/Piece-Slide-22011GCC770-300x300.jpg'),
('7', 'Seal Valve Stem (Seal Klep) – BeAT FI, BeAT POP eSP, BeAT Sporty eSP, Scoopy FI, Supra X 125 FI, Vario 125 eSP, Vario 150 eSP & CRF 150L', 6000, 'https://www.hondacengkareng.com/wp-content/uploads/2018/01/Seal-VLV-Stem-12209GB4682-300x300.jpg'),
('8', 'Screw Tapping 4×12 – New CB150R K15, New CB150R K15M, Scoopy Vario 125', 1000, 'https://www.hondacengkareng.com/wp-content/uploads/2018/03/Screw-Tapping-4x12-9390324380-300x300.jpg'),
('9', 'Screw Pan 6×10 – New CBR 150R K45G & New CB150R Streetfire K15M', 2000, 'https://www.hondacengkareng.com/wp-content/uploads/2018/03/Screw-Pan-6x10-90132KPPT00-300x300.jpg'),
('10', 'Rubber Clutch Dumper – BeAT PCX, Scoopy Vario 150', 4500, 'https://www.hondacengkareng.com/wp-content/uploads/2017/12/Rubber-Clutch-Dumper-22804148000-300x300.jpg'),
('11', 'Spring Clutch (Per Kopling) – BeAT , Scoopy FI, Spacy Vario 110 eSP', 5500, 'https://www.hondacengkareng.com/wp-content/uploads/2017/12/Spring-Clutch-22401KVY900-300x300.jpg'),
('12', 'Hook Luggage – Kait Bagasi', 8000, 'https://www.hondacengkareng.com/wp-content/uploads/2017/07/81132GAH000YV-Image-300x300.jpg'),
('13', 'Karet (Rubber Starter Pinion) – BeAT FI, Spacy Karbu, Spacy FI, Vario 110 Karbu, Vario 110 eSP', 1500, 'https://www.hondacengkareng.com/wp-content/uploads/2019/10/11344GW3980-300x300.jpg'),
('14', 'Face Comp Movable Drive (Rumah Roler) – BeAT eSP (K81), BeAT Sporty eSP, BeAT POP eSP, Vario 110 eSP, New Scoopy eSP (K16) & Scoopy eSP (K93)', 73000, 'https://www.hondacengkareng.com/wp-content/uploads/2017/12/Face-Comp-Movable-Drive-22110K44V00-300x300.jpg'),
('15', 'Busi (Spark Plug CPR9EA9 (NGK)) – Vario 150 eSP K59J & Vario 125 eSP K60R', 23000, 'https://www.hondacengkareng.com/wp-content/uploads/2020/03/Spark-Plug-CPR9EA9-NGK-31926KRM841-300x300.jpg'),
('16', 'Spring Brake Lever Return – BeAT FI, BeAT POP eSP, BeAT Sporty eSP, Vario 125 eSP, Vario 150 eSP & Scoopy eSP (K93)', 4500, 'https://www.hondacengkareng.com/wp-content/uploads/2018/01/Spring-Brake-Lever-Return-53199KVG910-300x300.jpg'),
('17', 'Cover R P Step Arm Outer – PCX 150 K97', 12500, 'https://www.hondacengkareng.com/wp-content/uploads/2018/07/Cover-R-P-Step-Arm-Outer-50732K97T00ZA-300x300.jpg'),
('18', 'Baut Jalu Stang 6×45 – PCX, PCX Hybrid, Vario 125 eSP, Vario 150 eSP', 2000, 'https://www.hondacengkareng.com/wp-content/uploads/2019/01/90191KWB600-300x300.png'),
('19', 'Plate P Step Click – Vario 150 eSP K59J', 2500, 'https://www.hondacengkareng.com/wp-content/uploads/2019/03/50718K59A70-300x300.png'),
('20', 'Van Belt (Belt Drive) – BeAT eSP, BeAT POP eSP & Vario 110 eSP', 100000, 'Van Belt (Belt Drive) – BeAT eSP, BeAT POP eSP & Vario 110 eSP'),
('21', 'Tutup Saringan Udara (Cover Sub Assy Air Cleaner) – Vario 125 FI, Vario 125 eSP, Vario 150 eSP KZR', 49000, 'https://www.hondacengkareng.com/wp-content/uploads/2018/08/17245KZR600.image_.jpg'),
('22', 'Oil Seal  ( Seal Crankshaft Kiri ) BeAT Karburator & Vario 110 Karburator', 8700, 'https://www.hondacengkareng.com/wp-content/uploads/2016/06/91202KVB901-300x300.jpg'),
('23', 'Piece Slide – New PCX, Vario 125 FI & Vario 150 eSP', 9500, 'https://www.hondacengkareng.com/wp-content/uploads/2017/12/Piece-Slide-22132KWN900-300x300.jpg'),
('24', 'Kampas Rem Tromol – Brake Shoe KZL – BeAT, Scoopy, Spacy, Vario', 55000, 'https://www.hondacengkareng.com/wp-content/uploads/2016/04/BRAKE-SHOE-300x300.jpg'),
('25', 'Stang Stir (Pipe Strg Handle) – New CB150R StreetFire K15G', 85000, 'https://www.hondacengkareng.com/wp-content/uploads/2016/07/stang-stir-pipe-strg-handle-53100k15920za-300x300.jpg'),
('26', 'Cover Assy Reserve Tank – Vario 125 eSP & Vario 150 eSP', 21000, 'https://www.hondacengkareng.com/wp-content/uploads/2016/10/cover-assy-reserve-tank-8010EK59A10-300x300.jpg'),
('27', 'Cover Reserve Tank – Vario 125 eSP K60R, Vario 150 eSP New K59J', 13000, 'https://www.hondacengkareng.com/wp-content/uploads/2018/08/COVERRESERVE-TANK-80102K59A10-300x300.jpg'),
('28', 'Oil Seal 20 X 32 X 6 ( Seal As Shaft Drive ) – BeAT FI, Spacy, Spacy FI, Vario 110 eSP, Vario 110 Karbu & New Scoopy eSP (K16)', 8500, 'https://www.hondacengkareng.com/wp-content/uploads/2017/12/Oil-Seal-20-X-32-X-6-91202KJ9003-300x300.jpg'),
('29', 'Face Comp, Movable Drive (Rumah Roler) – BeAT FI, BeAT eSP (K25), Spacy FI, Vario 110 eSP & New Scoopy eSP (K16)', 79000, 'https://www.hondacengkareng.com/wp-content/uploads/2017/12/Face-Comp-Movable-Drive-22110GFM960-300x300.jpg'),
('30', 'Rubber Link Stopper (50) – Vario 125 FI', 6500, 'https://www.hondacengkareng.com/wp-content/uploads/2017/12/50352KZR600-1-300x300.jpg'),
('31', 'Arm L Pillion Step – New VArio 150 eSP (K59J)', 39000, 'https://www.hondacengkareng.com/wp-content/uploads/2018/09/50730K59A70-300x300.jpg'),
('32', 'Oil Seal 29 X 44 X 7 Nok ( Seal Roda Belakang ) – BeAT eSP, BeAT POP eSP, BeAT Sporty eSP, Vario 110 eSP, New Scoopy eSP (K16) & Scoopy eSP (K93)', 4500, 'https://www.hondacengkareng.com/wp-content/uploads/2017/12/Oil-Seal-29-X-44-X-7-Nok-91204K50T01-300x300.jpg'),
('33', 'Fender Assy Rear Inner – Vario 125 eSP & Vario 150 eSP', 47000, 'https://www.hondacengkareng.com/wp-content/uploads/2016/10/fender-assy-rr-inner-8010DK59A10-300x300.jpg'),
('34', 'Spark Plug MR9C-9N (Busi) – BeAT Sporty eSP, BeAT POP eSP,Vario 110 eSP, CBR 150R, Supra GTR 150, New CB150R Streetfire K15M & New CB150R Streetfire K15G', 43500, 'https://www.hondacengkareng.com/wp-content/uploads/2018/09/BUSI-MR9C-9N-NGK-31919K25601-gambar-300x300.jpg'),
('35', 'Gasket, Water Pump – Sonic 150R, Supra GTR 150, New CB150R StreetFire K15G, New CB150R StreetFire K15M & New CBR 150R K45G', 4500, 'https://www.hondacengkareng.com/wp-content/uploads/2018/05/Gasket-Water-Pump-19226K56N00-300x300.jpg'),
('36', 'Tahanan Lumpur (Guard Splash RR) – PCX 150 K97 & PCX Hybrid', 25000, 'https://www.hondacengkareng.com/wp-content/uploads/2019/03/81265K97T00-300x300.png'),
('37', 'Cowl FR Assy Center Cover Batok Lampu Depan – Sonic 150R', 41000, 'https://www.hondacengkareng.com/wp-content/uploads/2017/01/6130BK56N00-300x300.jpg'),
('38', 'Cover Front Assy – Supra GTR 150', 66000, 'https://www.hondacengkareng.com/wp-content/uploads/2017/04/Cover-FR-Assy-6430CK56N10-300x300.jpg'),
('39', 'Lampu Sein Kanan Depan – New CB150R StreetFire K15G & CBR 150R K45G', 136000, 'https://www.hondacengkareng.com/wp-content/uploads/2016/08/lampu-sein-kanan-depan-33400k15921-300x300.jpg'),
('40', 'Cover Knalpot (Muffler Protector) – Vario 125 eSP & Vario 150 eSP', 49500, 'https://www.hondacengkareng.com/wp-content/uploads/2016/07/cover-knalpot-muffler-protector-18318K59A10-300x300.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `history`
--
ALTER TABLE `history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
