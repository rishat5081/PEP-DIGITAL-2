-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 23, 2021 at 03:57 PM
-- Server version: 5.7.24
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
-- Table structure for table `advertisement_recommendation`
--

CREATE TABLE `advertisement_recommendation` (
  `adver_recom_id` int(11) NOT NULL,
  `advert_recom_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `agency_id` int(11) NOT NULL,
  `descrip` text,
  `field_id` int(11) NOT NULL,
  `approval_status` tinyint(1) DEFAULT '0',
  `status` tinyint(1) DEFAULT '0',
  `decline` tinyint(1) DEFAULT '0',
  `deleted` tinyint(1) DEFAULT '0',
  `decline_descrip` text,
  `team_L_id` int(11) NOT NULL,
  `team_lead_forward_status` tinyint(1) DEFAULT '0',
  `team_lead_decline_status` tinyint(1) DEFAULT '0',
  `team_lead_decline_descr` text,
  `sup_id` int(11) NOT NULL,
  `sup_forward_status` tinyint(1) DEFAULT '0',
  `sup_decline_status` tinyint(1) DEFAULT '0',
  `sup_decline_descr` text,
  `man_id` int(11) NOT NULL,
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
  `adver_stock_id` int(11) NOT NULL,
  `advert_stock_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `adver_stock_name` text,
  `adver_stock_descritpion` text,
  `adver_stock_total_Price` float DEFAULT NULL,
  `adver_stock_Price_per_piece` float DEFAULT NULL,
  `req_adver` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `advertising_stock_allocation`
--

CREATE TABLE `advertising_stock_allocation` (
  `adver_stock_act_id` int(11) NOT NULL,
  `adver_stock_alloc_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `adver_stock_act_name` text,
  `adver_stock_act_descritpion` text,
  `adver_stock_act_total_Quantity` int(11) DEFAULT NULL,
  `adver_stock_id` int(11) NOT NULL,
  `sup_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `agency_info`
--

CREATE TABLE `agency_info` (
  `agency_id` int(11) NOT NULL,
  `agency_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `agency_name` text,
  `agency_type` text,
  `agency_Contact` text,
  `agency_address` text,
  `agency_Longitude` text,
  `firstVisit` tinyint(1) DEFAULT '1',
  `agency_owner_Name` text,
  `agency_contact_2` text,
  `agency_Latitude` text,
  `field_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `carriers`
--

CREATE TABLE `carriers` (
  `carrier_id` int(11) NOT NULL,
  `carrier_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `carrier_name` text,
  `carrier_type` text,
  `carrier_status` tinyint(1) DEFAULT '0',
  `sa_id` int(11) NOT NULL,
  `comp_access_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `carriers_logs`
--

CREATE TABLE `carriers_logs` (
  `carrier_logs_id` int(11) NOT NULL,
  `update_date_time` datetime DEFAULT NULL,
  `c_name` text,
  `c_type` text,
  `c_Status` tinyint(1) DEFAULT '0',
  `c_added_DateTime` datetime DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `carriers_paid_payment`
--

CREATE TABLE `carriers_paid_payment` (
  `c_paid_id` int(11) NOT NULL,
  `carrier_paid_pay_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `c_amount` double DEFAULT NULL,
  `sa_id` int(11) NOT NULL,
  `c_s_payment_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `carriers_services`
--

CREATE TABLE `carriers_services` (
  `c_service_id` int(11) NOT NULL,
  `carrier_service_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `c_service_name` text,
  `c_service_type` text,
  `c_service_added_Date_Time` datetime DEFAULT NULL,
  `c_service_status` tinyint(1) DEFAULT '0',
  `c_service_addedBy` text,
  `c_service_total_service` double DEFAULT NULL,
  `carrier_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table ` carriers_services_payment`
--

CREATE TABLE ` carriers_services_payment` (
  `c_s_payment_id` int(11) NOT NULL,
  `payment_c_ser_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `c_s_payment_totalAmount` double DEFAULT NULL,
  `c_s_payment_pending` double DEFAULT NULL,
  `c_service_status` tinyint(1) DEFAULT '0',
  `c_s_payment_paid` double DEFAULT NULL,
  `carrier_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `city`
--

CREATE TABLE `city` (
  `city_id` int(11) NOT NULL,
  `city_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `city_name` text,
  `city_code` text,
  `zone_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `city`
--

INSERT INTO `city` (`city_id`, `city_uuid`, `city_name`, `city_code`, `zone_id`, `createdAt`, `updateTimestamp`) VALUES
(1, '48ae5aae-82ae-43ef-a3b9-93e1513a3be2', 'Rawalpindi', '352', 1, '2021-03-22 15:47:24', '2021-03-22 15:47:24');

-- --------------------------------------------------------

--
-- Table structure for table `city_area`
--

CREATE TABLE `city_area` (
  `city_area_id` int(11) NOT NULL,
  `city_area_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `city_name` text,
  `city_code` text,
  `city_supp_assos_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `city_area`
--

INSERT INTO `city_area` (`city_area_id`, `city_area_uuid`, `city_name`, `city_code`, `city_supp_assos_id`, `createdAt`, `updateTimestamp`) VALUES
(2, 'bfee316c-2f60-4d35-9903-202612395644', 'Rawal Road', '101', 2, '2021-03-22 15:47:55', '2021-03-22 15:47:55');

-- --------------------------------------------------------

--
-- Table structure for table `city_sup_assos`
--

CREATE TABLE `city_sup_assos` (
  `city_supp_assos_id` int(11) NOT NULL,
  `city_and_sup_asso_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `paused` tinyint(1) DEFAULT '0',
  `city_id` int(11) NOT NULL,
  `sup_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `city_sup_assos`
--

INSERT INTO `city_sup_assos` (`city_supp_assos_id`, `city_and_sup_asso_uuid`, `deleted`, `paused`, `city_id`, `sup_id`, `createdAt`, `updateTimestamp`) VALUES
(2, '23e514b7-dee5-4f72-805c-18042a8cc6b5', 0, 0, 1, 2, '2021-03-22 15:47:44', '2021-03-22 15:47:44');

-- --------------------------------------------------------

--
-- Table structure for table `comapny_access_logs`
--

CREATE TABLE `comapny_access_logs` (
  `comp_acc_logs_id` int(11) NOT NULL,
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
  `comp_id` int(11) NOT NULL,
  `comp_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `comp_name` text,
  `comp_starting_date_time` text,
  `comp_type` text,
  `comp_status` tinyint(1) DEFAULT NULL,
  `comp_ending_date_time` datetime DEFAULT NULL,
  `comp_deleted` tinyint(1) DEFAULT '0',
  `comp_paused` tinyint(1) DEFAULT '0',
  `sup_id` int(11) NOT NULL,
  `city_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `compaign_activities`
--

CREATE TABLE `compaign_activities` (
  `comp_act_id` int(11) NOT NULL,
  `comp_act_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `comp_id` int(11) NOT NULL,
  `agency_checkIN` tinyint(1) DEFAULT '0',
  `field_id` int(11) NOT NULL,
  `agency_CheckIn_Time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `act_descrip` text,
  `agency_checkOut` tinyint(1) DEFAULT '0',
  `agency_Checkout_time` datetime NOT NULL,
  `Latitude` text,
  `Longitude` text,
  `agency_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `compaign_sales`
--

CREATE TABLE `compaign_sales` (
  `comp_sale_id` int(11) NOT NULL,
  `saomp_sale_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `comp_id` int(11) NOT NULL,
  `field_id` int(11) NOT NULL,
  `sale_total_amount` float DEFAULT NULL,
  `recieved_amount` float DEFAULT NULL,
  `agency_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `companies_access`
--

CREATE TABLE `companies_access` (
  `comp_access_id` int(11) NOT NULL,
  `comp_access_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `sa_id` int(11) NOT NULL,
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
(1, '8ff93dfa-224f-48de-8b05-7cdd2d329fa5', 1, 'Pak e Property', 'Rawalpindi', '051-9765821', NULL, 1, '2021-03-22 15:33:59', '2021-03-22 15:33:59');

-- --------------------------------------------------------

--
-- Table structure for table `company_gm_info`
--

CREATE TABLE `company_gm_info` (
  `gm_id` int(11) NOT NULL,
  `gm_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `gm_name` text,
  `gm_email` text,
  `gm_password` text,
  `gm_contact` text,
  `gm_profile_pic` text,
  `gm_salary` int(11) DEFAULT NULL,
  `gm_member_Since` datetime DEFAULT NULL,
  `comp_access_id` int(11) NOT NULL,
  `zone_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `company_gm_info`
--

INSERT INTO `company_gm_info` (`gm_id`, `gm_uuid`, `gm_name`, `gm_email`, `gm_password`, `gm_contact`, `gm_profile_pic`, `gm_salary`, `gm_member_Since`, `comp_access_id`, `zone_id`, `createdAt`, `updateTimestamp`) VALUES
(2, '3c130551-d421-41bb-ac88-762b38b63d3d', 'GM of Company', 'gm@info.com', '$2b$10$WfgW1aVsxJOZ1tD.yMRSBuHFPl9NtHyiJJJSGRUt4EgbC5hEp1P1G', '0321-1111000', '/img/GM.jpg', 150000, NULL, 1, 1, '2021-03-22 15:35:03', '2021-03-22 15:35:03'),
(3, 'a06b9da7-4693-4b5a-bc49-af00cce3e9ec', 'GM of Company', 'gm@info.com', '$2b$10$WfgW1aVsxJOZ1tD.yMRSBuHFPl9NtHyiJJJSGRUt4EgbC5hEp1P1G', '0321-1111000', '/img/GM.jpg', 150000, NULL, 1, 1, '2021-03-22 15:35:39', '2021-03-22 15:35:39');

-- --------------------------------------------------------

--
-- Table structure for table `company_promotions`
--

CREATE TABLE `company_promotions` (
  `comp_prom_id` int(11) NOT NULL,
  `comp_prom_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `comp_prom_name` text,
  `comp_prom_desc` text,
  `prom_status` tinyint(1) DEFAULT NULL,
  `prom_deleted` tinyint(1) DEFAULT NULL,
  `gm_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `cust_care_activities`
--

CREATE TABLE `cust_care_activities` (
  `cust_c_act_id` int(11) NOT NULL,
  `cust_c_act_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `cust_deleted` tinyint(1) DEFAULT '0',
  `cust_care_id` int(11) NOT NULL,
  `agency_id` int(11) NOT NULL,
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
  `cust_care_id` int(11) NOT NULL,
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
  `man_id` int(11) NOT NULL,
  `d_id` int(11) NOT NULL,
  `login_id` int(11) NOT NULL,
  `totalCallTime` text,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `dataentry_employee`
--

CREATE TABLE `dataentry_employee` (
  `de_emp_id` int(11) NOT NULL,
  `de_emp_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `login_id` int(11) NOT NULL,
  `de_emp_name` text,
  `man_id` int(11) NOT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `salary` int(11) DEFAULT NULL,
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
  `pep_dealers_id` int(11) NOT NULL,
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
  `pep_dealer_act_id` int(11) NOT NULL,
  `pep_dealer_act_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `status` tinyint(1) DEFAULT '0',
  `deleted` tinyint(1) DEFAULT '0',
  `feedback` text,
  `pep_dealers_id` int(11) NOT NULL,
  `cust_care_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `d_id` int(11) NOT NULL,
  `d_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `paused` tinyint(1) DEFAULT '0',
  `d_deleted` tinyint(1) DEFAULT '0',
  `d_name` text,
  `d_type` text,
  `d_added_Date_Time` datetime DEFAULT NULL,
  `comp_access_id` int(11) NOT NULL,
  `gm_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL,
  `sa_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`d_id`, `d_uuid`, `paused`, `d_deleted`, `d_name`, `d_type`, `d_added_Date_Time`, `comp_access_id`, `gm_id`, `createdAt`, `updateTimestamp`, `sa_id`) VALUES
(3, 'fbe0b432-364c-434c-8495-f2d1152fcb91', 0, 0, 'Sales', 'Sale and Marketing', NULL, 1, 2, '2021-03-22 15:36:53', '2021-03-22 15:36:53', 1);

-- --------------------------------------------------------

--
-- Table structure for table `executive_advert_stock`
--

CREATE TABLE `executive_advert_stock` (
  `field_e_stock_id` int(11) NOT NULL,
  `field_e_stock_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `total_Quantity` int(11) DEFAULT NULL,
  `team_adver_stock_id` int(11) NOT NULL,
  `field_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `executive_stock_usage`
--

CREATE TABLE `executive_stock_usage` (
  `stock_Usage_id` int(11) NOT NULL,
  `stock_Usage_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `stock_Usage_dateTime` datetime DEFAULT NULL,
  `stock_Usage_given` int(11) DEFAULT NULL,
  `field_id` int(11) NOT NULL,
  `agency_id` int(11) NOT NULL,
  `field_e_stock_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `field_executive`
--

CREATE TABLE `field_executive` (
  `field_id` int(11) NOT NULL,
  `field_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `field_name` text,
  `field_userProfilePic` text,
  `field_contact` text,
  `field_target` text,
  `field_salary` text,
  `field_commission` text,
  `field_username` text,
  `field_isDeleted` tinyint(1) DEFAULT '0',
  `field_isPaused` tinyint(1) DEFAULT '0',
  `login_id` int(11) NOT NULL,
  `team_L_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `field_executive_earning`
--

CREATE TABLE `field_executive_earning` (
  `field_exe_earn_id` int(11) NOT NULL,
  `field_exe_earn_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `paused` tinyint(1) DEFAULT '0',
  `withdrawed` tinyint(1) DEFAULT '0',
  `totalAmount` int(11) DEFAULT NULL,
  `field_id` int(11) NOT NULL,
  `list_act_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `field_executive_withdraws`
--

CREATE TABLE `field_executive_withdraws` (
  `field_exe_with_id` int(11) NOT NULL,
  `field_exe_with_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `withdraw_status` tinyint(1) DEFAULT '0',
  `totalAmount` int(11) DEFAULT NULL,
  `field_id` int(11) NOT NULL,
  `field_exe_earn_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `lists`
--

CREATE TABLE `lists` (
  `list_id` int(11) NOT NULL,
  `list_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `list_name` text,
  `list_deleted` tinyint(1) DEFAULT '0',
  `list_paused` tinyint(1) DEFAULT '0',
  `list_amount` int(11) DEFAULT NULL,
  `list_description` text,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `list_activities`
--

CREATE TABLE `list_activities` (
  `list_act_id` int(11) NOT NULL,
  `list_act_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `field_id` int(11) NOT NULL,
  `comp_act_id` int(11) NOT NULL,
  `list_act_checked` tinyint(1) DEFAULT '0',
  `bank_sale` tinyint(1) DEFAULT '0',
  `bank_deposited` tinyint(1) DEFAULT '0',
  `bank_deposited_referenceNumber` int(11) DEFAULT NULL,
  `bank_datetime` datetime DEFAULT NULL,
  `accountant_approve` tinyint(1) DEFAULT '0',
  `account_approve_datetime` datetime DEFAULT NULL,
  `account_decline` tinyint(1) DEFAULT '0',
  `account_decline_dateTime` datetime DEFAULT NULL,
  `account_decline_reason` text,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL,
  `agency_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `list_sub_activities`
--

CREATE TABLE `list_sub_activities` (
  `list_sub_act_id` int(11) NOT NULL,
  `list_sub_act_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `list_id` int(11) NOT NULL,
  `list_act_id` int(11) NOT NULL,
  `list_deleted` tinyint(1) DEFAULT '0',
  `list_paused` tinyint(1) DEFAULT '0',
  `amount` text,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `login_page`
--

CREATE TABLE `login_page` (
  `login_page_id` int(11) NOT NULL,
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
  `sa_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `login_page`
--

INSERT INTO `login_page` (`login_page_id`, `login_page_uuid`, `paused`, `deleted`, `loginTitle`, `btnText`, `forgetText`, `forgetEmail`, `forgetPassword`, `createAccountText`, `pictureName`, `pictureFolder`, `createAccountIcon`, `emailPlaceHolder`, `emailIcon`, `passwordPlaceHolder`, `passwordIcon`, `sa_id`, `createdAt`, `updateTimestamp`) VALUES
(1, '2f5626f1-06c8-4658-aa4e-d3711f08d652', 0, 0, 'Member Login', 'Login', 'Forgot', 'Email', 'Password', 'Create your Account', 'img-01.png', '/img/', 'fa fa-long-arrow-right m-l-5', 'Enter Email', 'fa fa-envelope', 'Enter Password', 'fa fa-lock', 1, '2021-03-22 15:40:18', '2021-03-22 15:40:18');

-- --------------------------------------------------------

--
-- Table structure for table `managers`
--

CREATE TABLE `managers` (
  `man_id` int(11) NOT NULL,
  `man_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `man_name` text,
  `man_email` text,
  `man_password` text,
  `man_userProfilePic` text,
  `man_contact` text,
  `man_isDeleted` tinyint(1) DEFAULT '0',
  `man_salary` text,
  `man_username` text,
  `d_id` int(11) NOT NULL,
  `zone_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `managers`
--

INSERT INTO `managers` (`man_id`, `man_uuid`, `man_name`, `man_email`, `man_password`, `man_userProfilePic`, `man_contact`, `man_isDeleted`, `man_salary`, `man_username`, `d_id`, `zone_id`, `createdAt`, `updateTimestamp`) VALUES
(3, 'bfe3a17b-7c39-4b31-b655-6150403195d7', 'Manager', 'manager@info.com', '$2b$10$WfgW1aVsxJOZ1tD.yMRSBuHFPl9NtHyiJJJSGRUt4EgbC5hEp1P1G', 'manager.png', '0333-5214777', 0, '140000', 'manager_12', 3, 1, '2021-03-22 15:37:35', '2021-03-22 15:37:35');

-- --------------------------------------------------------

--
-- Table structure for table `packages`
--

CREATE TABLE `packages` (
  `pack_id` int(11) NOT NULL,
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
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `permmission_id` int(11) NOT NULL,
  `permmission_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `paused` tinyint(1) DEFAULT '0',
  `d_deleted` tinyint(1) DEFAULT '0',
  `permission_name` text,
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

INSERT INTO `permissions` (`permmission_id`, `permmission_uuid`, `paused`, `d_deleted`, `permission_name`, `edit`, `delete_permission`, `add_permission`, `update_permission`, `createdAt`, `updateTimestamp`) VALUES
(1, '5e8ca59a-80b9-4b8a-9aa1-65a3742ef124', 0, 0, 'Manage Managers', 0, 0, 1, 1, '2021-03-23 14:48:21', '2021-03-23 14:48:21'),
(2, '89cbc3bf-e3fa-4634-9625-6cf66c4efbe8', 0, 0, 'Manage City', 0, 0, 1, 1, '2021-03-23 14:48:29', '2021-03-23 14:48:29'),
(3, '16b8484d-c50b-4c42-af9c-e48bf2da2835', 0, 0, 'Manage City Areas', 0, 0, 1, 1, '2021-03-23 14:48:35', '2021-03-23 14:48:35'),
(4, '58861ccf-5698-46b1-bbb0-b4087f1281ad', 0, 0, 'Manage Report', 0, 0, 1, 1, '2021-03-23 14:48:41', '2021-03-23 14:48:41'),
(5, '5264500b-0f31-4917-acf8-f0907ddf5481', 0, 0, 'Manage Supervisor', 0, 0, 1, 1, '2021-03-23 14:48:49', '2021-03-23 14:48:49'),
(6, 'e8a66186-05d6-4d1e-8ebf-eaf94ceb0e85', 0, 0, 'Manage Team Lead', 0, 0, 1, 1, '2021-03-23 14:48:55', '2021-03-23 14:48:55'),
(7, '852902a6-043f-4124-bcc5-a8cf6e0be306', 0, 0, 'Manage Field Executive', 0, 0, 1, 1, '2021-03-23 14:49:01', '2021-03-23 14:49:01'),
(8, '39c91527-29d0-4092-b1ef-65ed67101b00', 0, 0, 'Manage Agencies', 0, 0, 1, 1, '2021-03-23 14:49:13', '2021-03-23 14:49:13'),
(9, '1eb8b450-11d8-4fcf-aabd-10eb244b09ab', 0, 0, 'Manage CSR', 0, 0, 1, 1, '2021-03-23 14:49:16', '2021-03-23 14:49:16'),
(10, 'fd216dd5-96ce-48d3-867a-346a64d1de24', 0, 0, 'Withdraw', 0, 0, 1, 1, '2021-03-23 14:49:28', '2021-03-23 14:49:28'),
(11, '44649b5b-acb5-473b-8690-1a4833b09df8', 0, 0, 'View Earning', 0, 0, 1, 1, '2021-03-23 14:49:36', '2021-03-23 14:49:36');

-- --------------------------------------------------------

--
-- Table structure for table `permission_role_assosiate`
--

CREATE TABLE `permission_role_assosiate` (
  `perm_assos_id` int(11) NOT NULL,
  `perm_assos_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `paused` tinyint(1) DEFAULT '0',
  `d_deleted` tinyint(1) DEFAULT '0',
  `permmission_id` int(11) NOT NULL,
  `user_role_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `permission_role_assosiate`
--

INSERT INTO `permission_role_assosiate` (`perm_assos_id`, `perm_assos_uuid`, `paused`, `d_deleted`, `permmission_id`, `user_role_id`, `createdAt`, `updateTimestamp`) VALUES
(1, '475d27ab-7c7a-4e6e-9740-99ad0496d22f', 0, 0, 10, 6, '2021-03-23 19:56:42', '2021-03-23 19:56:42');

-- --------------------------------------------------------

--
-- Table structure for table `promotion_requests_status`
--

CREATE TABLE `promotion_requests_status` (
  `prom_req_id` int(11) NOT NULL,
  `prom_req_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `isPaused` tinyint(1) DEFAULT '0',
  `prom_req_approve` tinyint(1) DEFAULT '0',
  `prom_req_decline` tinyint(1) DEFAULT '0',
  `prom_req_datetime` datetime DEFAULT NULL,
  `prom_req_approve_desc` text,
  `prom_req_decline_desc` text,
  `prom_id` int(11) NOT NULL,
  `man_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `promotion_req_by_supervisor`
--

CREATE TABLE `promotion_req_by_supervisor` (
  `prom_id` int(11) NOT NULL,
  `prom_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `isPaused` tinyint(1) DEFAULT '0',
  `prom_name` text,
  `prom_desc` text,
  `prom_requested_Date` datetime DEFAULT NULL,
  `prom_status` tinyint(1) DEFAULT '0',
  `city_id` int(11) NOT NULL,
  `sup_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `receiving_calls`
--

CREATE TABLE `receiving_calls` (
  `receive_call_id` int(11) NOT NULL,
  `call_recieve_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `isPaused` tinyint(1) DEFAULT '0',
  `receive_call_solved` tinyint(1) DEFAULT '0',
  `receive_call_status` tinyint(1) DEFAULT '0',
  `receive_call_problem_text` text,
  `receive_call_solution` text,
  `cust_care_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `request_of_advertisement`
--

CREATE TABLE `request_of_advertisement` (
  `req_adver` int(11) NOT NULL,
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
  `man_id` int(11) NOT NULL,
  `gm_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `sa_logs_ondepartment`
--

CREATE TABLE `sa_logs_ondepartment` (
  `sa_on_Depart_id` int(11) NOT NULL,
  `date_time` datetime DEFAULT NULL,
  `d_id` int(11) DEFAULT NULL,
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
  `signUp_page_id` int(11) NOT NULL,
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
  `sa_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `signup_page`
--

INSERT INTO `signup_page` (`signUp_page_id`, `signUp_page_uuid`, `paused`, `deleted`, `signUpTitle`, `btnText`, `alreadyHaveAccount`, `alreadyHaveAccountIcon`, `pictureName`, `pictureFolder`, `emailPlaceHolder`, `emailIcon`, `passwordPlaceHolder`, `passwordIcon`, `confirmPasswordPlaceHolder`, `confirmPasswordIcon`, `sa_id`, `createdAt`, `updateTimestamp`) VALUES
(1, '4ef10a90-5701-4b4e-849e-ceffd84d159e', 0, 0, 'Member Registration', 'Register', 'Already have Account', 'fa fa-long-arrow-right m-l-5', 'img-01.png', '/img/', 'Enter Email', 'fa fa-envelope', 'Enter Password', 'fa fa-lock', 'Confirm your Password', 'fa fa-lock', 1, '2021-03-22 15:40:35', '2021-03-22 15:40:35');

-- --------------------------------------------------------

--
-- Table structure for table `supervisor`
--

CREATE TABLE `supervisor` (
  `sup_id` int(11) NOT NULL,
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
  `login_id` int(11) NOT NULL,
  `man_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `supervisor`
--

INSERT INTO `supervisor` (`sup_id`, `sup_uuid`, `sup_name`, `sup_userProfilePic`, `sup_contact`, `sup_target`, `sup_salary`, `sup_commission`, `sup_username`, `sup_isDeleted`, `sup_isPaused`, `login_id`, `man_id`, `createdAt`, `updateTimestamp`) VALUES
(2, '30a5bb84-8fa7-4f36-b786-bb3d1b22cbc6', 'Development', '/img/profile.jpg', '0345-5536125', '144', '15000', '2.5%', 'develop', 0, 0, 3, 3, '2021-03-22 15:46:59', '2021-03-22 15:46:59');

-- --------------------------------------------------------

--
-- Table structure for table `super_admin`
--

CREATE TABLE `super_admin` (
  `sa_id` int(11) NOT NULL,
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
(1, '83b9ec16-ed44-4423-9033-34dbf4f030d4', 'Saad', 'superA@aa', '$2b$10$IhwmSCZDgheT3pCvaTd4YezxKSXPgXnS84r6HKXI.56uXawidQ8Ee', NULL, NULL, '2021-03-22 15:33:45', '2021-03-22 15:33:45');

-- --------------------------------------------------------

--
-- Table structure for table `teaml_adver_stock`
--

CREATE TABLE `teaml_adver_stock` (
  `team_adver_stock_id` int(11) NOT NULL,
  `team_adver_stock_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `total_Quantity` int(11) DEFAULT NULL,
  `used` int(11) DEFAULT NULL,
  `adver_stock_act_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `team_lead`
--

CREATE TABLE `team_lead` (
  `team_L_id` int(11) NOT NULL,
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
  `city_area_id` int(11) NOT NULL,
  `sup_id` int(11) NOT NULL,
  `login_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `team_lead`
--

INSERT INTO `team_lead` (`team_L_id`, `team_L_uuid`, `team_L_name`, `team_L_userProfilePic`, `team_L_contact`, `team_L_target`, `team_L_salary`, `team_L_commission`, `team_L_username`, `team_L_isDeleted`, `team_L_isPaused`, `city_area_id`, `sup_id`, `login_id`, `createdAt`, `updateTimestamp`) VALUES
(6, 'b21ba7d2-6547-48f4-b38b-98d8e6e12ff0', 'Team Lead', 'Team Lead.jpg', '0321-8741000', '150', '85100', '1.5%', 'teamLead_11', 0, 0, 2, 2, 4, '2021-03-22 15:51:44', '2021-03-22 15:51:44');

-- --------------------------------------------------------

--
-- Table structure for table `training`
--

CREATE TABLE `training` (
  `training_ID` int(11) NOT NULL,
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
  `training_act_ID` int(11) NOT NULL,
  `training_act_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `paused` tinyint(1) DEFAULT '0',
  `isComplete` tinyint(1) DEFAULT '0',
  `deleted` tinyint(1) DEFAULT '0',
  `completeDescription` text,
  `name` text,
  `purpose` text,
  `training_ID` int(11) NOT NULL,
  `field_id` int(11) NOT NULL,
  `team_L_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user_login_information`
--

CREATE TABLE `user_login_information` (
  `login_id` int(11) NOT NULL,
  `login_uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `paused` tinyint(1) DEFAULT '0',
  `deleted` tinyint(1) DEFAULT '0',
  `login_email` text,
  `login_password` text,
  `jwt` text,
  `verified` tinyint(1) DEFAULT '0',
  `user_role_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_login_information`
--

INSERT INTO `user_login_information` (`login_id`, `login_uuid`, `paused`, `deleted`, `login_email`, `login_password`, `jwt`, `verified`, `user_role_id`, `createdAt`, `updateTimestamp`) VALUES
(1, '953fd67b-2db1-4da3-9b2c-10d8a8297dce', 0, 0, 'test@aa', '$2b$10$IhwmSCZDgheT3pCvaTd4YezxKSXPgXnS84r6HKXI.56uXawidQ8Ee', NULL, 0, 4, '2021-03-22 15:39:26', '2021-03-22 15:39:26'),
(2, 'dbc2e872-ea2f-461f-b21f-5965b5cb335f', 0, 0, 'rishat.5081@gmail.c', '$2b$10$Qj3xc1bwtwxQrej8gepTo.6TQqHhYtBOL3d.KDwWK1B0M9rkWPq7y', 'eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoicmlzaGF0LjUwODFAZ21haWwuY29tIiwiaWF0IjoxNjE2NDA5NjgwLCJleHAiOjE2MTcwMTQ0ODB9.5uzUtWgkOubrlqbtDu-t5GX-sJ-XnFwPSDWTuw04XHla1BaS3m6SXUXiOOfpQyPQ', 0, 4, '2021-03-22 15:41:20', '2021-03-22 15:41:20'),
(3, '1b834814-587b-45a6-8742-70bd3b921e75', 0, 0, 'rishat.5081@gmail.com', '$2b$10$PgTRLBZb5mTQJAv/jDNcK.CvrRMP2X8sK8h0oir6KnG0hNoaC1X9K', 'eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoicmlzaGF0LjUwODFAZ21haWwuY29tIiwiaWF0IjoxNjE2NDA5ODEzLCJleHAiOjE2MTcwMTQ2MTN9.dh1_Luy54TGMm9S6jjKA_IMd1YrUniL3jUEpRXLNWtM21j8L66_x-k7B4vm_bHqh', 1, 4, '2021-03-22 15:43:33', '2021-03-22 15:44:05'),
(4, '6bfb53f7-0672-4e30-a79e-9d4de8684122', 0, 0, 'rishat81@gmail.com', '$2b$10$KDgscfQDuwKPYSzsUpJTEOTPoeMxZwB5AHoCCbOrzVo59xMR1P5Am', 'eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoicmlzaGF0ODFAZ21haWwuY29tIiwiaWF0IjoxNjE2NDEwMTkzLCJleHAiOjE2MTcwMTQ5OTN9.11P9N5Ef8pVyuD8ARsl-FoRtHFlMqkFgdlo2pZGL5MZrNeGwVZPimSj6EtLUfGke', 0, 4, '2021-03-22 15:49:53', '2021-03-22 15:49:53');

-- --------------------------------------------------------

--
-- Table structure for table `user_login_role`
--

CREATE TABLE `user_login_role` (
  `user_role_id` int(11) NOT NULL,
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
(1, '120613ff-90c8-4452-a634-9c1fd894486d', 0, 0, 'SuperVisor', '2021-03-22 15:38:27', '2021-03-22 15:38:27'),
(2, 'a062723f-79ff-4b20-b7b4-321cb46b2339', 0, 0, 'Manager', '2021-03-22 15:38:43', '2021-03-22 15:38:43'),
(3, 'bdf3aac0-95c4-4513-83ca-c4a9a8fd71b6', 0, 0, 'GM Company', '2021-03-22 15:38:56', '2021-03-22 15:38:56'),
(4, '8d055bbc-5e7d-4d42-9219-a3dcd816788b', 0, 0, 'Team Lead', '2021-03-22 15:39:03', '2021-03-22 15:39:03'),
(5, 'bbd67c30-6ba7-47c3-8446-5db43dd9f8e7', 0, 0, 'Field Executive', '2021-03-22 15:39:07', '2021-03-22 15:39:07'),
(6, 'fef91578-1c49-468e-b859-10180f7cbcd7', 0, 0, 'Freelance Field Executive', '2021-03-22 15:39:10', '2021-03-22 15:39:10'),
(7, '4de485b2-6b3a-4857-bd50-fcc365d41d11', 0, 0, 'Testing', '2021-03-22 18:12:48', '2021-03-22 18:12:48');

-- --------------------------------------------------------

--
-- Table structure for table `web_content`
--

CREATE TABLE `web_content` (
  `web_content_id` int(11) NOT NULL,
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
  `sa_id` int(11) NOT NULL,
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
(1, '5205d687-1cd0-439c-a9a3-3956658f2fb9', 0, 0, '/logo/logo.png', 'What We Do', 'HOW WE DO IT', 'WHAT IT DELIVERS', 'ipsum dolor sit amet, consectetur adipisicing elit. Tempore sequi ut aut, possimus\n  eos ab. Aperiam iste ratione\n  aspernatur quod alias reprehenderit? Aspernatur ex dolorem fugiat quis consequuntur\n  repudiandae eveniet.', '. Tempore sequi ut aut, possimus eos ab. Aperiam iste ratione\n  aspernatur quod alias reprehenderit? Aspernatur ex dolorem fugiat quis consequuntur\n  repudiandae eveniet.', 'ipsum dolor sit amet, consectetur adipisicing elit. ab. Aperiam iste ratione\n  aspernatur quod alias reprehenderit? Aspernatur ex dolorem fugiat quis consequuntur\n  repudiandae eveniet.', 'Sign Up', 'Login', 'What We Do', ' Lorem ipsum dolor sit amet consectetur adipisicing elit.\n  Similique illum nulla modi?\n  Provident veritatis magni quae tempore\n  illum fugit molestiae ipsum? Quibusdam', 'What We Do', 'Lorem ipsum dolor sit amet consectetur adipisicing elit.\n  Similique illum nulla modi?\n  Provident veritatis magni quae tempore\n  illum fugit molestiae ipsum? Quibusdam', 'WHAT IT DELIVERS', 'Lorem ipsum dolor sit amet consectetur adipisicing elit.\n  Similique illum nulla modi?\n  Provident veritatis magni quae tempore\n  illum fugit molestiae ipsum? Quibusdam', 'What We Do', ' Lorem ipsum dolor sit amet consectetur adipisicing elit.\n  Similique illum nulla modi?\n  Provident veritatis magni quae tempore\n  illum fugit molestiae ipsum? Quibusdam', 'What We Do', 'Lorem ipsum dolor sit amet consectetur adipisicing elit.\n  Similique illum nulla modi?\n  Provident veritatis magni quae tempore\n  illum fugit molestiae ipsum? Quibusdam', 'WHAT IT DELIVERS', 'Lorem ipsum dolor sit amet consectetur adipisicing elit.\n  Similique illum nulla modi?\n  Provident veritatis magni quae tempore\n  illum fugit molestiae ipsum? Quibusdam', 'What We Do', ' Lorem ipsum dolor sit amet consectetur adipisicing elit.\n  Similique illum nulla modi?\n  Provident veritatis magni quae tempore\n  illum fugit molestiae ipsum? Quibusdam', 'What We Do', 'Lorem ipsum dolor sit amet consectetur adipisicing elit.\n  Similique illum nulla modi?\n  Provident veritatis magni quae tempore\n  illum fugit molestiae ipsum? Quibusdam', 'WHAT IT DELIVERS', 'Lorem ipsum dolor sit amet consectetur adipisicing elit.\n  Similique illum nulla modi?\n  Provident veritatis magni quae tempore\n  illum fugit molestiae ipsum? Quibusdam', 1, 'What we Do', 'our team', 'Newsfeed', 'pep life', 'Social media', '<li><a href=\"\">How it works</a></li>\n                              <li><a href=\"\">Where it works</a></li>', '<li><a href=\"\">management</a></li>\n                                  <li><a href=\"\">local leadership</a></li>\n                                  <li><a href=\"\">advisory board</a></li>', '<li><a href=\"\">management</a></li>\n                                       <li><a href=\"\">local leadership</a></li>\n                                       <li><a href=\"\">advisory board</a></li>', '<li><a href=\"\">history</a></li>\n                                  <li><a href=\"\">careers</a></li>\n                                  <li><a href=\"\">contact</a></li>', '<li><a href=\"\"><i class=\"fa fa-facebook\" aria-hidden=\"true\"></i> Facebook</a></li>\n                                    <li><a href=\"\"><i class=\"fa fa-google\" aria-hidden=\"true\"></i> Google</a></li>\n                                    <li><a href=\"\"><i class=\"fa fa-instagram\" aria-hidden=\"true\"></i> Instagram</a></li>', '/video/video.mp4', '2021-03-22 15:40:52', '2021-03-22 15:40:52');

-- --------------------------------------------------------

--
-- Table structure for table `zone`
--

CREATE TABLE `zone` (
  `zone_id` int(11) NOT NULL,
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
(1, 'ef81256c-1f65-4ff5-9412-8f136a741aee', 0, 0, 'Punjab', '2021-03-22 15:34:55', '2021-03-22 15:34:55');

--
-- Indexes for dumped tables
--

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
-- Indexes for table `field_executive_withdraws`
--
ALTER TABLE `field_executive_withdraws`
  ADD PRIMARY KEY (`field_exe_with_id`),
  ADD KEY `field_id` (`field_id`),
  ADD KEY `field_exe_earn_id` (`field_exe_earn_id`);

--
-- Indexes for table `lists`
--
ALTER TABLE `lists`
  ADD PRIMARY KEY (`list_id`);

--
-- Indexes for table `list_activities`
--
ALTER TABLE `list_activities`
  ADD PRIMARY KEY (`list_act_id`),
  ADD KEY `field_id` (`field_id`),
  ADD KEY `comp_act_id` (`comp_act_id`),
  ADD KEY `agency_id` (`agency_id`);

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
-- Indexes for table `managers`
--
ALTER TABLE `managers`
  ADD PRIMARY KEY (`man_id`),
  ADD KEY `d_id` (`d_id`),
  ADD KEY `zone_id` (`zone_id`);

--
-- Indexes for table `packages`
--
ALTER TABLE `packages`
  ADD PRIMARY KEY (`pack_id`);

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
-- Indexes for table `super_admin`
--
ALTER TABLE `super_admin`
  ADD PRIMARY KEY (`sa_id`);

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
-- AUTO_INCREMENT for table `advertisement_recommendation`
--
ALTER TABLE `advertisement_recommendation`
  MODIFY `adver_recom_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `advertising_stock`
--
ALTER TABLE `advertising_stock`
  MODIFY `adver_stock_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `advertising_stock_allocation`
--
ALTER TABLE `advertising_stock_allocation`
  MODIFY `adver_stock_act_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `agency_info`
--
ALTER TABLE `agency_info`
  MODIFY `agency_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `carriers`
--
ALTER TABLE `carriers`
  MODIFY `carrier_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `carriers_logs`
--
ALTER TABLE `carriers_logs`
  MODIFY `carrier_logs_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `carriers_paid_payment`
--
ALTER TABLE `carriers_paid_payment`
  MODIFY `c_paid_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `carriers_services`
--
ALTER TABLE `carriers_services`
  MODIFY `c_service_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table ` carriers_services_payment`
--
ALTER TABLE ` carriers_services_payment`
  MODIFY `c_s_payment_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `city`
--
ALTER TABLE `city`
  MODIFY `city_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `city_area`
--
ALTER TABLE `city_area`
  MODIFY `city_area_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `city_sup_assos`
--
ALTER TABLE `city_sup_assos`
  MODIFY `city_supp_assos_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `comapny_access_logs`
--
ALTER TABLE `comapny_access_logs`
  MODIFY `comp_acc_logs_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `compaigns`
--
ALTER TABLE `compaigns`
  MODIFY `comp_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `compaign_activities`
--
ALTER TABLE `compaign_activities`
  MODIFY `comp_act_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `compaign_sales`
--
ALTER TABLE `compaign_sales`
  MODIFY `comp_sale_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `companies_access`
--
ALTER TABLE `companies_access`
  MODIFY `comp_access_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `company_gm_info`
--
ALTER TABLE `company_gm_info`
  MODIFY `gm_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `company_promotions`
--
ALTER TABLE `company_promotions`
  MODIFY `comp_prom_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cust_care_activities`
--
ALTER TABLE `cust_care_activities`
  MODIFY `cust_c_act_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cust_care_csr`
--
ALTER TABLE `cust_care_csr`
  MODIFY `cust_care_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `dataentry_employee`
--
ALTER TABLE `dataentry_employee`
  MODIFY `de_emp_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `dealers_info_from_pep`
--
ALTER TABLE `dealers_info_from_pep`
  MODIFY `pep_dealers_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `dealers_of_pep_activities`
--
ALTER TABLE `dealers_of_pep_activities`
  MODIFY `pep_dealer_act_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `d_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `executive_advert_stock`
--
ALTER TABLE `executive_advert_stock`
  MODIFY `field_e_stock_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `executive_stock_usage`
--
ALTER TABLE `executive_stock_usage`
  MODIFY `stock_Usage_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `field_executive`
--
ALTER TABLE `field_executive`
  MODIFY `field_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `field_executive_earning`
--
ALTER TABLE `field_executive_earning`
  MODIFY `field_exe_earn_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `field_executive_withdraws`
--
ALTER TABLE `field_executive_withdraws`
  MODIFY `field_exe_with_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `lists`
--
ALTER TABLE `lists`
  MODIFY `list_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `list_activities`
--
ALTER TABLE `list_activities`
  MODIFY `list_act_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `list_sub_activities`
--
ALTER TABLE `list_sub_activities`
  MODIFY `list_sub_act_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `login_page`
--
ALTER TABLE `login_page`
  MODIFY `login_page_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `managers`
--
ALTER TABLE `managers`
  MODIFY `man_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `packages`
--
ALTER TABLE `packages`
  MODIFY `pack_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `permmission_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `permission_role_assosiate`
--
ALTER TABLE `permission_role_assosiate`
  MODIFY `perm_assos_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `promotion_requests_status`
--
ALTER TABLE `promotion_requests_status`
  MODIFY `prom_req_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `promotion_req_by_supervisor`
--
ALTER TABLE `promotion_req_by_supervisor`
  MODIFY `prom_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `receiving_calls`
--
ALTER TABLE `receiving_calls`
  MODIFY `receive_call_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `request_of_advertisement`
--
ALTER TABLE `request_of_advertisement`
  MODIFY `req_adver` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sa_logs_ondepartment`
--
ALTER TABLE `sa_logs_ondepartment`
  MODIFY `sa_on_Depart_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `signup_page`
--
ALTER TABLE `signup_page`
  MODIFY `signUp_page_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `supervisor`
--
ALTER TABLE `supervisor`
  MODIFY `sup_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `super_admin`
--
ALTER TABLE `super_admin`
  MODIFY `sa_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `teaml_adver_stock`
--
ALTER TABLE `teaml_adver_stock`
  MODIFY `team_adver_stock_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `team_lead`
--
ALTER TABLE `team_lead`
  MODIFY `team_L_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `training`
--
ALTER TABLE `training`
  MODIFY `training_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `training_activities`
--
ALTER TABLE `training_activities`
  MODIFY `training_act_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_login_information`
--
ALTER TABLE `user_login_information`
  MODIFY `login_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `user_login_role`
--
ALTER TABLE `user_login_role`
  MODIFY `user_role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `web_content`
--
ALTER TABLE `web_content`
  MODIFY `web_content_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `zone`
--
ALTER TABLE `zone`
  MODIFY `zone_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

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
-- Constraints for table `city_sup_assos`
--
ALTER TABLE `city_sup_assos`
  ADD CONSTRAINT `city_sup_assos_ibfk_1` FOREIGN KEY (`city_id`) REFERENCES `city` (`city_id`),
  ADD CONSTRAINT `city_sup_assos_ibfk_2` FOREIGN KEY (`sup_id`) REFERENCES `supervisor` (`sup_id`);

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
  ADD CONSTRAINT `field_executive_ibfk_2` FOREIGN KEY (`team_L_id`) REFERENCES `team_lead` (`team_L_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `field_executive_earning`
--
ALTER TABLE `field_executive_earning`
  ADD CONSTRAINT `field_executive_earning_ibfk_1` FOREIGN KEY (`field_id`) REFERENCES `field_executive` (`field_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `field_executive_earning_ibfk_2` FOREIGN KEY (`list_act_id`) REFERENCES `list_activities` (`list_act_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `field_executive_withdraws`
--
ALTER TABLE `field_executive_withdraws`
  ADD CONSTRAINT `field_executive_withdraws_ibfk_1` FOREIGN KEY (`field_id`) REFERENCES `field_executive` (`field_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `field_executive_withdraws_ibfk_2` FOREIGN KEY (`field_exe_earn_id`) REFERENCES `field_executive_earning` (`field_exe_earn_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `list_activities`
--
ALTER TABLE `list_activities`
  ADD CONSTRAINT `list_activities_ibfk_1` FOREIGN KEY (`field_id`) REFERENCES `field_executive` (`field_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `list_activities_ibfk_2` FOREIGN KEY (`comp_act_id`) REFERENCES `compaign_activities` (`comp_act_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `list_activities_ibfk_3` FOREIGN KEY (`agency_id`) REFERENCES `agency_info` (`agency_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `list_sub_activities`
--
ALTER TABLE `list_sub_activities`
  ADD CONSTRAINT `list_sub_activities_ibfk_1` FOREIGN KEY (`list_id`) REFERENCES `lists` (`list_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `list_sub_activities_ibfk_2` FOREIGN KEY (`list_act_id`) REFERENCES `list_activities` (`list_act_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `login_page`
--
ALTER TABLE `login_page`
  ADD CONSTRAINT `login_page_ibfk_1` FOREIGN KEY (`sa_id`) REFERENCES `super_admin` (`sa_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `managers`
--
ALTER TABLE `managers`
  ADD CONSTRAINT `managers_ibfk_1` FOREIGN KEY (`d_id`) REFERENCES `departments` (`d_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `managers_ibfk_2` FOREIGN KEY (`zone_id`) REFERENCES `zone` (`zone_id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
-- Constraints for table `web_content`
--
ALTER TABLE `web_content`
  ADD CONSTRAINT `web_content_ibfk_1` FOREIGN KEY (`sa_id`) REFERENCES `super_admin` (`sa_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
