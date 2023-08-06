-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Mar 29, 2022 at 04:31 PM
-- Server version: 5.7.21
-- PHP Version: 7.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `activity_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `activity`
--

DROP TABLE IF EXISTS `activity`;
CREATE TABLE IF NOT EXISTS `activity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `studentId` int(11) NOT NULL,
  `activityDetailId` int(11) NOT NULL,
  `semesterId` int(11) NOT NULL,
  `verifiedBy` int(11) DEFAULT NULL,
  `certificate` varchar(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `activity_activityDetailId_studentId_unique` (`studentId`,`activityDetailId`),
  KEY `activityDetailId` (`activityDetailId`),
  KEY `semesterId` (`semesterId`),
  KEY `verifiedBy` (`verifiedBy`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `activity`
--

INSERT INTO `activity` (`id`, `studentId`, `activityDetailId`, `semesterId`, `verifiedBy`, `certificate`, `status`, `comment`, `createdAt`, `updatedAt`) VALUES
(14, 2, 4, 1, 7, 'https://docs.google.com/document/d/130AC6Urac24U9B7F4pfysDW6Ot-IASYnKKGj5i8/edit?usp=sharing', 1, NULL, '2021-06-05 17:26:34', '2021-06-05 17:39:40'),
(17, 16, 2, 2, 7, 'https://docs.google.com/document/d/130AC6Urac24U5B7F4pfysDW6Ot-IAxSYWKKG5i8/edit?usp=sharing', 1, NULL, '2021-09-21 13:15:58', '2021-12-02 14:42:55'),
(18, 2, 2, 2, 7, 'https://docs.google.com/document/d/130ACc6rac24U9B7F4pfysDW6Ot-IAxYnKKGj58/edit?usp=sharing', 1, NULL, '2021-09-21 17:36:24', '2022-02-10 06:59:34'),
(19, 2, 1, 2, 7, 'https://docs.google.com/document/d/130ACc6Urc24U95BF4pfysDW6Ot-IASYWKKGji8/edit?usp=sharing', 1, NULL, '2022-02-18 06:11:45', '2022-02-18 06:11:45');

-- --------------------------------------------------------

--
-- Table structure for table `activitydetails`
--

DROP TABLE IF EXISTS `activitydetails`;
CREATE TABLE IF NOT EXISTS `activitydetails` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `hours` int(11) NOT NULL,
  `sDate` varchar(255) NOT NULL,
  `eDate` varchar(255) NOT NULL,
  `points` int(11) NOT NULL,
  `docRequired` tinyint(1) NOT NULL DEFAULT '0',
  `active` tinyint(1) NOT NULL,
  `studentHead` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `categoryId` int(11) NOT NULL,
  `noaId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `categoryId` (`categoryId`),
  KEY `noaId` (`noaId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `activitydetails`
--

INSERT INTO `activitydetails` (`id`, `title`, `hours`, `sDate`, `eDate`, `points`, `docRequired`, `active`, `studentHead`, `createdAt`, `updatedAt`, `categoryId`, `noaId`) VALUES
(1, 'E-Conference', 4, '19/02/2020', '19/02/2020', 2, 1, 1, '', '2020-11-14 09:19:00', '2021-09-27 15:42:03', 1, 1),
(2, 'TataTat', 8, '19/02/2020', '19/02/2020', 45, 1, 1, 'Bimalesh Seth', '2020-11-14 09:19:18', '2021-07-10 12:44:31', 1, 9),
(4, 'New Activity 1', 4, '10/03/2022', '08/03/2022', 2, 1, 1, 'Omkar', '2021-02-11 08:21:00', '2022-03-02 13:05:17', 3, 6);

-- --------------------------------------------------------

--
-- Table structure for table `activitydetailsdoc`
--

DROP TABLE IF EXISTS `activitydetailsdoc`;
CREATE TABLE IF NOT EXISTS `activitydetailsdoc` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `docUrl` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `activityDetailId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `activityDetailId` (`activityDetailId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `activitydetailsdoc`
--

INSERT INTO `activitydetailsdoc` (`id`, `title`, `docUrl`, `createdAt`, `updatedAt`, `activityDetailId`) VALUES
(3, 'Attendance', 'https://google.co.in', '2021-05-27 07:04:49', '2021-05-27 07:04:49', 1),
(4, 'Hello', 'https://bimaleshseth.web.app/', '2021-09-30 13:56:22', '2021-09-30 13:56:22', 2);

-- --------------------------------------------------------

--
-- Table structure for table `branch`
--

DROP TABLE IF EXISTS `branch`;
CREATE TABLE IF NOT EXISTS `branch` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `branchName` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `branch`
--

INSERT INTO `branch` (`id`, `branchName`, `createdAt`, `updatedAt`) VALUES
(3, 'Information Technology', '2021-02-11 08:12:55', '2021-05-24 13:42:24'),
(4, 'Computer Engineering', '2021-02-18 11:23:58', '2021-05-24 17:07:01');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `categoryName` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `categoryName`, `createdAt`, `updatedAt`) VALUES
(1, 'TedExx', '2020-11-14 09:11:22', '2021-07-10 11:21:22'),
(2, 'MultiCon', '2020-11-14 09:11:43', '2020-11-14 09:11:43'),
(3, 'New Activity', '2021-02-11 08:20:10', '2021-02-11 08:20:10');

-- --------------------------------------------------------

--
-- Table structure for table `degree`
--

DROP TABLE IF EXISTS `degree`;
CREATE TABLE IF NOT EXISTS `degree` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `degreeName` varchar(255) NOT NULL,
  `years` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `degree`
--

INSERT INTO `degree` (`id`, `degreeName`, `years`, `createdAt`, `updatedAt`) VALUES
(3, 'B.E.', 4, '2021-02-11 08:12:40', '2021-02-11 08:12:40'),
(4, 'BTECH', 3, '2021-05-26 16:29:54', '2021-05-26 16:29:54');

-- --------------------------------------------------------

--
-- Table structure for table `fact_act_map`
--

DROP TABLE IF EXISTS `fact_act_map`;
CREATE TABLE IF NOT EXISTS `fact_act_map` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `facultyId` int(11) NOT NULL,
  `activityDetailId` int(11) NOT NULL,
  `forAll` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `fact_act_map_activityDetailId_facultyId_unique` (`facultyId`,`activityDetailId`),
  KEY `activityDetailId` (`activityDetailId`)
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `fact_act_map`
--

INSERT INTO `fact_act_map` (`id`, `facultyId`, `activityDetailId`, `forAll`, `createdAt`, `updatedAt`) VALUES
(71, 7, 2, 1, '2021-12-02 14:26:07', '2021-12-02 14:26:07'),
(72, 8, 2, 1, '2021-12-02 14:26:07', '2021-12-02 14:26:07'),
(73, 7, 1, 1, '2022-03-29 05:43:53', '2022-03-29 05:43:53'),
(74, 8, 1, 1, '2022-03-29 05:43:53', '2022-03-29 05:43:53');

-- --------------------------------------------------------

--
-- Table structure for table `faculties`
--

DROP TABLE IF EXISTS `faculties`;
CREATE TABLE IF NOT EXISTS `faculties` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `middleName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `DOB` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mobileNo` varchar(255) NOT NULL,
  `erpId` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `accessCode` varchar(255) DEFAULT 'Faculty',
  `verified` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `branchId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `branchId` (`branchId`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `faculties`
--

INSERT INTO `faculties` (`id`, `firstName`, `middleName`, `lastName`, `DOB`, `email`, `mobileNo`, `erpId`, `password`, `accessCode`, `verified`, `createdAt`, `updatedAt`, `branchId`) VALUES
(7, 'Omkar', 'D', 'Sawant', '2021-02-17', 'omkar@gmail.com', '9800000000', 'E123456789', '123456', 'Faculty', 1, '2021-02-11 08:13:50', '2021-09-30 13:58:06', 3),
(8, 'Kamlesh', 'Jawahir', 'Soni', '06/07/2021', 'kamlesh@gmail.com', '7000000000', 'E1234567', 'Vimlesh', 'SAdmin', 1, '2021-02-11 08:17:43', '2021-09-29 13:39:14', 3);

-- --------------------------------------------------------

--
-- Table structure for table `natureofactivity`
--

DROP TABLE IF EXISTS `natureofactivity`;
CREATE TABLE IF NOT EXISTS `natureofactivity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `natureofactivity`
--

INSERT INTO `natureofactivity` (`id`, `title`, `createdAt`, `updatedAt`) VALUES
(1, 'Helping local schools to achieve good', '2020-11-14 09:09:16', '2021-05-24 17:18:41'),
(2, 'Preparing an actionable business', '2020-11-14 09:09:16', '2020-11-14 09:09:16'),
(3, 'Developing Sustainable Water', '2020-11-14 09:09:16', '2020-11-14 09:09:16'),
(4, 'Tourism Promotion Innovative', '2020-11-14 09:09:16', '2020-11-14 09:09:16'),
(5, 'Promotion of Appropriate Technologies ', '2020-11-14 09:09:16', '2020-11-14 09:09:16'),
(6, 'Reduction in Energy Consumption', '2020-11-14 09:09:16', '2020-11-14 09:09:16'),
(7, 'To Skill rural population', '2020-11-14 09:09:16', '2020-11-14 09:09:16'),
(8, 'Facilitating 100% Digitized money', '2020-11-14 09:09:16', '2020-11-14 09:09:16'),
(9, 'Setting of the information imparting', '2020-11-14 09:09:16', '2020-11-14 09:09:16'),
(10, 'Developing and managing efficient garbage', '2020-11-14 09:09:16', '2020-11-14 09:09:16'),
(11, 'To assist the marketing of rural produce ', '2020-11-14 09:09:16', '2020-11-14 09:09:16'),
(12, 'Food preservation/packaging', '2020-11-14 09:09:16', '2020-11-14 09:09:16'),
(13, 'Automation of local activities', '2020-11-14 09:09:16', '2020-11-14 09:09:16'),
(14, 'Spreading public awareness under rural outreach program', '2020-11-14 09:09:16', '2020-11-14 09:09:16'),
(15, 'Contribution to any national level initiative of Government of India. For e.g. Digital', '2020-11-14 09:09:16', '2020-11-14 09:09:16');

-- --------------------------------------------------------

--
-- Table structure for table `semester`
--

DROP TABLE IF EXISTS `semester`;
CREATE TABLE IF NOT EXISTS `semester` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `semester` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `semester`
--

INSERT INTO `semester` (`id`, `semester`, `createdAt`, `updatedAt`) VALUES
(1, 1, '2020-11-14 08:50:17', '2021-05-24 17:50:56'),
(2, 2, '2020-11-14 08:50:17', '2020-11-14 08:50:17'),
(3, 3, '2020-11-14 08:50:17', '2020-11-14 08:50:17'),
(4, 4, '2020-11-14 08:50:17', '2020-11-14 08:50:17'),
(5, 5, '2020-11-14 08:50:17', '2020-11-14 08:50:17'),
(6, 6, '2020-11-14 08:50:17', '2020-11-14 08:50:17'),
(7, 7, '2020-11-14 08:50:17', '2020-11-14 08:50:17'),
(8, 8, '2020-11-14 08:50:17', '2020-11-14 08:50:17');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
CREATE TABLE IF NOT EXISTS `students` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `middleName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `DOB` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mobileNo` varchar(255) NOT NULL,
  `studentType` enum('Regular','DSE') NOT NULL,
  `erpId` varchar(255) NOT NULL,
  `rollNo` varchar(255) NOT NULL,
  `division` varchar(255) NOT NULL,
  `year` int(11) NOT NULL,
  `password` varchar(255) NOT NULL,
  `accessCode` varchar(255) DEFAULT 'Student',
  `verified` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `degreeId` int(11) NOT NULL,
  `semesterId` int(11) NOT NULL,
  `branchId` int(11) NOT NULL,
  `completed` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `degreeId` (`degreeId`),
  KEY `semesterId` (`semesterId`),
  KEY `branchId` (`branchId`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `firstName`, `middleName`, `lastName`, `DOB`, `email`, `mobileNo`, `studentType`, `erpId`, `rollNo`, `division`, `year`, `password`, `accessCode`, `verified`, `createdAt`, `updatedAt`, `degreeId`, `semesterId`, `branchId`, `completed`) VALUES
(2, 'Omkar', 'Diwakar', 'Sawant', '05/07/2021', 'omkar@gmail.com', '9769000000', 'Regular', 'S123456', '66', 'A', 1, '123', 'Student', 1, '2021-02-11 08:18:39', '2021-09-29 12:29:21', 4, 8, 3, 0),
(16, 'Bimalesh', 'Jawahir', 'Seth', '20/07/2021', 'sonikamlesh@gmail.com', '7000000000', 'Regular', 'S654321', '66', 'B', 1, '123456', 'Student', 1, '2021-07-01 13:30:43', '2021-09-29 14:33:31', 4, 8, 4, 0);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `activity`
--
ALTER TABLE `activity`
  ADD CONSTRAINT `activity_ibfk_4` FOREIGN KEY (`verifiedBy`) REFERENCES `faculties` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `activity_ibfk_5` FOREIGN KEY (`studentId`) REFERENCES `students` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `activity_ibfk_6` FOREIGN KEY (`activityDetailId`) REFERENCES `activitydetails` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `activity_ibfk_7` FOREIGN KEY (`semesterId`) REFERENCES `semester` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `activity_ibfk_8` FOREIGN KEY (`verifiedBy`) REFERENCES `faculties` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `activitydetails`
--
ALTER TABLE `activitydetails`
  ADD CONSTRAINT `activitydetails_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `activitydetails_ibfk_3` FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `activitydetails_ibfk_4` FOREIGN KEY (`noaId`) REFERENCES `natureofactivity` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `activitydetailsdoc`
--
ALTER TABLE `activitydetailsdoc`
  ADD CONSTRAINT `activitydetailsdoc_ibfk_1` FOREIGN KEY (`activityDetailId`) REFERENCES `activitydetails` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `fact_act_map`
--
ALTER TABLE `fact_act_map`
  ADD CONSTRAINT `fact_act_map_ibfk_1` FOREIGN KEY (`facultyId`) REFERENCES `faculties` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fact_act_map_ibfk_3` FOREIGN KEY (`facultyId`) REFERENCES `faculties` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fact_act_map_ibfk_4` FOREIGN KEY (`activityDetailId`) REFERENCES `activitydetails` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `faculties`
--
ALTER TABLE `faculties`
  ADD CONSTRAINT `faculties_ibfk_1` FOREIGN KEY (`branchId`) REFERENCES `branch` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `students_ibfk_4` FOREIGN KEY (`degreeId`) REFERENCES `degree` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `students_ibfk_5` FOREIGN KEY (`semesterId`) REFERENCES `semester` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `students_ibfk_6` FOREIGN KEY (`branchId`) REFERENCES `branch` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
