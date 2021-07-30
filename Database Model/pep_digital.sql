-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 30, 2021 at 01:34 PM
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
  `agency_id` int NOT NULL,
  `withdrawn` tinyint(1) DEFAULT '0',
  `paused` tinyint(1) DEFAULT '0',
  `deleted` tinyint(1) DEFAULT '0',
  `cancelled` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `activities`
--

INSERT INTO `activities` (`list_act_id`, `list_act_uuid`, `field_id`, `comp_id`, `agency_id`, `withdrawn`, `paused`, `deleted`, `cancelled`, `createdAt`, `updateTimestamp`) VALUES
(1, 'fcc604df-0f27-4b17-aa21-602ddcc426e8', 4, 1, 2, 0, 0, 0, 0, '2021-04-19 17:23:50', '2021-04-19 17:23:50'),
(2, 'd9f76d6b-52e6-4f92-8575-4e469766f7bb', 4, 1, 3, 0, 0, 0, 0, '2021-04-19 17:27:02', '2021-04-19 17:27:02'),
(3, 'e9b70de6-bc11-4b5c-9534-21734a38888b', 4, 1, 4, 0, 0, 0, 0, '2021-04-19 17:28:06', '2021-04-19 17:28:06'),
(4, 'ee18e0c5-7924-43a7-bfc0-cab9a6e398ce', 4, 1, 5, 0, 0, 0, 0, '2021-04-21 15:23:57', '2021-04-21 15:23:57'),
(5, '5fb45141-40d0-4faf-a7fc-4fd868c6bfbd', 4, 1, 6, 0, 0, 0, 0, '2021-04-21 15:26:00', '2021-04-21 15:26:00'),
(6, '8c13ff26-cb83-4c32-a004-f4165e074d86', 4, 1, 7, 0, 0, 0, 0, '2021-04-21 16:54:21', '2021-04-21 16:54:21'),
(7, '0b7c271e-ebdc-4371-b782-6fc71c7bd745', 4, 1, 8, 0, 0, 0, 0, '2021-04-21 16:55:11', '2021-04-21 16:55:11'),
(8, '1aaf8943-ac5c-4932-a771-d87dd4403219', 4, 1, 9, 0, 0, 0, 0, '2021-04-21 16:56:01', '2021-04-21 16:56:01'),
(9, '0c5316ca-6dc4-4f83-9ee4-8b3526afb2e8', 4, 1, 10, 0, 0, 0, 0, '2021-04-21 17:01:58', '2021-04-21 17:01:58'),
(10, '40cdfe73-663a-4504-9b5c-cd08bae0655b', 4, 1, 11, 0, 0, 0, 0, '2021-04-21 17:03:04', '2021-04-21 17:03:04'),
(11, '7ecca9e0-d698-43f7-9ba7-6c26e419b667', 4, 1, 12, 0, 0, 0, 0, '2021-04-21 17:12:46', '2021-04-21 17:12:46'),
(12, 'f71aeb0c-4431-4c3d-b9ec-27c4c202752d', 4, 1, 13, 0, 0, 0, 0, '2021-04-21 17:13:20', '2021-04-21 17:13:20'),
(13, 'f07eeb31-8eee-4dfb-a993-bf984339d0bd', 4, 1, 14, 0, 0, 0, 0, '2021-04-21 17:14:41', '2021-04-21 17:14:41'),
(14, 'c85d5ce4-25c2-488f-9ec8-8daf048d43b3', 4, 1, 15, 0, 0, 0, 0, '2021-04-26 15:48:17', '2021-04-26 15:48:17'),
(15, '2406f6d5-3fde-4f54-916e-e3f5a55f5677', 4, 1, 16, 0, 0, 0, 0, '2021-04-26 15:54:00', '2021-04-26 15:54:00'),
(16, '760f9ce2-1306-43eb-bad5-359d4bc11bbe', 4, 1, 17, 0, 0, 0, 0, '2021-04-26 15:54:55', '2021-04-26 15:54:55'),
(17, 'aea2d5b5-101a-43b4-8230-875d9a445b50', 4, 1, 18, 0, 0, 0, 0, '2021-04-26 15:55:49', '2021-04-26 15:55:49'),
(18, 'a518448e-0631-461e-8fe1-da68843491ed', 4, 1, 19, 0, 0, 0, 0, '2021-04-26 16:12:11', '2021-04-26 16:12:11'),
(19, '7afa79c4-1bc9-48bf-a079-34c2d586b559', 4, 1, 20, 0, 0, 0, 0, '2021-04-26 16:14:07', '2021-04-26 16:14:07'),
(20, '4af552ac-3d3e-4cd5-9250-8dd15b336a54', 4, 1, 21, 0, 0, 0, 0, '2021-04-26 16:18:48', '2021-04-26 16:18:48'),
(21, 'f21e3743-803d-4ef1-a31c-b51c9684933f', 4, 1, 22, 0, 0, 0, 0, '2021-04-26 16:21:34', '2021-04-26 16:21:34'),
(22, '90e6a4d8-5cf5-4e66-85f3-27a0d9963154', 4, 1, 23, 0, 0, 0, 0, '2021-04-27 15:12:09', '2021-04-27 15:12:09'),
(23, 'd5694fb5-66ae-4ef5-b577-c0f717c3e1e1', 4, 1, 24, 0, 0, 0, 0, '2021-04-27 15:13:30', '2021-04-27 15:13:30'),
(24, 'aa5d6285-b41f-4c77-aa8a-b29abace8e7b', 4, 1, 25, 0, 0, 0, 0, '2021-04-27 15:19:31', '2021-04-27 15:19:31'),
(25, '55fed19d-dc5d-42ad-985b-4e963be5464f', 4, 1, 26, 0, 0, 0, 0, '2021-04-27 15:29:30', '2021-04-27 15:29:30'),
(26, '6c5cae77-60a0-4f56-a987-649ed64443e7', 4, 1, 27, 0, 0, 0, 0, '2021-04-27 15:33:46', '2021-04-27 15:33:46'),
(27, '1f700998-57b8-4c7a-bf2b-84ad62ae4b13', 4, 1, 28, 0, 0, 0, 0, '2021-04-27 15:34:29', '2021-04-27 15:34:29'),
(28, 'bd05c3c4-3c38-4811-af5e-e8770babfc42', 4, 1, 29, 0, 0, 0, 0, '2021-04-27 16:56:19', '2021-04-27 16:56:19'),
(29, '0c584a75-0011-442a-9688-bcf53105463f', 4, 1, 30, 0, 0, 0, 0, '2021-04-27 17:01:02', '2021-04-27 17:01:02'),
(30, 'b4ed686a-0863-4ab9-91d5-1d55d5bb1a05', 4, 1, 31, 0, 0, 0, 0, '2021-04-27 17:34:50', '2021-04-27 17:34:50'),
(31, '8e68581b-9c66-4dc0-83a0-167132e022bc', 4, 1, 32, 0, 0, 0, 0, '2021-04-29 14:03:16', '2021-04-29 14:03:16'),
(32, 'e30978cb-1552-4649-bf53-f732d9078ee0', 4, 1, 34, 0, 0, 0, 0, '2021-04-30 15:54:35', '2021-04-30 15:54:35'),
(33, 'b0626931-2062-4902-8ab5-11551a40612b', 4, 1, 35, 0, 0, 0, 0, '2021-04-30 16:00:31', '2021-04-30 16:00:31'),
(34, '7490fc4b-8b4b-4097-b76a-539630226782', 4, 1, 36, 0, 0, 0, 0, '2021-05-03 17:03:49', '2021-05-03 17:03:49'),
(35, '4100600b-6c6b-4127-853c-bf42317da01c', 4, 1, 37, 0, 0, 0, 0, '2021-05-03 17:08:35', '2021-05-03 17:08:35'),
(36, '47b9f287-6743-4fa2-b911-c5cdb82f86f3', 4, 1, 37, 0, 0, 0, 0, '2021-05-06 15:46:17', '2021-05-06 15:46:17'),
(37, '2df209e0-4111-4a58-a96d-206797b66973', 4, 1, 37, 0, 0, 0, 0, '2021-05-06 16:02:26', '2021-05-06 16:02:26'),
(38, '2bd3625d-6f29-4ac0-9a02-511eaef5fe7e', 4, 1, 37, 0, 0, 0, 0, '2021-05-06 16:03:21', '2021-05-06 16:03:21'),
(39, 'a8d1eb64-2a19-42cb-9e31-841229281120', 4, 1, 37, 0, 0, 0, 0, '2021-05-06 16:06:51', '2021-05-06 16:06:51'),
(40, 'cb0d138e-0fd4-455e-8f60-046dee4510e6', 4, 1, 37, 0, 0, 0, 0, '2021-05-06 16:08:14', '2021-05-06 16:08:14'),
(41, 'e4bf5d25-f7bf-407d-afd9-5e8d389b4388', 4, 1, 1, 0, 0, 0, 0, '2021-05-17 16:33:33', '2021-05-17 16:33:33'),
(42, '9f914723-44e3-4436-9108-80f46bd8e28f', 4, 1, 1, 0, 0, 0, 0, '2021-05-17 16:47:37', '2021-05-17 16:47:37'),
(43, '624ee733-e9f9-484a-9da4-168c6bdac7a3', 4, 1, 38, 0, 0, 0, 0, '2021-05-26 15:32:17', '2021-05-26 15:32:17'),
(44, '8a47e87f-df11-4300-b8e5-541fb038eb37', 4, 1, 1, 0, 0, 0, 0, '2021-06-08 15:30:22', '2021-06-08 15:30:22'),
(45, '438a0d65-60ad-4297-962b-f1d8982d3fbb', 4, 1, 1, 0, 0, 0, 0, '2021-06-08 15:31:15', '2021-06-08 15:31:15'),
(47, '473a531a-ee72-4177-be5a-9bc0aeafd3b3', 4, 1, 40, 0, 0, 0, 0, '2021-06-17 13:29:05', '2021-06-17 13:29:05'),
(48, '09cb91f7-b63d-4fbb-87c0-e96e2b843cbb', 4, 1, 41, 0, 0, 0, 0, '2021-06-17 13:35:03', '2021-06-17 13:35:03'),
(49, 'fa5e6df8-fb05-454e-a0b1-12441e27821d', 4, 1, 42, 0, 0, 0, 0, '2021-06-17 13:39:32', '2021-06-17 13:39:32'),
(50, '1f7ee025-6262-4c80-b9a9-f6140b450e2b', 4, 1, 43, 0, 0, 0, 0, '2021-06-17 13:45:39', '2021-06-17 13:45:39'),
(51, 'fe37e9da-3766-447d-92e4-9823e0f9a02a', 4, 1, 44, 0, 0, 0, 0, '2021-06-17 13:48:02', '2021-06-17 13:48:02'),
(52, '8a67b42d-f11d-49ed-84d0-446a2850eb9d', 4, 1, 45, 0, 0, 0, 0, '2021-06-17 13:50:22', '2021-06-17 13:50:22'),
(53, '096a144c-34ee-4e65-9adf-270e57a24bf1', 4, 1, 46, 0, 0, 0, 0, '2021-06-17 17:15:33', '2021-06-17 17:15:33'),
(55, 'd61ce0d6-41fb-4799-a456-610956d2751d', 4, 1, 1, 0, 0, 0, 0, '2021-06-17 17:26:32', '2021-06-17 17:26:32'),
(56, 'f5b39914-e1e3-48c9-bf51-ff45ce9a8bcd', 4, 1, 1, 0, 0, 0, 0, '2021-06-17 17:40:06', '2021-06-17 17:40:06'),
(57, '5e4ad305-3bb9-44b9-b640-6a8685351e1a', 4, 1, 1, 0, 0, 0, 0, '2021-06-17 17:48:02', '2021-06-17 17:48:02'),
(59, '7199108f-e159-41cd-a9e7-960bbb417df3', 4, 1, 1, 0, 0, 0, 0, '2021-06-17 18:02:29', '2021-06-17 18:02:29'),
(60, '271a68e4-9bf8-40f0-96fe-b371bf562a48', 4, 1, 43, 0, 0, 0, 0, '2021-06-17 18:04:23', '2021-06-17 18:04:23'),
(61, '4094aa03-c6ac-47cb-9848-a460f933cd14', 4, 1, 43, 0, 0, 0, 0, '2021-06-17 18:10:48', '2021-06-17 18:10:48'),
(64, 'bc68f2e6-59dd-48e4-bfb5-b93a6051645f', 4, 1, 39, 0, 0, 0, 0, '2021-06-17 18:30:19', '2021-06-17 18:30:19'),
(65, '955f112f-c246-4b36-aef0-d4313b3d5b8b', 4, 1, 39, 0, 0, 0, 0, '2021-06-17 18:32:51', '2021-06-17 18:32:51'),
(66, 'c3b78ed3-cf87-4842-be22-98b97f2ee76f', 4, 1, 39, 0, 0, 0, 0, '2021-06-17 18:38:51', '2021-06-17 18:38:51'),
(67, '0e6c00fc-8c60-48d9-af1b-95c904d53706', 4, 1, 39, 0, 0, 0, 0, '2021-06-17 18:59:44', '2021-06-17 18:59:44'),
(68, '49a37e71-22bb-44a5-8a67-896c3e042beb', 4, 1, 39, 0, 0, 0, 1, '2021-06-17 19:14:14', '2021-06-17 19:14:18'),
(69, 'b2a58c16-8cac-435a-827f-585d2d787516', 4, 1, 1, 0, 0, 0, 1, '2021-06-21 12:03:22', '2021-06-21 12:03:27'),
(70, '8a196c02-9850-46bf-8913-ad7710485787', 4, 1, 1, 0, 0, 0, 1, '2021-06-21 12:05:25', '2021-06-21 12:05:50'),
(81, '5d19809e-8925-4c2b-8698-d01bfa15552c', 4, 1, 47, 0, 0, 0, 0, '2021-06-21 13:31:29', '2021-06-21 13:31:29');

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
(1, '058541a2-0931-4856-8090-ab217534edb8', 'Saad Sohail', 'Buy, Sell, Rent, Agriculture and Investment', '0324555', 'Rawalpindi,Punjab', '46000', '73.07085661307924', '33.634159736754704', 1, 'Saad Sohail', 'Saad Sohail', '0324555', 0, 0, 4, '2021-04-19 15:30:20', '2021-06-17 18:03:05'),
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
(38, '2b1408ec-3e1b-4e86-a91e-1907c4757705', '1232312', 'Buy, Sell, Rent, Agriculture and Investment', 'ddas', 'Chaman,Balochistān', 'dasd', '73.07085788138802', '33.63366560847481', 1, 'sdas', 'sdas', 'ddas', 0, 0, 4, '2021-05-26 15:32:17', '2021-05-26 15:33:14'),
(39, 'e32421ed-5873-48e4-985a-f29c8b706586', 'Pending Clearance', 'Buy, Sell and Rent', '03021101', 'Alpurai,Khyber Pakhtunkhwa', '8-alol', '73.07089719999999', '33.6338417', 1, 'Saad', 'Saad', '03021101', 0, 0, 4, '2021-06-17 13:22:02', '2021-06-17 18:40:59'),
(40, '3c9e04e3-8ef9-45e4-9c0a-cd6f846af6e5', 'Pending Clearances', 'Buy, Sell, Rent, Agriculture and Investment', '03021101', 'Charsadda,Khyber Pakhtunkhwa', '8-alol', '73.07089719999999', '33.6338417', 1, 'Saad', 'Saad', '03021101', 0, 0, 4, '2021-06-17 13:29:04', '2021-06-17 13:29:09'),
(41, '14de4154-90e4-452a-b885-005e2c6b425a', 'Pending rfffClearance', 'Buy, Sell and Agriculture', '03021101', 'Badin,Sindh', '8-alol', '73.0708969', '33.6338643', 1, 'Saad', 'Saad', '03021101', 0, 0, 4, '2021-06-17 13:35:03', '2021-06-17 13:35:08'),
(42, '7bc46a21-d198-4101-8285-ada9ba062696', 'Pending Clearances```111111', 'Buy, Sell, Rent, Agriculture and Investment', '03021101', 'Chitral,Khyber Pakhtunkhwa', '8-alol', '73.07088689999999', '33.633873099999995', 1, 'Saad', 'Saad', '03021101', 0, 0, 4, '2021-06-17 13:39:32', '2021-06-17 13:39:37'),
(43, 'fff5be2d-e979-499d-95c6-219811519d5b', '3535Pending Clearances```111111', 'Buy, Sell, Rent, Agriculture and Investment', '03021101', 'Chiniot,Punjab', '8-alol', '73.070872', '33.6338787', 1, 'Saad', 'Saad', '03021101', 0, 0, 4, '2021-06-17 13:45:39', '2021-06-17 18:10:54'),
(44, '2bfdd69b-ff63-4de9-bb10-aeb55e215d5e', '78j', 'Buy, Sell, Rent, Agriculture and Investment', '03021101', 'Chiniot,Punjab', '8-alol', '73.070872', '33.6338787', 1, 'Saad', 'Saad', '03021101', 0, 0, 4, '2021-06-17 13:48:02', '2021-06-17 13:48:11'),
(45, '98f0e8cc-2b3f-4434-aefe-db0b73361485', 'Pending rfffClearance6y', 'Buy, Sell, Rent, Agriculture and Investment', '03021101', 'Daggar,Khyber Pakhtunkhwa', '8-alol', '73.070872', '33.6338787', 1, 'Saad', 'Saad', '03021101', 0, 0, 4, '2021-06-17 13:50:22', '2021-06-17 13:50:26'),
(46, 'f383d9ca-afdc-4176-a686-80f92d8ec7ee', 'Pending Clearance5tertgggdfg', 'Buy, Sell, Rent, Agriculture and Investment', 'df', 'Charsadda,Khyber Pakhtunkhwa', 'df', '73.0708891', '33.6338639', 1, 'dfgdfgd', 'dfgdfgd', 'df', 0, 0, 4, '2021-06-17 17:15:33', '2021-06-17 17:15:39'),
(47, '5649a0e3-2cc1-4fae-83bb-4c2784ee8fc0', 'Pending Clearances8', 'Buy, Sell, Rent, Agriculture and Investment', '03021101', 'Chilas,Gilgit-Baltistan', '8-alol', '73.0708891', '33.6338639', 1, 'dfgdfgd', 'dfgdfgd', '03021101', 0, 0, 4, '2021-06-17 17:17:06', '2021-06-21 13:31:35');

-- --------------------------------------------------------

--
-- Table structure for table `banks_list`
--

CREATE TABLE `banks_list` (
  `Banks_List_id` int NOT NULL,
  `Banks_List_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `paused` tinyint(1) DEFAULT '0',
  `deleted` tinyint(1) DEFAULT '0',
  `bankName` text,
  `sa_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `banks_list`
--

INSERT INTO `banks_list` (`Banks_List_id`, `Banks_List_uuid`, `paused`, `deleted`, `bankName`, `sa_id`, `createdAt`, `updateTimestamp`) VALUES
(1, '726410ec-88ad-4d9d-a56c-4cce680b44fc', 0, 0, 'Bank Islami Pakistan Limited', 1, '2021-06-21 15:22:54', '2021-06-21 15:22:54'),
(2, 'f3d757e2-8e38-48f2-a1f1-4562106889b4', 0, 0, 'Allied Bank Limited', 1, '2021-06-21 15:22:54', '2021-06-21 15:22:54'),
(3, '6da460eb-0237-4987-b38d-e191e14b1a99', 0, 0, 'Bank Al-Habib Limited', 1, '2021-06-21 15:22:54', '2021-06-21 15:22:54'),
(4, 'fe826250-2ec4-4834-a774-a29bd5141234', 0, 0, 'Askari Bank', 1, '2021-06-21 15:22:54', '2021-06-21 15:22:54'),
(5, '5e782333-1d2d-4b02-ae39-452762f440a4', 0, 0, 'Al Baraka Bank (Pakistan) Limited', 1, '2021-06-21 15:22:54', '2021-06-21 15:22:54'),
(6, 'adffa24a-e6a9-4634-9e9d-c1069e636f37', 0, 0, 'Bank Alfalah Limited', 1, '2021-06-21 15:22:54', '2021-06-21 15:22:54'),
(7, 'd4106398-772a-4600-9a45-f996d1c802ce', 0, 0, 'Citi bank', 1, '2021-06-21 15:22:54', '2021-06-21 15:22:54'),
(8, 'd092ae73-40c0-4008-aba9-8d706a17a185', 0, 0, 'Deutsche Bank A.G.', 1, '2021-06-21 15:22:54', '2021-06-21 15:22:54'),
(9, '89dbc020-0382-46b1-b98a-6698498f599f', 0, 0, 'The Bank of Tokyo-Mitsubishi UFJ', 1, '2021-06-21 15:22:54', '2021-06-21 15:22:54'),
(10, '1703526e-9762-4a75-9d48-83233a9766c4', 0, 0, 'Mobilink Microfinance Bank', 1, '2021-06-21 15:22:54', '2021-06-21 15:22:54'),
(11, '2de79185-7a05-47ef-98b1-796b3e230138', 0, 0, 'Dubai Islamic Bank Pakistan Limited', 1, '2021-06-21 15:22:54', '2021-06-21 15:22:54'),
(12, '08e1bfa4-a3e7-4250-baa0-01710c86081a', 0, 0, 'Telenor Microfinance Bank', 1, '2021-06-21 15:22:54', '2021-06-21 15:22:54'),
(13, 'b43017fe-37db-4aa7-b130-f6796d5aa376', 0, 0, 'Faysal Bank Limited', 1, '2021-06-21 15:22:54', '2021-06-21 15:22:54'),
(14, '64bf5cdf-1dc1-4b52-92ab-b98029ce943d', 0, 0, 'First Women Bank Limited', 1, '2021-06-21 15:22:54', '2021-06-21 15:22:54'),
(15, '4b17e4d8-f887-4cf6-a2dc-bf14f15269e2', 0, 0, 'Habib Bank Limited', 1, '2021-06-21 15:22:54', '2021-06-21 15:22:54'),
(16, '8468869e-e472-461e-866d-e48cf1350f7f', 0, 0, 'Standard Chartered Bank (Pakistan) Limited', 1, '2021-06-21 15:22:54', '2021-06-21 15:22:54'),
(17, '6c63d121-8b2c-474d-b9da-44b265fbd759', 0, 0, 'Habib Metropolitan Bank Limited', 1, '2021-06-21 15:22:54', '2021-06-21 15:22:54'),
(18, 'b63a507d-d367-484d-b213-c8ae55ce18c8', 0, 0, 'Industrial and Commercial Bank of China', 1, '2021-06-21 15:22:54', '2021-06-21 15:22:54'),
(19, '17997fee-5604-48c3-9cd2-3b2d2d547a99', 0, 0, 'Industrial Development Bank of Pakistan', 1, '2021-06-21 15:22:54', '2021-06-21 15:22:54'),
(20, '0385c8a6-f964-441d-b39a-dfeabf4a13f1', 0, 0, 'JS Bank Limited', 1, '2021-06-21 15:22:54', '2021-06-21 15:22:54'),
(21, '7a7b17c6-e5f5-4161-a736-97052c70d932', 0, 0, 'MCB Bank Limited', 1, '2021-06-21 15:22:54', '2021-06-21 15:22:54'),
(22, '4532ddcb-91e5-4596-892a-e3451d979252', 0, 0, 'MCB Islamic Bank Limited', 1, '2021-06-21 15:22:54', '2021-06-21 15:22:54'),
(23, 'd484c2e3-48ea-4ab6-bdfd-8813fcc66d81', 0, 0, 'Meezan Bank Limited', 1, '2021-06-21 15:22:54', '2021-06-21 15:22:54'),
(24, '6913ecb7-f35c-413d-b4b6-2ca085a556b2', 0, 0, 'National Bank of Pakistan', 1, '2021-06-21 15:22:54', '2021-06-21 15:22:54');

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
-- Table structure for table `changerolelogs`
--

CREATE TABLE `changerolelogs` (
  `changeRole_id` int NOT NULL,
  `changeRole_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `paused` tinyint(1) DEFAULT '0',
  `deleted` tinyint(1) DEFAULT '0',
  `previousRole` int NOT NULL,
  `newRole` int NOT NULL,
  `field_id` int NOT NULL,
  `team_L_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `changerolelogs`
--

INSERT INTO `changerolelogs` (`changeRole_id`, `changeRole_uuid`, `paused`, `deleted`, `previousRole`, `newRole`, `field_id`, `team_L_id`, `createdAt`, `updateTimestamp`) VALUES
(1, '4152b805-9fea-4804-81d3-fd847cf8adbd', 0, 0, 5, 4, 4, 1, '2021-07-30 14:21:25', '2021-07-30 14:21:25'),
(2, '7e3b05e3-5c64-4497-b712-172fd6e7f963', 0, 0, 5, 5, 1, 1, '2021-07-30 15:12:57', '2021-07-30 15:12:57'),
(3, 'f26a88ed-efdd-4326-bc66-a1ef8c82d991', 0, 0, 5, 5, 1, 1, '2021-07-30 15:14:48', '2021-07-30 15:14:48'),
(4, '1a62d300-0294-4553-9b13-8eae14d46302', 0, 0, 6, 5, 2, 1, '2021-07-30 15:56:55', '2021-07-30 15:56:55');

-- --------------------------------------------------------

--
-- Table structure for table `city`
--

CREATE TABLE `city` (
  `city_id` int NOT NULL,
  `city_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `city_name` text,
  `paused` tinyint(1) DEFAULT '0',
  `deleted` tinyint(1) DEFAULT '0',
  `city_code` text,
  `zone_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `city`
--

INSERT INTO `city` (`city_id`, `city_uuid`, `city_name`, `paused`, `deleted`, `city_code`, `zone_id`, `createdAt`, `updateTimestamp`) VALUES
(1, '415b3e45-9dde-432c-b453-b139a7ec6705', 'Rawalpindi', 0, 0, '352', 1, '2021-04-19 14:38:38', '2021-04-19 14:38:38');

-- --------------------------------------------------------

--
-- Table structure for table `city_area`
--

CREATE TABLE `city_area` (
  `city_area_id` int NOT NULL,
  `city_area_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `city_name` text,
  `city_code` text,
  `deleted` tinyint(1) DEFAULT '0',
  `paused` tinyint(1) DEFAULT '0',
  `city_supp_assos_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `city_area`
--

INSERT INTO `city_area` (`city_area_id`, `city_area_uuid`, `city_name`, `city_code`, `deleted`, `paused`, `city_supp_assos_id`, `createdAt`, `updateTimestamp`) VALUES
(1, '8c27807b-a7ac-40b5-a58f-24b9eb3bfa93', 'Rawal Road', '101', 0, 0, 3, '2021-03-24 12:35:23', '2021-03-24 12:35:23');

-- --------------------------------------------------------

--
-- Table structure for table `city_sectors`
--

CREATE TABLE `city_sectors` (
  `city_sector_id` int NOT NULL,
  `city_sector_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `sector_name` text,
  `sector_code` text,
  `deleted` tinyint(1) DEFAULT '0',
  `paused` tinyint(1) DEFAULT '0',
  `city_area_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `city_sectors`
--

INSERT INTO `city_sectors` (`city_sector_id`, `city_sector_uuid`, `sector_name`, `sector_code`, `deleted`, `paused`, `city_area_id`, `createdAt`, `updateTimestamp`) VALUES
(1, '43773df3-57c6-4032-9f4d-35927d4bbd3a', 'Benazir Hospital', '245', 0, 0, 1, '2021-07-29 12:13:27', '2021-07-29 12:13:27'),
(2, '0533502b-a4d4-4462-9312-c0c39f5df39c', 'PAF Chowk', '244', 0, 0, 1, '2021-07-29 12:13:27', '2021-07-29 12:13:27'),
(3, '801da1e9-5bde-440b-8ca0-64bdd569054d', 'Rawal Chowk', '243', 0, 0, 1, '2021-07-29 12:13:27', '2021-07-29 12:13:27');

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
-- Table structure for table `complainsofactivities`
--

CREATE TABLE `complainsofactivities` (
  `complain_id` int NOT NULL,
  `complain_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `subject` text,
  `message` text,
  `deleted` tinyint(1) DEFAULT '0',
  `paused` tinyint(1) DEFAULT '0',
  `list_act_id` int NOT NULL,
  `field_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `complainsofactivities`
--

INSERT INTO `complainsofactivities` (`complain_id`, `complain_uuid`, `subject`, `message`, `deleted`, `paused`, `list_act_id`, `field_id`, `createdAt`, `updateTimestamp`) VALUES
(1, '80fbcd58-3bba-45f4-8fe1-a6b6f9dcaf24', 'asdadas', 'asdasdasdas', 0, 0, 1, 4, '2021-07-16 15:03:42', '2021-07-16 15:03:42');

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
(2, '2ae46621-f824-4975-a93c-edab0f5c0525', 0, 0, 0, 0, '::1', NULL, 4, '2021-07-16 15:00:46', '2021-07-16 15:00:46'),
(3, '1c424ce4-5798-44a3-9394-db9a25bfb366', 0, 0, 0, 0, '::1', NULL, 4, '2021-07-16 15:02:26', '2021-07-16 15:02:26'),
(4, 'bd2d9fc6-d99c-42b1-afbf-92daa0993926', 0, 0, 0, 0, '::1', NULL, 4, '2021-07-16 15:03:28', '2021-07-16 15:03:28'),
(5, 'feeda977-0666-4af0-a7db-052cf87cbb02', 0, 0, 0, 0, '::1', NULL, 4, '2021-07-16 15:05:53', '2021-07-16 15:05:53'),
(6, 'a5d8b85f-61eb-44f8-b1f0-c9535e8e6f56', 0, 0, 0, 0, '::1', NULL, 4, '2021-07-16 15:07:07', '2021-07-16 15:07:07'),
(7, 'd9ff5b90-04c1-482f-9a76-c02781de1a93', 0, 0, 0, 0, '::1', NULL, 4, '2021-07-16 15:08:24', '2021-07-16 15:08:24'),
(8, 'fd9935c7-8bec-462d-a079-7ac06cfde483', 0, 0, 0, 0, '::1', NULL, 4, '2021-07-16 15:10:49', '2021-07-16 15:10:49'),
(9, '43746ed0-fce0-411f-9d6a-1438b2f1c795', 0, 0, 0, 0, '::1', NULL, 4, '2021-07-26 11:34:06', '2021-07-26 11:34:06'),
(10, '5e096ab6-1e37-4e86-ad08-e2900725941c', 0, 0, 0, 0, '::1', NULL, 4, '2021-07-27 13:22:05', '2021-07-27 13:22:05'),
(11, '8a4915d5-5f10-45a1-a376-7e77dae53083', 0, 0, 0, 0, '::1', NULL, 4, '2021-07-27 16:52:04', '2021-07-27 16:52:04');

-- --------------------------------------------------------

--
-- Table structure for table `executivenotifications`
--

CREATE TABLE `executivenotifications` (
  `execu_notification_id` int NOT NULL,
  `execu_notification_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `isPaused` tinyint(1) DEFAULT '0',
  `notification_text` text,
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
(1, 'b93f9b92-3979-492d-aa6c-f8e4d1bbf4f3', 0, 0, 'You have started working on the Already Registered Agency Saad Sohail...!!!', 1, 4, 2, '2021-06-08 15:30:22', '2021-06-21 17:16:34'),
(2, '2092b555-185f-4d6f-92bf-949c6979f863', 0, 0, 'You have started working on the Already Registered Agency Saad Sohail...!!!                            ', 1, 4, 2, '2021-06-08 15:31:15', '2021-06-15 12:16:33'),
(4, '3f1cab17-2009-4af0-ad3f-3993dca2de3c', 0, 0, 'Some notification', 1, 4, 2, '2021-06-09 12:22:49', '2021-06-15 12:16:33'),
(5, '3286d847-508d-4eb7-9fc8-087cea4284dd', 0, 0, 'Some other notification', 1, 4, 1, '2021-06-09 12:22:49', '2021-06-15 12:16:33'),
(6, 'b320558c-cf9f-4016-b2eb-7393c4ab4c28', 0, 0, 'Whatever notification', 1, 4, 1, '2021-06-09 12:22:49', '2021-06-14 17:11:23'),
(7, 'bf3e10d0-5aaa-42af-b651-efa421543a03', 0, 0, 'Some notification', 1, 4, 2, '2021-06-09 12:22:49', '2021-06-14 17:15:44'),
(8, '86c345c1-6e11-4a81-8634-fbeb7c24213d', 0, 0, 'You have started working on the Already Registered Agency Saad Sohail...!!!', 1, 4, 2, '2021-06-17 17:26:33', '2021-06-21 13:42:49'),
(9, '69834436-1d8f-4b5d-88f2-5952ceaa5389', 0, 0, 'You have started working on the Already Registered Agency Saad Sohail...!!!', 1, 4, 2, '2021-06-17 17:40:06', '2021-06-21 13:42:49'),
(10, '55e02b86-7409-4991-ad11-e47ff97e6fc2', 0, 0, 'You have started working on the Already Registered Agency Saad Sohail...!!!', 1, 4, 2, '2021-06-17 17:48:02', '2021-06-21 13:42:49'),
(11, '39f4bbdd-9bbe-4204-93d5-7be51694ca15', 0, 0, 'You have started working on the Already Registered Agency Pending Clearance...!!!', 1, 4, 2, '2021-06-17 17:56:45', '2021-06-21 13:42:49'),
(12, '3929508d-2ef7-4870-8ff5-1a75b03859f8', 0, 0, 'You have started working on the Already Registered Agency Saad Sohail...!!!', 1, 4, 2, '2021-06-17 18:02:30', '2021-06-21 13:42:49'),
(13, '78a59cfb-0968-4bf5-be17-0988820b2d00', 0, 0, 'You have started working on the Already Registered Agency 3535Pending Clearances```111111...!!!', 1, 4, 2, '2021-06-17 18:04:23', '2021-06-21 13:42:49'),
(14, '086daab0-4d6d-4606-ac2d-a53ceb853100', 0, 0, 'You have started working on the Already Registered Agency 3535Pending Clearances```111111...!!!', 1, 4, 2, '2021-06-17 18:10:48', '2021-06-21 13:42:49'),
(15, 'c3b0e1f4-36f4-4a02-a5ff-ce4773912c5c', 0, 0, 'You have started working on the Already Registered Agency Pending Clearance...!!!', 1, 4, 2, '2021-06-17 18:12:37', '2021-06-21 13:42:49'),
(16, 'cf520739-9f05-44f0-97f6-8a51c6a48563', 0, 0, 'You have started working on the Already Registered Agency Pending Clearance...!!!', 1, 4, 2, '2021-06-17 18:16:22', '2021-06-21 13:42:49'),
(17, '188e2ee4-3fa1-45bf-ae3b-e2b619f30e3c', 0, 0, 'You have started working on the Already Registered Agency Pending Clearance...!!!', 1, 4, 2, '2021-06-17 18:30:19', '2021-06-21 13:42:49'),
(18, 'be594620-4577-4eb0-9d10-8ceea27730aa', 0, 0, 'You have started working on the Already Registered Agency Pending Clearance...!!!', 1, 4, 2, '2021-06-17 18:32:51', '2021-06-21 13:42:49'),
(19, '59fa4ed8-81b3-424f-a40a-acfa7ae091d9', 0, 0, 'You have started working on the Already Registered Agency Pending Clearance...!!!', 1, 4, 2, '2021-06-17 18:38:51', '2021-06-21 13:42:49'),
(20, 'f69aff92-f2c5-404d-9764-40cfaa983951', 0, 0, 'You have started working on the Already Registered Agency Pending Clearance...!!!', 1, 4, 2, '2021-06-17 18:59:44', '2021-06-21 13:42:49'),
(21, '93f99001-49fd-4b1a-978e-792cb2771f10', 0, 0, 'You have started working on the Already Registered Agency Pending Clearance...!!!', 1, 4, 2, '2021-06-17 19:14:14', '2021-06-21 13:42:49'),
(22, '7815ef5f-84dd-4a86-8839-d21f03c83e26', 0, 0, 'You have started working on the Already Registered Agency Saad Sohail...!!!', 1, 4, 2, '2021-06-21 12:03:22', '2021-06-21 13:42:49'),
(23, '9d1e537c-c01f-459d-a107-d5c603076ca0', 0, 0, 'You have started working on the Already Registered Agency Saad Sohail...!!!', 1, 4, 2, '2021-06-21 12:05:25', '2021-06-21 13:42:49'),
(24, '5bb201d8-47b2-4fd6-8110-55a049fb02ef', 0, 0, 'You have started working on the Already Registered Agency Pending Clearances8...!!!', 1, 4, 2, '2021-06-21 12:11:39', '2021-06-21 13:42:49'),
(25, '0cfbe8fc-c09d-4002-9831-a0e7dc86c756', 0, 0, 'You have started working on the Already Registered Agency Pending Clearances8...!!!', 1, 4, 2, '2021-06-21 12:29:23', '2021-06-21 13:42:49'),
(26, '2c5858da-2e90-474a-bf3f-a16b25ca4ab5', 0, 0, 'You have started working on the Already Registered Agency Pending Clearances8...!!!', 1, 4, 2, '2021-06-21 12:33:11', '2021-06-21 13:42:49'),
(27, '5c1f4d8f-7c30-4ede-a804-b45eefc2fa55', 0, 0, 'You have started working on the Already Registered Agency Pending Clearances8...!!!', 1, 4, 2, '2021-06-21 12:39:28', '2021-06-21 13:42:49'),
(28, '55bff034-d308-4279-8d3a-acd1a175cfc2', 0, 0, 'You have started working on the Already Registered Agency Pending Clearances8...!!!', 1, 4, 2, '2021-06-21 12:40:49', '2021-06-21 13:42:49'),
(29, 'c64ce516-e0e7-4803-9d2c-0f302a7e8b44', 0, 0, 'You have started working on the Already Registered Agency Pending Clearances8...!!!', 1, 4, 2, '2021-06-21 12:44:31', '2021-06-21 13:42:49'),
(30, '2ef8100a-12da-44ba-9eb5-8563e88175ab', 0, 0, 'You have started working on the Already Registered Agency Pending Clearances8...!!!', 1, 4, 2, '2021-06-21 12:57:00', '2021-06-21 13:42:49'),
(31, 'bfb506b2-c67f-4faa-a251-f4eaea2f559e', 0, 0, 'You have started working on the Already Registered Agency Pending Clearances8...!!!', 1, 4, 2, '2021-06-21 12:58:53', '2021-06-21 13:42:49'),
(32, 'ef8a38af-ff85-4913-8b50-fd6fc98d2b8e', 0, 0, 'You have started working on the Already Registered Agency Pending Clearances8...!!!', 1, 4, 2, '2021-06-21 13:00:20', '2021-06-21 13:42:49'),
(33, '326c975f-f511-46dc-b1c8-1a5493d8b7ca', 0, 0, 'You have started working on the Already Registered Agency Pending Clearances8...!!!', 1, 4, 2, '2021-06-21 13:01:34', '2021-06-21 13:42:49'),
(34, 'daa1d72d-e5f5-441d-ae54-42946ef99b73', 0, 0, 'You have started working on the Already Registered Agency Pending Clearances8...!!!', 1, 4, 2, '2021-06-21 13:31:29', '2021-06-21 13:42:49');

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
  `field_DOB` text,
  `field_salary` text,
  `salaryStatus` tinyint(1) DEFAULT '0',
  `field_commission` text,
  `field_username` text,
  `field_isDeleted` tinyint(1) DEFAULT '0',
  `field_isPaused` tinyint(1) DEFAULT '0',
  `login_id` int NOT NULL,
  `team_L_id` int DEFAULT NULL,
  `city_sector_id` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `field_executive`
--

INSERT INTO `field_executive` (`field_id`, `field_uuid`, `field_name`, `field_userProfilePic`, `field_contact`, `field_target`, `field_DOB`, `field_salary`, `salaryStatus`, `field_commission`, `field_username`, `field_isDeleted`, `field_isPaused`, `login_id`, `team_L_id`, `city_sector_id`, `createdAt`, `updateTimestamp`) VALUES
(1, 'ce1308f8-0452-42f6-b900-a144ea3ab1f3', NULL, NULL, NULL, NULL, '', NULL, 0, NULL, NULL, 0, 0, 6, 1, 1, '2021-04-19 14:45:32', '2021-07-30 15:43:44'),
(2, '2723ae86-d5e5-47e4-a7e8-c99d852213e7', NULL, NULL, NULL, NULL, '', NULL, 0, NULL, NULL, 0, 0, 4, 1, NULL, '2021-04-19 14:46:07', '2021-07-30 15:56:55'),
(4, 'aef06ba4-8d47-4810-92c1-9f4942fcd473', 'Saad', '/userprofileImage/c5dcd668-86ba-4bac-9da1-26d1c90e1ed8.png', '031245555', NULL, '2010-01-04', NULL, 0, NULL, 'rsasdasd12321', 0, 0, 5, NULL, NULL, '2021-04-19 15:19:48', '2021-06-15 13:59:35'),
(9, '1016e851-da1a-46ab-8366-d472f0440981', 'voip_ITZ', '/userprofileImage/500493e0-b971-4e74-8eb1-523315fca4a5.jpeg', '3423423', NULL, '2021-06-02', NULL, 0, NULL, 'muna_safdar', 0, 0, 16, NULL, NULL, '2021-06-29 16:48:52', '2021-06-29 16:53:35');

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
  `deleted` tinyint(1) DEFAULT '0',
  `withdrawed` tinyint(1) DEFAULT '0',
  `bankName` text,
  `depositedAmount` text,
  `totalAmount` text,
  `bank_sale` tinyint(1) DEFAULT '0',
  `bank_deposited` tinyint(1) DEFAULT '0',
  `bank_deposited_referenceNumber` text,
  `bank_datetime` datetime DEFAULT NULL,
  `accountant_approve` tinyint(1) DEFAULT '0',
  `account_approve_datetime` datetime DEFAULT NULL,
  `account_decline` tinyint(1) DEFAULT '0',
  `account_decline_dateTime` datetime DEFAULT NULL,
  `account_decline_reason` text,
  `clearanceDateTime` datetime DEFAULT NULL,
  `field_id` int NOT NULL,
  `list_act_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `field_executive_pending_earning`
--

INSERT INTO `field_executive_pending_earning` (`field_exe_earn_id`, `field_exe_earn_uuid`, `paused`, `deleted`, `withdrawed`, `bankName`, `depositedAmount`, `totalAmount`, `bank_sale`, `bank_deposited`, `bank_deposited_referenceNumber`, `bank_datetime`, `accountant_approve`, `account_approve_datetime`, `account_decline`, `account_decline_dateTime`, `account_decline_reason`, `clearanceDateTime`, `field_id`, `list_act_id`, `createdAt`, `updateTimestamp`) VALUES
(1, '334b4cfb-9f1b-4f50-9e45-194d092ae859', 0, 0, 0, '', NULL, NULL, 0, 0, NULL, NULL, 0, NULL, 1, NULL, NULL, '2021-06-24 13:29:09', 4, 47, '2021-06-17 13:29:09', '2021-06-22 16:58:56'),
(2, 'd541a6df-647d-4d3a-b712-8dee7008e0a9', 0, 0, 0, '', NULL, NULL, 0, 0, NULL, NULL, 0, NULL, 0, NULL, NULL, '2021-06-24 13:35:08', 4, 48, '2021-06-17 13:35:08', '2021-06-17 13:35:08'),
(3, '49bc534b-4281-4507-80c1-69fd7689972e', 0, 0, 0, '', NULL, NULL, 0, 0, NULL, NULL, 1, NULL, 0, NULL, NULL, '2021-06-24 13:39:37', 4, 49, '2021-06-17 13:39:37', '2021-06-17 13:39:37'),
(4, 'bf9e8e6b-2914-402b-8576-bb6a4785b93c', 0, 0, 0, '', NULL, NULL, 0, 0, NULL, NULL, 1, NULL, 0, NULL, NULL, '2021-06-24 13:45:45', 4, 50, '2021-06-17 13:45:45', '2021-06-17 13:45:45'),
(5, '5526c02d-ee8a-4e42-b4ec-7cb83feae9cd', 0, 0, 0, '', NULL, NULL, 0, 0, NULL, NULL, 0, NULL, 0, NULL, NULL, '2021-06-24 13:48:11', 4, 51, '2021-06-17 13:48:11', '2021-06-17 13:48:11'),
(6, '88ee9ca2-7437-4bfd-8cb3-c30cab83edf0', 0, 0, 0, '', NULL, NULL, 0, 0, NULL, NULL, 0, NULL, 0, NULL, NULL, '2021-06-24 13:50:26', 4, 52, '2021-06-17 13:50:26', '2021-06-17 13:50:26'),
(7, '2e716247-1b53-49ea-a482-f121a9bc4a91', 0, 0, 0, 'Habib Metropolitan Bank Limited', '234', '52', 1, 1, '234', '2021-06-09 12:39:00', NULL, NULL, 0, NULL, NULL, '2021-06-24 17:26:43', 4, 55, '2021-06-17 17:26:43', '2021-06-23 12:39:56'),
(8, '59a7c6f3-1c6c-4553-b801-25fa82ccdd2e', 0, 0, 0, '', NULL, NULL, 1, 0, NULL, NULL, 0, NULL, 0, NULL, NULL, '2021-06-24 17:40:09', 4, 56, '2021-06-17 17:40:09', '2021-06-17 17:40:09'),
(9, '3dd8e772-5030-46c2-87b3-4498486b821e', 0, 0, 0, '', NULL, NULL, 1, 0, NULL, NULL, 0, NULL, 0, NULL, NULL, '2021-06-24 18:30:52', 4, 64, '2021-06-17 18:30:52', '2021-06-17 18:30:52'),
(10, '7fe0015c-2926-45e3-a550-fdf406aad039', 0, 0, 0, '', NULL, NULL, 1, 0, NULL, NULL, 0, NULL, 0, NULL, NULL, '2021-06-24 18:36:53', 4, 65, '2021-06-17 18:36:53', '2021-06-17 18:36:53'),
(11, '754ef072-724f-4daf-9c32-c2cbbeb1807b', 0, 0, 0, '', NULL, NULL, 1, 0, NULL, NULL, 0, NULL, 0, NULL, NULL, '2021-06-24 18:40:59', 4, 66, '2021-06-17 18:40:59', '2021-06-17 18:40:59'),
(19, '66747f56-e0e0-4bef-9d71-a18de3325fab', 0, 0, 0, '', NULL, NULL, 0, 0, NULL, NULL, 0, NULL, 0, NULL, NULL, '2021-06-28 13:31:35', 4, 81, '2021-06-21 13:31:35', '2021-06-21 13:31:35');

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
  `isBank` tinyint(1) DEFAULT '0',
  `bankAmount` float DEFAULT NULL,
  `commissionAmount` float DEFAULT NULL,
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
(2, '336c77d3-bb16-44d6-9ec5-a4aecc742a57', 'Testing 123', 0, 0, 1, 12, 20, 5, 'Note the usage of the sequelize.fn and sequelize.col methods, which should be used to specify an SQL function call and a table column, respectively. These methods should be used instead of passing a plain string (such as char_length(content)) because Sequelize needs to treat this situation differently (for example, using other symbol escaping approaches).', '2021-04-21 13:00:00', '2021-04-21 13:00:00'),
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
(51, '146f255c-393d-4a40-8e7c-04d0bafa4d6f', 2, 43, 0, 0, '2021-05-26 15:33:14', '2021-05-26 15:33:14'),
(56, '24b4eda5-8f66-41fd-91b7-d17062ab8cb9', 1, 47, 0, 0, '2021-06-17 13:29:05', '2021-06-17 13:29:05'),
(57, 'e0fac741-df47-4f80-9e80-6e5cb81d18dc', 4, 47, 0, 0, '2021-06-17 13:29:09', '2021-06-17 13:29:09'),
(58, 'e64b061b-3ad3-49e2-8aa5-e4132970dea4', 3, 47, 0, 0, '2021-06-17 13:29:09', '2021-06-17 13:29:09'),
(59, '419ad068-eaf6-4fd5-8233-0a876847e284', 1, 48, 0, 0, '2021-06-17 13:35:03', '2021-06-17 13:35:03'),
(60, '9b47ca4f-2919-4cbd-bc2f-1250d6cd9b89', 3, 48, 0, 0, '2021-06-17 13:35:08', '2021-06-17 13:35:08'),
(61, '77ec7a81-d192-47fd-b095-246a4297bbed', 2, 48, 0, 0, '2021-06-17 13:35:08', '2021-06-17 13:35:08'),
(62, 'dc7333da-f469-4154-8663-1177539fa686', 4, 48, 0, 0, '2021-06-17 13:35:08', '2021-06-17 13:35:08'),
(63, '3918cfd2-91d5-47fc-adaf-240132aca7a4', 1, 49, 0, 0, '2021-06-17 13:39:32', '2021-06-17 13:39:32'),
(64, '3c599267-b9d7-4306-8ec0-0e58fa6cdfe0', 3, 49, 0, 0, '2021-06-17 13:39:37', '2021-06-17 13:39:37'),
(65, 'e5c284de-5e27-4a87-934b-721601c2acf5', 2, 49, 0, 0, '2021-06-17 13:39:37', '2021-06-17 13:39:37'),
(66, 'e1f09c00-4575-4287-8627-b7c36e6bfb97', 4, 49, 0, 0, '2021-06-17 13:39:37', '2021-06-17 13:39:37'),
(67, '76bba824-f214-4422-a8b0-a3eaf33f0355', 1, 50, 0, 0, '2021-06-17 13:45:39', '2021-06-17 13:45:39'),
(68, 'abdaefbb-d658-4d2f-8bb8-061d811fe4fb', 3, 50, 0, 0, '2021-06-17 13:45:45', '2021-06-17 13:45:45'),
(69, '7bb920aa-f7c2-468a-b03a-cb1ed70f6880', 2, 50, 0, 0, '2021-06-17 13:45:45', '2021-06-17 13:45:45'),
(70, '2d8a83de-75d6-4cb2-bf7f-d215aff258a3', 4, 50, 0, 0, '2021-06-17 13:45:45', '2021-06-17 13:45:45'),
(71, 'b80ba281-1fce-473c-8b27-1699c2288260', 1, 51, 0, 0, '2021-06-17 13:48:02', '2021-06-17 13:48:02'),
(72, 'ffd604aa-f39a-4522-87d1-5b33a5154663', 4, 51, 0, 0, '2021-06-17 13:48:11', '2021-06-17 13:48:11'),
(73, '9a1c98f4-9713-4a6a-a47e-11e1657009fe', 2, 51, 0, 0, '2021-06-17 13:48:11', '2021-06-17 13:48:11'),
(74, '57bc51f3-c8ef-484c-9e23-0c2502f42e7b', 1, 52, 0, 0, '2021-06-17 13:50:22', '2021-06-17 13:50:22'),
(75, 'e0daa95a-160f-421e-a154-b42727cb670c', 2, 52, 0, 0, '2021-06-17 13:50:26', '2021-06-17 13:50:26'),
(76, '81b0265b-9ece-4375-a15d-77be7f9b8914', 1, 53, 0, 0, '2021-06-17 17:15:34', '2021-06-17 17:15:34'),
(77, '6e0ee19e-e03e-40e3-b86d-7d38d31c4779', 2, 53, 0, 0, '2021-06-17 17:15:39', '2021-06-17 17:15:39'),
(81, '726021a2-7311-4fc5-8728-86bbd945c3a6', 3, 55, 0, 0, '2021-06-17 17:26:43', '2021-06-17 17:26:43'),
(82, '361418b0-8d05-4dd0-8056-04d66ee7967d', 2, 55, 0, 0, '2021-06-17 17:26:43', '2021-06-17 17:26:43'),
(83, '231b77ba-08f0-4ceb-b5e4-2f72a05652aa', 4, 55, 0, 0, '2021-06-17 17:26:43', '2021-06-17 17:26:43'),
(84, 'dd6ecb90-2500-42d6-a4e8-6cd9fe6309fa', 1, 56, 0, 0, '2021-06-17 17:40:09', '2021-06-17 17:40:09'),
(85, '3f6ddc02-1491-41c5-9155-85b7981f7d26', 2, 56, 0, 0, '2021-06-17 17:40:09', '2021-06-17 17:40:09'),
(86, '1a285030-b468-4e34-adf2-6ce7345563f1', 3, 56, 0, 0, '2021-06-17 17:40:09', '2021-06-17 17:40:09'),
(87, '32e19bf9-a247-49ee-91c8-8995e9bcf9f8', 4, 56, 0, 0, '2021-06-17 17:40:09', '2021-06-17 17:40:09'),
(88, 'b02624e4-db22-4f51-be8c-6bf65d15e6fd', 4, 64, 0, 0, '2021-06-17 18:30:52', '2021-06-17 18:30:52'),
(97, '16f65128-8445-423e-896b-4d5faaeeb777', 4, 81, 0, 0, '2021-06-21 13:31:35', '2021-06-21 13:31:35');

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
  `notification_icon` text,
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

--
-- Dumping data for table `pendance_clearance_details`
--

INSERT INTO `pendance_clearance_details` (`clearance_details_id`, `clearance_details_uuid`, `paused`, `deleted`, `pending_days`, `createdAt`, `updateTimestamp`) VALUES
(1, '91b064bb-03f5-4a91-ac89-8ae63044fdea', 0, 0, 7, '2021-06-17 12:21:29', '2021-06-17 12:21:29');

-- --------------------------------------------------------

--
-- Table structure for table `pep_banks_details`
--

CREATE TABLE `pep_banks_details` (
  `PEP_Banks_Details_id` int NOT NULL,
  `PEP_Banks_Details_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `paused` tinyint(1) DEFAULT '0',
  `deleted` tinyint(1) DEFAULT '0',
  `bankAccount` text,
  `bankIBAN` text,
  `bankBranchCode` text,
  `bankAddress` text,
  `sa_id` int NOT NULL,
  `Banks_List_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pep_banks_details`
--

INSERT INTO `pep_banks_details` (`PEP_Banks_Details_id`, `PEP_Banks_Details_uuid`, `paused`, `deleted`, `bankAccount`, `bankIBAN`, `bankBranchCode`, `bankAddress`, `sa_id`, `Banks_List_id`, `createdAt`, `updateTimestamp`) VALUES
(1, 'c1ac2abf-9198-43cb-bb34-6ca7c6fca06b', 0, 0, '821000000000000120', 'PKIBAN 92821000000000000120', '8210', 'Chandani Chowk', 1, 23, '2021-06-21 15:54:01', '2021-06-21 15:54:01');

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
(2, '70c27b4d-5fab-442d-b737-147728afc8da', 0, 0, 'My Profile', '/Profile', 'fa fa-user', 0, 0, 1, 1, '2021-04-16 15:37:34', '2021-04-16 15:37:34'),
(3, '84ea0918-22d3-4795-8b55-b5b50a19a591', 0, 0, 'My Sales', '/mysales', 'fa fa-line-chart', 0, 0, 1, 1, '2021-04-16 15:39:31', '2021-04-16 15:39:31'),
(5, 'ca16992a-09cf-4e4f-a8c9-1738265b5498', 0, 0, 'Team Info', '/teamInfo', 'fa fa-users', 0, 0, 1, 1, '2021-04-16 15:53:55', '2021-04-16 15:53:55'),
(6, 'bc89dd11-5c2d-448e-9a25-0c51d15f5024', 0, 0, 'Area of Working', '/areaOf_Working', 'fa fa-globe', 0, 0, 1, 1, '2021-04-16 16:08:27', '2021-04-16 16:08:27'),
(7, 'f0f94f79-ae63-4eab-80a3-b89d39fe0653', 0, 0, 'Progress Analytics', '/progressAnalytics', 'fa fa-tasks', 0, 0, 1, 1, '2021-04-16 16:09:00', '2021-04-16 16:09:00'),
(8, '3d9120d3-7415-4c40-9df5-3d6ece96aa0e', 0, 0, 'Withdraws', '/withdraws', 'fa fa-money', 0, 0, 1, 1, '2021-04-16 16:11:03', '2021-04-16 16:11:03'),
(9, 'ac5cb00b-de2b-4951-93e9-a318667e31e6', 1, 1, 'Notifications', '/notifications', 'fa fa-bell', 0, 0, 1, 1, '2021-04-16 16:11:30', '2021-04-16 16:11:30'),
(10, '496c9437-abc9-4fb4-9c35-c460fdd51cbb', 0, 0, 'Company Deposits', '/companyDeposits', 'fa fa-building-o', 0, 0, 1, 1, '2021-04-16 16:12:15', '2021-04-16 16:12:15'),
(11, '741095d4-18d0-4695-b723-81756a90a45f', 0, 0, 'Start Activity', '/startActivity', 'fa fa-tasks', 0, 0, 1, 1, '2021-04-16 16:12:48', '2021-04-16 16:12:48'),
(12, '80dff99c-df3c-451b-8a36-3eaf9cbb25f0', 0, 0, 'Manage Managers', NULL, NULL, 0, 0, 1, 1, '2021-04-23 15:30:17', '2021-04-23 15:30:17'),
(13, '4c982daa-b39d-4e13-ab2c-385272566c63', 0, 0, 'View Agencies', '/viewAgencies', 'fa fa-building-o', 0, 0, 1, 1, '2021-04-23 15:31:14', '2021-04-23 15:31:14'),
(14, 'd70a44e8-ba26-4bdf-bef7-aa2a2d65b6c1', 0, 0, 'Dashboard', '/dashboard', 'fa fa-bars', 0, 0, 1, 1, '2021-05-07 12:14:52', '2021-05-07 12:14:52'),
(15, '2c9a7963-97f3-4cfb-8d49-51e9e77746d5', 0, 0, 'Assign Area', '/assignArea', 'fa fa-map-marker', 0, 0, 1, 1, '2021-07-26 11:43:37', '2021-07-26 11:43:37'),
(16, 'e2159892-069f-417b-9edf-8e282ca07294', 0, 0, 'Convey Message', '/conveyMessage', 'fa fa-envelope', 0, 0, 1, 1, '2021-07-26 11:43:37', '2021-07-26 11:43:37'),
(17, '67e8d060-ed62-4bf1-829d-6deaff1bd123', 0, 0, 'Progress Report of Field Executive', '/progressReport', 'fa fa-tasks', 0, 0, 1, 1, '2021-07-26 11:43:37', '2021-07-26 11:43:37'),
(18, 'bc5093c2-d40c-4863-a92c-84b4e199dc05', 0, 0, 'Manage Incentive', '/manageIncentive', 'fa fa-gift', 0, 0, 1, 1, '2021-07-26 11:43:37', '2021-07-26 11:43:37'),
(19, '1c3818b5-7ee6-4a05-8fb0-54c4a4d681ce', 0, 0, 'Verify Activity', '/verifyActivity', 'fa fa-tasks', 0, 0, 1, 1, '2021-07-26 11:43:37', '2021-07-26 11:43:37'),
(20, '00f6e36d-f14b-4598-93c7-77d2ea2b5610', 0, 0, 'Add Freelancer to Team', '/addFreelance', 'fa fa-plus', 0, 0, 1, 1, '2021-07-26 11:43:37', '2021-07-26 11:43:37');

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
(4, '87f5f9ad-71e5-4853-b6ca-65f696fef670', 0, 0, 3, 5, '2021-04-16 16:20:04', '2021-04-16 16:20:04'),
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
(21, 'af82b1a4-2545-4dda-a15f-bebafd3cc95a', 0, 0, 14, 5, '2021-05-07 12:20:28', '2021-05-07 12:20:28'),
(22, 'c6ef3d88-c934-4748-b827-503fbf89ce5f', 0, 0, 3, 6, '2021-06-28 15:58:12', '2021-06-28 15:58:12'),
(23, '119a62c4-dc0a-4e3d-85ec-35e2567a379f', 0, 0, 2, 4, '2021-07-26 11:50:28', '2021-07-26 11:50:28'),
(24, 'b12f8643-692a-40e1-8413-f9734c2b1025', 0, 0, 14, 4, '2021-07-26 11:51:49', '2021-07-26 11:51:49'),
(26, '676d8e90-e62a-486b-8919-0b9f5f30853f', 0, 0, 15, 4, '2021-07-26 11:53:28', '2021-07-26 11:53:28'),
(27, '3749cb27-790a-4df3-bbb5-c8bdaedeafd5', 0, 0, 16, 4, '2021-07-26 11:53:34', '2021-07-26 11:53:34'),
(28, '7f9209ff-ef33-44b7-ab40-139551ca4eed', 0, 0, 17, 4, '2021-07-26 11:53:36', '2021-07-26 11:53:36'),
(29, 'bc26bd7b-9fb7-43a2-9a91-9b3cd843dbc2', 0, 0, 19, 4, '2021-07-26 11:53:41', '2021-07-26 11:53:41'),
(30, '196752ae-7c6f-43da-ae80-dd73058a8e1d', 0, 0, 20, 4, '2021-07-26 11:53:45', '2021-07-26 11:53:45');

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

--
-- Dumping data for table `teamlead_login`
--

INSERT INTO `teamlead_login` (`teamLead_login_id`, `teamLead_login_uuid`, `deleted`, `isPaused`, `loggedInStatus`, `loggedOutStatus`, `loggedOutDate`, `ipAddress`, `team_L_id`, `createdAt`, `updateTimestamp`) VALUES
(1, 'fc1fcf6e-cf98-4567-9ffa-5791deb5eaad', 0, 0, 0, 0, NULL, '::1', 1, '2021-07-26 11:36:02', '2021-07-26 11:36:02'),
(2, '2fb14d9d-5bdf-44f4-8d8a-bddb0b285677', 0, 0, 0, 0, NULL, '::1', 1, '2021-07-26 11:54:53', '2021-07-26 11:54:53'),
(3, 'e88e8d5f-63a9-4408-b6ca-ec11d6aaaa37', 0, 0, 0, 0, NULL, '::1', 1, '2021-07-26 12:08:34', '2021-07-26 12:08:34'),
(4, '4b8de47d-869d-426f-bac2-65534371019e', 0, 0, 0, 0, NULL, '::1', 1, '2021-07-26 12:10:06', '2021-07-26 12:10:06'),
(5, '26a0d773-f446-41bf-9ecf-817006f2c379', 0, 0, 0, 0, NULL, '::1', 1, '2021-07-26 12:32:03', '2021-07-26 12:32:03'),
(6, 'c86b22e1-602c-4010-863a-b6fa9a716c10', 0, 0, 0, 0, NULL, '::1', 1, '2021-07-26 13:07:29', '2021-07-26 13:07:29'),
(7, '9ac17704-8be2-42d8-9256-7932f2757ea7', 0, 0, 0, 0, NULL, '::1', 1, '2021-07-26 13:08:04', '2021-07-26 13:08:04'),
(8, '4612da70-bf23-4ff0-8424-017447184db0', 0, 0, 0, 0, NULL, '::1', 1, '2021-07-26 13:22:42', '2021-07-26 13:22:42'),
(9, 'fb9c5f59-1da1-4431-a8b3-938d80622fcb', 0, 0, 0, 0, NULL, '::1', 1, '2021-07-27 12:09:52', '2021-07-27 12:09:52'),
(10, '3308b09d-4ede-4a0e-8d09-a3c27d26f8cb', 0, 0, 0, 0, NULL, '::1', 1, '2021-07-27 12:10:26', '2021-07-27 12:10:26'),
(11, 'a29a339c-1bae-4e01-b618-7d789e196a27', 0, 0, 0, 0, NULL, '::ffff:127.0.0.1', 1, '2021-07-27 16:30:56', '2021-07-27 16:30:56'),
(12, 'a60dd7e1-6bcb-4611-943e-dfa235ad5d8a', 0, 0, 0, 0, NULL, '::1', 1, '2021-07-27 16:45:04', '2021-07-27 16:45:04'),
(13, 'a7db837a-b373-4f68-8468-253ea42d2eea', 0, 0, 0, 0, NULL, '::1', 1, '2021-07-27 16:52:13', '2021-07-27 16:52:13'),
(14, '7f6426e7-d54b-417f-a63d-f66b427c3b4f', 0, 0, 0, 0, NULL, '::1', 1, '2021-07-27 17:02:21', '2021-07-27 17:02:21'),
(15, '90113c77-f9bc-4a79-8392-4067e64ceeae', 0, 0, 0, 0, NULL, '::1', 1, '2021-07-27 17:16:56', '2021-07-27 17:16:56'),
(16, '07d925fa-a3b6-4793-9b9f-c3e38f18d13b', 0, 0, 0, 0, NULL, '::1', 1, '2021-07-29 13:18:49', '2021-07-29 13:18:49'),
(17, 'eb6512fd-2dab-4233-9266-5d9a0e18809a', 0, 0, 0, 0, NULL, '::1', 1, '2021-07-29 13:20:22', '2021-07-29 13:20:22'),
(18, '4e575342-5717-4f44-b38d-5f4d4c43cfd3', 0, 0, 0, 0, NULL, '::1', 1, '2021-07-29 13:20:54', '2021-07-29 13:20:54'),
(19, 'ea9f287e-5705-4817-be7d-cdd4dd0e6da4', 0, 0, 0, 0, NULL, '::1', 1, '2021-07-29 13:21:32', '2021-07-29 13:21:32'),
(20, 'ecd14243-a346-4814-8359-01fd3b049a45', 0, 0, 0, 0, NULL, '::1', 1, '2021-07-29 13:22:38', '2021-07-29 13:22:38'),
(21, '85c6713d-aba2-411a-9dee-8d59a41e8b86', 0, 0, 0, 0, NULL, '::1', 1, '2021-07-29 13:23:05', '2021-07-29 13:23:05'),
(22, 'c240b4cb-9cfb-42f1-9e33-100328b46834', 0, 0, 0, 0, NULL, '::1', 1, '2021-07-29 13:23:55', '2021-07-29 13:23:55'),
(23, 'b8898b3c-f99c-490f-8191-5466cf415296', 0, 0, 0, 0, NULL, '::ffff:127.0.0.1', 1, '2021-07-29 17:19:47', '2021-07-29 17:19:47'),
(24, '115171fd-9d17-4cca-a5a1-524ccea6f6e6', 0, 0, 0, 0, NULL, '::1', 1, '2021-07-29 17:21:16', '2021-07-29 17:21:16'),
(25, '97fac765-2f39-4b07-94bb-62a1178083ba', 0, 0, 0, 0, NULL, '::ffff:127.0.0.1', 1, '2021-07-29 17:22:17', '2021-07-29 17:22:17'),
(26, 'a674cdc4-83d3-4180-928c-aef2c59e3239', 0, 0, 0, 0, NULL, '::1', 1, '2021-07-29 17:31:16', '2021-07-29 17:31:16'),
(27, '0a665db7-06b3-4097-ae36-375db3f7880b', 0, 0, 0, 0, NULL, '::1', 1, '2021-07-29 17:33:06', '2021-07-29 17:33:06'),
(28, '4b282be0-9a16-4496-968f-030cb624d956', 0, 0, 0, 0, NULL, '::1', 1, '2021-07-30 14:59:47', '2021-07-30 14:59:47'),
(29, '8842b109-5c2a-4ed5-9f2d-2908ae189db9', 0, 0, 0, 0, NULL, '::1', 1, '2021-07-30 15:06:19', '2021-07-30 15:06:19'),
(30, '4fc7e837-66b2-4597-952d-4c7532fcdc18', 0, 0, 0, 0, NULL, '::1', 1, '2021-07-30 15:11:47', '2021-07-30 15:11:47'),
(31, '5361fce2-bbec-4b81-844c-6aabd904baba', 0, 0, 0, 0, NULL, '::1', 1, '2021-07-30 15:14:39', '2021-07-30 15:14:39'),
(32, '337412e3-d14b-45f3-995f-793833ceeb9e', 0, 0, 0, 0, NULL, '::1', 1, '2021-07-30 15:38:29', '2021-07-30 15:38:29'),
(33, '6ccd3160-8bd9-4488-9fb0-133c0eeb5a34', 0, 0, 0, 0, NULL, '::1', 1, '2021-07-30 15:43:39', '2021-07-30 15:43:39'),
(34, '2c0301a8-9e46-434d-b7d7-b2b59ed368bb', 0, 0, 0, 0, NULL, '::1', 1, '2021-07-30 15:47:55', '2021-07-30 15:47:55'),
(35, '6d038834-5811-4443-9de8-966aa755edf2', 0, 0, 0, 0, NULL, '::ffff:127.0.0.1', 1, '2021-07-30 15:48:16', '2021-07-30 15:48:16'),
(36, '11dcc1f9-ebb0-4fc0-8b49-d39292c4bf03', 0, 0, 0, 0, NULL, '::1', 1, '2021-07-30 15:50:19', '2021-07-30 15:50:19'),
(37, '05442b91-98ed-4076-9a95-332a7939aef6', 0, 0, 0, 0, NULL, '::1', 1, '2021-07-30 15:55:17', '2021-07-30 15:55:17'),
(38, 'd5b2ae64-c1af-4103-81a0-60f16fff8729', 0, 0, 0, 0, NULL, '::1', 1, '2021-07-30 15:57:36', '2021-07-30 15:57:36'),
(39, '599c4957-1618-4751-8c84-7c93266d0d3b', 0, 0, 0, 0, NULL, '::ffff:127.0.0.1', 1, '2021-07-30 16:28:20', '2021-07-30 16:28:20'),
(40, '2f8c81e8-285c-46e7-8b69-d261ea7e548f', 0, 0, 0, 0, NULL, '::1', 1, '2021-07-30 17:21:10', '2021-07-30 17:21:10'),
(41, '320c7558-8365-4b8b-9ab0-9902c6677de5', 0, 0, 0, 0, NULL, '::1', 1, '2021-07-30 17:22:31', '2021-07-30 17:22:31'),
(42, 'ae32e813-76a4-42c8-ba36-e9c467f0b64a', 0, 0, 0, 0, NULL, '::1', 1, '2021-07-30 17:23:32', '2021-07-30 17:23:32'),
(43, '395e7214-4004-4d0d-a53b-c507f7097d4d', 0, 0, 0, 0, NULL, '::1', 1, '2021-07-30 17:25:46', '2021-07-30 17:25:46'),
(44, 'e03927de-dda3-4d09-9520-9f88e7fe136f', 0, 0, 0, 0, NULL, '::1', 1, '2021-07-30 17:29:11', '2021-07-30 17:29:11'),
(45, '223fa8c3-f4cb-4326-ba16-e7a145952421', 0, 0, 0, 0, NULL, '::1', 1, '2021-07-30 17:29:51', '2021-07-30 17:29:51'),
(46, '5bebf24c-cb4e-41f0-8ddd-bb7649ee022d', 0, 0, 0, 0, NULL, '::1', 1, '2021-07-30 17:33:52', '2021-07-30 17:33:52'),
(47, 'cb5b5e3e-35c7-4a4c-9a3e-cdff69972d76', 0, 0, 0, 0, NULL, '::1', 1, '2021-07-30 17:35:19', '2021-07-30 17:35:19');

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
(1, '1c9741c6-492f-417c-a902-3459e1c374b9', 'Saad Team Lead 6', '/userprofileImage/28053ff9-2156-45ab-ba77-70366d47d2cc.png', '03218741000', '150', '85100', '1.5%', 'teamLead_112', 0, 0, 1, 1, 3, '2021-06-03 12:59:15', '2021-07-26 12:36:20'),
(3, 'e893aa9b-d4a1-41b5-9089-c1d2f3b02fa4', 'Team Lead', 'Team Lead.jpg', '0321 8741000', '150', '85100', '1.5%', 'teamLead_11', 0, 0, 1, 1, 1, '2021-06-03 13:04:05', '2021-06-03 13:04:05');

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
(3, '28053ff9-2156-45ab-ba77-70366d47d2cc', 0, 0, 'team@gmail.com', '$2b$10$yzvXW8fE.5cozYeXQPWLxO8aGQ9gP8zcJVCUGJdjRPKXhOx6Ua7Ou', 'eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoidGVhbUBnbWFpbC5jb20iLCJpYXQiOjE2MTg4MjU1NjcsImV4cCI6MTYxOTQzMDM2N30.76zjMIoTRVRI2U5M8huG9Tpd4Dh70yljCGaWBIzg_rneav-xLc0AHFCk7PooC8n6', 1, 4, '2021-04-19 14:46:07', '2021-07-26 12:36:20'),
(4, 'c4c61caf-8a5a-4bec-a4fb-9839f5b0d4ff', 0, 0, 'rishat.81@gmai.com', '$2b$10$//pdVJzK66uhUWO5vteBd.QUllLxCAyTsAFz5Os1QrPN015T21ddu', 'eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoicmlzaGF0LjUwODFAZ21haWwuY29tIiwiaWF0IjoxNjE4ODI2ODQ5LCJleHAiOjE2MTk0MzE2NDl9.EAuwO3nDMbzcUTjw6jxsIIAiqLKBVYJogLgkY63kMX0818vHESjNzm_H3FNDlqHM', 1, 5, '2021-04-19 15:07:29', '2021-07-30 15:56:55'),
(5, 'c5dcd668-86ba-4bac-9da1-26d1c90e1ed8', 0, 0, 'rishat.5081@gmail.com', '$2b$10$EHPVAp721YaKKBjt4QpeW.g91md3G7rWrnWO.TpQ8/QSNuUSaFmBq', 'eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoicmlzaGF0LjUwODFAZ21haWwuY29tIiwiaWF0IjoxNjE4ODI3NTg3LCJleHAiOjE2MTk0MzIzODd9.YCVj-wJh32cKSQA3Uw9uwRldFdCYSSbw3XG-bb8CLjddF_KJ7l5kcrITr8-GKuLD', 1, 6, '2021-04-19 15:19:47', '2021-06-04 17:49:51'),
(6, '99009998-a33d-40b5-bcf8-6d3d4673209e', 0, 0, 'qqa!@A.COM', '$2b$10$Cr8Ij/WJ5YTPM1V1SRQnEOfJMxWRi41vXcY7QKw9.kUe60FPqMn4i', 'eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoicXFhIUBBLkNPTSIsImlhdCI6MTYyMTQ5MzIxNywiZXhwIjoxNjIyMDk4MDE3fQ.kOduARNeVMJMfuqR7MdzBmKAVnwkdCmYD84dX7WFOxTraojJnlpvCzDrVjiqP8Rx', 1, 6, '2021-05-20 11:46:57', '2021-07-30 15:43:44'),
(16, '500493e0-b971-4e74-8eb1-523315fca4a5', 0, 0, 'voip.itz.solutions@gmail.com', '$2b$10$eykRe4128bfft6PCPxCBJuJwmmXnbIfcyRI7JNupowf9MaeIEWkRq', 'eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoidm9pcC5pdHouc29sdXRpb25zQGdtYWlsLmNvbSIsImlhdCI6MTYyNDk2NzMzMiwiZXhwIjoxNjI1NTcyMTMyfQ.m2CZYlHDvT74KPGY6zmrmpLbPBk-ZRmhQ7-XUdfSUU55_OTWTxglnjpxbhQCzXP8', 1, 6, '2021-06-29 16:48:52', '2021-06-29 16:52:41');

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
-- Table structure for table `webads`
--

CREATE TABLE `webads` (
  `WebAds_id` int NOT NULL,
  `WebAds_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `paused` tinyint(1) DEFAULT '0',
  `deleted` tinyint(1) DEFAULT '0',
  `title` text,
  `description` text,
  `picPath` text,
  `sa_id` int NOT NULL,
  `user_role_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `webads`
--

INSERT INTO `webads` (`WebAds_id`, `WebAds_uuid`, `paused`, `deleted`, `title`, `description`, `picPath`, `sa_id`, `user_role_id`, `createdAt`, `updateTimestamp`) VALUES
(1, '50513d43-0f9c-47d5-9f11-3673b8b6330a', 0, 0, 'Development', 'This is dev server', '/img/404.png', 1, 6, '2021-07-01 12:13:25', '2021-07-01 12:13:25'),
(2, 'd5fdba20-46b2-4809-afde-9210414becdb', 0, 0, 'Development 2', 'This is dev server', '/img/add.png', 1, 6, '2021-07-01 12:14:09', '2021-07-01 12:14:09'),
(3, 'f9d2320b-36bd-4a6a-8f44-0101e06668fa', 0, 0, 'Development 3', 'This is dev server', '/img/GM.jpg', 1, 6, '2021-07-01 12:14:25', '2021-07-01 12:14:25'),
(4, '5f632e10-389c-4f82-8f5e-0b43f5e1598a', 0, 0, 'Development 3', 'This is dev server', '/img/GM.jpg', 1, 4, '2021-07-26 12:07:48', '2021-07-26 12:07:48'),
(5, 'e68568ed-a6ee-4af1-9d7b-84353477e82b', 0, 0, 'Development 3', 'This is dev server', '/img/profile.jpg', 1, 4, '2021-07-26 12:08:10', '2021-07-26 12:08:10'),
(6, '2bc31813-9943-4955-ab9a-eb3011a52838', 0, 0, 'Development 3', 'This is dev server', '/img/Team Lead.jpg', 1, 4, '2021-07-26 12:08:24', '2021-07-26 12:08:24');

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
  ADD KEY `comp_id` (`comp_id`),
  ADD KEY `agency_id` (`agency_id`);

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
-- Indexes for table `banks_list`
--
ALTER TABLE `banks_list`
  ADD PRIMARY KEY (`Banks_List_id`),
  ADD KEY `sa_id` (`sa_id`);

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
-- Indexes for table `changerolelogs`
--
ALTER TABLE `changerolelogs`
  ADD PRIMARY KEY (`changeRole_id`),
  ADD KEY `field_id` (`field_id`),
  ADD KEY `team_L_id` (`team_L_id`);

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
-- Indexes for table `city_sectors`
--
ALTER TABLE `city_sectors`
  ADD PRIMARY KEY (`city_sector_id`),
  ADD KEY `city_area_id` (`city_area_id`);

--
-- Indexes for table `city_sup_assos`
--
ALTER TABLE `city_sup_assos`
  ADD PRIMARY KEY (`city_supp_assos_id`),
  ADD UNIQUE KEY `city_sup_assos_sup_id_city_id_unique` (`city_id`,`sup_id`),
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
-- Indexes for table `complainsofactivities`
--
ALTER TABLE `complainsofactivities`
  ADD PRIMARY KEY (`complain_id`),
  ADD KEY `list_act_id` (`list_act_id`),
  ADD KEY `field_id` (`field_id`);

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
  ADD KEY `team_L_id` (`team_L_id`),
  ADD KEY `city_sector_id` (`city_sector_id`);

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
  ADD KEY `list_act_id` (`list_act_id`);

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
-- Indexes for table `pep_banks_details`
--
ALTER TABLE `pep_banks_details`
  ADD PRIMARY KEY (`PEP_Banks_Details_id`),
  ADD KEY `sa_id` (`sa_id`),
  ADD KEY `Banks_List_id` (`Banks_List_id`);

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
-- Indexes for table `webads`
--
ALTER TABLE `webads`
  ADD PRIMARY KEY (`WebAds_id`),
  ADD KEY `sa_id` (`sa_id`),
  ADD KEY `user_role_id` (`user_role_id`);

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
  MODIFY `list_act_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

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
  MODIFY `agency_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `banks_list`
--
ALTER TABLE `banks_list`
  MODIFY `Banks_List_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

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
-- AUTO_INCREMENT for table `changerolelogs`
--
ALTER TABLE `changerolelogs`
  MODIFY `changeRole_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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
-- AUTO_INCREMENT for table `city_sectors`
--
ALTER TABLE `city_sectors`
  MODIFY `city_sector_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
-- AUTO_INCREMENT for table `complainsofactivities`
--
ALTER TABLE `complainsofactivities`
  MODIFY `complain_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
  MODIFY `execu_login_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `executivenotifications`
--
ALTER TABLE `executivenotifications`
  MODIFY `execu_notification_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

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
  MODIFY `field_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `field_executive_earning`
--
ALTER TABLE `field_executive_earning`
  MODIFY `field_exe_earn_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `field_executive_pending_earning`
--
ALTER TABLE `field_executive_pending_earning`
  MODIFY `field_exe_earn_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

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
  MODIFY `list_sub_act_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=98;

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
  MODIFY `clearance_details_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `pep_banks_details`
--
ALTER TABLE `pep_banks_details`
  MODIFY `PEP_Banks_Details_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `permmission_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `permission_role_assosiate`
--
ALTER TABLE `permission_role_assosiate`
  MODIFY `perm_assos_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

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
  MODIFY `teamLead_login_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

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
  MODIFY `login_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `user_login_role`
--
ALTER TABLE `user_login_role`
  MODIFY `user_role_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `webads`
--
ALTER TABLE `webads`
  MODIFY `WebAds_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

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
  ADD CONSTRAINT `activities_ibfk_1` FOREIGN KEY (`field_id`) REFERENCES `field_executive` (`field_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `activities_ibfk_2` FOREIGN KEY (`comp_id`) REFERENCES `compaigns` (`comp_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `activities_ibfk_3` FOREIGN KEY (`agency_id`) REFERENCES `agency_info` (`agency_id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
-- Constraints for table `banks_list`
--
ALTER TABLE `banks_list`
  ADD CONSTRAINT `banks_list_ibfk_1` FOREIGN KEY (`sa_id`) REFERENCES `super_admin` (`sa_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `carriers`
--
ALTER TABLE `carriers`
  ADD CONSTRAINT `carriers_ibfk_1` FOREIGN KEY (`sa_id`) REFERENCES `super_admin` (`sa_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `carriers_ibfk_2` FOREIGN KEY (`comp_access_id`) REFERENCES `companies_access` (`comp_access_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `carriers_paid_payment`
--
ALTER TABLE `carriers_paid_payment`
  ADD CONSTRAINT `carriers_paid_payment_ibfk_1` FOREIGN KEY (`sa_id`) REFERENCES `super_admin` (`sa_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `carriers_paid_payment_ibfk_2` FOREIGN KEY (`c_s_payment_id`) REFERENCES `carriers_services_payment` (`c_s_payment_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `carriers_services`
--
ALTER TABLE `carriers_services`
  ADD CONSTRAINT `carriers_services_ibfk_1` FOREIGN KEY (`carrier_id`) REFERENCES `carriers` (`carrier_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table ` carriers_services_payment`
--
ALTER TABLE ` carriers_services_payment`
  ADD CONSTRAINT ` carriers_services_payment_ibfk_1` FOREIGN KEY (`carrier_id`) REFERENCES `carriers` (`carrier_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `changerolelogs`
--
ALTER TABLE `changerolelogs`
  ADD CONSTRAINT `changerolelogs_ibfk_1` FOREIGN KEY (`field_id`) REFERENCES `field_executive` (`field_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `changerolelogs_ibfk_2` FOREIGN KEY (`team_L_id`) REFERENCES `team_lead` (`team_L_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `city`
--
ALTER TABLE `city`
  ADD CONSTRAINT `city_ibfk_1` FOREIGN KEY (`zone_id`) REFERENCES `zone` (`zone_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `city_area`
--
ALTER TABLE `city_area`
  ADD CONSTRAINT `city_area_ibfk_1` FOREIGN KEY (`city_supp_assos_id`) REFERENCES `city_sup_assos` (`city_supp_assos_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `city_sectors`
--
ALTER TABLE `city_sectors`
  ADD CONSTRAINT `city_sectors_ibfk_1` FOREIGN KEY (`city_area_id`) REFERENCES `city_area` (`city_area_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `city_sup_assos`
--
ALTER TABLE `city_sup_assos`
  ADD CONSTRAINT `city_sup_assos_ibfk_1` FOREIGN KEY (`city_id`) REFERENCES `city` (`city_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `city_sup_assos_ibfk_2` FOREIGN KEY (`sup_id`) REFERENCES `supervisor` (`sup_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `compaigns`
--
ALTER TABLE `compaigns`
  ADD CONSTRAINT `compaigns_ibfk_1` FOREIGN KEY (`sup_id`) REFERENCES `supervisor` (`sup_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `compaigns_ibfk_2` FOREIGN KEY (`city_id`) REFERENCES `city` (`city_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `compaign_activities`
--
ALTER TABLE `compaign_activities`
  ADD CONSTRAINT `compaign_activities_ibfk_1` FOREIGN KEY (`comp_id`) REFERENCES `compaigns` (`comp_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `compaign_activities_ibfk_2` FOREIGN KEY (`field_id`) REFERENCES `field_executive` (`field_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `compaign_activities_ibfk_3` FOREIGN KEY (`agency_id`) REFERENCES `agency_info` (`agency_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `compaign_sales`
--
ALTER TABLE `compaign_sales`
  ADD CONSTRAINT `compaign_sales_ibfk_1` FOREIGN KEY (`comp_id`) REFERENCES `compaigns` (`comp_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `compaign_sales_ibfk_2` FOREIGN KEY (`field_id`) REFERENCES `field_executive` (`field_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `compaign_sales_ibfk_3` FOREIGN KEY (`agency_id`) REFERENCES `agency_info` (`agency_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `companies_access`
--
ALTER TABLE `companies_access`
  ADD CONSTRAINT `companies_access_ibfk_1` FOREIGN KEY (`sa_id`) REFERENCES `super_admin` (`sa_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `company_gm_info`
--
ALTER TABLE `company_gm_info`
  ADD CONSTRAINT `company_gm_info_ibfk_1` FOREIGN KEY (`comp_access_id`) REFERENCES `companies_access` (`comp_access_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `company_gm_info_ibfk_2` FOREIGN KEY (`zone_id`) REFERENCES `zone` (`zone_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `company_promotions`
--
ALTER TABLE `company_promotions`
  ADD CONSTRAINT `company_promotions_ibfk_1` FOREIGN KEY (`gm_id`) REFERENCES `company_gm_info` (`gm_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `complainsofactivities`
--
ALTER TABLE `complainsofactivities`
  ADD CONSTRAINT `complainsofactivities_ibfk_1` FOREIGN KEY (`list_act_id`) REFERENCES `activities` (`list_act_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `complainsofactivities_ibfk_2` FOREIGN KEY (`field_id`) REFERENCES `field_executive` (`field_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `cust_care_activities`
--
ALTER TABLE `cust_care_activities`
  ADD CONSTRAINT `cust_care_activities_ibfk_1` FOREIGN KEY (`cust_care_id`) REFERENCES `cust_care_csr` (`cust_care_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cust_care_activities_ibfk_2` FOREIGN KEY (`agency_id`) REFERENCES `agency_info` (`agency_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `cust_care_csr`
--
ALTER TABLE `cust_care_csr`
  ADD CONSTRAINT `cust_care_csr_ibfk_1` FOREIGN KEY (`man_id`) REFERENCES `managers` (`man_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cust_care_csr_ibfk_2` FOREIGN KEY (`d_id`) REFERENCES `departments` (`d_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cust_care_csr_ibfk_3` FOREIGN KEY (`login_id`) REFERENCES `user_login_information` (`login_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `dataentry_employee`
--
ALTER TABLE `dataentry_employee`
  ADD CONSTRAINT `dataentry_employee_ibfk_1` FOREIGN KEY (`login_id`) REFERENCES `user_login_information` (`login_id`),
  ADD CONSTRAINT `dataentry_employee_ibfk_2` FOREIGN KEY (`man_id`) REFERENCES `managers` (`man_id`);

--
-- Constraints for table `dealers_of_pep_activities`
--
ALTER TABLE `dealers_of_pep_activities`
  ADD CONSTRAINT `dealers_of_pep_activities_ibfk_1` FOREIGN KEY (`pep_dealers_id`) REFERENCES `dealers_info_from_pep` (`pep_dealers_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `dealers_of_pep_activities_ibfk_2` FOREIGN KEY (`cust_care_id`) REFERENCES `cust_care_csr` (`cust_care_id`);

--
-- Constraints for table `departments`
--
ALTER TABLE `departments`
  ADD CONSTRAINT `departments_ibfk_1` FOREIGN KEY (`comp_access_id`) REFERENCES `companies_access` (`comp_access_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `departments_ibfk_2` FOREIGN KEY (`gm_id`) REFERENCES `company_gm_info` (`gm_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `departments_ibfk_3` FOREIGN KEY (`sa_id`) REFERENCES `super_admin` (`sa_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `executivelogins`
--
ALTER TABLE `executivelogins`
  ADD CONSTRAINT `executivelogins_ibfk_1` FOREIGN KEY (`field_id`) REFERENCES `field_executive` (`field_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `executivenotifications`
--
ALTER TABLE `executivenotifications`
  ADD CONSTRAINT `executivenotifications_ibfk_1` FOREIGN KEY (`field_id`) REFERENCES `field_executive` (`field_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `executivenotifications_ibfk_2` FOREIGN KEY (`notification_id`) REFERENCES `notificationtext` (`notification_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `executive_advert_stock`
--
ALTER TABLE `executive_advert_stock`
  ADD CONSTRAINT `executive_advert_stock_ibfk_1` FOREIGN KEY (`team_adver_stock_id`) REFERENCES `teaml_adver_stock` (`team_adver_stock_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `executive_advert_stock_ibfk_2` FOREIGN KEY (`field_id`) REFERENCES `field_executive` (`field_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `executive_stock_usage`
--
ALTER TABLE `executive_stock_usage`
  ADD CONSTRAINT `executive_stock_usage_ibfk_1` FOREIGN KEY (`field_id`) REFERENCES `field_executive` (`field_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `executive_stock_usage_ibfk_2` FOREIGN KEY (`agency_id`) REFERENCES `agency_info` (`agency_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `executive_stock_usage_ibfk_3` FOREIGN KEY (`field_e_stock_id`) REFERENCES `executive_advert_stock` (`field_e_stock_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `field_executive`
--
ALTER TABLE `field_executive`
  ADD CONSTRAINT `field_executive_ibfk_1` FOREIGN KEY (`login_id`) REFERENCES `user_login_information` (`login_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `field_executive_ibfk_2` FOREIGN KEY (`team_L_id`) REFERENCES `team_lead` (`team_L_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `field_executive_ibfk_3` FOREIGN KEY (`city_sector_id`) REFERENCES `city_sectors` (`city_sector_id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
-- Constraints for table `field_executive_withdraws`
--
ALTER TABLE `field_executive_withdraws`
  ADD CONSTRAINT `field_executive_withdraws_ibfk_1` FOREIGN KEY (`field_id`) REFERENCES `field_executive` (`field_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `field_executive_withdraws_ibfk_2` FOREIGN KEY (`field_exe_earn_id`) REFERENCES `field_executive_pending_earning` (`field_exe_earn_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `gmlogin`
--
ALTER TABLE `gmlogin`
  ADD CONSTRAINT `gmlogin_ibfk_1` FOREIGN KEY (`gm_id`) REFERENCES `company_gm_info` (`gm_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `gm_notifications`
--
ALTER TABLE `gm_notifications`
  ADD CONSTRAINT `gm_notifications_ibfk_1` FOREIGN KEY (`gm_id`) REFERENCES `company_gm_info` (`gm_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `list_sub_activities`
--
ALTER TABLE `list_sub_activities`
  ADD CONSTRAINT `list_sub_activities_ibfk_1` FOREIGN KEY (`list_id`) REFERENCES `lists` (`list_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `list_sub_activities_ibfk_2` FOREIGN KEY (`list_act_id`) REFERENCES `activities` (`list_act_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `login_page`
--
ALTER TABLE `login_page`
  ADD CONSTRAINT `login_page_ibfk_1` FOREIGN KEY (`sa_id`) REFERENCES `super_admin` (`sa_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `managerlogin`
--
ALTER TABLE `managerlogin`
  ADD CONSTRAINT `managerlogin_ibfk_1` FOREIGN KEY (`man_id`) REFERENCES `managers` (`man_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `managernotifications`
--
ALTER TABLE `managernotifications`
  ADD CONSTRAINT `managernotifications_ibfk_1` FOREIGN KEY (`man_id`) REFERENCES `managers` (`man_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `managers`
--
ALTER TABLE `managers`
  ADD CONSTRAINT `managers_ibfk_1` FOREIGN KEY (`d_id`) REFERENCES `departments` (`d_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `managers_ibfk_2` FOREIGN KEY (`zone_id`) REFERENCES `zone` (`zone_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `pep_banks_details`
--
ALTER TABLE `pep_banks_details`
  ADD CONSTRAINT `pep_banks_details_ibfk_1` FOREIGN KEY (`sa_id`) REFERENCES `super_admin` (`sa_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pep_banks_details_ibfk_2` FOREIGN KEY (`Banks_List_id`) REFERENCES `banks_list` (`Banks_List_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `permission_role_assosiate`
--
ALTER TABLE `permission_role_assosiate`
  ADD CONSTRAINT `permission_role_assosiate_ibfk_1` FOREIGN KEY (`permmission_id`) REFERENCES `permissions` (`permmission_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `permission_role_assosiate_ibfk_2` FOREIGN KEY (`user_role_id`) REFERENCES `user_login_role` (`user_role_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `promotion_requests_status`
--
ALTER TABLE `promotion_requests_status`
  ADD CONSTRAINT `promotion_requests_status_ibfk_1` FOREIGN KEY (`prom_id`) REFERENCES `promotion_req_by_supervisor` (`prom_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `promotion_requests_status_ibfk_2` FOREIGN KEY (`man_id`) REFERENCES `managers` (`man_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `promotion_req_by_supervisor`
--
ALTER TABLE `promotion_req_by_supervisor`
  ADD CONSTRAINT `promotion_req_by_supervisor_ibfk_1` FOREIGN KEY (`city_id`) REFERENCES `city` (`city_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `promotion_req_by_supervisor_ibfk_2` FOREIGN KEY (`sup_id`) REFERENCES `supervisor` (`sup_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `receiving_calls`
--
ALTER TABLE `receiving_calls`
  ADD CONSTRAINT `receiving_calls_ibfk_1` FOREIGN KEY (`cust_care_id`) REFERENCES `cust_care_csr` (`cust_care_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `request_of_advertisement`
--
ALTER TABLE `request_of_advertisement`
  ADD CONSTRAINT `request_of_advertisement_ibfk_1` FOREIGN KEY (`man_id`) REFERENCES `managers` (`man_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `request_of_advertisement_ibfk_2` FOREIGN KEY (`gm_id`) REFERENCES `company_gm_info` (`gm_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `role_extrainfo`
--
ALTER TABLE `role_extrainfo`
  ADD CONSTRAINT `role_extrainfo_ibfk_1` FOREIGN KEY (`user_role_id`) REFERENCES `user_login_role` (`user_role_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `signup_page`
--
ALTER TABLE `signup_page`
  ADD CONSTRAINT `signup_page_ibfk_1` FOREIGN KEY (`sa_id`) REFERENCES `super_admin` (`sa_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `supervisor`
--
ALTER TABLE `supervisor`
  ADD CONSTRAINT `supervisor_ibfk_1` FOREIGN KEY (`login_id`) REFERENCES `user_login_information` (`login_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `supervisor_ibfk_2` FOREIGN KEY (`man_id`) REFERENCES `managers` (`man_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `supervisorlogin`
--
ALTER TABLE `supervisorlogin`
  ADD CONSTRAINT `supervisorlogin_ibfk_1` FOREIGN KEY (`sup_id`) REFERENCES `supervisor` (`sup_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `supervisornotification`
--
ALTER TABLE `supervisornotification`
  ADD CONSTRAINT `supervisornotification_ibfk_1` FOREIGN KEY (`sup_id`) REFERENCES `supervisor` (`sup_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `teamlead_login`
--
ALTER TABLE `teamlead_login`
  ADD CONSTRAINT `teamlead_login_ibfk_1` FOREIGN KEY (`team_L_id`) REFERENCES `team_lead` (`team_L_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `teamlead_notifications`
--
ALTER TABLE `teamlead_notifications`
  ADD CONSTRAINT `teamlead_notifications_ibfk_1` FOREIGN KEY (`team_L_id`) REFERENCES `team_lead` (`team_L_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `teaml_adver_stock`
--
ALTER TABLE `teaml_adver_stock`
  ADD CONSTRAINT `teaml_adver_stock_ibfk_1` FOREIGN KEY (`adver_stock_act_id`) REFERENCES `advertising_stock_allocation` (`adver_stock_act_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `team_lead`
--
ALTER TABLE `team_lead`
  ADD CONSTRAINT `team_lead_ibfk_1` FOREIGN KEY (`city_area_id`) REFERENCES `city_area` (`city_area_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `team_lead_ibfk_2` FOREIGN KEY (`sup_id`) REFERENCES `supervisor` (`sup_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `team_lead_ibfk_3` FOREIGN KEY (`login_id`) REFERENCES `user_login_information` (`login_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `training_activities`
--
ALTER TABLE `training_activities`
  ADD CONSTRAINT `training_activities_ibfk_1` FOREIGN KEY (`training_ID`) REFERENCES `training` (`training_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `training_activities_ibfk_2` FOREIGN KEY (`field_id`) REFERENCES `field_executive` (`field_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `training_activities_ibfk_3` FOREIGN KEY (`team_L_id`) REFERENCES `team_lead` (`team_L_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_login_information`
--
ALTER TABLE `user_login_information`
  ADD CONSTRAINT `user_login_information_ibfk_1` FOREIGN KEY (`user_role_id`) REFERENCES `user_login_role` (`user_role_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `webads`
--
ALTER TABLE `webads`
  ADD CONSTRAINT `webads_ibfk_1` FOREIGN KEY (`sa_id`) REFERENCES `super_admin` (`sa_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `webads_ibfk_2` FOREIGN KEY (`user_role_id`) REFERENCES `user_login_role` (`user_role_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `web_content`
--
ALTER TABLE `web_content`
  ADD CONSTRAINT `web_content_ibfk_1` FOREIGN KEY (`sa_id`) REFERENCES `super_admin` (`sa_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
