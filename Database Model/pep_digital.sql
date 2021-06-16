-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 16, 2021 at 01:29 PM
-- Server version: 8.0.20
-- PHP Version: 7.2.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pep_digital`
--

-- --------------------------------------------------------

--
-- Table structure for table `activities`
--

CREATE TABLE `activities` (
  `list_act_id` int NOT NULL,
  `list_act_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `field_id` int NOT NULL,
  `comp_id` int NOT NULL,
  `withdrawn` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL,
  `agency_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `activities`
--

INSERT INTO `activities` (`list_act_id`, `list_act_uuid`, `field_id`, `comp_id`, `withdrawn`, `createdAt`, `updateTimestamp`, `agency_id`) VALUES
(1, 'fcc604df-0f27-4b17-aa21-602ddcc426e8', 4, 1, 0, '2021-04-19 17:23:50', '2021-04-19 17:23:50', 2),
(2, 'd9f76d6b-52e6-4f92-8575-4e469766f7bb', 3, 1, 0, '2021-04-19 17:27:02', '2021-04-19 17:27:02', 3),
(3, 'e9b70de6-bc11-4b5c-9534-21734a38888b', 4, 1, 0, '2021-04-19 17:28:06', '2021-04-19 17:28:06', 4),
(4, 'ee18e0c5-7924-43a7-bfc0-cab9a6e398ce', 4, 1, 0, '2021-04-21 15:23:57', '2021-04-21 15:23:57', 5),
(5, '5fb45141-40d0-4faf-a7fc-4fd868c6bfbd', 4, 1, 0, '2021-04-21 15:26:00', '2021-04-21 15:26:00', 6),
(6, '8c13ff26-cb83-4c32-a004-f4165e074d86', 4, 1, 0, '2021-04-21 16:54:21', '2021-04-21 16:54:21', 7),
(7, '0b7c271e-ebdc-4371-b782-6fc71c7bd745', 4, 1, 0, '2021-04-21 16:55:11', '2021-04-21 16:55:11', 8),
(8, '1aaf8943-ac5c-4932-a771-d87dd4403219', 4, 1, 0, '2021-04-21 16:56:01', '2021-04-21 16:56:01', 9),
(9, '0c5316ca-6dc4-4f83-9ee4-8b3526afb2e8', 4, 1, 0, '2021-04-21 17:01:58', '2021-04-21 17:01:58', 10),
(10, '40cdfe73-663a-4504-9b5c-cd08bae0655b', 4, 1, 0, '2021-04-21 17:03:04', '2021-04-21 17:03:04', 11),
(11, '7ecca9e0-d698-43f7-9ba7-6c26e419b667', 4, 1, 0, '2021-04-21 17:12:46', '2021-04-21 17:12:46', 12),
(12, 'f71aeb0c-4431-4c3d-b9ec-27c4c202752d', 4, 1, 0, '2021-04-21 17:13:20', '2021-04-21 17:13:20', 13),
(13, 'f07eeb31-8eee-4dfb-a993-bf984339d0bd', 4, 1, 0, '2021-04-21 17:14:41', '2021-04-21 17:14:41', 14),
(14, 'c85d5ce4-25c2-488f-9ec8-8daf048d43b3', 4, 1, 0, '2021-04-26 15:48:17', '2021-04-26 15:48:17', 15),
(15, '2406f6d5-3fde-4f54-916e-e3f5a55f5677', 4, 1, 0, '2021-04-26 15:54:00', '2021-04-26 15:54:00', 16),
(16, '760f9ce2-1306-43eb-bad5-359d4bc11bbe', 4, 1, 0, '2021-04-26 15:54:55', '2021-04-26 15:54:55', 17),
(17, 'aea2d5b5-101a-43b4-8230-875d9a445b50', 4, 1, 0, '2021-04-26 15:55:49', '2021-04-26 15:55:49', 18),
(18, 'a518448e-0631-461e-8fe1-da68843491ed', 4, 1, 0, '2021-04-26 16:12:11', '2021-04-26 16:12:11', 19),
(19, '7afa79c4-1bc9-48bf-a079-34c2d586b559', 4, 1, 0, '2021-04-26 16:14:07', '2021-04-26 16:14:07', 20),
(20, '4af552ac-3d3e-4cd5-9250-8dd15b336a54', 4, 1, 0, '2021-04-26 16:18:48', '2021-04-26 16:18:48', 21),
(21, 'f21e3743-803d-4ef1-a31c-b51c9684933f', 4, 1, 0, '2021-04-26 16:21:34', '2021-04-26 16:21:34', 22),
(22, '90e6a4d8-5cf5-4e66-85f3-27a0d9963154', 4, 1, 0, '2021-04-27 15:12:09', '2021-04-27 15:12:09', 23),
(23, 'd5694fb5-66ae-4ef5-b577-c0f717c3e1e1', 4, 1, 0, '2021-04-27 15:13:30', '2021-04-27 15:13:30', 24),
(24, 'aa5d6285-b41f-4c77-aa8a-b29abace8e7b', 4, 1, 0, '2021-04-27 15:19:31', '2021-04-27 15:19:31', 25),
(25, '55fed19d-dc5d-42ad-985b-4e963be5464f', 4, 1, 0, '2021-04-27 15:29:30', '2021-04-27 15:29:30', 26),
(26, '6c5cae77-60a0-4f56-a987-649ed64443e7', 4, 1, 0, '2021-04-27 15:33:46', '2021-04-27 15:33:46', 27),
(27, '1f700998-57b8-4c7a-bf2b-84ad62ae4b13', 4, 1, 0, '2021-04-27 15:34:29', '2021-04-27 15:34:29', 28),
(28, 'bd05c3c4-3c38-4811-af5e-e8770babfc42', 4, 1, 0, '2021-04-27 16:56:19', '2021-04-27 16:56:19', 29),
(29, '0c584a75-0011-442a-9688-bcf53105463f', 4, 1, 0, '2021-04-27 17:01:02', '2021-04-27 17:01:02', 30),
(30, 'b4ed686a-0863-4ab9-91d5-1d55d5bb1a05', 4, 1, 0, '2021-04-27 17:34:50', '2021-04-27 17:34:50', 31),
(31, '8e68581b-9c66-4dc0-83a0-167132e022bc', 4, 1, 0, '2021-04-29 14:03:16', '2021-04-29 14:03:16', 32),
(32, 'e30978cb-1552-4649-bf53-f732d9078ee0', 4, 1, 0, '2021-04-30 15:54:35', '2021-04-30 15:54:35', 34),
(33, 'b0626931-2062-4902-8ab5-11551a40612b', 4, 1, 0, '2021-04-30 16:00:31', '2021-04-30 16:00:31', 35),
(34, '7490fc4b-8b4b-4097-b76a-539630226782', 4, 1, 0, '2021-05-03 17:03:49', '2021-05-03 17:03:49', 36),
(35, '4100600b-6c6b-4127-853c-bf42317da01c', 4, 1, 0, '2021-05-03 17:08:35', '2021-05-03 17:08:35', 37),
(36, '47b9f287-6743-4fa2-b911-c5cdb82f86f3', 4, 1, 0, '2021-05-06 15:46:17', '2021-05-06 15:46:17', 37),
(37, '2df209e0-4111-4a58-a96d-206797b66973', 4, 1, 0, '2021-05-06 16:02:26', '2021-05-06 16:02:26', 37),
(38, '2bd3625d-6f29-4ac0-9a02-511eaef5fe7e', 4, 1, 0, '2021-05-06 16:03:21', '2021-05-06 16:03:21', 37),
(39, 'a8d1eb64-2a19-42cb-9e31-841229281120', 4, 1, 0, '2021-05-06 16:06:51', '2021-05-06 16:06:51', 37),
(40, 'cb0d138e-0fd4-455e-8f60-046dee4510e6', 4, 1, 0, '2021-05-06 16:08:14', '2021-05-06 16:08:14', 37),
(41, 'e4bf5d25-f7bf-407d-afd9-5e8d389b4388', 4, 1, 0, '2021-05-17 16:33:33', '2021-05-17 16:33:33', 1),
(42, '9f914723-44e3-4436-9108-80f46bd8e28f', 4, 1, 0, '2021-05-17 16:47:37', '2021-05-17 16:47:37', 1),
(43, '624ee733-e9f9-484a-9da4-168c6bdac7a3', 4, 1, 0, '2021-05-26 15:32:17', '2021-05-26 15:32:17', 38),
(44, '8a47e87f-df11-4300-b8e5-541fb038eb37', 4, 1, 0, '2021-06-08 15:30:22', '2021-06-08 15:30:22', 1),
(45, '438a0d65-60ad-4297-962b-f1d8982d3fbb', 4, 1, 0, '2021-06-08 15:31:15', '2021-06-08 15:31:15', 1);

-- --------------------------------------------------------

--
-- Table structure for table `activity_instruction`
--

CREATE TABLE `activity_instruction` (
  `act_instruc_id` int NOT NULL,
  `act_instruc_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `isPaused` tinyint(1) DEFAULT '0',
  `deleted` tinyint(1) DEFAULT '0',
  `instructionText` text,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `activity_instruction`
--

INSERT INTO `activity_instruction` (`act_instruc_id`, `act_instruc_uuid`, `isPaused`, `deleted`, `instructionText`, `createdAt`, `updateTimestamp`) VALUES
(1, '242f4671-0685-444c-a071-c44d13ce0afc', 0, 0, 'Click on the Start Button', '2021-04-08 12:21:59', '2021-04-08 12:21:59'),
(2, '375b1fb3-07b9-47e1-81e1-6db065da9240', 0, 0, 'Then Add Agency Details', '2021-04-08 12:23:22', '2021-04-08 12:23:22'),
(3, 'c50ac84a-651e-4c41-a08e-b2b0931d1eb8', 0, 0, 'Complete the Agency Details', '2021-04-08 12:23:40', '2021-04-08 12:23:40');

-- --------------------------------------------------------

--
-- Table structure for table `advertisement_recommendation`
--

CREATE TABLE `advertisement_recommendation` (
  `adver_recom_id` int NOT NULL,
  `advert_recom_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `agency_id` int NOT NULL,
  `descrip` text,
  `field_id` int NOT NULL,
  `approval_status` tinyint(1) DEFAULT '0',
  `status` tinyint(1) DEFAULT '0',
  `decline` tinyint(1) DEFAULT '0',
  `deleted` tinyint(1) DEFAULT '0',
  `decline_descrip` text,
  `team_L_id` int NOT NULL,
  `team_lead_forward_status` tinyint(1) DEFAULT '0',
  `team_lead_decline_status` tinyint(1) DEFAULT '0',
  `team_lead_decline_descr` text,
  `sup_id` int NOT NULL,
  `sup_forward_status` tinyint(1) DEFAULT '0',
  `sup_decline_status` tinyint(1) DEFAULT '0',
  `sup_decline_descr` text,
  `man_id` int NOT NULL,
  `team_lead_date_time` datetime DEFAULT NULL,
  `sup_dateTime` datetime DEFAULT NULL,
  `mana_dateTime` datetime DEFAULT NULL,
  `mana_approval` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `advertising_stock`
--

CREATE TABLE `advertising_stock` (
  `adver_stock_id` int NOT NULL,
  `advert_stock_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `adver_stock_name` text,
  `adver_stock_descritpion` text,
  `adver_stock_total_Price` float DEFAULT NULL,
  `adver_stock_Price_per_piece` float DEFAULT NULL,
  `req_adver` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `advertising_stock_allocation`
--

CREATE TABLE `advertising_stock_allocation` (
  `adver_stock_act_id` int NOT NULL,
  `adver_stock_alloc_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `adver_stock_act_name` text,
  `adver_stock_act_descritpion` text,
  `adver_stock_act_total_Quantity` int DEFAULT NULL,
  `adver_stock_id` int NOT NULL,
  `sup_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `agencytypes`
--

CREATE TABLE `agencytypes` (
  `agencytype_id` int NOT NULL,
  `agencytype_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `type_name` text,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  `isPaused` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `agencytypes`
--

INSERT INTO `agencytypes` (`agencytype_id`, `agencytype_uuid`, `type_name`, `deleted`, `isPaused`, `createdAt`, `updateTimestamp`) VALUES
(1, '6af052c4-c8dc-41a1-b55c-b9631e4d7928', 'Buy, Sell, Rent, Agriculture and Investment', 0, 0, '2021-04-14 16:32:52', '2021-04-14 16:32:52'),
(2, '6dddfaac-a466-4c2f-a4e8-de87752ba589', 'Buy, Sell and Rent', 0, 0, '2021-04-14 16:33:32', '2021-04-14 16:33:32'),
(3, 'd5ad2ae5-defd-4bc8-ae97-71c247077d67', 'Buy, Sell and Agriculture', 0, 0, '2021-04-14 16:34:07', '2021-04-14 16:34:07');

-- --------------------------------------------------------

--
-- Table structure for table `agency_info`
--

CREATE TABLE `agency_info` (
  `agency_id` int NOT NULL,
  `agency_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `agency_name` text,
  `agency_type` text,
  `agency_Contact` text,
  `agency_city` text,
  `agency_address` text,
  `agency_Longitude` text,
  `agency_Latitude` text,
  `firstVisit` tinyint(1) NOT NULL DEFAULT '0',
  `agency_owner_Name` text,
  `contactedPerson` text,
  `contactedPerson_Number` text,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  `isPaused` tinyint(1) NOT NULL DEFAULT '0',
  `field_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `agency_info`
--

INSERT INTO `agency_info` (`agency_id`, `agency_uuid`, `agency_name`, `agency_type`, `agency_Contact`, `agency_city`, `agency_address`, `agency_Longitude`, `agency_Latitude`, `firstVisit`, `agency_owner_Name`, `contactedPerson`, `contactedPerson_Number`, `deleted`, `isPaused`, `field_id`, `createdAt`, `updateTimestamp`) VALUES
(1, '058541a2-0931-4856-8090-ab217534edb8', 'Saad Sohail', 'Buy, Sell, Rent, Agriculture and Investment', '0324555', 'Rawalpindi,Punjab', '46000', '73.07085661307924', '33.634159736754704', 1, 'Saad Sohail', 'Saad Sohail', '0324555', 0, 0, 4, '2021-04-19 15:30:20', '2021-04-19 15:30:20'),
(2, 'd07571d6-05f9-440e-affe-b9f5af2bd230', 'createdAt', 'Buy, Sell, Rent, Agriculture and Investment', '0324555', NULL, '46000', '73.07095284186445', '33.634118402838105', 0, 'createdAt', 'createdAt', '0324555', 0, 0, 4, '2021-04-19 17:23:50', '2021-04-19 17:23:50'),
(3, 'fd63da8b-bc7c-40b3-9960-62861f20fa5b', 'Saad Sohdddail', 'Buy, Sell, Rent, Agriculture and Investment', 'd', NULL, '46000', '73.07095284186445', '33.634118402838105', 0, 'Saad Sohail', 'Saad Sohail', 'd', 0, 0, 4, '2021-04-19 17:27:02', '2021-04-19 17:27:02'),
(4, '2878c7e4-06b9-4928-a6cb-dc513133c8e9', 'cssssssreatedAt', 'Buy, Sell and Rent', '0324555', NULL, '46000', '73.07095284186445', '33.634118402838105', 0, 'sssscreatedAt', 'sssscreatedAt', '0324555', 0, 0, 4, '2021-04-19 17:28:06', '2021-04-19 17:28:06'),
(5, 'a433b1d8-ddfe-4d7f-9522-0e662bb228df', 'Saad Sohailq1', 'Buy, Sell and Rent', '0324555', NULL, '46000', '73.07107889253588', '33.63375202978302', 0, 'Saad Sohail', 'Saad Sohail', '0324555', 0, 0, 4, '2021-04-21 15:23:56', '2021-04-21 15:23:56'),
(6, '31206b44-3174-4224-a5a9-eadbd100aafe', 'Testtttt', 'Buy, Sell, Rent, Agriculture and Investment', '0324555', NULL, '46000', '73.07107889253588', '33.63375202978302', 0, 'Saad Sohail', 'Saad Sohail', '0324555', 0, 0, 4, '2021-04-21 15:26:00', '2021-04-21 15:26:00'),
(7, 'b90d86d6-10c9-4192-93fa-20b36df7a16f', 'agency_Longitudew', 'Buy, Sell and Agriculture', '0324555', NULL, '46000', '73.07094573563695', '33.633813690110756', 0, 'agency_Longitude', 'agency_Longitude', '0324555', 0, 0, 4, '2021-04-21 16:54:21', '2021-04-21 16:54:21'),
(8, 'b7e12f55-2b35-4a3f-858d-55d3915e3bb9', '1111', 'Buy, Sell and Rent', '0324555', NULL, '46000', '73.07094573563695', '33.633813690110756', 0, 'Saad Sohail', 'Saad Sohail', '0324555', 0, 0, 4, '2021-04-21 16:55:11', '2021-04-21 16:55:11'),
(9, 'd7871a39-f7e6-487f-b7b0-ed7a9cad121a', 'contactedPerson', 'Buy, Sell, Rent, Agriculture and Investment', '0324555', NULL, '46000', '73.07094573563695', '33.633813690110756', 0, 'contactedPerson', 'contactedPerson', '0324555', 0, 0, 4, '2021-04-21 16:56:01', '2021-04-21 16:56:01'),
(10, 'a669d0c9-90c1-4997-aa58-f0151e29f12b', 'agency_Longitude111', 'Buy, Sell and Agriculture', '0324555', NULL, '46000', '73.07092617765639', '33.63397344522452', 0, 'agency_Longitude', 'agency_Longitude', '0324555', 0, 0, 4, '2021-04-21 17:01:58', '2021-04-21 17:01:58'),
(11, '6744a4ed-bfce-4dd5-a086-d0de8a7a6c83', 'createdAt1111', 'Buy, Sell and Agriculture', '0324555', NULL, '46000', '73.07092617765639', '33.63397344522452', 0, 'createdAt', 'createdAt', '0324555', 0, 0, 4, '2021-04-21 17:03:04', '2021-04-21 17:03:04'),
(12, 'eeedc944-f440-4e10-a895-dccb0891f62a', '`````ssssss', 'Buy, Sell and Agriculture', '0324555', NULL, '46000', '73.07094942613475', '33.63379053599914', 0, 'Saad Sohail', 'Saad Sohail', '0324555', 0, 0, 4, '2021-04-21 17:12:46', '2021-04-21 17:12:46'),
(13, '73fdc416-2d33-45a7-b882-50bd911020a9', '22swwdwed', 'Buy, Sell, Rent, Agriculture and Investment', 'd', NULL, '46000', '73.07094942613475', '33.63379053599914', 0, 'dwedwed', 'dwedwed', 'd', 0, 0, 4, '2021-04-21 17:13:20', '2021-04-21 17:13:20'),
(14, '207b2ba5-f0ef-4d38-994d-952b6a4b0b20', 'contactedPerson1111', 'Buy, Sell and Agriculture', '0324555', NULL, '46000', '73.07094942613475', '33.63379053599914', 0, 'contactedPerson', 'contactedPerson', '0324555', 0, 0, 4, '2021-04-21 17:14:41', '2021-04-21 17:14:41'),
(15, '5eba60d7-bcaf-4815-b381-368dbf3be574', 'Agency names', 'Buy, Sell, Rent, Agriculture and Investment', 'asdasd', NULL, 'dasd', '73.1417752', '33.5742884', 0, 'adasdasdas', 'adasdasdas', 'asdasd', 0, 0, 4, '2021-04-26 15:48:16', '2021-04-26 15:48:16'),
(16, 'bcce8ec9-3153-40d0-9cdd-3bd8104dc795', 'Agency namess', 'Buy, Sell, Rent, Agriculture and Investment', '0345', NULL, 'dasd', '73.1417462', '33.5742517', 0, 'adasdasdas', 'adasdasdas', '0345', 0, 0, 4, '2021-04-26 15:54:00', '2021-04-26 15:54:00'),
(17, 'a518de95-d06e-4b33-9156-51dda82ad238', 'Testing 2', 'Buy, Sell, Rent, Agriculture and Investment', 'asdasd', NULL, 'dasd', '73.1416975', '33.574182799999996', 0, 'adasdasdas', 'adasdasdas', 'asdasd', 0, 0, 4, '2021-04-26 15:54:55', '2021-04-26 15:54:55'),
(18, 'c17167b2-9ed8-4b03-bba1-82141df71b64', 'Agency n54ames', 'Buy, Sell, Rent, Agriculture and Investment', 'asdasd', NULL, 'dasd', '73.1416975', '33.574182799999996', 0, 'adasdasdas', 'adasdasdas', 'asdasd', 0, 0, 4, '2021-04-26 15:55:49', '2021-04-26 15:55:49'),
(19, '0af5ae48-f3cc-41d1-a8e8-5e0fbc6fd488', 'SAAAAAAAAAA', 'Buy, Sell and Agriculture', 'asdasd', NULL, 'dasd', '73.14172289999999', '33.5742569', 0, 'adasdasdas', 'adasdasdas', 'asdasd', 0, 0, 4, '2021-04-26 16:12:11', '2021-04-26 16:12:11'),
(20, '4c46f45e-3c97-4dae-b182-7ae492652f49', '123', 'Buy, Sell and Rent', 'asdasd', NULL, 'dasd', '73.14172289999999', '33.5742569', 0, 'adasdasdas', 'adasdasdas', 'asdasd', 0, 0, 4, '2021-04-26 16:14:07', '2021-04-26 16:14:07'),
(21, '5f7350a0-4388-46e4-8589-cdb18e247bf9', 'Testinqqqqg ', 'Buy, Sell, Rent, Agriculture and Investment', 'asdasd', NULL, 'dasd', '73.14172289999999', '33.5742569', 0, 'Saad', 'Saad', 'asdasd', 0, 0, 4, '2021-04-26 16:18:48', '2021-04-26 16:18:48'),
(22, 'bcfe86e4-8710-4688-bc11-4edca971ccb3', '11111', 'Buy, Sell and Agriculture', 'asdasd', NULL, 'PWD', '73.1417752', '33.5742884', 0, 'adasdasdas', 'adasdasdas', 'asdasd', 0, 0, 4, '2021-04-26 16:21:34', '2021-04-26 16:21:34'),
(23, '121a8ce4-8143-4b68-93f4-856f5d9266b4', 'Agency namesq', 'Buy, Sell and Agriculture', 'asdasd', NULL, 'dasd', '73.1417506', '33.574275300000004', 0, 'adasdasdas', 'adasdasdas', 'asdasd', 0, 0, 4, '2021-04-27 15:12:09', '2021-04-27 15:12:09'),
(24, '00549e1a-dcb0-4f2e-98c3-d3d054266878', 'qqqq1', 'Buy, Sell and Agriculture', '0345', NULL, 'PWD', '73.1417506', '33.574275300000004', 0, 'adasdasdas', 'adasdasdas', '0345', 0, 0, 4, '2021-04-27 15:13:30', '2021-04-27 15:13:30'),
(25, 'b17f255a-ce0b-4593-ac99-c1409ef3a909', '1````', 'Buy, Sell and Agriculture', 'asdasd', NULL, 'dasd', '73.14175759999999', '33.5742457', 1, 'adasdasdas', 'adasdasdas', 'asdasd', 0, 0, 4, '2021-04-27 15:19:30', '2021-04-27 15:19:30'),
(26, '07a73f2e-b4be-4f7a-8008-951607add83d', '23qqq', 'Buy, Sell and Agriculture', 'asdasd', NULL, 'dasd', '73.1417506', '33.574275300000004', 0, 'adasdasdas', 'adasdasdas', 'asdasd', 0, 0, 4, '2021-04-27 15:29:30', '2021-04-27 15:29:30'),
(27, '9b1896c4-d35c-4dfb-ac49-ee47d52d8b5a', 'Agency names2222', 'Buy, Sell and Agriculture', 'asdasd', NULL, 'dasd', '73.14175759999999', '33.5742457', 0, 'adasdasdas', 'adasdasdas', 'asdasd', 0, 0, 4, '2021-04-27 15:33:46', '2021-04-27 15:33:46'),
(28, '0bbbf936-2238-4873-a12c-fe0fcbe7f0ec', 'Agency names````````', 'Buy, Sell and Agriculture', 'asdasd', NULL, 'PWD', '73.14175759999999', '33.5742457', 0, 'adasdasdas', 'adasdasdas', 'asdasd', 0, 0, 4, '2021-04-27 15:34:29', '2021-04-27 15:34:29'),
(29, '9e254553-4782-458c-98a0-ef4f84875676', 'Agency namesassadaasdadasd', 'Buy, Sell, Rent, Agriculture and Investment', 'asdasd', NULL, 'dasd', '73.14175759999999', '33.5742457', 0, 'adasdasdas', 'adasdasdas', 'asdasd', 0, 0, 4, '2021-04-27 16:56:19', '2021-04-27 16:56:19'),
(30, '13912736-eb3d-4bec-a7d7-d25e8cafb34b', 'Agency nameqqqqqqq', 'Buy, Sell and Rent', 'asdasd', NULL, 'dasd', '73.14175759999999', '33.5742457', 0, 'adasdasdas', 'adasdasdas', 'asdasd', 0, 0, 4, '2021-04-27 17:01:02', '2021-04-27 17:01:02'),
(31, '66a9e869-65ec-42d1-b403-bfad969e3b0a', 'Agency namesddddd', 'Buy, Sell and Rent', 'asdasd', NULL, 'dasd', '73.1417298', '33.5741939', 0, 'adasdasdas', 'adasdasdas', 'asdasd', 0, 0, 4, '2021-04-27 17:34:50', '2021-04-27 17:34:50'),
(32, '52782149-5eae-4250-825d-193272b5fc59', 'comp_id', 'Buy, Sell, Rent, Agriculture and Investment', '0324555', NULL, '46000', '73.07103040345912', '33.63373334159579', 0, 'comp_id', 'comp_id', '0324555', 0, 0, 4, '2021-04-29 14:03:16', '2021-04-29 14:03:16'),
(33, '62d811ef-1ced-412e-a1c0-ab4423fda58f', 'Testingg1', 'Buy, Sell, Rent, Agriculture and Investment', '0324555', NULL, '46000', '73.07091948822914', '33.633768012444854', 0, 'Saad Sohail', 'Saad Sohail', '0324555', 0, 0, 4, '2021-04-30 15:52:33', '2021-04-30 15:52:33'),
(34, '2be1ec05-f542-40b0-b94a-1879fcadf6b3', 'MYTESTING', 'Buy, Sell and Agriculture', '0324555', NULL, '46000', '73.07091948822914', '33.633768012444854', 0, 'Saad Sohail', 'Saad Sohail', '0324555', 0, 0, 4, '2021-04-30 15:54:35', '2021-04-30 15:54:35'),
(35, 'efc55ff2-7ec0-4ba0-b519-d5e09bdc577d', 'Start Activity Again', 'Buy, Sell and Rent', 's', NULL, 's', '73.07091948822914', '33.633768012444854', 0, 'adnasj', 'adnasj', 's', 0, 0, 4, '2021-04-30 16:00:31', '2021-04-30 16:00:31'),
(36, '3d90b015-fe87-4d9a-bbf2-35c7439f6721', 'Agency City Name Testing', 'Buy, Sell and Rent', 'Saad', NULL, 'D-17 ', '73.07089811799834', '33.633885065331704', 0, 'Saad', 'Saad', 'Saad', 0, 0, 4, '2021-05-03 17:03:49', '2021-05-03 17:03:49'),
(37, '7bfdaf55-a9bf-4006-9263-463cae33326e', 'City Name Added', 'Buy, Sell, Rent, Agriculture and Investment', '0324555', 'Abbottabad,Khyber Pakhtunkhwa', '46000', '73.0708715692708', '33.633789337728246', 1, 'Saad Sohail', 'Saad Sohail', '0324555', 0, 0, 4, '2021-05-03 17:08:35', '2021-05-06 16:08:43'),
(38, '2b1408ec-3e1b-4e86-a91e-1907c4757705', '1232312', 'Buy, Sell, Rent, Agriculture and Investment', 'ddas', 'Chaman,Balochistān', 'dasd', '73.07085788138802', '33.63366560847481', 1, 'sdas', 'sdas', 'ddas', 0, 0, 4, '2021-05-26 15:32:17', '2021-05-26 15:33:14');

-- --------------------------------------------------------

--
-- Table structure for table `carriers`
--

CREATE TABLE `carriers` (
  `carrier_id` int NOT NULL,
  `carrier_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `carrier_name` text,
  `carrier_type` text,
  `carrier_status` tinyint(1) DEFAULT '0',
  `sa_id` int NOT NULL,
  `comp_access_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `carriers_logs`
--

CREATE TABLE `carriers_logs` (
  `carrier_logs_id` int NOT NULL,
  `update_date_time` datetime DEFAULT NULL,
  `c_name` text,
  `c_type` text,
  `c_Status` tinyint(1) DEFAULT '0',
  `c_added_DateTime` datetime DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `carriers_paid_payment`
--

CREATE TABLE `carriers_paid_payment` (
  `c_paid_id` int NOT NULL,
  `carrier_paid_pay_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `c_amount` double DEFAULT NULL,
  `sa_id` int NOT NULL,
  `c_s_payment_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `carriers_services`
--

CREATE TABLE `carriers_services` (
  `c_service_id` int NOT NULL,
  `carrier_service_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `c_service_name` text,
  `c_service_type` text,
  `c_service_added_Date_Time` datetime DEFAULT NULL,
  `c_service_status` tinyint(1) DEFAULT '0',
  `c_service_addedBy` text,
  `c_service_total_service` double DEFAULT NULL,
  `carrier_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table ` carriers_services_payment`
--

CREATE TABLE ` carriers_services_payment` (
  `c_s_payment_id` int NOT NULL,
  `payment_c_ser_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `c_s_payment_totalAmount` double DEFAULT NULL,
  `c_s_payment_pending` double DEFAULT NULL,
  `c_service_status` tinyint(1) DEFAULT '0',
  `c_s_payment_paid` double DEFAULT NULL,
  `carrier_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `city`
--

CREATE TABLE `city` (
  `city_id` int NOT NULL,
  `city_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `city_name` text,
  `city_code` text,
  `zone_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `city`
--

INSERT INTO `city` (`city_id`, `city_uuid`, `city_name`, `city_code`, `zone_id`, `createdAt`, `updateTimestamp`) VALUES
(1, '415b3e45-9dde-432c-b453-b139a7ec6705', 'Rawalpindi', '352', 1, '2021-04-19 14:38:38', '2021-04-19 14:38:38');

-- --------------------------------------------------------

--
-- Table structure for table `city_area`
--

CREATE TABLE `city_area` (
  `city_area_id` int NOT NULL,
  `city_area_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `city_name` text,
  `city_code` text,
  `city_supp_assos_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `city_area`
--

INSERT INTO `city_area` (`city_area_id`, `city_area_uuid`, `city_name`, `city_code`, `city_supp_assos_id`, `createdAt`, `updateTimestamp`) VALUES
(1, '8c27807b-a7ac-40b5-a58f-24b9eb3bfa93', 'Rawal Road', '101', 3, '2021-03-24 12:35:23', '2021-03-24 12:35:23');

-- --------------------------------------------------------

--
-- Table structure for table `city_sup_assos`
--

CREATE TABLE `city_sup_assos` (
  `city_supp_assos_id` int NOT NULL,
  `city_and_sup_asso_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `paused` tinyint(1) DEFAULT '0',
  `city_id` int NOT NULL,
  `sup_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `city_sup_assos`
--

INSERT INTO `city_sup_assos` (`city_supp_assos_id`, `city_and_sup_asso_uuid`, `deleted`, `paused`, `city_id`, `sup_id`, `createdAt`, `updateTimestamp`) VALUES
(3, '959afad9-06ab-4c5a-bca4-d16441f3d469', 0, 0, 1, 1, '2021-03-24 12:34:52', '2021-03-24 12:34:52');

-- --------------------------------------------------------

--
-- Table structure for table `comapny_access_logs`
--

CREATE TABLE `comapny_access_logs` (
  `comp_acc_logs_id` int NOT NULL,
  `update_date_time` datetime DEFAULT NULL,
  `comp_name` text,
  `comp_address` text,
  `comp_contact` text,
  `access_Status` tinyint(1) DEFAULT NULL,
  `access_date_time` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `compaigns`
--

CREATE TABLE `compaigns` (
  `comp_id` int NOT NULL,
  `comp_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `comp_name` text,
  `comp_type` text,
  `comp_status` tinyint(1) DEFAULT NULL,
  `comp_ending_date_time` datetime DEFAULT NULL,
  `comp_deleted` tinyint(1) DEFAULT '0',
  `comp_paused` tinyint(1) DEFAULT '0',
  `forFreelancers` tinyint(1) DEFAULT '0',
  `forAll` tinyint(1) DEFAULT '0',
  `sup_id` int NOT NULL,
  `city_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `compaigns`
--

INSERT INTO `compaigns` (`comp_id`, `comp_uuid`, `comp_name`, `comp_type`, `comp_status`, `comp_ending_date_time`, `comp_deleted`, `comp_paused`, `forFreelancers`, `forAll`, `sup_id`, `city_id`, `createdAt`, `updateTimestamp`) VALUES
(1, '6e0d2222-b0c7-4970-b181-786649128ebe', 'Promotion of PEP', 'Promotion', NULL, NULL, 0, 0, 1, 0, 1, 1, '2021-04-15 16:40:56', '2021-04-15 16:40:56');

-- --------------------------------------------------------

--
-- Table structure for table `compaign_activities`
--

CREATE TABLE `compaign_activities` (
  `comp_act_id` int NOT NULL,
  `comp_act_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `comp_id` int NOT NULL,
  `agency_checkIN` tinyint(1) DEFAULT '0',
  `field_id` int NOT NULL,
  `agency_checkOut` tinyint(1) DEFAULT '0',
  `agency_Checkout_time` datetime DEFAULT NULL,
  `Latitude` text,
  `Longitude` text,
  `agency_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `compaign_activities`
--

INSERT INTO `compaign_activities` (`comp_act_id`, `comp_act_uuid`, `comp_id`, `agency_checkIN`, `field_id`, `agency_checkOut`, `agency_Checkout_time`, `Latitude`, `Longitude`, `agency_id`, `createdAt`, `updateTimestamp`) VALUES
(1, 'f3e4b704-db54-415e-931f-5cda20f2ae1c', 1, 0, 4, 0, NULL, '73.07085661307924', '33.634159736754704', 1, '2021-04-19 15:30:20', '2021-04-19 15:30:20');

-- --------------------------------------------------------

--
-- Table structure for table `compaign_sales`
--

CREATE TABLE `compaign_sales` (
  `comp_sale_id` int NOT NULL,
  `saomp_sale_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `comp_id` int NOT NULL,
  `field_id` int NOT NULL,
  `sale_total_amount` float DEFAULT NULL,
  `recieved_amount` float DEFAULT NULL,
  `agency_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `companies_access`
--

CREATE TABLE `companies_access` (
  `comp_access_id` int NOT NULL,
  `comp_access_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `sa_id` int NOT NULL,
  `comp_name` text,
  `comp_address` text,
  `comp_contact` text,
  `access_date_time` datetime DEFAULT NULL,
  `access_Status` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `companies_access`
--

INSERT INTO `companies_access` (`comp_access_id`, `comp_access_uuid`, `sa_id`, `comp_name`, `comp_address`, `comp_contact`, `access_date_time`, `access_Status`, `createdAt`, `updateTimestamp`) VALUES
(1, '4d21f8fb-3a48-4305-9105-1cd51c03d28c', 1, 'Pak e Property', 'Rawalpindi', '051-9765821', NULL, 1, '2021-04-19 14:38:35', '2021-04-19 14:38:35');

-- --------------------------------------------------------

--
-- Table structure for table `company_gm_info`
--

CREATE TABLE `company_gm_info` (
  `gm_id` int NOT NULL,
  `gm_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `gm_name` text,
  `gm_email` text,
  `gm_password` text,
  `gm_contact` text,
  `gm_profile_pic` text,
  `gm_salary` int DEFAULT NULL,
  `gm_member_Since` datetime DEFAULT NULL,
  `comp_access_id` int NOT NULL,
  `zone_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `company_gm_info`
--

INSERT INTO `company_gm_info` (`gm_id`, `gm_uuid`, `gm_name`, `gm_email`, `gm_password`, `gm_contact`, `gm_profile_pic`, `gm_salary`, `gm_member_Since`, `comp_access_id`, `zone_id`, `createdAt`, `updateTimestamp`) VALUES
(1, 'd0d472eb-110c-48f1-bfbc-a112153a800c', 'GM of Company', 'gm@info.com', '$2b$10$WfgW1aVsxJOZ1tD.yMRSBuHFPl9NtHyiJJJSGRUt4EgbC5hEp1P1G', '0321-1111000', '/img/GM.jpg', 150000, NULL, 1, 1, '2021-04-19 14:38:36', '2021-04-19 14:38:36');

-- --------------------------------------------------------

--
-- Table structure for table `company_promotions`
--

CREATE TABLE `company_promotions` (
  `comp_prom_id` int NOT NULL,
  `comp_prom_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `comp_prom_name` text,
  `comp_prom_desc` text,
  `prom_status` tinyint(1) DEFAULT NULL,
  `prom_deleted` tinyint(1) DEFAULT NULL,
  `gm_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `cust_care_activities`
--

CREATE TABLE `cust_care_activities` (
  `cust_c_act_id` int NOT NULL,
  `cust_c_act_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `cust_deleted` tinyint(1) DEFAULT '0',
  `cust_care_id` int NOT NULL,
  `agency_id` int NOT NULL,
  `feedback` text,
  `totalCallTime` text,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `cust_care_csr`
--

CREATE TABLE `cust_care_csr` (
  `cust_care_id` int NOT NULL,
  `cust_care_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `cust_care_name` text,
  `cust_care_email` text,
  `cust_care_password` text,
  `cust_care_contact` text,
  `cust_care_userProfilePic` text,
  `cust_care_target` text,
  `cust_care_salary` text,
  `cust_care_commission` text,
  `cust_care_username` text,
  `cust_care_isDeleted` tinyint(1) DEFAULT '0',
  `man_id` int NOT NULL,
  `d_id` int NOT NULL,
  `login_id` int NOT NULL,
  `totalCallTime` text,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `dataentry_employee`
--

CREATE TABLE `dataentry_employee` (
  `de_emp_id` int NOT NULL,
  `de_emp_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `login_id` int NOT NULL,
  `de_emp_name` text,
  `man_id` int NOT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `salary` int DEFAULT NULL,
  `timing` text,
  `isPaused` tinyint(1) DEFAULT '0',
  `fullName` text,
  `profilePicPath` text,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `dealers_info_from_pep`
--

CREATE TABLE `dealers_info_from_pep` (
  `pep_dealers_id` int NOT NULL,
  `pep_dealers_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `status` tinyint(1) DEFAULT '0',
  `deleted` tinyint(1) DEFAULT '0',
  `name` text,
  `contact` text,
  `address` text,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `dealers_of_pep_activities`
--

CREATE TABLE `dealers_of_pep_activities` (
  `pep_dealer_act_id` int NOT NULL,
  `pep_dealer_act_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `status` tinyint(1) DEFAULT '0',
  `deleted` tinyint(1) DEFAULT '0',
  `feedback` text,
  `pep_dealers_id` int NOT NULL,
  `cust_care_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `d_id` int NOT NULL,
  `d_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `paused` tinyint(1) DEFAULT '0',
  `d_deleted` tinyint(1) DEFAULT '0',
  `d_name` text,
  `d_type` text,
  `d_added_Date_Time` datetime DEFAULT NULL,
  `comp_access_id` int NOT NULL,
  `gm_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL,
  `sa_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`d_id`, `d_uuid`, `paused`, `d_deleted`, `d_name`, `d_type`, `d_added_Date_Time`, `comp_access_id`, `gm_id`, `createdAt`, `updateTimestamp`, `sa_id`) VALUES
(1, 'fe511101-49a2-4b8c-a4b1-250a0fe9002d', 0, 0, 'Sales', 'Sale and Marketing', NULL, 1, 1, '2021-04-19 14:38:36', '2021-04-19 14:38:36', 1);

-- --------------------------------------------------------

--
-- Table structure for table `executivelogins`
--

CREATE TABLE `executivelogins` (
  `execu_login_id` int NOT NULL,
  `execu_login_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `isPaused` tinyint(1) DEFAULT '0',
  `loggedInStatus` tinyint(1) DEFAULT '0',
  `loggedOutStatus` tinyint(1) DEFAULT '0',
  `ipAddress` text,
  `loggedOutDate` datetime DEFAULT NULL,
  `field_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `executivelogins`
--

INSERT INTO `executivelogins` (`execu_login_id`, `execu_login_uuid`, `deleted`, `isPaused`, `loggedInStatus`, `loggedOutStatus`, `ipAddress`, `loggedOutDate`, `field_id`, `createdAt`, `updateTimestamp`) VALUES
(1, '23f64cf1-ec90-41cc-97ca-47f84fece8d3', 0, 0, 0, 0, '::1', NULL, 4, '2021-04-19 15:27:45', '2021-04-19 15:27:45'),
(2, '0832d09a-de38-4bbb-9bfa-6df5ff706976', 0, 0, 0, 0, '::1', NULL, 4, '2021-04-19 15:28:06', '2021-04-19 15:28:06'),
(3, '5e2f08d3-21d6-4474-8eca-e49b3f1af3f8', 0, 0, 0, 0, '::1', NULL, 4, '2021-04-19 17:23:28', '2021-04-19 17:23:28'),
(4, '30af32fe-8591-4b53-a36a-e8678b66ed0d', 0, 0, 0, 0, '::1', NULL, 4, '2021-04-19 17:26:48', '2021-04-19 17:26:48'),
(5, '9b351ce1-bd1b-47df-98e5-12ddaf22b4c6', 0, 0, 0, 0, '::1', NULL, 4, '2021-04-19 17:27:45', '2021-04-19 17:27:45'),
(6, 'ccf30583-ce42-4cd7-8477-e6ce9f0f3b8d', 0, 0, 0, 0, '::1', NULL, 4, '2021-04-21 15:23:36', '2021-04-21 15:23:36'),
(7, 'b628754b-0441-4464-b8d2-0f32983a3860', 0, 0, 0, 0, '::1', NULL, 4, '2021-04-21 15:25:38', '2021-04-21 15:25:38'),
(8, '0b15a17d-e6ec-4887-8e30-9464944d8045', 0, 0, 0, 0, '::1', NULL, 4, '2021-04-21 15:42:47', '2021-04-21 15:42:47'),
(9, 'c96bdd98-9918-438e-8c71-ed4699a7792e', 0, 0, 0, 0, '::1', NULL, 4, '2021-04-21 15:44:59', '2021-04-21 15:44:59'),
(10, 'e071eeed-151d-4f50-926d-cbf55fc58bc6', 0, 0, 0, 0, '::1', NULL, 4, '2021-04-21 15:51:36', '2021-04-21 15:51:36'),
(11, '37866b51-8cdb-4a4b-b1f8-fc0d68226c2a', 0, 0, 0, 0, '::1', NULL, 4, '2021-04-21 15:52:11', '2021-04-21 15:52:11'),
(12, 'c63b9a85-0acc-402d-a508-5ef404aa1e94', 0, 0, 0, 0, '::1', NULL, 4, '2021-04-21 15:53:53', '2021-04-21 15:53:53'),
(13, 'bb1f9bb3-e0a8-4627-a9f8-96c4c99a0c3c', 0, 0, 0, 0, '::ffff:127.0.0.1', NULL, 4, '2021-04-21 15:54:48', '2021-04-21 15:54:48'),
(14, '1a0c825a-d565-41f9-b75c-3fbc960d47de', 0, 0, 0, 0, '::1', NULL, 4, '2021-04-21 16:43:36', '2021-04-21 16:43:36'),
(15, '0284649d-d8cd-4412-98f6-cc3b4cec906e', 0, 0, 0, 0, '::1', NULL, 4, '2021-04-21 16:46:46', '2021-04-21 16:46:46'),
(16, '00e7811d-a2a5-41e2-b4bb-4517899ed5af', 0, 0, 0, 0, '::1', NULL, 4, '2021-04-21 16:47:21', '2021-04-21 16:47:21'),
(17, 'b2f0ce97-f25c-44b8-bc9b-b995bfea96d5', 0, 0, 0, 0, '::1', NULL, 4, '2021-04-21 16:54:00', '2021-04-21 16:54:00'),
(18, 'c533605b-cb95-4611-a325-e2a673422371', 0, 0, 0, 0, '::1', NULL, 4, '2021-04-21 16:54:53', '2021-04-21 16:54:53'),
(19, '8c3972bf-92fe-4ade-b1fd-7091d927b52f', 0, 0, 0, 0, '::1', NULL, 4, '2021-04-21 17:01:38', '2021-04-21 17:01:38'),
(20, 'e4cff289-ed6a-4b04-a354-ac000f248b7e', 0, 0, 0, 0, '::1', NULL, 4, '2021-04-21 17:02:47', '2021-04-21 17:02:47'),
(21, '776c6e4f-c5ad-4f72-b197-f5fc8232a71e', 0, 0, 0, 0, '::1', NULL, 4, '2021-04-21 17:12:31', '2021-04-21 17:12:31'),
(22, '473a9291-c7b4-4d38-9fa0-7cf228b924f1', 0, 0, 0, 0, '::1', NULL, 4, '2021-04-21 17:14:25', '2021-04-21 17:14:25'),
(23, 'e8e91618-ff62-48f9-bca6-fdec0c53be5c', 0, 0, 0, 0, '::1', NULL, 4, '2021-04-23 15:29:30', '2021-04-23 15:29:30'),
(24, 'af086208-e532-41ae-a9da-8219f9cff058', 0, 0, 0, 0, '::1', NULL, 4, '2021-04-23 15:35:19', '2021-04-23 15:35:19'),
(25, 'd00f51de-1e8c-44b6-8ed0-3ef0f07a90f8', 0, 0, 0, 0, '::1', NULL, 4, '2021-04-26 15:47:55', '2021-04-26 15:47:55'),
(26, 'a4501932-67ce-4e19-9c3f-a8db8278326f', 0, 0, 0, 0, '::1', NULL, 4, '2021-04-26 15:53:44', '2021-04-26 15:53:44'),
(27, '13f9221e-a7cd-4924-a6fc-6eee7b8c3fbb', 0, 0, 0, 0, '::1', NULL, 4, '2021-04-26 15:54:40', '2021-04-26 15:54:40'),
(28, '2ddea9f7-d154-44cd-a6fe-6c35131f0722', 0, 0, 0, 0, '::1', NULL, 4, '2021-04-26 15:55:28', '2021-04-26 15:55:28'),
(29, '11bc0eb6-2dc0-4286-9c95-54fb31a401b8', 0, 0, 0, 0, '::1', NULL, 4, '2021-04-26 16:11:55', '2021-04-26 16:11:55'),
(30, 'edb635b7-ab83-46f7-b377-c18b0c949468', 0, 0, 0, 0, '::1', NULL, 4, '2021-04-26 16:13:50', '2021-04-26 16:13:50'),
(31, '6880d642-df74-4f6a-902f-2a0d84766366', 0, 0, 0, 0, '::1', NULL, 4, '2021-04-26 16:18:24', '2021-04-26 16:18:24'),
(32, 'a8c0e13c-a84b-4968-9c61-d2c0052556f9', 0, 0, 0, 0, '::1', NULL, 4, '2021-04-26 16:21:17', '2021-04-26 16:21:17'),
(33, '563d6b9c-a474-4746-868c-e7b722c91afe', 0, 0, 0, 0, '::1', NULL, 4, '2021-04-27 13:44:50', '2021-04-27 13:44:50'),
(34, '30158a86-5be7-45a4-b194-caba86bbe94b', 0, 0, 0, 0, '::1', NULL, 4, '2021-04-27 15:11:48', '2021-04-27 15:11:48'),
(35, 'e2182a9c-33e8-4be9-9dc1-14305d357ecb', 0, 0, 0, 0, '::1', NULL, 4, '2021-04-27 15:13:05', '2021-04-27 15:13:05'),
(36, 'ca523821-def4-4494-a9f3-5125414d40c3', 0, 0, 0, 0, '::1', NULL, 4, '2021-04-27 15:19:14', '2021-04-27 15:19:14'),
(37, '4b8725af-5243-40fe-956c-26bd850bb899', 0, 0, 0, 0, '::1', NULL, 4, '2021-04-27 15:29:15', '2021-04-27 15:29:15'),
(38, 'eef730cf-2a17-46f9-b602-df3c20e9ae1f', 0, 0, 0, 0, '::1', NULL, 4, '2021-04-27 15:33:29', '2021-04-27 15:33:29'),
(39, '9098f6db-b3c3-46d7-bdb5-36545256e901', 0, 0, 0, 0, '::1', NULL, 4, '2021-04-27 15:34:12', '2021-04-27 15:34:12'),
(40, '348c84a4-0992-47ea-9981-c9b6b235932c', 0, 0, 0, 0, '::1', NULL, 4, '2021-04-27 16:55:57', '2021-04-27 16:55:57'),
(41, '5257f104-a700-4c48-bb0e-138afb34e9dd', 0, 0, 0, 0, '::1', NULL, 4, '2021-04-27 17:00:43', '2021-04-27 17:00:43'),
(42, 'dea29928-c10a-4d29-bf76-c5bf9f1afd28', 0, 0, 0, 0, '::1', NULL, 4, '2021-04-27 17:31:54', '2021-04-27 17:31:54'),
(43, 'ab8acbc6-0fb6-42af-9a77-c1cba03d6b60', 0, 0, 0, 0, '::1', NULL, 4, '2021-04-27 17:33:47', '2021-04-27 17:33:47'),
(44, '32981966-6aa4-46ad-bb6e-0b620d302770', 0, 0, 0, 0, '::1', NULL, 4, '2021-04-27 17:34:33', '2021-04-27 17:34:33'),
(45, '9216b83c-dc6d-4271-be1b-9124d57b2c62', 0, 0, 0, 0, '::1', NULL, 4, '2021-04-29 14:01:40', '2021-04-29 14:01:40'),
(46, '75e75259-1b64-462a-9492-cca524387277', 0, 0, 0, 0, '::1', NULL, 4, '2021-04-30 15:51:51', '2021-04-30 15:51:51'),
(47, '6688c519-6065-47d8-a0d3-31373124afa6', 0, 0, 0, 0, '::1', NULL, 4, '2021-04-30 16:00:04', '2021-04-30 16:00:04'),
(48, '828a469c-693e-428c-86f2-f4e203fca41a', 0, 0, 0, 0, '::1', NULL, 4, '2021-04-30 16:02:35', '2021-04-30 16:02:35'),
(49, 'd6579304-e38c-4bda-9f2c-4ee97c98921e', 0, 0, 0, 0, '::1', NULL, 4, '2021-04-30 16:14:12', '2021-04-30 16:14:12'),
(50, '404c54b2-68e2-4cf6-a0e6-29e7f712f7a1', 0, 0, 0, 0, '::1', NULL, 4, '2021-05-03 16:46:22', '2021-05-03 16:46:22'),
(51, '0f0ffbde-7318-4548-8d05-c2dc17c4ebfd', 0, 0, 0, 0, '::1', NULL, 4, '2021-05-03 16:53:14', '2021-05-03 16:53:14'),
(52, '3ca8149d-a48b-400a-b2e2-45975034308a', 0, 0, 0, 0, '::1', NULL, 4, '2021-05-03 16:58:55', '2021-05-03 16:58:55'),
(53, '4ce818c8-b724-4f2a-990d-a6ac64b4801a', 0, 0, 0, 0, '::1', NULL, 4, '2021-05-03 17:03:01', '2021-05-03 17:03:01'),
(54, '88167de4-9fc0-45c5-b343-f2c0c10bf229', 0, 0, 0, 0, '::1', NULL, 4, '2021-05-03 17:06:16', '2021-05-03 17:06:16'),
(55, '9f19d3f0-b1f2-4ae7-9660-9302390be19d', 0, 0, 0, 0, '::1', NULL, 4, '2021-05-03 17:07:08', '2021-05-03 17:07:08'),
(56, 'da5b21e3-719a-4ba9-85f2-762e4d6f5789', 0, 0, 0, 0, '::1', NULL, 4, '2021-05-03 17:07:59', '2021-05-03 17:07:59'),
(57, '9372b10a-9343-41da-a638-02ff4b5a525c', 0, 0, 0, 0, '::1', NULL, 4, '2021-05-06 16:01:39', '2021-05-06 16:01:39'),
(58, 'b2b87f7b-fd9c-4990-9852-615973ff732c', 0, 0, 0, 0, '::1', NULL, 4, '2021-05-06 16:07:55', '2021-05-06 16:07:55'),
(59, '53c0814a-aefb-4213-9796-abbcc384af19', 0, 0, 0, 0, '::1', NULL, 4, '2021-05-06 16:10:27', '2021-05-06 16:10:27'),
(60, '9c81eb00-e4e6-4c23-8431-6c7807a93420', 0, 0, 0, 0, '::1', NULL, 4, '2021-05-07 11:33:15', '2021-05-07 11:33:15'),
(61, '195c4773-ea80-4c38-bb70-3ec873c41f17', 0, 0, 0, 0, '::1', NULL, 4, '2021-05-07 12:31:34', '2021-05-07 12:31:34'),
(62, '0df0519c-c64d-4a8f-ad1d-08beb4d9cca9', 0, 0, 0, 0, '::1', NULL, 4, '2021-05-17 12:21:59', '2021-05-17 12:21:59'),
(63, '10507831-4df9-496f-bb68-93cb01c2fccb', 0, 0, 0, 0, '::1', NULL, 4, '2021-05-17 12:37:58', '2021-05-17 12:37:58'),
(64, 'a664ccb5-bec8-4c79-8875-c3f19783439f', 0, 0, 0, 0, '::1', NULL, 4, '2021-05-17 12:52:35', '2021-05-17 12:52:35'),
(65, '70e9a2f6-0943-4676-bf77-1fa20f82d947', 0, 0, 0, 0, '::1', NULL, 4, '2021-05-17 14:58:56', '2021-05-17 14:58:56'),
(66, '6fe273d6-44fe-4245-8297-f175bea9d432', 0, 0, 0, 0, '::1', NULL, 4, '2021-05-17 15:53:28', '2021-05-17 15:53:28'),
(67, '955349bb-00c9-49a7-9063-f4b91beec504', 0, 0, 0, 0, '::1', NULL, 4, '2021-05-17 16:04:50', '2021-05-17 16:04:50'),
(68, '091a493b-48e5-41f7-838f-98e1baa016cb', 0, 0, 0, 0, '::1', NULL, 4, '2021-05-17 16:06:26', '2021-05-17 16:06:26'),
(69, '4b5c112a-503a-4c86-8d98-f323178cf029', 0, 0, 0, 0, '::1', NULL, 4, '2021-05-17 16:47:23', '2021-05-17 16:47:23'),
(70, 'f5231b3a-b47a-4dd6-88db-156afefd7f65', 0, 0, 0, 0, '::1', NULL, 4, '2021-05-18 18:31:08', '2021-05-18 18:31:08'),
(71, '526817d0-b210-4a87-b964-cca697c37f9e', 0, 0, 0, 0, '::1', NULL, 4, '2021-05-20 12:31:19', '2021-05-20 12:31:19'),
(72, 'baeb78da-5074-4dcb-9ba2-8da6e2bafab7', 0, 0, 0, 0, '::1', NULL, 4, '2021-05-26 14:27:10', '2021-05-26 14:27:10'),
(73, '1ca94be4-56a0-4f88-87dc-8219f2cef9a4', 0, 0, 0, 0, '::ffff:127.0.0.1', NULL, 4, '2021-05-26 14:33:15', '2021-05-26 14:33:15'),
(74, 'e0eb60e5-57c9-40f0-ba2f-02bffa2be29c', 0, 0, 0, 0, '::1', NULL, 4, '2021-05-26 15:17:23', '2021-05-26 15:17:23'),
(75, '84551145-4935-4c4b-b560-45658ceaccd4', 0, 0, 0, 0, '::1', NULL, 4, '2021-05-26 15:18:09', '2021-05-26 15:18:09'),
(76, '63ca068f-008a-4051-b8bf-1b4c7da7408c', 0, 0, 0, 0, '::1', NULL, 4, '2021-05-26 15:18:30', '2021-05-26 15:18:30'),
(77, 'e9550846-d1d6-4650-b214-e01c0801618c', 0, 0, 0, 0, '::1', NULL, 4, '2021-05-26 15:22:46', '2021-05-26 15:22:46'),
(78, 'a069d0cd-4785-481f-bc3e-1e2d799daf42', 0, 0, 0, 0, '::1', NULL, 4, '2021-05-26 15:22:48', '2021-05-26 15:22:48'),
(79, '61f2ec43-84c0-4209-994f-d49ff330b5f6', 0, 0, 0, 0, '::1', NULL, 4, '2021-05-26 15:22:50', '2021-05-26 15:22:50'),
(80, 'c5831d02-3d3d-4ef6-801f-8b1f21829eeb', 0, 0, 0, 0, '::1', NULL, 4, '2021-05-26 15:23:42', '2021-05-26 15:23:42'),
(81, 'f12742a4-ca4d-4e85-90b7-86693ec247ef', 0, 0, 0, 0, '::1', NULL, 4, '2021-05-26 15:39:24', '2021-05-26 15:39:24'),
(82, '8b3debd8-27a1-41d1-80b1-661ad680b687', 0, 0, 0, 0, '::1', NULL, 4, '2021-05-26 15:41:58', '2021-05-26 15:41:58'),
(83, '2ef302a3-c338-4938-a660-20ee21caa322', 0, 0, 0, 0, '::1', NULL, 4, '2021-05-26 16:03:01', '2021-05-26 16:03:01'),
(84, '169a01c0-cf2c-4a8d-9672-003f3103745f', 0, 0, 0, 0, '::1', NULL, 4, '2021-05-26 16:03:48', '2021-05-26 16:03:48'),
(85, '20a8d48e-17f4-4e7c-a57c-33066a9be6d2', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-01 12:54:49', '2021-06-01 12:54:49'),
(86, '80300c6b-7a59-4444-96ce-0e8ac3d0ed66', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-01 12:56:00', '2021-06-01 12:56:00'),
(87, 'ee765c0e-8db7-4897-b71c-4c05a6d65775', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-01 12:57:27', '2021-06-01 12:57:27'),
(88, '66ce3d2d-3368-4179-a6b9-42f69adf6980', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-01 13:06:36', '2021-06-01 13:06:36'),
(89, '26cd4f0c-d226-4aef-978e-ad2f96cd8ff3', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-01 13:08:33', '2021-06-01 13:08:33'),
(90, 'ba411c0f-6bda-4e9a-bb49-1d0ea07c4034', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-01 13:09:39', '2021-06-01 13:09:39'),
(91, '0fcb8c5e-8a53-41bd-94d9-dd3b95eaddd9', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-01 13:42:42', '2021-06-01 13:42:42'),
(92, '49edb17d-bf18-469f-893d-9254f0538c9d', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-01 14:09:50', '2021-06-01 14:09:50'),
(93, '8bb5c1d2-5714-45df-a665-4878571e10f7', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-02 13:30:22', '2021-06-02 13:30:22'),
(94, '9604fd6b-2a8e-4b0a-98df-d04310281fbd', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-03 13:29:13', '2021-06-03 13:29:13'),
(95, '062133e6-b97f-417d-bdca-bcb1f7d44b2a', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-03 13:29:35', '2021-06-03 13:29:35'),
(96, 'eb52c439-0e6a-43b5-b51b-c7d68d25056d', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-03 13:31:27', '2021-06-03 13:31:27'),
(97, '650a523e-2f8e-4177-85d3-17fc3de817ab', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-03 13:32:17', '2021-06-03 13:32:17'),
(98, '7872eb0b-7b55-413f-861c-4d0f66dbeeee', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-03 13:33:49', '2021-06-03 13:33:49'),
(99, 'b3a45641-b196-49e2-abca-8d70aa7738b3', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-03 13:34:13', '2021-06-03 13:34:13'),
(100, 'cca13434-556b-41c7-84ab-4a4a9ff597a1', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-03 13:34:54', '2021-06-03 13:34:54'),
(101, 'd7b87d02-c762-49e8-87a7-da21bc76e7f8', 0, 0, 0, 0, '::ffff:127.0.0.1', NULL, 4, '2021-06-03 13:36:41', '2021-06-03 13:36:41'),
(102, '7eb58d98-7c8d-4c8c-bcf4-4d4e9e0cbe46', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-03 13:37:30', '2021-06-03 13:37:30'),
(103, '3e7bebb1-af69-462b-b577-342171c43954', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-03 13:37:45', '2021-06-03 13:37:45'),
(104, '7f4942f4-1e2d-4008-b0c2-3264c32cc44f', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-03 13:38:02', '2021-06-03 13:38:02'),
(105, 'efdf4534-4dba-40df-9580-39ffed92c8b7', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-03 13:38:43', '2021-06-03 13:38:43'),
(106, 'a3d45632-10f6-42e6-85e0-a39627f35572', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-03 13:39:15', '2021-06-03 13:39:15'),
(107, '329cb8d8-06db-47a5-b3b5-99197c8de761', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-03 13:39:41', '2021-06-03 13:39:41'),
(108, '08536f12-715a-4e9c-9dad-67cd8a157d83', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-03 13:44:24', '2021-06-03 13:44:24'),
(109, 'c58a09d9-637a-4d56-8862-78939c62b488', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-03 13:44:46', '2021-06-03 13:44:46'),
(110, '66e99a95-1f08-42e7-b844-aa013a5a9f1c', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-03 13:44:59', '2021-06-03 13:44:59'),
(111, '6934dbfe-3c73-4e2c-8b38-44c1f02cc79d', 0, 0, 0, 0, '::ffff:127.0.0.1', NULL, 4, '2021-06-03 13:45:28', '2021-06-03 13:45:28'),
(112, '76396c2e-e8da-4ea4-9326-de0de5d40a60', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-03 13:51:54', '2021-06-03 13:51:54'),
(113, 'ec3f75e4-ca15-41c7-8216-8d87836972b7', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-03 14:04:53', '2021-06-03 14:04:53'),
(114, '325be82e-cc0e-43de-9689-3a3044b51be9', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-03 14:44:13', '2021-06-03 14:44:13'),
(115, 'fcfb7328-0a18-4ead-b85d-42bec6250f96', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-03 15:44:25', '2021-06-03 15:44:25'),
(116, 'aed55d5a-ac5e-4039-a0f0-e91391d120c3', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-03 16:00:52', '2021-06-03 16:00:52'),
(117, '101e84f6-0197-4555-aede-1eab28eef028', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-03 16:06:40', '2021-06-03 16:06:40'),
(118, 'e77387c0-91c2-490e-8214-cc79b6727f11', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-03 16:06:57', '2021-06-03 16:06:57'),
(119, 'c2659cb3-788c-4fda-9d47-1a732c9cccf8', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-03 16:31:10', '2021-06-03 16:31:10'),
(120, '7376b447-020b-4a16-a531-ff02c918df37', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-03 16:32:33', '2021-06-03 16:32:33'),
(121, '88e4e055-87c4-443f-96ec-e520bf501e96', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-03 16:36:32', '2021-06-03 16:36:32'),
(122, '30f4cdb9-20ce-4310-9786-8293bc223149', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-03 17:20:01', '2021-06-03 17:20:01'),
(123, 'd2f055a6-dd0f-47cd-b311-b8980c8983e3', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-04 15:03:06', '2021-06-04 15:03:06'),
(124, '0094a17a-2b96-4a68-a9b2-fbd97aa85d7a', 0, 0, 0, 0, '::ffff:127.0.0.1', NULL, 4, '2021-06-04 15:19:42', '2021-06-04 15:19:42'),
(125, '7040542a-99a9-4701-8d01-a222f5525ba2', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-04 15:20:32', '2021-06-04 15:20:32'),
(126, '4d7c6936-90c7-4006-a015-467cf4620b85', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-04 15:28:24', '2021-06-04 15:28:24'),
(127, '0a0cb780-4d65-4373-8900-786b88c8a5a2', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-04 15:29:26', '2021-06-04 15:29:26'),
(128, '599b71b8-8bbf-4ea8-9173-567be52a709e', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-04 15:29:58', '2021-06-04 15:29:58'),
(129, 'baa3115b-ef39-46a9-b442-c1e88bb3b9e3', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-04 15:33:33', '2021-06-04 15:33:33'),
(130, 'b80de9ca-9706-4f53-9d50-31023b367393', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-04 15:59:06', '2021-06-04 15:59:06'),
(131, '2a632d86-5adc-450b-b183-facf1022ffa7', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-04 17:11:13', '2021-06-04 17:11:13'),
(132, '3b448b9f-2878-4e4e-af60-07fb9aecbccb', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-04 17:28:21', '2021-06-04 17:28:21'),
(133, '30d63478-53fd-492f-965f-a171493f1906', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-04 17:43:15', '2021-06-04 17:43:15'),
(134, 'ed82cd41-b500-4d50-9ada-5f6425cc1ca5', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-04 17:44:50', '2021-06-04 17:44:50'),
(135, '9f43b30e-3a23-4720-860b-53f909410ba5', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-04 17:48:01', '2021-06-04 17:48:01'),
(136, '52a1f599-e339-4606-8b49-a10eb4c66ae4', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-04 17:49:38', '2021-06-04 17:49:38'),
(137, 'a08e9421-2e24-4707-994b-0b250f5ede32', 0, 0, 0, 0, '::ffff:127.0.0.1', NULL, 4, '2021-06-04 17:49:46', '2021-06-04 17:49:46'),
(138, 'de7720b6-256d-453e-bd22-17be7c409f73', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-07 11:49:38', '2021-06-07 11:49:38'),
(139, 'd0ecd638-5940-4a83-b30e-7aa68f49cdca', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-07 18:17:32', '2021-06-07 18:17:32'),
(140, '87229a1b-bb4f-4b60-b9af-56c2a3e8b5f3', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-07 18:18:14', '2021-06-07 18:18:14'),
(141, 'f6338554-ed96-43db-a865-82bd34005dcf', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-07 18:20:50', '2021-06-07 18:20:50'),
(142, 'c549a915-131a-4a36-9d49-33989f830be1', 0, 0, 0, 0, '::ffff:127.0.0.1', NULL, 4, '2021-06-07 18:21:57', '2021-06-07 18:21:57'),
(143, '1d307181-8b23-420c-ad81-28e43f82465b', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-08 13:00:02', '2021-06-08 13:00:02'),
(144, '171f41c3-aeff-401d-8911-048722349978', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-08 14:46:26', '2021-06-08 14:46:26'),
(145, '90ef4ce6-4951-477b-9db6-2c41d624ba43', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-08 14:46:58', '2021-06-08 14:46:58'),
(146, '2472512b-29f8-4b14-a6d9-1e97a898f785', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-08 14:51:20', '2021-06-08 14:51:20'),
(147, '61a46946-504a-4e28-8779-7fb8e2d231cb', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-08 15:06:19', '2021-06-08 15:06:19'),
(148, 'eb930f05-e999-4ae5-acd9-234b1e84963b', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-08 15:28:49', '2021-06-08 15:28:49'),
(149, '9932f9e5-6bfd-4e38-9f3c-78bd509c5e18', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-08 15:31:00', '2021-06-08 15:31:00'),
(150, '9f1218bf-67da-4bc8-ae36-c70838e3a715', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-08 15:53:29', '2021-06-08 15:53:29'),
(151, 'da8887a1-1bd1-4b6d-8bbc-2c8c2179286a', 0, 0, 0, 0, '::ffff:127.0.0.1', NULL, 4, '2021-06-08 16:51:17', '2021-06-08 16:51:17'),
(152, 'a653adbd-91bf-41e7-be17-78634aa98b5f', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-08 16:52:01', '2021-06-08 16:52:01'),
(153, '0319b158-af0f-44ea-924e-c1d5ac21f21e', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-08 16:55:08', '2021-06-08 16:55:08'),
(154, '74ed4d64-4196-4b04-af96-228bb0ea1c13', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-08 16:56:44', '2021-06-08 16:56:44'),
(155, '64c6d35a-2b21-4557-908d-e835be4b5041', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-08 16:57:41', '2021-06-08 16:57:41'),
(156, 'bea2e3e2-1d1a-4414-9ede-0a84891101fb', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-08 16:58:10', '2021-06-08 16:58:10'),
(157, '20a7e85b-48ba-40a8-8dd5-cd7ce3253aea', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-08 16:58:28', '2021-06-08 16:58:28'),
(158, 'd1a1e6b2-81ea-43d5-ac0b-b0857a68357d', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-08 17:00:27', '2021-06-08 17:00:27'),
(159, 'dfff07dd-bbd6-49a1-8628-451ada84402f', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-08 17:02:47', '2021-06-08 17:02:47'),
(160, 'd8729629-a204-41e8-8c6a-d4c5bad07ed2', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-08 17:03:04', '2021-06-08 17:03:04'),
(161, '8189fd1f-64f4-4a7a-a4ea-5e8e42268ff2', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-08 17:04:08', '2021-06-08 17:04:08'),
(162, 'c0e60c21-f853-454e-bb06-fdc1dc327806', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-08 17:10:12', '2021-06-08 17:10:12'),
(163, '9b7e6d90-8d6e-444d-a476-d624f8032074', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-09 12:24:58', '2021-06-09 12:24:58'),
(164, '2323e517-3ccf-4286-84fc-4a030c7d6616', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-09 12:35:03', '2021-06-09 12:35:03'),
(165, '6b07eabe-87a4-4a48-aefd-bd938e7c2c31', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-09 12:53:05', '2021-06-09 12:53:05'),
(166, '28f145f1-865b-4050-947e-839baab4397e', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-09 12:55:55', '2021-06-09 12:55:55'),
(167, 'a308f68a-13c0-4243-8693-55afea616b0b', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-09 13:00:16', '2021-06-09 13:00:16'),
(168, '69b28727-22cb-449c-8304-b53408b98161', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-09 13:03:09', '2021-06-09 13:03:09'),
(169, '36071e73-51f8-42f2-83cb-21ae9ce95801', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-09 13:12:02', '2021-06-09 13:12:02'),
(170, 'eb2cfcf5-6882-4032-9ea5-57e5ce7e1018', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-09 13:36:38', '2021-06-09 13:36:38'),
(171, 'dd2d94a5-ae6e-457d-97d8-96ab52e71df7', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-09 13:37:38', '2021-06-09 13:37:38'),
(172, '643846a8-432e-450d-866c-ad621ce36c54', 0, 0, 0, 0, '::ffff:127.0.0.1', NULL, 4, '2021-06-09 13:38:41', '2021-06-09 13:38:41'),
(173, '1815e603-31de-4d7c-bc35-3f318cd9c552', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-09 13:39:35', '2021-06-09 13:39:35'),
(174, '6b2d2d20-10eb-4b09-9e73-126b7f0ddf60', 0, 0, 0, 0, '::ffff:127.0.0.1', NULL, 4, '2021-06-09 13:50:07', '2021-06-09 13:50:07'),
(175, 'd1e3a0a6-558c-46af-9f75-c4b4d519757d', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-09 13:50:44', '2021-06-09 13:50:44'),
(176, '826c0a27-cdcf-4830-8423-4fe16f7a9272', 0, 0, 0, 0, '::ffff:127.0.0.1', NULL, 4, '2021-06-09 13:51:21', '2021-06-09 13:51:21'),
(177, 'be5188b4-2a00-4558-8b9b-d0b743f74868', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-09 15:23:11', '2021-06-09 15:23:11'),
(178, '700b4104-8223-4be3-8974-7970af17f1ff', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-09 15:25:53', '2021-06-09 15:25:53'),
(179, '64727c21-e49d-4513-ba88-81d014864f5c', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-09 15:26:42', '2021-06-09 15:26:42'),
(180, 'df85623e-5fc5-432d-a8f0-7d345cecc76c', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-10 13:14:37', '2021-06-10 13:14:37'),
(181, '6c3d6124-155b-4fa7-a875-543b51fbc3dd', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-10 13:28:39', '2021-06-10 13:28:39'),
(182, '587a3a61-ef38-4392-b964-0d947198bfcf', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-10 15:05:17', '2021-06-10 15:05:17'),
(183, '4d076580-a8e2-46ad-b049-1578bb65a4e2', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-10 15:05:43', '2021-06-10 15:05:43'),
(184, 'a2835028-8913-4f3f-8e9e-a8196e93fc9e', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-10 15:36:00', '2021-06-10 15:36:00'),
(185, 'aa3e3757-be10-4b98-a68b-fd5e8d751482', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-10 15:40:44', '2021-06-10 15:40:44'),
(186, 'cbf35aa6-48a7-4633-869d-519b7f3894ec', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-14 12:10:20', '2021-06-14 12:10:20'),
(187, '091a0a74-6a37-447f-b779-c980f974499e', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-15 12:14:09', '2021-06-15 12:14:09'),
(188, 'fd11c7ba-3843-4726-98df-5ffc92fcdf7b', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-15 12:17:25', '2021-06-15 12:17:25'),
(189, 'ea1f31a6-d082-4d98-8968-0b9a090eeabe', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-15 12:48:34', '2021-06-15 12:48:34'),
(190, '6274330a-ba6f-472f-a294-0212fb4bff89', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-15 12:54:34', '2021-06-15 12:54:34'),
(191, 'd6235dd9-ea5f-42d0-b792-c36579400c9c', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-15 12:56:57', '2021-06-15 12:56:57'),
(192, '5165b98b-9d55-4103-a2d0-48eede1c452d', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-15 13:00:46', '2021-06-15 13:00:46'),
(193, '00c40579-d7fd-4702-b3ef-ed0e3c2543e0', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-15 13:02:01', '2021-06-15 13:02:01'),
(194, '153edcfa-da8b-4f14-ad12-f9c5bb9d530a', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-15 13:07:06', '2021-06-15 13:07:06'),
(195, '0ce1a948-5da9-4725-8e0b-7d9ac8fe79f7', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-15 13:08:45', '2021-06-15 13:08:45'),
(196, 'ce4ef88b-1650-4099-a8a4-efe21e993561', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-15 13:09:25', '2021-06-15 13:09:25'),
(197, 'efd6985f-503d-4851-a98e-37b19055021e', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-15 13:10:42', '2021-06-15 13:10:42'),
(198, 'dce8615a-4e9a-4ce8-b224-3ed482ea199f', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-15 13:13:37', '2021-06-15 13:13:37'),
(199, 'abd99fdf-7f88-47a5-a73d-fea86ef1c926', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-15 13:13:47', '2021-06-15 13:13:47'),
(200, 'bab1ca97-92bd-425f-86dd-ba389c9bf9f4', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-15 13:15:06', '2021-06-15 13:15:06'),
(201, 'b2b38600-233e-4449-9937-eb06df3a972b', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-15 13:20:46', '2021-06-15 13:20:46'),
(202, '7f5b8022-7679-4a83-88d3-831b21a5bc44', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-15 13:26:02', '2021-06-15 13:26:02'),
(203, '35cfca54-517c-46bf-87b1-c91c531944a2', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-15 13:28:49', '2021-06-15 13:28:49'),
(204, 'dd3cbdb3-bb19-4287-b7f7-7697f1b5aeef', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-15 13:32:22', '2021-06-15 13:32:22'),
(205, '0b141e85-5636-44e0-9788-e3380030ef66', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-15 13:34:33', '2021-06-15 13:34:33'),
(206, '475e9b7e-a5d4-4357-aae8-218c65558655', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-15 13:35:27', '2021-06-15 13:35:27'),
(207, 'ceb0272a-89f5-42df-809c-b4b69fb10a2c', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-15 13:37:03', '2021-06-15 13:37:03'),
(208, 'a85cd144-e2d7-4784-947f-9bdf2bf1d0b0', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-15 13:43:48', '2021-06-15 13:43:48'),
(209, '4fb6c1f4-dfa3-48eb-b61f-03faa8d197cc', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-15 13:44:44', '2021-06-15 13:44:44'),
(210, 'f8f7b444-ea58-41d8-b925-cd223d2b3a03', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-15 13:50:10', '2021-06-15 13:50:10'),
(211, '5630622e-b216-4d28-9ef0-cf00e7e547b9', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-15 13:51:08', '2021-06-15 13:51:08'),
(212, 'f899f40e-48bb-43cb-8549-d23495d995e0', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-15 13:52:03', '2021-06-15 13:52:03'),
(213, '54e98c66-0e35-459d-ac45-56ec23095649', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-15 13:52:29', '2021-06-15 13:52:29'),
(214, '12d7d238-a685-4872-8780-50d2c91b8698', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-15 13:56:21', '2021-06-15 13:56:21'),
(215, 'ff58a609-1deb-4d3d-ac7f-d6ab33475b18', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-15 13:57:23', '2021-06-15 13:57:23'),
(216, '4417ca02-8839-4054-babf-1324022d4f57', 0, 0, 0, 0, '::ffff:127.0.0.1', NULL, 4, '2021-06-15 13:57:37', '2021-06-15 13:57:37'),
(217, 'd0db1cf5-cbbe-4fbb-a48d-79fdd5d6d3b6', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-15 13:57:52', '2021-06-15 13:57:52'),
(218, '552de9d6-aeda-452b-8b5a-f63438895b2e', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-15 13:59:55', '2021-06-15 13:59:55'),
(219, 'b0e65d47-a022-4b90-9c84-1eb44aa5e76a', 0, 0, 0, 0, '::1', NULL, 4, '2021-06-15 16:04:12', '2021-06-15 16:04:12');

-- --------------------------------------------------------

--
-- Table structure for table `executivenotifications`
--

CREATE TABLE `executivenotifications` (
  `execu_notification_id` int NOT NULL,
  `execu_notification_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `isPaused` tinyint(1) DEFAULT '0',
  `notification_text` text NOT NULL,
  `isRead` tinyint(1) NOT NULL DEFAULT '0',
  `field_id` int NOT NULL,
  `notification_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `executivenotifications`
--

INSERT INTO `executivenotifications` (`execu_notification_id`, `execu_notification_uuid`, `deleted`, `isPaused`, `notification_text`, `isRead`, `field_id`, `notification_id`, `createdAt`, `updateTimestamp`) VALUES
(1, 'b93f9b92-3979-492d-aa6c-f8e4d1bbf4f3', 0, 0, 'You have started working on the Already Registered Agency Saad Sohail...!!!', 1, 4, 2, '2021-06-08 15:30:22', '2021-06-15 14:00:02'),
(2, '2092b555-185f-4d6f-92bf-949c6979f863', 0, 0, 'You have started working on the Already Registered Agency Saad Sohail...!!!                            ', 1, 4, 2, '2021-06-08 15:31:15', '2021-06-15 12:16:33'),
(4, '3f1cab17-2009-4af0-ad3f-3993dca2de3c', 0, 0, 'Some notification', 1, 4, 2, '2021-06-09 12:22:49', '2021-06-15 12:16:33'),
(5, '3286d847-508d-4eb7-9fc8-087cea4284dd', 0, 0, 'Some other notification', 1, 4, 1, '2021-06-09 12:22:49', '2021-06-15 12:16:33'),
(6, 'b320558c-cf9f-4016-b2eb-7393c4ab4c28', 0, 0, 'Whatever notification', 1, 4, 1, '2021-06-09 12:22:49', '2021-06-14 17:11:23'),
(7, 'bf3e10d0-5aaa-42af-b651-efa421543a03', 0, 0, 'Some notification', 1, 4, 2, '2021-06-09 12:22:49', '2021-06-14 17:15:44');

-- --------------------------------------------------------

--
-- Table structure for table `executive_advert_stock`
--

CREATE TABLE `executive_advert_stock` (
  `field_e_stock_id` int NOT NULL,
  `field_e_stock_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `total_Quantity` int DEFAULT NULL,
  `team_adver_stock_id` int NOT NULL,
  `field_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `executive_stock_usage`
--

CREATE TABLE `executive_stock_usage` (
  `stock_Usage_id` int NOT NULL,
  `stock_Usage_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `stock_Usage_dateTime` datetime DEFAULT NULL,
  `stock_Usage_given` int DEFAULT NULL,
  `field_id` int NOT NULL,
  `agency_id` int NOT NULL,
  `field_e_stock_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `field_executive`
--

CREATE TABLE `field_executive` (
  `field_id` int NOT NULL,
  `field_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `field_name` text,
  `field_userProfilePic` text,
  `field_contact` text,
  `field_target` text,
  `field_DOB` text NOT NULL,
  `field_salary` text,
  `salaryStatus` tinyint(1) DEFAULT '0',
  `field_commission` text,
  `field_username` text,
  `field_isDeleted` tinyint(1) DEFAULT '0',
  `field_isPaused` tinyint(1) DEFAULT '0',
  `login_id` int NOT NULL,
  `team_L_id` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `field_executive`
--

INSERT INTO `field_executive` (`field_id`, `field_uuid`, `field_name`, `field_userProfilePic`, `field_contact`, `field_target`, `field_DOB`, `field_salary`, `salaryStatus`, `field_commission`, `field_username`, `field_isDeleted`, `field_isPaused`, `login_id`, `team_L_id`, `createdAt`, `updateTimestamp`) VALUES
(1, 'ce1308f8-0452-42f6-b900-a144ea3ab1f3', NULL, NULL, NULL, NULL, '', NULL, 0, NULL, NULL, 0, 0, 2, NULL, '2021-04-19 14:45:32', '2021-04-19 14:45:32'),
(2, '2723ae86-d5e5-47e4-a7e8-c99d852213e7', NULL, NULL, NULL, NULL, '', NULL, 0, NULL, NULL, 0, 0, 3, NULL, '2021-04-19 14:46:07', '2021-04-19 14:46:07'),
(3, 'ad73ea0a-8c17-42fd-a469-289f9b5c363d', NULL, NULL, NULL, NULL, '', NULL, 0, NULL, NULL, 0, 0, 4, 2, '2021-04-19 15:07:30', '2021-04-19 15:07:30'),
(4, 'aef06ba4-8d47-4810-92c1-9f4942fcd473', 'Saad', '/userprofileImage/c5dcd668-86ba-4bac-9da1-26d1c90e1ed8.png', '031245555', NULL, '2010-01-04', NULL, 0, NULL, 'rsasdasd12321', 0, 0, 5, NULL, '2021-04-19 15:19:48', '2021-06-15 13:59:35'),
(5, '943e6d5f-dc74-4b14-b3f3-29ec87b0f597', NULL, NULL, NULL, NULL, '', NULL, 0, NULL, NULL, 0, 0, 6, NULL, '2021-05-20 11:46:57', '2021-05-20 11:46:57');

-- --------------------------------------------------------

--
-- Table structure for table `field_executive_earning`
--

CREATE TABLE `field_executive_earning` (
  `field_exe_earn_id` int NOT NULL,
  `field_exe_earn_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `paused` tinyint(1) DEFAULT '0',
  `withdrawed` tinyint(1) DEFAULT '0',
  `bank_sale` tinyint(1) DEFAULT '0',
  `bank_deposited` tinyint(1) DEFAULT '0',
  `bank_deposited_referenceNumber` int DEFAULT NULL,
  `bank_datetime` datetime DEFAULT NULL,
  `accountant_approve` tinyint(1) DEFAULT '0',
  `account_approve_datetime` datetime DEFAULT NULL,
  `account_decline` tinyint(1) DEFAULT '0',
  `account_decline_dateTime` datetime DEFAULT NULL,
  `account_decline_reason` text,
  `field_id` int NOT NULL,
  `list_act_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `field_executive_pending_earning`
--

CREATE TABLE `field_executive_pending_earning` (
  `field_exe_earn_id` int NOT NULL,
  `field_exe_earn_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `paused` tinyint(1) DEFAULT '0',
  `withdrawed` tinyint(1) DEFAULT '0',
  `bank_sale` tinyint(1) DEFAULT '0',
  `bank_deposited` tinyint(1) DEFAULT '0',
  `bank_deposited_referenceNumber` int DEFAULT NULL,
  `bank_datetime` datetime DEFAULT NULL,
  `accountant_approve` tinyint(1) DEFAULT '0',
  `account_approve_datetime` datetime DEFAULT NULL,
  `account_decline` tinyint(1) DEFAULT '0',
  `account_decline_dateTime` datetime DEFAULT NULL,
  `account_decline_reason` text,
  `field_id` int NOT NULL,
  `list_act_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `field_executive_withdraws`
--

CREATE TABLE `field_executive_withdraws` (
  `field_exe_with_id` int NOT NULL,
  `field_exe_with_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `withdraw_status` tinyint(1) DEFAULT '0',
  `totalAmount` int DEFAULT NULL,
  `field_id` int NOT NULL,
  `field_exe_earn_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `gmlogin`
--

CREATE TABLE `gmlogin` (
  `gm_Company_login_id` int NOT NULL,
  `gm_Company_login_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `isPaused` tinyint(1) DEFAULT '0',
  `loggedInStatus` tinyint(1) DEFAULT '0',
  `loggedOutStatus` tinyint(1) DEFAULT '0',
  `loggedOutDate` datetime DEFAULT NULL,
  `ipAddress` text,
  `gm_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `gm_notifications`
--

CREATE TABLE `gm_notifications` (
  `gm_Company_notification_id` int NOT NULL,
  `gm_Company_notification_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `isPaused` tinyint(1) DEFAULT '0',
  `notification_title` text,
  `notification_text` text,
  `isRead` tinyint(1) NOT NULL DEFAULT '0',
  `gm_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `lists`
--

CREATE TABLE `lists` (
  `list_id` int NOT NULL,
  `list_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `list_name` text,
  `list_deleted` tinyint(1) DEFAULT '0',
  `list_paused` tinyint(1) DEFAULT '0',
  `isBank` tinyint(1) NOT NULL DEFAULT '0',
  `bankAmount` float DEFAULT NULL,
  `commissionAmount` float NOT NULL,
  `list_amount` int DEFAULT NULL,
  `list_description` text,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `lists`
--

INSERT INTO `lists` (`list_id`, `list_uuid`, `list_name`, `list_deleted`, `list_paused`, `isBank`, `bankAmount`, `commissionAmount`, `list_amount`, `list_description`, `createdAt`, `updateTimestamp`) VALUES
(1, 'f349ff23-66a9-418b-9d41-e954bc1b3f1e', 'New Agency', 0, 0, 0, NULL, 0, 50, 'Since the above was an OR involving the same field, Sequelize allows you to use a slightly different structure which is more readable and generates the same behavior', '2021-04-19 16:47:23', '2021-04-19 16:47:23'),
(2, '336c77d3-bb16-44d6-9ec5-a4aecc742a57', 'Testing 123', 0, 0, 1, 12, 0, 5, 'Note the usage of the sequelize.fn and sequelize.col methods, which should be used to specify an SQL function call and a table column, respectively. These methods should be used instead of passing a plain string (such as char_length(content)) because Sequelize needs to treat this situation differently (for example, using other symbol escaping approaches).', '2021-04-21 13:00:00', '2021-04-21 13:00:00'),
(3, '7d218ff5-c75f-4a61-98a6-ab984a0a4827', 'Testing1222', 0, 0, 1, 40.01, 5, 25, 'Note the usage of the sequelize.fn and sequelize.col methods, which should be used to specify an SQL function call and a table column, respectively. These methods should be used instead of passing a plain string (such as char_length(content)) because Sequelize needs to treat this situation differently (for example, using other symbol escaping approaches).', '2021-04-21 15:04:09', '2021-04-21 15:04:09'),
(4, '7d7cd5e3-3e6c-42f6-b99d-0d252095f998', 'Testing again', 0, 0, 0, NULL, 0, 30, 'Bind parameters are like replacements. Except replacements are escaped and inserted into the query by sequelize before the query is sent to the database, while bind parameters are sent to the database outside the SQL query text. A query can have either bind parameters or replacements. Bind parameters are referred to by either $1, $2, ... (numeric) or $key (alpha-numeric). This is independent of the dialect.', '2021-04-22 12:22:54', '2021-04-22 12:22:54');

-- --------------------------------------------------------

--
-- Table structure for table `list_sub_activities`
--

CREATE TABLE `list_sub_activities` (
  `list_sub_act_id` int NOT NULL,
  `list_sub_act_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `list_id` int NOT NULL,
  `list_act_id` int NOT NULL,
  `list_deleted` tinyint(1) DEFAULT '0',
  `list_paused` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `list_sub_activities`
--

INSERT INTO `list_sub_activities` (`list_sub_act_id`, `list_sub_act_uuid`, `list_id`, `list_act_id`, `list_deleted`, `list_paused`, `createdAt`, `updateTimestamp`) VALUES
(7, '2dcc0390-d329-442f-8fc3-2397322c4391', 1, 1, 0, 0, '2021-04-19 17:31:25', '2021-04-19 17:31:25'),
(8, 'f7c562ff-7a9f-4040-9386-e298f18ec3cb', 1, 4, 0, 0, '2021-04-21 15:23:57', '2021-04-21 15:23:57'),
(9, 'e67b610a-c34a-4226-a069-925b858367aa', 1, 5, 0, 0, '2021-04-21 15:26:01', '2021-04-21 15:26:01'),
(10, '1ab31e2e-ce33-4ad5-b80f-05f37e01c466', 1, 6, 0, 0, '2021-04-21 16:54:21', '2021-04-21 16:54:21'),
(11, 'f2ce7338-c5c4-4dbb-b3fc-228ab5884552', 1, 7, 0, 0, '2021-04-21 16:55:11', '2021-04-21 16:55:11'),
(12, 'e26b3166-0f97-4190-97ad-c0fef6af9548', 1, 8, 0, 0, '2021-04-21 16:56:01', '2021-04-21 16:56:01'),
(13, 'f3ec00e0-5b39-4c85-ab62-bc3a0a016fc8', 1, 9, 0, 0, '2021-04-21 17:01:59', '2021-04-21 17:01:59'),
(14, 'bb5bba6b-9df8-4906-b8cc-cbdb6d1aedc9', 1, 10, 0, 0, '2021-04-21 17:03:05', '2021-04-21 17:03:05'),
(15, 'cf1e3327-2ab3-4988-bf84-b6c94cecade9', 1, 11, 0, 0, '2021-04-21 17:12:47', '2021-04-21 17:12:47'),
(16, '1f820d2a-76ce-4a99-ba93-cfe00cbe85e0', 1, 21, 0, 0, '2021-04-26 16:21:37', '2021-04-26 16:21:37'),
(17, '2cedecca-2131-4f57-8a8e-9f4d7b4af195', 1, 22, 0, 0, '2021-04-27 15:12:10', '2021-04-27 15:12:10'),
(18, '78d31abd-8570-4237-9752-beb23d762307', 1, 23, 0, 0, '2021-04-27 15:13:31', '2021-04-27 15:13:31'),
(19, '42c4fa30-1032-44c0-abe9-e6aea65f42f5', 1, 24, 0, 0, '2021-04-27 15:19:31', '2021-04-27 15:19:31'),
(20, '50b62264-ed3d-4b89-ba0c-e03947c28b90', 1, 25, 0, 0, '2021-04-27 15:29:31', '2021-04-27 15:29:31'),
(21, '5f0c217e-c9f4-44c7-9109-dbb7418496b8', 1, 26, 0, 0, '2021-04-27 15:33:47', '2021-04-27 15:33:47'),
(22, '40ee4ee9-6d4e-42f1-aa04-0a5c662587bd', 1, 27, 0, 0, '2021-04-27 15:34:30', '2021-04-27 15:34:30'),
(23, '0b8f56b2-1edd-4637-90d6-406347f18e86', 1, 28, 0, 0, '2021-04-27 16:56:20', '2021-04-27 16:56:20'),
(24, '846e06a3-2ac5-4f10-a72d-f3accdfb0b40', 1, 29, 0, 0, '2021-04-27 17:01:04', '2021-04-27 17:01:04'),
(25, '846e06a3-2ac5-4f10-a72d-f3accdfb0b40', 2, 29, 0, 0, '2021-04-27 17:01:04', '2021-04-27 17:01:04'),
(26, '846e06a3-2ac5-4f10-a72d-f3accdfb0b40', 3, 29, 0, 0, '2021-04-27 17:01:04', '2021-04-27 17:01:04'),
(27, '13bfd3d0-58eb-4716-9cda-0485d997b33d', 1, 30, 0, 0, '2021-04-27 17:34:51', '2021-04-27 17:34:51'),
(28, 'a7a08ca0-2f7e-4615-bb2b-77387c38ee2a', 1, 31, 0, 0, '2021-04-29 14:03:17', '2021-04-29 14:03:17'),
(29, '8c464c99-e83f-4434-864f-760598498a87', 3, 31, 0, 0, '2021-04-30 15:26:59', '2021-04-30 15:26:59'),
(30, '079f7bbc-8f7a-4fad-b813-94ac3d4504bf', 4, 31, 0, 0, '2021-04-30 15:26:59', '2021-04-30 15:26:59'),
(31, '655a79d2-798e-4fbf-87ed-e7aee8b8457a', 2, 31, 0, 0, '2021-04-30 15:26:59', '2021-04-30 15:26:59'),
(32, '91ed418c-6b36-4bc8-a37b-436a319c353f', 2, 31, 0, 0, '2021-04-30 15:28:38', '2021-04-30 15:28:38'),
(33, '65a12f8b-c11d-4913-844b-f027d5d20f6f', 3, 31, 0, 0, '2021-04-30 15:28:38', '2021-04-30 15:28:38'),
(34, '9fd0aec4-1bd3-4ce4-8c8c-147c0b4683bf', 4, 31, 0, 0, '2021-04-30 15:28:38', '2021-04-30 15:28:38'),
(35, '76375e81-c641-4ec4-90e9-0a6815e061a7', 2, 31, 0, 0, '2021-04-30 15:29:29', '2021-04-30 15:29:29'),
(36, 'fa13203e-73d7-4d80-b24f-fdc6db043a59', 3, 31, 0, 0, '2021-04-30 15:29:29', '2021-04-30 15:29:29'),
(37, 'c8911365-29de-4237-82e4-f96302a52ae9', 4, 31, 0, 0, '2021-04-30 15:29:29', '2021-04-30 15:29:29'),
(38, '6969b1ee-929b-4492-bbdf-3a8c68b8d1a4', 2, 31, 0, 0, '2021-04-30 15:33:23', '2021-04-30 15:33:23'),
(39, '9160ba53-4ab5-4813-a7b0-da9e8a5c4d22', 1, 32, 0, 0, '2021-04-30 15:54:35', '2021-04-30 15:54:35'),
(40, 'cf17a279-1ffb-4dca-86b9-1732eb464fe0', 2, 32, 0, 0, '2021-04-30 15:54:55', '2021-04-30 15:54:55'),
(41, '52f0e6b9-eef1-44dd-a143-17d93ba697fc', 3, 32, 0, 0, '2021-04-30 15:54:55', '2021-04-30 15:54:55'),
(42, '9a91c62f-2dbc-4f2c-af0b-7d87e78b2c08', 1, 33, 0, 0, '2021-04-30 16:00:31', '2021-04-30 16:00:31'),
(43, 'eff9c624-8ce3-47bb-bcef-f6ce23e4c945', 2, 33, 0, 0, '2021-04-30 16:00:37', '2021-04-30 16:00:37'),
(44, '01134dc9-84d2-445d-acd3-9aa78cf1b437', 3, 33, 0, 0, '2021-04-30 16:00:49', '2021-04-30 16:00:49'),
(45, '8823158e-1ac5-4870-ae0f-8f714700ed49', 1, 34, 0, 0, '2021-05-03 17:03:49', '2021-05-03 17:03:49'),
(46, '8836815c-9cac-4545-82fa-6d0b02c589db', 1, 35, 0, 0, '2021-05-03 17:08:35', '2021-05-03 17:08:35'),
(47, '0a8009e5-4e99-4c3e-accf-ca4b01c8abca', 2, 40, 0, 0, '2021-05-06 16:08:17', '2021-05-06 16:08:17'),
(48, 'de225b41-3a5d-4b81-8c56-f161f8dd9f2a', 3, 40, 0, 0, '2021-05-06 16:08:31', '2021-05-06 16:08:31'),
(49, 'c390d71a-6cb8-4e81-b40a-8b12dbe7a610', 1, 43, 0, 0, '2021-05-26 15:32:17', '2021-05-26 15:32:17'),
(50, 'bf5bcb9a-2be7-4efc-879a-b96cda5c5a6a', 3, 43, 0, 0, '2021-05-26 15:33:14', '2021-05-26 15:33:14'),
(51, '146f255c-393d-4a40-8e7c-04d0bafa4d6f', 2, 43, 0, 0, '2021-05-26 15:33:14', '2021-05-26 15:33:14');

-- --------------------------------------------------------

--
-- Table structure for table `login_page`
--

CREATE TABLE `login_page` (
  `login_page_id` int NOT NULL,
  `login_page_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `paused` tinyint(1) DEFAULT '0',
  `deleted` tinyint(1) DEFAULT '0',
  `loginTitle` text,
  `btnText` text,
  `forgetText` text,
  `forgetEmail` text,
  `forgetPassword` text,
  `createAccountText` text,
  `pictureName` text,
  `pictureFolder` text,
  `createAccountIcon` text,
  `emailPlaceHolder` text,
  `emailIcon` text,
  `passwordPlaceHolder` text,
  `passwordIcon` text,
  `sa_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `login_page`
--

INSERT INTO `login_page` (`login_page_id`, `login_page_uuid`, `paused`, `deleted`, `loginTitle`, `btnText`, `forgetText`, `forgetEmail`, `forgetPassword`, `createAccountText`, `pictureName`, `pictureFolder`, `createAccountIcon`, `emailPlaceHolder`, `emailIcon`, `passwordPlaceHolder`, `passwordIcon`, `sa_id`, `createdAt`, `updateTimestamp`) VALUES
(1, '35deaf51-83e8-4b96-a625-144b7d245ab0', 0, 0, 'Member Login', 'Login', 'Forgot', 'Email', 'Password', 'Create your Account', 'img-01.png', '/img/', 'fa fa-long-arrow-right m-l-5', 'Enter Email', 'fa fa-envelope', 'Enter Password', 'fa fa-lock', 1, '2021-04-19 14:38:41', '2021-04-19 14:38:41');

-- --------------------------------------------------------

--
-- Table structure for table `managerlogin`
--

CREATE TABLE `managerlogin` (
  `manager_login_id` int NOT NULL,
  `manager_login_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `isPaused` tinyint(1) DEFAULT '0',
  `loggedInStatus` tinyint(1) DEFAULT '0',
  `loggedOutStatus` tinyint(1) DEFAULT '0',
  `loggedOutDate` datetime DEFAULT NULL,
  `ipAddress` text,
  `man_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `managernotifications`
--

CREATE TABLE `managernotifications` (
  `manager_notification_id` int NOT NULL,
  `manager_notification_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `isPaused` tinyint(1) DEFAULT '0',
  `notification_title` text,
  `notification_text` text,
  `isRead` tinyint(1) NOT NULL DEFAULT '0',
  `man_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `managers`
--

CREATE TABLE `managers` (
  `man_id` int NOT NULL,
  `man_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `man_name` text,
  `man_email` text,
  `man_password` text,
  `man_userProfilePic` text,
  `man_contact` text,
  `man_isDeleted` tinyint(1) DEFAULT '0',
  `man_salary` text,
  `man_username` text,
  `d_id` int NOT NULL,
  `zone_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `managers`
--

INSERT INTO `managers` (`man_id`, `man_uuid`, `man_name`, `man_email`, `man_password`, `man_userProfilePic`, `man_contact`, `man_isDeleted`, `man_salary`, `man_username`, `d_id`, `zone_id`, `createdAt`, `updateTimestamp`) VALUES
(1, 'dbae7a77-bd5c-42ff-acde-c042596b3b5c', 'Manager', 'manager@info.com', '$2b$10$WfgW1aVsxJOZ1tD.yMRSBuHFPl9NtHyiJJJSGRUt4EgbC5hEp1P1G', 'manager.png', '0333-5214777', 0, '140000', 'manager_12', 1, 1, '2021-04-19 14:38:37', '2021-04-19 14:38:37');

-- --------------------------------------------------------

--
-- Table structure for table `notificationtext`
--

CREATE TABLE `notificationtext` (
  `notification_id` int NOT NULL,
  `notification_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `isPaused` tinyint(1) DEFAULT '0',
  `notification_title` text,
  `notification_icon` text NOT NULL,
  `isRead` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `notificationtext`
--

INSERT INTO `notificationtext` (`notification_id`, `notification_uuid`, `deleted`, `isPaused`, `notification_title`, `notification_icon`, `isRead`, `createdAt`, `updateTimestamp`) VALUES
(1, '2b6f2cdd-bfbc-4b98-83fa-670e7d3d9ddd', 0, 0, 'Created New Agency', 'fa fa-home', 0, '2021-06-08 14:22:43', '2021-06-08 14:22:43'),
(2, 'eb82ee5a-606c-4675-900d-c6319ff8ec90', 0, 0, 'Start Activity on Existing Agnecy', 'fa fa-building', 0, '2021-06-08 15:25:23', '2021-06-08 15:25:23'),
(3, '2f95a32a-ff28-4728-9185-7d10b1752bb6', 0, 0, 'Start Activity on Existing Agnecy', 'fa fa-building', 0, '2021-06-08 15:26:00', '2021-06-08 15:26:00');

-- --------------------------------------------------------

--
-- Table structure for table `packages`
--

CREATE TABLE `packages` (
  `pack_id` int NOT NULL,
  `pack_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `isPaused` tinyint(1) DEFAULT '0',
  `pack_name` text,
  `description` text,
  `pack_type` text,
  `pack_amount` float NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `pendance_clearance_details`
--

CREATE TABLE `pendance_clearance_details` (
  `clearance_details_id` int NOT NULL,
  `clearance_details_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `paused` tinyint(1) DEFAULT '0',
  `deleted` tinyint(1) DEFAULT '0',
  `pending_days` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `permmission_id` int NOT NULL,
  `permmission_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `paused` tinyint(1) DEFAULT '0',
  `d_deleted` tinyint(1) DEFAULT '0',
  `permission_name` text,
  `controller` text,
  `icon` text,
  `edit` tinyint(1) DEFAULT '0',
  `delete_permission` tinyint(1) DEFAULT '0',
  `add_permission` tinyint(1) DEFAULT '1',
  `update_permission` tinyint(1) DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`permmission_id`, `permmission_uuid`, `paused`, `d_deleted`, `permission_name`, `controller`, `icon`, `edit`, `delete_permission`, `add_permission`, `update_permission`, `createdAt`, `updateTimestamp`) VALUES
(1, '6777de47-b44d-41e0-a079-9cac5f34e413', 0, 0, 'Manage Freelancers', '/manageFreelancer', '', 0, 0, 1, 1, '2021-04-16 15:32:33', '2021-04-16 15:32:33'),
(2, '70c27b4d-5fab-442d-b737-147728afc8da', 0, 0, 'My Profile', '/Profile', 'fa fa-user', 0, 0, 1, 1, '2021-04-16 15:37:34', '2021-04-16 15:37:34'),
(3, '84ea0918-22d3-4795-8b55-b5b50a19a591', 0, 0, 'My Sales', '/mysales', 'fa fa-line-chart', 0, 0, 1, 1, '2021-04-16 15:39:31', '2021-04-16 15:39:31'),
(4, 'b334df6c-e764-4aa0-9035-bea43d822ba2', 0, 0, 'Earning', '/earning', 'fa fa-usd', 0, 0, 1, 1, '2021-04-16 15:51:58', '2021-04-16 15:51:58'),
(5, 'ca16992a-09cf-4e4f-a8c9-1738265b5498', 0, 0, 'Team Info', '/teamInfo', 'fa fa-users', 0, 0, 1, 1, '2021-04-16 15:53:55', '2021-04-16 15:53:55'),
(6, 'bc89dd11-5c2d-448e-9a25-0c51d15f5024', 0, 0, 'Area of Working', '/areaOf_Working', 'fa fa-globe', 0, 0, 1, 1, '2021-04-16 16:08:27', '2021-04-16 16:08:27'),
(7, 'f0f94f79-ae63-4eab-80a3-b89d39fe0653', 0, 0, 'Progress Analytics', '/progressAnalytics', 'fa fa-tasks', 0, 0, 1, 1, '2021-04-16 16:09:00', '2021-04-16 16:09:00'),
(8, '3d9120d3-7415-4c40-9df5-3d6ece96aa0e', 0, 0, 'Withdraws', '/withdraws', 'fa fa-money', 0, 0, 1, 1, '2021-04-16 16:11:03', '2021-04-16 16:11:03'),
(9, 'ac5cb00b-de2b-4951-93e9-a318667e31e6', 1, 1, 'Notifications', '/notifications', 'fa fa-bell', 0, 0, 1, 1, '2021-04-16 16:11:30', '2021-04-16 16:11:30'),
(10, '496c9437-abc9-4fb4-9c35-c460fdd51cbb', 0, 0, 'Company Deposits', '/companyDeposits', 'fa fa-building-o', 0, 0, 1, 1, '2021-04-16 16:12:15', '2021-04-16 16:12:15'),
(11, '741095d4-18d0-4695-b723-81756a90a45f', 0, 0, 'Start Activity', '/startActivity', 'fa fa-tasks', 0, 0, 1, 1, '2021-04-16 16:12:48', '2021-04-16 16:12:48'),
(12, '80dff99c-df3c-451b-8a36-3eaf9cbb25f0', 0, 0, 'Manage Managers', NULL, NULL, 0, 0, 1, 1, '2021-04-23 15:30:17', '2021-04-23 15:30:17'),
(13, '4c982daa-b39d-4e13-ab2c-385272566c63', 0, 0, 'View Agencies', '/viewAgencies', 'fa fa-building-o', 0, 0, 1, 1, '2021-04-23 15:31:14', '2021-04-23 15:31:14'),
(14, 'd70a44e8-ba26-4bdf-bef7-aa2a2d65b6c1', 0, 0, 'Dashboard', '/dashboard', 'fa fa-bars', 0, 0, 1, 1, '2021-05-07 12:14:52', '2021-05-07 12:14:52');

-- --------------------------------------------------------

--
-- Table structure for table `permission_role_assosiate`
--

CREATE TABLE `permission_role_assosiate` (
  `perm_assos_id` int NOT NULL,
  `perm_assos_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `paused` tinyint(1) DEFAULT '0',
  `d_deleted` tinyint(1) DEFAULT '0',
  `permmission_id` int NOT NULL,
  `user_role_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `permission_role_assosiate`
--

INSERT INTO `permission_role_assosiate` (`perm_assos_id`, `perm_assos_uuid`, `paused`, `d_deleted`, `permmission_id`, `user_role_id`, `createdAt`, `updateTimestamp`) VALUES
(1, 'dc8e55c5-dfd5-4d0f-8eb6-faf7af3c6836', 0, 0, 2, 5, '2021-04-16 16:19:12', '2021-04-16 16:19:12'),
(2, '291253a4-62bf-4e25-9193-ee409013b7c2', 0, 0, 2, 6, '2021-04-16 16:19:39', '2021-04-16 16:19:39'),
(3, '92ddef42-f6d6-4bf9-875d-ff003ada6ef5', 0, 0, 3, 6, '2021-04-16 16:19:58', '2021-04-16 16:19:58'),
(4, '87f5f9ad-71e5-4853-b6ca-65f696fef670', 0, 0, 3, 5, '2021-04-16 16:20:04', '2021-04-16 16:20:04'),
(5, '19cd41ee-904e-43b8-a370-0254fc862feb', 0, 0, 4, 5, '2021-04-16 16:20:22', '2021-04-16 16:20:22'),
(6, '733cf7fa-202d-4696-8722-b6be4ed58b22', 0, 0, 4, 6, '2021-04-16 16:20:30', '2021-04-16 16:20:30'),
(7, 'e3cf0625-bf4c-4bb4-913c-e5d740569f6d', 0, 0, 5, 5, '2021-04-16 16:20:49', '2021-04-16 16:20:49'),
(8, '54fc9a0e-ea88-4c1a-9015-2c64cb02c9d9', 0, 0, 6, 5, '2021-04-16 16:21:17', '2021-04-16 16:21:17'),
(9, '2690dddf-4009-4c4e-a9f2-575f14222d58', 0, 0, 7, 5, '2021-04-16 16:22:07', '2021-04-16 16:22:07'),
(10, '1bfec392-7265-436d-82d2-f531082a97a6', 0, 0, 7, 6, '2021-04-16 16:22:36', '2021-04-16 16:22:36'),
(11, '6543d015-4e6c-4ca7-80be-33e53d48efa7', 0, 0, 8, 6, '2021-04-16 16:22:50', '2021-04-16 16:22:50'),
(12, 'cd476ac6-3d43-4315-b056-b50fa389c6c2', 0, 0, 8, 5, '2021-04-16 16:31:51', '2021-04-16 16:31:51'),
(13, '19aa895b-17e2-4d50-a328-a156fdff338a', 0, 0, 9, 5, '2021-04-16 16:32:11', '2021-04-16 16:32:11'),
(14, '928c59dd-64bc-47f6-8391-fe6a03141c78', 0, 0, 9, 6, '2021-04-16 16:32:16', '2021-04-16 16:32:16'),
(15, 'fe721d8e-6cbf-4257-93f4-00c741b5cc2e', 0, 0, 10, 5, '2021-04-16 16:32:30', '2021-04-16 16:32:30'),
(16, 'fc97a046-0a79-42ec-b42a-db9a3c0d931e', 0, 0, 11, 5, '2021-04-16 16:32:41', '2021-04-16 16:32:41'),
(17, '36243bf8-d046-4573-ae38-7843acd3806a', 0, 0, 11, 6, '2021-04-16 16:32:46', '2021-04-16 16:32:46'),
(18, 'e7974533-5f73-4e28-b10e-fc636af2686d', 0, 0, 13, 5, '2021-04-23 15:32:08', '2021-04-23 15:32:08'),
(19, '0989d314-b2cf-4ef0-84c3-a9afaf7ef149', 0, 0, 13, 6, '2021-04-23 15:32:26', '2021-04-23 15:32:26'),
(20, 'de286e26-0a41-4317-b92c-0f027880ba6b', 0, 0, 14, 6, '2021-05-07 12:20:19', '2021-05-07 12:20:19'),
(21, 'af82b1a4-2545-4dda-a15f-bebafd3cc95a', 0, 0, 14, 5, '2021-05-07 12:20:28', '2021-05-07 12:20:28');

-- --------------------------------------------------------

--
-- Table structure for table `promotion_requests_status`
--

CREATE TABLE `promotion_requests_status` (
  `prom_req_id` int NOT NULL,
  `prom_req_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `isPaused` tinyint(1) DEFAULT '0',
  `prom_req_approve` tinyint(1) DEFAULT '0',
  `prom_req_decline` tinyint(1) DEFAULT '0',
  `prom_req_datetime` datetime DEFAULT NULL,
  `prom_req_approve_desc` text,
  `prom_req_decline_desc` text,
  `prom_id` int NOT NULL,
  `man_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `promotion_req_by_supervisor`
--

CREATE TABLE `promotion_req_by_supervisor` (
  `prom_id` int NOT NULL,
  `prom_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `isPaused` tinyint(1) DEFAULT '0',
  `prom_name` text,
  `prom_desc` text,
  `prom_requested_Date` datetime DEFAULT NULL,
  `prom_status` tinyint(1) DEFAULT '0',
  `city_id` int NOT NULL,
  `sup_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `receiving_calls`
--

CREATE TABLE `receiving_calls` (
  `receive_call_id` int NOT NULL,
  `call_recieve_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `isPaused` tinyint(1) DEFAULT '0',
  `receive_call_solved` tinyint(1) DEFAULT '0',
  `receive_call_status` tinyint(1) DEFAULT '0',
  `receive_call_problem_text` text,
  `receive_call_solution` text,
  `cust_care_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `request_of_advertisement`
--

CREATE TABLE `request_of_advertisement` (
  `req_adver` int NOT NULL,
  `request_of_adver_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `isPaused` tinyint(1) DEFAULT '0',
  `req_status` tinyint(1) DEFAULT '0',
  `req_approve` tinyint(1) DEFAULT '0',
  `req_decline` tinyint(1) DEFAULT '0',
  `req_decline_descrip` text,
  `req_name` text,
  `req_description` text,
  `req_type` text,
  `man_id` int NOT NULL,
  `gm_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `role_extrainfo`
--

CREATE TABLE `role_extrainfo` (
  `role_creden_id` int NOT NULL,
  `role_creden_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `paused` tinyint(1) DEFAULT '0',
  `deleted` tinyint(1) DEFAULT '0',
  `target` text,
  `salary` text,
  `commission` text,
  `user_role_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `role_extrainfo`
--

INSERT INTO `role_extrainfo` (`role_creden_id`, `role_creden_uuid`, `paused`, `deleted`, `target`, `salary`, `commission`, `user_role_id`, `createdAt`, `updateTimestamp`) VALUES
(1, '76771f99-5db6-4eef-86f4-69fc8606f3f6', 0, 0, NULL, NULL, NULL, 6, '2021-04-16 16:47:55', '2021-04-16 16:47:55'),
(2, '13b7f8f2-ffbe-4902-9875-fc4a62914687', 0, 0, '10', '15000', '0.25%', 5, '2021-04-16 16:49:37', '2021-04-16 16:49:37');

-- --------------------------------------------------------

--
-- Table structure for table `sa_logs_ondepartment`
--

CREATE TABLE `sa_logs_ondepartment` (
  `sa_on_Depart_id` int NOT NULL,
  `date_time` datetime DEFAULT NULL,
  `d_id` int DEFAULT NULL,
  `d_name` text,
  `d_deleted` tinyint(1) DEFAULT '0',
  `d_type` text,
  `comp_access_id` tinyint(1) DEFAULT NULL,
  `d_added_Date_Time` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `signup_page`
--

CREATE TABLE `signup_page` (
  `signUp_page_id` int NOT NULL,
  `signUp_page_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `paused` tinyint(1) DEFAULT '0',
  `deleted` tinyint(1) DEFAULT '0',
  `signUpTitle` text,
  `btnText` text,
  `alreadyHaveAccount` text,
  `alreadyHaveAccountIcon` text,
  `pictureName` text,
  `pictureFolder` text,
  `emailPlaceHolder` text,
  `emailIcon` text,
  `passwordPlaceHolder` text,
  `passwordIcon` text,
  `confirmPasswordPlaceHolder` text,
  `confirmPasswordIcon` text,
  `sa_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `signup_page`
--

INSERT INTO `signup_page` (`signUp_page_id`, `signUp_page_uuid`, `paused`, `deleted`, `signUpTitle`, `btnText`, `alreadyHaveAccount`, `alreadyHaveAccountIcon`, `pictureName`, `pictureFolder`, `emailPlaceHolder`, `emailIcon`, `passwordPlaceHolder`, `passwordIcon`, `confirmPasswordPlaceHolder`, `confirmPasswordIcon`, `sa_id`, `createdAt`, `updateTimestamp`) VALUES
(1, 'f9829bea-463b-4666-9c12-a6c2d7fb74ed', 0, 0, 'Member Registration', 'Register', 'Already have Account', 'fa fa-long-arrow-right m-l-5', 'img-01.png', '/img/', 'Enter Email', 'fa fa-envelope', 'Enter Password', 'fa fa-lock', 'Confirm your Password', 'fa fa-lock', 1, '2021-04-19 14:38:40', '2021-04-19 14:38:40');

-- --------------------------------------------------------

--
-- Table structure for table `supervisor`
--

CREATE TABLE `supervisor` (
  `sup_id` int NOT NULL,
  `sup_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `sup_name` text,
  `sup_userProfilePic` text,
  `sup_contact` text,
  `sup_target` text,
  `sup_salary` text,
  `sup_commission` text,
  `sup_username` text,
  `sup_isDeleted` tinyint(1) DEFAULT '0',
  `sup_isPaused` tinyint(1) DEFAULT '0',
  `login_id` int NOT NULL,
  `man_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `supervisor`
--

INSERT INTO `supervisor` (`sup_id`, `sup_uuid`, `sup_name`, `sup_userProfilePic`, `sup_contact`, `sup_target`, `sup_salary`, `sup_commission`, `sup_username`, `sup_isDeleted`, `sup_isPaused`, `login_id`, `man_id`, `createdAt`, `updateTimestamp`) VALUES
(1, '4a531f36-7ce3-43f5-91c3-2cf358d78357', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 2, 1, '2021-03-24 12:34:04', '2021-03-24 12:34:04');

-- --------------------------------------------------------

--
-- Table structure for table `supervisorlogin`
--

CREATE TABLE `supervisorlogin` (
  `supervisor_login_id` int NOT NULL,
  `supervisor_login_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `isPaused` tinyint(1) DEFAULT '0',
  `loggedInStatus` tinyint(1) DEFAULT '0',
  `loggedOutStatus` tinyint(1) DEFAULT '0',
  `loggedOutDate` datetime DEFAULT NULL,
  `ipAddress` text,
  `sup_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `supervisornotification`
--

CREATE TABLE `supervisornotification` (
  `supervisor_notification_id` int NOT NULL,
  `supervisor_notification_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `isPaused` tinyint(1) DEFAULT '0',
  `notification_title` text,
  `notification_text` text,
  `isRead` tinyint(1) NOT NULL DEFAULT '0',
  `sup_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `super_admin`
--

CREATE TABLE `super_admin` (
  `sa_id` int NOT NULL,
  `sa_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `sa_name` text,
  `sa_email` text,
  `sa_password` text,
  `sa_contact` text,
  `sa_profile_pic` text,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `super_admin`
--

INSERT INTO `super_admin` (`sa_id`, `sa_uuid`, `sa_name`, `sa_email`, `sa_password`, `sa_contact`, `sa_profile_pic`, `createdAt`, `updateTimestamp`) VALUES
(1, '84afc86e-b051-4928-97b6-b9ad38129591', 'Saad', 'superA@aa', '$2b$10$IhwmSCZDgheT3pCvaTd4YezxKSXPgXnS84r6HKXI.56uXawidQ8Ee', NULL, NULL, '2021-04-19 14:38:33', '2021-04-19 14:38:33');

-- --------------------------------------------------------

--
-- Table structure for table `teamlead_login`
--

CREATE TABLE `teamlead_login` (
  `teamLead_login_id` int NOT NULL,
  `teamLead_login_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `isPaused` tinyint(1) DEFAULT '0',
  `loggedInStatus` tinyint(1) DEFAULT '0',
  `loggedOutStatus` tinyint(1) DEFAULT '0',
  `loggedOutDate` datetime DEFAULT NULL,
  `ipAddress` text,
  `team_L_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `teamlead_notifications`
--

CREATE TABLE `teamlead_notifications` (
  `teamLead_notification_id` int NOT NULL,
  `teamLead_notification_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `isPaused` tinyint(1) DEFAULT '0',
  `notification_title` text,
  `notification_text` text,
  `isRead` tinyint(1) NOT NULL DEFAULT '0',
  `team_L_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `teaml_adver_stock`
--

CREATE TABLE `teaml_adver_stock` (
  `team_adver_stock_id` int NOT NULL,
  `team_adver_stock_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `total_Quantity` int DEFAULT NULL,
  `used` int DEFAULT NULL,
  `adver_stock_act_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `team_lead`
--

CREATE TABLE `team_lead` (
  `team_L_id` int NOT NULL,
  `team_L_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `team_L_name` text,
  `team_L_userProfilePic` text,
  `team_L_contact` text,
  `team_L_target` text,
  `team_L_salary` text,
  `team_L_commission` text,
  `team_L_username` text,
  `team_L_isDeleted` tinyint(1) DEFAULT '0',
  `team_L_isPaused` tinyint(1) DEFAULT '0',
  `city_area_id` int DEFAULT NULL,
  `sup_id` int DEFAULT NULL,
  `login_id` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `team_lead`
--

INSERT INTO `team_lead` (`team_L_id`, `team_L_uuid`, `team_L_name`, `team_L_userProfilePic`, `team_L_contact`, `team_L_target`, `team_L_salary`, `team_L_commission`, `team_L_username`, `team_L_isDeleted`, `team_L_isPaused`, `city_area_id`, `sup_id`, `login_id`, `createdAt`, `updateTimestamp`) VALUES
(1, '1c9741c6-492f-417c-a902-3459e1c374b9', 'Team Lead', 'Team Lead.jpg', '0321-8741000', '150', '85100', '1.5%', 'teamLead_11', 0, 0, 1, 1, 3, '2021-06-03 12:59:15', '2021-06-03 12:59:15'),
(3, 'e893aa9b-d4a1-41b5-9089-c1d2f3b02fa4', 'Team Lead', 'Team Lead.jpg', '0321-8741000', '150', '85100', '1.5%', 'teamLead_11', 0, 0, 1, 1, 1, '2021-06-03 13:04:05', '2021-06-03 13:04:05');

-- --------------------------------------------------------

--
-- Table structure for table `training`
--

CREATE TABLE `training` (
  `training_ID` int NOT NULL,
  `training_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `paused` tinyint(1) DEFAULT '0',
  `deleted` tinyint(1) DEFAULT '0',
  `name` text,
  `purpose` text,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `training_activities`
--

CREATE TABLE `training_activities` (
  `training_act_ID` int NOT NULL,
  `training_act_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `paused` tinyint(1) DEFAULT '0',
  `isComplete` tinyint(1) DEFAULT '0',
  `deleted` tinyint(1) DEFAULT '0',
  `completeDescription` text,
  `name` text,
  `purpose` text,
  `training_ID` int NOT NULL,
  `field_id` int NOT NULL,
  `team_L_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user_login_information`
--

CREATE TABLE `user_login_information` (
  `login_id` int NOT NULL,
  `login_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `paused` tinyint(1) DEFAULT '0',
  `deleted` tinyint(1) DEFAULT '0',
  `login_email` text,
  `login_password` text,
  `jwt` text,
  `verified` tinyint(1) DEFAULT '0',
  `user_role_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_login_information`
--

INSERT INTO `user_login_information` (`login_id`, `login_uuid`, `paused`, `deleted`, `login_email`, `login_password`, `jwt`, `verified`, `user_role_id`, `createdAt`, `updateTimestamp`) VALUES
(1, 'f416b96d-90c2-4eca-9977-ca88ddf7aefb', 0, 0, 'test@12', '$2b$10$yzvXW8fE.5cozYeXQPWLxO8aGQ9gP8zcJVCUGJdjRPKXhOx6Ua7Ou', NULL, 1, 6, '2021-04-19 14:38:39', '2021-04-19 14:38:39'),
(2, 'ec53183c-129c-4b99-9197-4a171c7bff00', 0, 0, 'Supervisor@gmail.com', '$2b$10$yzvXW8fE.5cozYeXQPWLxO8aGQ9gP8zcJVCUGJdjRPKXhOx6Ua7Ou', 'eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiU3VwZXJ2aXNvckBnbWFpbC5jb20iLCJpYXQiOjE2MTg4MjU1MzIsImV4cCI6MTYxOTQzMDMzMn0.D2q7ZZd70Uscxrvuaz1sMYDfWWTzOiTyvm42t1w_zgW2-vwrxC_1ak1iXeUS1JeT', 1, 3, '2021-04-19 14:45:32', '2021-04-19 14:45:32'),
(3, '28053ff9-2156-45ab-ba77-70366d47d2cc', 0, 0, 'team@gmail.com', '$2b$10$yzvXW8fE.5cozYeXQPWLxO8aGQ9gP8zcJVCUGJdjRPKXhOx6Ua7Ou', 'eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoidGVhbUBnbWFpbC5jb20iLCJpYXQiOjE2MTg4MjU1NjcsImV4cCI6MTYxOTQzMDM2N30.76zjMIoTRVRI2U5M8huG9Tpd4Dh70yljCGaWBIzg_rneav-xLc0AHFCk7PooC8n6', 1, 4, '2021-04-19 14:46:07', '2021-04-19 14:46:07'),
(4, 'c4c61caf-8a5a-4bec-a4fb-9839f5b0d4ff', 0, 0, 'rishat.81@gmai.com', '$2b$10$//pdVJzK66uhUWO5vteBd.QUllLxCAyTsAFz5Os1QrPN015T21ddu', 'eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoicmlzaGF0LjUwODFAZ21haWwuY29tIiwiaWF0IjoxNjE4ODI2ODQ5LCJleHAiOjE2MTk0MzE2NDl9.EAuwO3nDMbzcUTjw6jxsIIAiqLKBVYJogLgkY63kMX0818vHESjNzm_H3FNDlqHM', 1, 6, '2021-04-19 15:07:29', '2021-04-19 15:07:29'),
(5, 'c5dcd668-86ba-4bac-9da1-26d1c90e1ed8', 0, 0, 'rishat.5081@gmail.com', '$2b$10$EHPVAp721YaKKBjt4QpeW.g91md3G7rWrnWO.TpQ8/QSNuUSaFmBq', 'eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoicmlzaGF0LjUwODFAZ21haWwuY29tIiwiaWF0IjoxNjE4ODI3NTg3LCJleHAiOjE2MTk0MzIzODd9.YCVj-wJh32cKSQA3Uw9uwRldFdCYSSbw3XG-bb8CLjddF_KJ7l5kcrITr8-GKuLD', 1, 6, '2021-04-19 15:19:47', '2021-06-04 17:49:51'),
(6, '99009998-a33d-40b5-bcf8-6d3d4673209e', 0, 0, 'qqa!@A.COM', '$2b$10$Cr8Ij/WJ5YTPM1V1SRQnEOfJMxWRi41vXcY7QKw9.kUe60FPqMn4i', 'eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoicXFhIUBBLkNPTSIsImlhdCI6MTYyMTQ5MzIxNywiZXhwIjoxNjIyMDk4MDE3fQ.kOduARNeVMJMfuqR7MdzBmKAVnwkdCmYD84dX7WFOxTraojJnlpvCzDrVjiqP8Rx', 1, 6, '2021-05-20 11:46:57', '2021-05-20 12:08:28');

-- --------------------------------------------------------

--
-- Table structure for table `user_login_role`
--

CREATE TABLE `user_login_role` (
  `user_role_id` int NOT NULL,
  `user_role_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `paused` tinyint(1) DEFAULT '0',
  `deleted` tinyint(1) DEFAULT '0',
  `type_name` text,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_login_role`
--

INSERT INTO `user_login_role` (`user_role_id`, `user_role_uuid`, `paused`, `deleted`, `type_name`, `createdAt`, `updateTimestamp`) VALUES
(1, '8c2c3cff-499a-4244-81f1-baf413dafddc', 0, 0, 'GM Company', '2021-04-19 14:38:37', '2021-04-19 14:38:37'),
(2, '9f3681ec-d636-4eaf-9840-028ac33740bb', 0, 0, 'Manager', '2021-04-19 14:38:37', '2021-04-19 14:38:37'),
(3, '5cf7a754-ae83-43ab-953e-5d75075e9d83', 0, 0, 'SuperVisor', '2021-04-19 14:38:38', '2021-04-19 14:38:38'),
(4, 'ad2aada4-126b-4ef1-9edd-6b6a4d35b9df', 0, 0, 'Team Lead', '2021-04-19 14:38:38', '2021-04-19 14:38:38'),
(5, '7074ea6a-ff02-4dbe-8ba9-0615b9ab1e50', 0, 0, 'Field Executive', '2021-04-19 14:38:38', '2021-04-19 14:38:38'),
(6, 'c76f5529-9430-4aee-ab04-5315559d8384', 0, 0, 'Freelance Field Executive', '2021-04-19 14:38:38', '2021-04-19 14:38:38');

-- --------------------------------------------------------

--
-- Table structure for table `web_content`
--

CREATE TABLE `web_content` (
  `web_content_id` int NOT NULL,
  `web_content_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `paused` tinyint(1) DEFAULT '0',
  `deleted` tinyint(1) DEFAULT '0',
  `logo` text,
  `firstHeading` text,
  `secondHeading` text,
  `thirdHeading` text,
  `firstHeadingText` text,
  `secondHeadingText` text,
  `thirdHeadingText` text,
  `signUpbtn` text,
  `loginbtn` text,
  `firstCardHeading` text,
  `firstCardtext` text,
  `secondCardHeading` text,
  `secondCardtext` text,
  `thirdCardHeading` text,
  `thirdCardtext` text,
  `fourthCardHeading` text,
  `fourthCardtext` text,
  `fifthCardHeading` text,
  `fifthCardtext` text,
  `sixthCardHeading` text,
  `sixthCardtext` text,
  `seventhCardHeading` text,
  `seventhCardtext` text,
  `eighthCardHeading` text,
  `eighthCardtext` text,
  `ninthCardHeading` text,
  `ninthCardtext` text,
  `sa_id` int NOT NULL,
  `footer_heading_one` text,
  `footer_heading_second` text,
  `footer_heading_third` text,
  `footer_heading_fourth` text,
  `footer_heading_fifth` text,
  `footer_heading_one_content` text,
  `footer_heading_second_content` text,
  `footer_heading_third_content` text,
  `footer_heading_fourth_content` text,
  `footer_heading_fifth_content` text,
  `backgroundVideo` text,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `web_content`
--

INSERT INTO `web_content` (`web_content_id`, `web_content_uuid`, `paused`, `deleted`, `logo`, `firstHeading`, `secondHeading`, `thirdHeading`, `firstHeadingText`, `secondHeadingText`, `thirdHeadingText`, `signUpbtn`, `loginbtn`, `firstCardHeading`, `firstCardtext`, `secondCardHeading`, `secondCardtext`, `thirdCardHeading`, `thirdCardtext`, `fourthCardHeading`, `fourthCardtext`, `fifthCardHeading`, `fifthCardtext`, `sixthCardHeading`, `sixthCardtext`, `seventhCardHeading`, `seventhCardtext`, `eighthCardHeading`, `eighthCardtext`, `ninthCardHeading`, `ninthCardtext`, `sa_id`, `footer_heading_one`, `footer_heading_second`, `footer_heading_third`, `footer_heading_fourth`, `footer_heading_fifth`, `footer_heading_one_content`, `footer_heading_second_content`, `footer_heading_third_content`, `footer_heading_fourth_content`, `footer_heading_fifth_content`, `backgroundVideo`, `createdAt`, `updateTimestamp`) VALUES
(1, '69ed1314-e46c-44c6-b239-5a226b220820', 0, 0, '/logo/logo.png', 'What We Do', 'HOW WE DO IT', 'WHAT IT DELIVERS', 'ipsum dolor sit amet, consectetur adipisicing elit. Tempore sequi ut aut, possimus\n    eos ab. Aperiam iste ratione\n    aspernatur quod alias reprehenderit? Aspernatur ex dolorem fugiat quis consequuntur\n    repudiandae eveniet.', '. Tempore sequi ut aut, possimus eos ab. Aperiam iste ratione\n    aspernatur quod alias reprehenderit? Aspernatur ex dolorem fugiat quis consequuntur\n    repudiandae eveniet.', 'ipsum dolor sit amet, consectetur adipisicing elit. ab. Aperiam iste ratione\n    aspernatur quod alias reprehenderit? Aspernatur ex dolorem fugiat quis consequuntur\n    repudiandae eveniet.', 'Sign Up', 'Login', 'What We Do', ' Lorem ipsum dolor sit amet consectetur adipisicing elit.\n    Similique illum nulla modi?\n    Provident veritatis magni quae tempore\n    illum fugit molestiae ipsum? Quibusdam', 'What We Do', 'Lorem ipsum dolor sit amet consectetur adipisicing elit.\n    Similique illum nulla modi?\n    Provident veritatis magni quae tempore\n    illum fugit molestiae ipsum? Quibusdam', 'WHAT IT DELIVERS', 'Lorem ipsum dolor sit amet consectetur adipisicing elit.\n    Similique illum nulla modi?\n    Provident veritatis magni quae tempore\n    illum fugit molestiae ipsum? Quibusdam', 'What We Do', ' Lorem ipsum dolor sit amet consectetur adipisicing elit.\n    Similique illum nulla modi?\n    Provident veritatis magni quae tempore\n    illum fugit molestiae ipsum? Quibusdam', 'What We Do', 'Lorem ipsum dolor sit amet consectetur adipisicing elit.\n    Similique illum nulla modi?\n    Provident veritatis magni quae tempore\n    illum fugit molestiae ipsum? Quibusdam', 'WHAT IT DELIVERS', 'Lorem ipsum dolor sit amet consectetur adipisicing elit.\n    Similique illum nulla modi?\n    Provident veritatis magni quae tempore\n    illum fugit molestiae ipsum? Quibusdam', 'What We Do', ' Lorem ipsum dolor sit amet consectetur adipisicing elit.\n    Similique illum nulla modi?\n    Provident veritatis magni quae tempore\n    illum fugit molestiae ipsum? Quibusdam', 'What We Do', 'Lorem ipsum dolor sit amet consectetur adipisicing elit.\n    Similique illum nulla modi?\n    Provident veritatis magni quae tempore\n    illum fugit molestiae ipsum? Quibusdam', 'WHAT IT DELIVERS', 'Lorem ipsum dolor sit amet consectetur adipisicing elit.\n    Similique illum nulla modi?\n    Provident veritatis magni quae tempore\n    illum fugit molestiae ipsum? Quibusdam', 1, 'What we Do', 'our team', 'Newsfeed', 'pep life', 'Social media', '<li><a href=\"\">How it works</a></li>\n                                <li><a href=\"\">Where it works</a></li>', '<li><a href=\"\">management</a></li>\n                                    <li><a href=\"\">local leadership</a></li>\n                                    <li><a href=\"\">advisory board</a></li>', '<li><a href=\"\">management</a></li>\n                                         <li><a href=\"\">local leadership</a></li>\n                                         <li><a href=\"\">advisory board</a></li>', '<li><a href=\"\">history</a></li>\n                                    <li><a href=\"\">careers</a></li>\n                                    <li><a href=\"\">contact</a></li>', '<li><a href=\"\"><i class=\"fa fa-facebook\" aria-hidden=\"true\"></i> Facebook</a></li>\n                                      <li><a href=\"\"><i class=\"fa fa-google\" aria-hidden=\"true\"></i> Google</a></li>\n                                      <li><a href=\"\"><i class=\"fa fa-instagram\" aria-hidden=\"true\"></i> Instagram</a></li>', '/video/video.mp4', '2021-04-19 14:38:40', '2021-04-19 14:38:40');

-- --------------------------------------------------------

--
-- Table structure for table `zone`
--

CREATE TABLE `zone` (
  `zone_id` int NOT NULL,
  `zone_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `paused` tinyint(1) DEFAULT '0',
  `deleted` tinyint(1) DEFAULT '0',
  `zone_name` text,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `zone`
--

INSERT INTO `zone` (`zone_id`, `zone_uuid`, `paused`, `deleted`, `zone_name`, `createdAt`, `updateTimestamp`) VALUES
(1, 'c051d9b5-b7e0-4e9a-86b2-0f272a9b26b1', 0, 0, 'Punjab', '2021-04-19 14:38:36', '2021-04-19 14:38:36');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activities`
--
ALTER TABLE `activities`
  ADD PRIMARY KEY (`list_act_id`),
  ADD KEY `field_id` (`field_id`),
  ADD KEY `agency_id` (`agency_id`),
  ADD KEY `Activities_ibfk_2` (`comp_id`);

--
-- Indexes for table `activity_instruction`
--
ALTER TABLE `activity_instruction`
  ADD PRIMARY KEY (`act_instruc_id`);

--
-- Indexes for table `advertisement_recommendation`
--
ALTER TABLE `advertisement_recommendation`
  ADD PRIMARY KEY (`adver_recom_id`),
  ADD KEY `agency_id` (`agency_id`),
  ADD KEY `field_id` (`field_id`),
  ADD KEY `team_L_id` (`team_L_id`),
  ADD KEY `sup_id` (`sup_id`),
  ADD KEY `man_id` (`man_id`);

--
-- Indexes for table `advertising_stock`
--
ALTER TABLE `advertising_stock`
  ADD PRIMARY KEY (`adver_stock_id`),
  ADD KEY `req_adver` (`req_adver`);

--
-- Indexes for table `advertising_stock_allocation`
--
ALTER TABLE `advertising_stock_allocation`
  ADD PRIMARY KEY (`adver_stock_act_id`),
  ADD KEY `adver_stock_id` (`adver_stock_id`),
  ADD KEY `sup_id` (`sup_id`);

--
-- Indexes for table `agencytypes`
--
ALTER TABLE `agencytypes`
  ADD PRIMARY KEY (`agencytype_id`);

--
-- Indexes for table `agency_info`
--
ALTER TABLE `agency_info`
  ADD PRIMARY KEY (`agency_id`),
  ADD KEY `field_id` (`field_id`);

--
-- Indexes for table `carriers`
--
ALTER TABLE `carriers`
  ADD PRIMARY KEY (`carrier_id`),
  ADD KEY `sa_id` (`sa_id`),
  ADD KEY `comp_access_id` (`comp_access_id`);

--
-- Indexes for table `carriers_logs`
--
ALTER TABLE `carriers_logs`
  ADD PRIMARY KEY (`carrier_logs_id`);

--
-- Indexes for table `carriers_paid_payment`
--
ALTER TABLE `carriers_paid_payment`
  ADD PRIMARY KEY (`c_paid_id`),
  ADD KEY `sa_id` (`sa_id`),
  ADD KEY `c_s_payment_id` (`c_s_payment_id`);

--
-- Indexes for table `carriers_services`
--
ALTER TABLE `carriers_services`
  ADD PRIMARY KEY (`c_service_id`),
  ADD KEY `carrier_id` (`carrier_id`);

--
-- Indexes for table ` carriers_services_payment`
--
ALTER TABLE ` carriers_services_payment`
  ADD PRIMARY KEY (`c_s_payment_id`),
  ADD KEY `carrier_id` (`carrier_id`);

--
-- Indexes for table `city`
--
ALTER TABLE `city`
  ADD PRIMARY KEY (`city_id`),
  ADD KEY `zone_id` (`zone_id`);

--
-- Indexes for table `city_area`
--
ALTER TABLE `city_area`
  ADD PRIMARY KEY (`city_area_id`),
  ADD KEY `city_supp_assos_id` (`city_supp_assos_id`);

--
-- Indexes for table `city_sup_assos`
--
ALTER TABLE `city_sup_assos`
  ADD PRIMARY KEY (`city_supp_assos_id`),
  ADD KEY `city_id` (`city_id`),
  ADD KEY `sup_id` (`sup_id`);

--
-- Indexes for table `comapny_access_logs`
--
ALTER TABLE `comapny_access_logs`
  ADD PRIMARY KEY (`comp_acc_logs_id`);

--
-- Indexes for table `compaigns`
--
ALTER TABLE `compaigns`
  ADD PRIMARY KEY (`comp_id`),
  ADD KEY `sup_id` (`sup_id`),
  ADD KEY `city_id` (`city_id`);

--
-- Indexes for table `compaign_activities`
--
ALTER TABLE `compaign_activities`
  ADD PRIMARY KEY (`comp_act_id`),
  ADD KEY `comp_id` (`comp_id`),
  ADD KEY `field_id` (`field_id`),
  ADD KEY `agency_id` (`agency_id`);

--
-- Indexes for table `compaign_sales`
--
ALTER TABLE `compaign_sales`
  ADD PRIMARY KEY (`comp_sale_id`),
  ADD KEY `comp_id` (`comp_id`),
  ADD KEY `field_id` (`field_id`),
  ADD KEY `agency_id` (`agency_id`);

--
-- Indexes for table `companies_access`
--
ALTER TABLE `companies_access`
  ADD PRIMARY KEY (`comp_access_id`),
  ADD KEY `sa_id` (`sa_id`);

--
-- Indexes for table `company_gm_info`
--
ALTER TABLE `company_gm_info`
  ADD PRIMARY KEY (`gm_id`),
  ADD KEY `comp_access_id` (`comp_access_id`),
  ADD KEY `zone_id` (`zone_id`);

--
-- Indexes for table `company_promotions`
--
ALTER TABLE `company_promotions`
  ADD PRIMARY KEY (`comp_prom_id`),
  ADD KEY `gm_id` (`gm_id`);

--
-- Indexes for table `cust_care_activities`
--
ALTER TABLE `cust_care_activities`
  ADD PRIMARY KEY (`cust_c_act_id`),
  ADD KEY `cust_care_id` (`cust_care_id`),
  ADD KEY `agency_id` (`agency_id`);

--
-- Indexes for table `cust_care_csr`
--
ALTER TABLE `cust_care_csr`
  ADD PRIMARY KEY (`cust_care_id`),
  ADD KEY `man_id` (`man_id`),
  ADD KEY `d_id` (`d_id`),
  ADD KEY `login_id` (`login_id`);

--
-- Indexes for table `dataentry_employee`
--
ALTER TABLE `dataentry_employee`
  ADD PRIMARY KEY (`de_emp_id`),
  ADD KEY `login_id` (`login_id`),
  ADD KEY `man_id` (`man_id`);

--
-- Indexes for table `dealers_info_from_pep`
--
ALTER TABLE `dealers_info_from_pep`
  ADD PRIMARY KEY (`pep_dealers_id`);

--
-- Indexes for table `dealers_of_pep_activities`
--
ALTER TABLE `dealers_of_pep_activities`
  ADD PRIMARY KEY (`pep_dealer_act_id`),
  ADD KEY `pep_dealers_id` (`pep_dealers_id`),
  ADD KEY `cust_care_id` (`cust_care_id`);

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`d_id`),
  ADD KEY `comp_access_id` (`comp_access_id`),
  ADD KEY `gm_id` (`gm_id`),
  ADD KEY `sa_id` (`sa_id`);

--
-- Indexes for table `executivelogins`
--
ALTER TABLE `executivelogins`
  ADD PRIMARY KEY (`execu_login_id`),
  ADD KEY `field_id` (`field_id`);

--
-- Indexes for table `executivenotifications`
--
ALTER TABLE `executivenotifications`
  ADD PRIMARY KEY (`execu_notification_id`),
  ADD KEY `field_id` (`field_id`),
  ADD KEY `notification_id` (`notification_id`);

--
-- Indexes for table `executive_advert_stock`
--
ALTER TABLE `executive_advert_stock`
  ADD PRIMARY KEY (`field_e_stock_id`),
  ADD KEY `team_adver_stock_id` (`team_adver_stock_id`),
  ADD KEY `field_id` (`field_id`);

--
-- Indexes for table `executive_stock_usage`
--
ALTER TABLE `executive_stock_usage`
  ADD PRIMARY KEY (`stock_Usage_id`),
  ADD KEY `field_id` (`field_id`),
  ADD KEY `agency_id` (`agency_id`),
  ADD KEY `field_e_stock_id` (`field_e_stock_id`);

--
-- Indexes for table `field_executive`
--
ALTER TABLE `field_executive`
  ADD PRIMARY KEY (`field_id`),
  ADD KEY `login_id` (`login_id`),
  ADD KEY `team_L_id` (`team_L_id`);

--
-- Indexes for table `field_executive_earning`
--
ALTER TABLE `field_executive_earning`
  ADD PRIMARY KEY (`field_exe_earn_id`),
  ADD KEY `field_id` (`field_id`),
  ADD KEY `list_act_id` (`list_act_id`);

--
-- Indexes for table `field_executive_pending_earning`
--
ALTER TABLE `field_executive_pending_earning`
  ADD PRIMARY KEY (`field_exe_earn_id`),
  ADD KEY `field_id` (`field_id`),
  ADD KEY `list_act_id` (`list_act_id`);

--
-- Indexes for table `field_executive_withdraws`
--
ALTER TABLE `field_executive_withdraws`
  ADD PRIMARY KEY (`field_exe_with_id`),
  ADD KEY `field_id` (`field_id`),
  ADD KEY `field_exe_earn_id` (`field_exe_earn_id`);

--
-- Indexes for table `gmlogin`
--
ALTER TABLE `gmlogin`
  ADD PRIMARY KEY (`gm_Company_login_id`),
  ADD KEY `gm_id` (`gm_id`);

--
-- Indexes for table `gm_notifications`
--
ALTER TABLE `gm_notifications`
  ADD PRIMARY KEY (`gm_Company_notification_id`),
  ADD KEY `gm_id` (`gm_id`);

--
-- Indexes for table `lists`
--
ALTER TABLE `lists`
  ADD PRIMARY KEY (`list_id`);

--
-- Indexes for table `list_sub_activities`
--
ALTER TABLE `list_sub_activities`
  ADD PRIMARY KEY (`list_sub_act_id`),
  ADD KEY `list_id` (`list_id`),
  ADD KEY `list_sub_activities_ibfk_2` (`list_act_id`);

--
-- Indexes for table `login_page`
--
ALTER TABLE `login_page`
  ADD PRIMARY KEY (`login_page_id`),
  ADD KEY `sa_id` (`sa_id`);

--
-- Indexes for table `managerlogin`
--
ALTER TABLE `managerlogin`
  ADD PRIMARY KEY (`manager_login_id`),
  ADD KEY `man_id` (`man_id`);

--
-- Indexes for table `managernotifications`
--
ALTER TABLE `managernotifications`
  ADD PRIMARY KEY (`manager_notification_id`),
  ADD KEY `man_id` (`man_id`);

--
-- Indexes for table `managers`
--
ALTER TABLE `managers`
  ADD PRIMARY KEY (`man_id`),
  ADD KEY `d_id` (`d_id`),
  ADD KEY `zone_id` (`zone_id`);

--
-- Indexes for table `notificationtext`
--
ALTER TABLE `notificationtext`
  ADD PRIMARY KEY (`notification_id`);

--
-- Indexes for table `packages`
--
ALTER TABLE `packages`
  ADD PRIMARY KEY (`pack_id`);

--
-- Indexes for table `pendance_clearance_details`
--
ALTER TABLE `pendance_clearance_details`
  ADD PRIMARY KEY (`clearance_details_id`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`permmission_id`);

--
-- Indexes for table `permission_role_assosiate`
--
ALTER TABLE `permission_role_assosiate`
  ADD PRIMARY KEY (`perm_assos_id`),
  ADD UNIQUE KEY `permission_role_assosiate_permmission_id_user_role_id_unique` (`permmission_id`,`user_role_id`),
  ADD KEY `user_role_id` (`user_role_id`);

--
-- Indexes for table `promotion_requests_status`
--
ALTER TABLE `promotion_requests_status`
  ADD PRIMARY KEY (`prom_req_id`),
  ADD KEY `prom_id` (`prom_id`),
  ADD KEY `man_id` (`man_id`);

--
-- Indexes for table `promotion_req_by_supervisor`
--
ALTER TABLE `promotion_req_by_supervisor`
  ADD PRIMARY KEY (`prom_id`),
  ADD KEY `city_id` (`city_id`),
  ADD KEY `sup_id` (`sup_id`);

--
-- Indexes for table `receiving_calls`
--
ALTER TABLE `receiving_calls`
  ADD PRIMARY KEY (`receive_call_id`),
  ADD KEY `cust_care_id` (`cust_care_id`);

--
-- Indexes for table `request_of_advertisement`
--
ALTER TABLE `request_of_advertisement`
  ADD PRIMARY KEY (`req_adver`),
  ADD KEY `man_id` (`man_id`),
  ADD KEY `gm_id` (`gm_id`);

--
-- Indexes for table `role_extrainfo`
--
ALTER TABLE `role_extrainfo`
  ADD PRIMARY KEY (`role_creden_id`),
  ADD KEY `user_role_id` (`user_role_id`);

--
-- Indexes for table `sa_logs_ondepartment`
--
ALTER TABLE `sa_logs_ondepartment`
  ADD PRIMARY KEY (`sa_on_Depart_id`);

--
-- Indexes for table `signup_page`
--
ALTER TABLE `signup_page`
  ADD PRIMARY KEY (`signUp_page_id`),
  ADD KEY `sa_id` (`sa_id`);

--
-- Indexes for table `supervisor`
--
ALTER TABLE `supervisor`
  ADD PRIMARY KEY (`sup_id`),
  ADD KEY `login_id` (`login_id`),
  ADD KEY `man_id` (`man_id`);

--
-- Indexes for table `supervisorlogin`
--
ALTER TABLE `supervisorlogin`
  ADD PRIMARY KEY (`supervisor_login_id`),
  ADD KEY `sup_id` (`sup_id`);

--
-- Indexes for table `supervisornotification`
--
ALTER TABLE `supervisornotification`
  ADD PRIMARY KEY (`supervisor_notification_id`),
  ADD KEY `sup_id` (`sup_id`);

--
-- Indexes for table `super_admin`
--
ALTER TABLE `super_admin`
  ADD PRIMARY KEY (`sa_id`);

--
-- Indexes for table `teamlead_login`
--
ALTER TABLE `teamlead_login`
  ADD PRIMARY KEY (`teamLead_login_id`),
  ADD KEY `team_L_id` (`team_L_id`);

--
-- Indexes for table `teamlead_notifications`
--
ALTER TABLE `teamlead_notifications`
  ADD PRIMARY KEY (`teamLead_notification_id`),
  ADD KEY `team_L_id` (`team_L_id`);

--
-- Indexes for table `teaml_adver_stock`
--
ALTER TABLE `teaml_adver_stock`
  ADD PRIMARY KEY (`team_adver_stock_id`),
  ADD KEY `adver_stock_act_id` (`adver_stock_act_id`);

--
-- Indexes for table `team_lead`
--
ALTER TABLE `team_lead`
  ADD PRIMARY KEY (`team_L_id`),
  ADD KEY `city_area_id` (`city_area_id`),
  ADD KEY `sup_id` (`sup_id`),
  ADD KEY `login_id` (`login_id`);

--
-- Indexes for table `training`
--
ALTER TABLE `training`
  ADD PRIMARY KEY (`training_ID`);

--
-- Indexes for table `training_activities`
--
ALTER TABLE `training_activities`
  ADD PRIMARY KEY (`training_act_ID`),
  ADD KEY `training_ID` (`training_ID`),
  ADD KEY `field_id` (`field_id`),
  ADD KEY `team_L_id` (`team_L_id`);

--
-- Indexes for table `user_login_information`
--
ALTER TABLE `user_login_information`
  ADD PRIMARY KEY (`login_id`),
  ADD KEY `user_role_id` (`user_role_id`);

--
-- Indexes for table `user_login_role`
--
ALTER TABLE `user_login_role`
  ADD PRIMARY KEY (`user_role_id`);

--
-- Indexes for table `web_content`
--
ALTER TABLE `web_content`
  ADD PRIMARY KEY (`web_content_id`),
  ADD KEY `sa_id` (`sa_id`);

--
-- Indexes for table `zone`
--
ALTER TABLE `zone`
  ADD PRIMARY KEY (`zone_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activities`
--
ALTER TABLE `activities`
  MODIFY `list_act_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `activity_instruction`
--
ALTER TABLE `activity_instruction`
  MODIFY `act_instruc_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `advertisement_recommendation`
--
ALTER TABLE `advertisement_recommendation`
  MODIFY `adver_recom_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `advertising_stock`
--
ALTER TABLE `advertising_stock`
  MODIFY `adver_stock_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `advertising_stock_allocation`
--
ALTER TABLE `advertising_stock_allocation`
  MODIFY `adver_stock_act_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `agencytypes`
--
ALTER TABLE `agencytypes`
  MODIFY `agencytype_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `agency_info`
--
ALTER TABLE `agency_info`
  MODIFY `agency_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `carriers`
--
ALTER TABLE `carriers`
  MODIFY `carrier_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `carriers_logs`
--
ALTER TABLE `carriers_logs`
  MODIFY `carrier_logs_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `carriers_paid_payment`
--
ALTER TABLE `carriers_paid_payment`
  MODIFY `c_paid_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `carriers_services`
--
ALTER TABLE `carriers_services`
  MODIFY `c_service_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table ` carriers_services_payment`
--
ALTER TABLE ` carriers_services_payment`
  MODIFY `c_s_payment_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `city`
--
ALTER TABLE `city`
  MODIFY `city_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `city_area`
--
ALTER TABLE `city_area`
  MODIFY `city_area_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `city_sup_assos`
--
ALTER TABLE `city_sup_assos`
  MODIFY `city_supp_assos_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `comapny_access_logs`
--
ALTER TABLE `comapny_access_logs`
  MODIFY `comp_acc_logs_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `compaigns`
--
ALTER TABLE `compaigns`
  MODIFY `comp_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `compaign_activities`
--
ALTER TABLE `compaign_activities`
  MODIFY `comp_act_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `compaign_sales`
--
ALTER TABLE `compaign_sales`
  MODIFY `comp_sale_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `companies_access`
--
ALTER TABLE `companies_access`
  MODIFY `comp_access_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `company_gm_info`
--
ALTER TABLE `company_gm_info`
  MODIFY `gm_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `company_promotions`
--
ALTER TABLE `company_promotions`
  MODIFY `comp_prom_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cust_care_activities`
--
ALTER TABLE `cust_care_activities`
  MODIFY `cust_c_act_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cust_care_csr`
--
ALTER TABLE `cust_care_csr`
  MODIFY `cust_care_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `dataentry_employee`
--
ALTER TABLE `dataentry_employee`
  MODIFY `de_emp_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `dealers_info_from_pep`
--
ALTER TABLE `dealers_info_from_pep`
  MODIFY `pep_dealers_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `dealers_of_pep_activities`
--
ALTER TABLE `dealers_of_pep_activities`
  MODIFY `pep_dealer_act_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `d_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `executivelogins`
--
ALTER TABLE `executivelogins`
  MODIFY `execu_login_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=220;

--
-- AUTO_INCREMENT for table `executivenotifications`
--
ALTER TABLE `executivenotifications`
  MODIFY `execu_notification_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `executive_advert_stock`
--
ALTER TABLE `executive_advert_stock`
  MODIFY `field_e_stock_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `executive_stock_usage`
--
ALTER TABLE `executive_stock_usage`
  MODIFY `stock_Usage_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `field_executive`
--
ALTER TABLE `field_executive`
  MODIFY `field_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `field_executive_earning`
--
ALTER TABLE `field_executive_earning`
  MODIFY `field_exe_earn_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `field_executive_pending_earning`
--
ALTER TABLE `field_executive_pending_earning`
  MODIFY `field_exe_earn_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `field_executive_withdraws`
--
ALTER TABLE `field_executive_withdraws`
  MODIFY `field_exe_with_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `gmlogin`
--
ALTER TABLE `gmlogin`
  MODIFY `gm_Company_login_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `gm_notifications`
--
ALTER TABLE `gm_notifications`
  MODIFY `gm_Company_notification_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `lists`
--
ALTER TABLE `lists`
  MODIFY `list_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `list_sub_activities`
--
ALTER TABLE `list_sub_activities`
  MODIFY `list_sub_act_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `login_page`
--
ALTER TABLE `login_page`
  MODIFY `login_page_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `managerlogin`
--
ALTER TABLE `managerlogin`
  MODIFY `manager_login_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `managernotifications`
--
ALTER TABLE `managernotifications`
  MODIFY `manager_notification_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `managers`
--
ALTER TABLE `managers`
  MODIFY `man_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `notificationtext`
--
ALTER TABLE `notificationtext`
  MODIFY `notification_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `packages`
--
ALTER TABLE `packages`
  MODIFY `pack_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pendance_clearance_details`
--
ALTER TABLE `pendance_clearance_details`
  MODIFY `clearance_details_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `permmission_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `permission_role_assosiate`
--
ALTER TABLE `permission_role_assosiate`
  MODIFY `perm_assos_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `promotion_requests_status`
--
ALTER TABLE `promotion_requests_status`
  MODIFY `prom_req_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `promotion_req_by_supervisor`
--
ALTER TABLE `promotion_req_by_supervisor`
  MODIFY `prom_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `receiving_calls`
--
ALTER TABLE `receiving_calls`
  MODIFY `receive_call_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `request_of_advertisement`
--
ALTER TABLE `request_of_advertisement`
  MODIFY `req_adver` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `role_extrainfo`
--
ALTER TABLE `role_extrainfo`
  MODIFY `role_creden_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `sa_logs_ondepartment`
--
ALTER TABLE `sa_logs_ondepartment`
  MODIFY `sa_on_Depart_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `signup_page`
--
ALTER TABLE `signup_page`
  MODIFY `signUp_page_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `supervisor`
--
ALTER TABLE `supervisor`
  MODIFY `sup_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `supervisorlogin`
--
ALTER TABLE `supervisorlogin`
  MODIFY `supervisor_login_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `supervisornotification`
--
ALTER TABLE `supervisornotification`
  MODIFY `supervisor_notification_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `super_admin`
--
ALTER TABLE `super_admin`
  MODIFY `sa_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `teamlead_login`
--
ALTER TABLE `teamlead_login`
  MODIFY `teamLead_login_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `teamlead_notifications`
--
ALTER TABLE `teamlead_notifications`
  MODIFY `teamLead_notification_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `teaml_adver_stock`
--
ALTER TABLE `teaml_adver_stock`
  MODIFY `team_adver_stock_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `team_lead`
--
ALTER TABLE `team_lead`
  MODIFY `team_L_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `training`
--
ALTER TABLE `training`
  MODIFY `training_ID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `training_activities`
--
ALTER TABLE `training_activities`
  MODIFY `training_act_ID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_login_information`
--
ALTER TABLE `user_login_information`
  MODIFY `login_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `user_login_role`
--
ALTER TABLE `user_login_role`
  MODIFY `user_role_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `web_content`
--
ALTER TABLE `web_content`
  MODIFY `web_content_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `zone`
--
ALTER TABLE `zone`
  MODIFY `zone_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `activities`
--
ALTER TABLE `activities`
  ADD CONSTRAINT `Activities_ibfk_1` FOREIGN KEY (`field_id`) REFERENCES `field_executive` (`field_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Activities_ibfk_2` FOREIGN KEY (`comp_id`) REFERENCES `compaigns` (`comp_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Activities_ibfk_3` FOREIGN KEY (`agency_id`) REFERENCES `agency_info` (`agency_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `advertisement_recommendation`
--
ALTER TABLE `advertisement_recommendation`
  ADD CONSTRAINT `advertisement_recommendation_ibfk_1` FOREIGN KEY (`agency_id`) REFERENCES `agency_info` (`agency_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `advertisement_recommendation_ibfk_2` FOREIGN KEY (`field_id`) REFERENCES `field_executive` (`field_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `advertisement_recommendation_ibfk_3` FOREIGN KEY (`team_L_id`) REFERENCES `team_lead` (`team_L_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `advertisement_recommendation_ibfk_4` FOREIGN KEY (`sup_id`) REFERENCES `supervisor` (`sup_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `advertisement_recommendation_ibfk_5` FOREIGN KEY (`man_id`) REFERENCES `managers` (`man_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `advertising_stock`
--
ALTER TABLE `advertising_stock`
  ADD CONSTRAINT `advertising_stock_ibfk_1` FOREIGN KEY (`req_adver`) REFERENCES `request_of_advertisement` (`req_adver`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `advertising_stock_allocation`
--
ALTER TABLE `advertising_stock_allocation`
  ADD CONSTRAINT `advertising_stock_allocation_ibfk_1` FOREIGN KEY (`adver_stock_id`) REFERENCES `advertising_stock` (`adver_stock_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `advertising_stock_allocation_ibfk_2` FOREIGN KEY (`sup_id`) REFERENCES `supervisor` (`sup_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `agency_info`
--
ALTER TABLE `agency_info`
  ADD CONSTRAINT `agency_info_ibfk_1` FOREIGN KEY (`field_id`) REFERENCES `field_executive` (`field_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `carriers`
--
ALTER TABLE `carriers`
  ADD CONSTRAINT `carriers_ibfk_1` FOREIGN KEY (`sa_id`) REFERENCES `super_admin` (`sa_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `carriers_ibfk_2` FOREIGN KEY (`comp_access_id`) REFERENCES `companies_access` (`comp_access_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `carriers_services`
--
ALTER TABLE `carriers_services`
  ADD CONSTRAINT `carriers_services_ibfk_1` FOREIGN KEY (`carrier_id`) REFERENCES `carriers` (`carrier_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `executivenotifications`
--
ALTER TABLE `executivenotifications`
  ADD CONSTRAINT `executivenotifications_ibfk_1` FOREIGN KEY (`field_id`) REFERENCES `field_executive` (`field_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `executivenotifications_ibfk_2` FOREIGN KEY (`notification_id`) REFERENCES `notificationtext` (`notification_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `field_executive`
--
ALTER TABLE `field_executive`
  ADD CONSTRAINT `field_executive_ibfk_1` FOREIGN KEY (`login_id`) REFERENCES `user_login_information` (`login_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `field_executive_earning`
--
ALTER TABLE `field_executive_earning`
  ADD CONSTRAINT `field_executive_earning_ibfk_1` FOREIGN KEY (`field_id`) REFERENCES `field_executive` (`field_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `field_executive_earning_ibfk_2` FOREIGN KEY (`list_act_id`) REFERENCES `activities` (`list_act_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `field_executive_pending_earning`
--
ALTER TABLE `field_executive_pending_earning`
  ADD CONSTRAINT `field_executive_pending_earning_ibfk_1` FOREIGN KEY (`field_id`) REFERENCES `field_executive` (`field_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `field_executive_pending_earning_ibfk_2` FOREIGN KEY (`list_act_id`) REFERENCES `activities` (`list_act_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `list_sub_activities`
--
ALTER TABLE `list_sub_activities`
  ADD CONSTRAINT `list_sub_activities_ibfk_1` FOREIGN KEY (`list_id`) REFERENCES `lists` (`list_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `list_sub_activities_ibfk_2` FOREIGN KEY (`list_act_id`) REFERENCES `activities` (`list_act_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `team_lead`
--
ALTER TABLE `team_lead`
  ADD CONSTRAINT `team_lead_ibfk_1` FOREIGN KEY (`city_area_id`) REFERENCES `city_area` (`city_area_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `team_lead_ibfk_2` FOREIGN KEY (`login_id`) REFERENCES `user_login_information` (`login_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `team_lead_ibfk_3` FOREIGN KEY (`sup_id`) REFERENCES `supervisor` (`sup_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
