-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: sql12.freesqldatabase.com    Database: sql12707502
-- ------------------------------------------------------
-- Server version	5.5.62-0ubuntu0.14.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `EmployeeID` varchar(50) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `deviceID` varchar(200) NOT NULL,
  `Status` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `EmployeeID` (`EmployeeID`),
  CONSTRAINT `employee` FOREIGN KEY (`EmployeeID`) REFERENCES `employee` (`EmployeeID`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (6,'VAL001','a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3','dhinearjona16@gmail.com','000000','online'),(8,'VAL002','03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4','perpetuaedemmanuel1225@gmail.com','b592c0937bfde2de','offline'),(9,'VAL003','176b7fc37b83cd6c36929ceeae2447798dd5b7180fd7f26d4b9630e9b1f4359f','','','');
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `adjustment`
--

DROP TABLE IF EXISTS `adjustment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `adjustment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `EmployeeID` varchar(50) NOT NULL,
  `Adjustment` varchar(50) NOT NULL,
  `Amount` int(11) NOT NULL,
  `CutOff` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `EmployeeID` (`EmployeeID`),
  CONSTRAINT `adjustment_ibfk_1` FOREIGN KEY (`EmployeeID`) REFERENCES `employee` (`EmployeeID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adjustment`
--

LOCK TABLES `adjustment` WRITE;
/*!40000 ALTER TABLE `adjustment` DISABLE KEYS */;
/*!40000 ALTER TABLE `adjustment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `allowance`
--

DROP TABLE IF EXISTS `allowance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `allowance` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `EmployeeID` varchar(50) NOT NULL,
  `Allowance` varchar(50) NOT NULL,
  `Amount` int(11) NOT NULL,
  `CutOff` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `EmployeeID` (`EmployeeID`),
  CONSTRAINT `allowance_ibfk_1` FOREIGN KEY (`EmployeeID`) REFERENCES `employee` (`EmployeeID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `allowance`
--

LOCK TABLES `allowance` WRITE;
/*!40000 ALTER TABLE `allowance` DISABLE KEYS */;
/*!40000 ALTER TABLE `allowance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `attendance`
--

DROP TABLE IF EXISTS `attendance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attendance` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `EmployeeID` varchar(50) NOT NULL,
  `DayType` varchar(50) NOT NULL,
  `TimeIn` varchar(255) DEFAULT NULL,
  `TimeOut` varchar(255) DEFAULT NULL,
  `WorkHours` varchar(255) NOT NULL,
  `Date` varchar(255) NOT NULL,
  `Status` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `test` (`EmployeeID`),
  CONSTRAINT `test` FOREIGN KEY (`EmployeeID`) REFERENCES `employee` (`EmployeeID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=178 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attendance`
--

LOCK TABLES `attendance` WRITE;
/*!40000 ALTER TABLE `attendance` DISABLE KEYS */;
INSERT INTO `attendance` VALUES (1,'VAL002','RegularHoliday','08:00 AM','05:00 PM','540','2024-01-01','Regular'),(2,'VAL002','Regular','08:00 AM','05:00 PM','540','2024-01-02','Regular'),(3,'VAL002','Regular','08:00 AM','04:30 PM','510','2024-01-03','Undertime'),(4,'VAL002','Regular','08:00 AM','06:00 PM','600','2024-01-04','Regular'),(5,'VAL002','Regular','08:00 AM','07:00 PM','660','2024-01-05','Overtime'),(6,'VAL002','Regular','08:00 AM','05:00 PM','540','2024-01-08','Regular'),(7,'VAL002','Regular','08:00 AM','04:45 PM','525','2024-01-09','Undertime'),(8,'VAL002','Regular','08:00 AM','06:15 PM','615','2024-01-10','Overtime'),(9,'VAL002','Regular','08:00 AM','05:00 PM','540','2024-01-11','Regular'),(10,'VAL002','Regular','08:00 AM','05:00 PM','540','2024-01-12','Regular'),(11,'VAL002','Regular','08:00 AM','05:00 PM','540','2024-01-15','Regular'),(12,'VAL002','Regular','08:00 AM','03:30 PM','450','2024-01-16','Undertime'),(13,'VAL002','Regular','08:00 AM','06:30 PM','630','2024-01-17','Overtime'),(14,'VAL002','Regular','08:00 AM','05:00 PM','540','2024-01-18','Regular'),(15,'VAL002','Regular','08:00 AM','05:00 PM','540','2024-01-19','Regular'),(16,'VAL002','Regular','08:00 AM','05:00 PM','540','2024-01-22','Regular'),(17,'VAL002','Regular','08:00 AM','05:00 PM','540','2024-01-23','Regular'),(18,'VAL002','Regular','08:00 AM','05:00 PM','540','2024-01-24','Regular'),(19,'VAL002','SpecialHoliday','08:00 AM','05:00 PM','540','2024-01-25','Regular'),(20,'VAL002','Regular','08:00 AM','05:00 PM','540','2024-01-26','Regular'),(21,'VAL002','Regular','08:00 AM','05:00 PM','540','2024-01-29','Regular'),(22,'VAL002','Regular','08:00 AM','04:45 PM','525','2024-01-30','Undertime'),(23,'VAL002','Regular','08:00 AM','05:30 PM','570','2024-01-31','Regular'),(24,'VAL002','Regular','08:00 AM','05:00 PM','540','2024-02-01','Regular'),(25,'VAL002','Regular','08:00 AM','05:00 PM','540','2024-02-02','Regular'),(26,'VAL002','Regular','08:00 AM','05:00 PM','540','2024-02-05','Regular'),(27,'VAL002','Regular','08:00 AM','04:00 PM','480','2024-02-06','Undertime'),(28,'VAL002','Regular','08:00 AM','06:00 PM','600','2024-02-07','Regular'),(29,'VAL002','Regular','08:00 AM','06:45 PM','645','2024-02-08','Overtime'),(30,'VAL002','Regular','08:00 AM','05:00 PM','540','2024-02-09','Regular'),(31,'VAL002','Regular','08:00 AM','05:00 PM','540','2024-02-12','Regular'),(32,'VAL002','SpecialHoliday','08:00 AM','05:00 PM','540','2024-02-13','Regular'),(33,'VAL002','Regular','08:00 AM','04:15 PM','495','2024-02-14','Undertime'),(34,'VAL002','Regular','08:00 AM','06:30 PM','630','2024-02-15','Overtime'),(35,'VAL002','Regular','08:00 AM','05:00 PM','540','2024-02-16','Regular'),(36,'VAL002','Regular','08:00 AM','05:00 PM','540','2024-02-19','Regular'),(37,'VAL002','Regular','08:00 AM','05:00 PM','540','2024-02-20','Regular'),(38,'VAL002','Regular','08:00 AM','05:00 PM','540','2024-02-21','Regular'),(39,'VAL002','Regular','08:00 AM','05:00 PM','540','2024-02-22','Regular'),(40,'VAL002','Regular','08:00 AM','05:00 PM','540','2024-02-23','Regular'),(41,'VAL002','Regular','08:00 AM','05:00 PM','540','2024-02-26','Regular'),(42,'VAL002','Regular','08:00 AM','05:00 PM','540','2024-02-27','Regular'),(43,'VAL002','Regular','08:00 AM','05:00 PM','540','2024-02-28','Regular'),(44,'VAL002','Regular','08:00 AM','05:00 PM','540','2024-03-01','Regular'),(45,'VAL002','Regular','08:00 AM','05:00 PM','540','2024-03-04','Regular'),(46,'VAL002','Regular','08:00 AM','05:00 PM','540','2024-03-05','Regular'),(47,'VAL002','Regular','08:00 AM','04:30 PM','510','2024-03-06','Undertime'),(48,'VAL002','Regular','08:00 AM','06:15 PM','615','2024-03-07','Overtime'),(49,'VAL002','Regular','08:00 AM','05:00 PM','540','2024-03-08','Regular'),(50,'VAL002','SpecialHoliday','08:00 AM','05:00 PM','540','2024-03-11','Regular'),(51,'VAL002','Regular','08:00 AM','05:00 PM','540','2024-03-12','Regular'),(52,'VAL002','Regular','08:00 AM','05:00 PM','540','2024-03-13','Regular'),(53,'VAL002','Regular','08:00 AM','05:00 PM','540','2024-03-14','Regular'),(54,'VAL002','Regular','08:00 AM','05:00 PM','540','2024-03-15','Regular'),(55,'VAL002','Regular','08:00 AM','05:00 PM','540','2024-03-18','Regular'),(56,'VAL002','Regular','08:00 AM','04:15 PM','495','2024-03-19','Undertime'),(57,'VAL002','Regular','08:00 AM','06:30 PM','630','2024-03-20','Overtime'),(58,'VAL002','Regular','08:00 AM','05:00 PM','540','2024-03-21','Regular'),(59,'VAL002','Regular','08:00 AM','05:00 PM','540','2024-03-22','Regular'),(60,'VAL002','Regular','08:00 AM','05:00 PM','540','2024-03-25','Regular'),(61,'VAL002','Regular','08:00 AM','05:00 PM','540','2024-03-26','Regular'),(62,'VAL002','Regular','08:00 AM','05:00 PM','540','2024-03-27','Regular'),(63,'VAL002','Regular','08:00 AM','05:00 PM','540','2024-03-28','Regular'),(64,'VAL002','Regular','08:00 AM','05:00 PM','540','2024-03-29','Regular'),(65,'VAL002','Regular','08:00 AM','05:00 PM','540','2024-04-01','Regular'),(66,'VAL002','Regular','08:00 AM','05:00 PM','540','2024-04-02','Regular'),(67,'VAL002','Regular','08:00 AM','04:30 PM','510','2024-04-03','Undertime'),(68,'VAL002','RegularHoliday','08:00 AM','04:30 PM','540','2024-04-04','Regular'),(69,'VAL002','RegularHoliday','08:00 AM','04:30 PM','540','2024-04-05','Regular'),(70,'VAL002','Regular','08:00 AM','06:15 PM','615','2024-04-08','Overtime'),(71,'VAL002','RegularHoliday','08:00 AM','04:30 PM','540','2024-04-09','Regular'),(72,'VAL002','Regular','08:00 AM','05:00 PM','540','2024-04-10','Regular'),(73,'VAL002','Regular','08:00 AM','05:00 PM','540','2024-04-11','Regular'),(74,'VAL002','Regular','08:00 AM','05:00 PM','540','2024-04-12','Regular'),(75,'VAL002','Regular','08:00 AM','05:00 PM','540','2024-04-15','Regular'),(76,'VAL002','Regular','08:00 AM','04:15 PM','495','2024-04-16','Undertime'),(77,'VAL002','Regular','08:00 AM','06:30 PM','630','2024-04-17','Overtime'),(78,'VAL002','Regular','08:00 AM','05:00 PM','540','2024-04-18','Regular'),(79,'VAL002','Regular','08:00 AM','05:00 PM','540','2024-04-19','Regular'),(80,'VAL002','Regular','08:00 AM','05:00 PM','540','2024-04-22','Regular'),(81,'VAL002','Regular','08:00 AM','05:00 PM','540','2024-04-23','Regular'),(82,'VAL002','Regular','08:00 AM','05:00 PM','540','2024-04-24','Regular'),(83,'VAL002','Regular','08:00 AM','05:00 PM','540','2024-04-25','Regular'),(84,'VAL002','Regular','08:00 AM','05:00 PM','540','2024-04-26','Regular'),(85,'VAL002','Regular','08:00 AM','05:00 PM','540','2024-04-29','Regular'),(86,'VAL002','Regular','08:00 AM','05:00 PM','540','2024-04-30','Regular'),(87,'VAL001','Regular','08:00 AM','05:00 PM','540','2024-01-02','Regular'),(88,'VAL001','Regular','08:00 AM','04:30 PM','510','2024-01-03','Undertime'),(89,'VAL001','Regular','08:00 AM','06:00 PM','600','2024-01-04','Regular'),(90,'VAL001','Regular','08:00 AM','07:00 PM','660','2024-01-05','Overtime'),(91,'VAL001','Regular','08:00 AM','05:00 PM','540','2024-01-08','Regular'),(92,'VAL001','Regular','08:00 AM','04:45 PM','525','2024-01-09','Undertime'),(93,'VAL001','Regular','08:00 AM','06:15 PM','615','2024-01-10','Overtime'),(94,'VAL001','Regular','08:00 AM','05:00 PM','540','2024-01-11','Regular'),(95,'VAL001','Regular','08:00 AM','05:00 PM','540','2024-01-12','Regular'),(96,'VAL001','Regular','08:00 AM','05:00 PM','540','2024-01-15','Regular'),(97,'VAL001','Regular','08:00 AM','06:30 PM','630','2024-01-17','Overtime'),(98,'VAL001','Regular','08:00 AM','05:00 PM','540','2024-01-18','Regular'),(99,'VAL001','Regular','08:00 AM','05:00 PM','540','2024-01-19','Regular'),(100,'VAL001','Regular','08:00 AM','05:00 PM','540','2024-01-22','Regular'),(101,'VAL001','Regular','08:00 AM','05:00 PM','540','2024-01-24','Regular'),(102,'VAL001','Regular','08:00 AM','05:00 PM','540','2024-01-26','Regular'),(103,'VAL001','Regular','08:00 AM','05:00 PM','540','2024-01-29','Regular'),(104,'VAL001','Regular','08:00 AM','04:45 PM','525','2024-01-30','Undertime'),(105,'VAL001','Regular','08:00 AM','05:30 PM','570','2024-01-31','Regular'),(106,'VAL001','Regular','08:00 AM','05:00 PM','540','2024-02-01','Regular'),(107,'VAL001','Regular','08:00 AM','05:00 PM','540','2024-02-02','Regular'),(108,'VAL001','Regular','08:00 AM','05:00 PM','540','2024-02-05','Regular'),(109,'VAL001','Regular','08:00 AM','04:00 PM','480','2024-02-06','Undertime'),(110,'VAL001','Regular','08:00 AM','06:00 PM','600','2024-02-07','Regular'),(111,'VAL001','Regular','08:00 AM','06:45 PM','645','2024-02-08','Overtime'),(112,'VAL001','Regular','08:00 AM','05:00 PM','540','2024-02-09','Regular'),(113,'VAL001','Regular','08:00 AM','05:00 PM','540','2024-02-12','Regular'),(114,'VAL001','SpecialHoliday','08:00 AM','05:00 PM','540','2024-02-13','Regular'),(115,'VAL001','Regular','08:00 AM','04:15 PM','495','2024-02-14','Undertime'),(116,'VAL001','Regular','08:00 AM','06:30 PM','630','2024-02-15','Overtime'),(117,'VAL001','Regular','08:00 AM','05:00 PM','540','2024-02-16','Regular'),(118,'VAL001','Regular','08:00 AM','05:00 PM','540','2024-02-19','Regular'),(119,'VAL001','Regular','08:00 AM','05:00 PM','540','2024-02-20','Regular'),(120,'VAL001','Regular','08:00 AM','05:00 PM','540','2024-02-21','Regular'),(121,'VAL001','Regular','08:00 AM','05:00 PM','540','2024-02-22','Regular'),(122,'VAL001','Regular','08:00 AM','05:00 PM','540','2024-02-23','Regular'),(123,'VAL001','Regular','08:00 AM','05:00 PM','540','2024-02-26','Regular'),(124,'VAL001','Regular','08:00 AM','05:00 PM','540','2024-02-27','Regular'),(125,'VAL001','Regular','08:00 AM','05:00 PM','540','2024-02-28','Regular'),(126,'VAL001','Regular','08:00 AM','05:00 PM','540','2024-03-01','Regular'),(127,'VAL001','Regular','08:00 AM','05:00 PM','540','2024-03-04','Regular'),(128,'VAL001','Regular','08:00 AM','05:00 PM','540','2024-03-05','Regular'),(129,'VAL001','Regular','08:00 AM','04:30 PM','510','2024-03-06','Undertime'),(130,'VAL001','Regular','08:00 AM','06:15 PM','615','2024-03-07','Overtime'),(131,'VAL001','Regular','08:00 AM','05:00 PM','540','2024-03-08','Regular'),(132,'VAL001','SpecialHoliday','08:00 AM','05:00 PM','540','2024-03-11','Regular'),(133,'VAL001','Regular','08:00 AM','05:00 PM','540','2024-03-12','Regular'),(134,'VAL001','Regular','08:00 AM','05:00 PM','540','2024-03-13','Regular'),(135,'VAL001','Regular','08:00 AM','05:00 PM','540','2024-03-14','Regular'),(136,'VAL001','Regular','08:00 AM','05:00 PM','540','2024-03-15','Regular'),(137,'VAL001','Regular','08:00 AM','05:00 PM','540','2024-03-18','Regular'),(138,'VAL001','Regular','08:00 AM','04:15 PM','495','2024-03-19','Undertime'),(139,'VAL001','Regular','08:00 AM','06:30 PM','630','2024-03-20','Overtime'),(140,'VAL001','Regular','08:00 AM','05:00 PM','540','2024-03-21','Regular'),(141,'VAL001','Regular','08:00 AM','05:00 PM','540','2024-03-22','Regular'),(142,'VAL001','Regular','08:00 AM','05:00 PM','540','2024-03-25','Regular'),(143,'VAL001','Regular','08:00 AM','05:00 PM','540','2024-03-26','Regular'),(144,'VAL001','Regular','08:00 AM','05:00 PM','540','2024-03-27','Regular'),(145,'VAL001','Regular','08:00 AM','05:00 PM','540','2024-03-29','Regular'),(146,'VAL001','Regular','08:00 AM','05:00 PM','540','2024-04-01','Regular'),(147,'VAL001','Regular','08:00 AM','05:00 PM','540','2024-04-02','Regular'),(148,'VAL001','Regular','08:00 AM','04:30 PM','510','2024-04-03','Undertime'),(149,'VAL001','RegularHoliday','08:00 AM','04:30 PM','540','2024-04-04','Regular'),(150,'VAL001','RegularHoliday','08:00 AM','04:30 PM','540','2024-04-05','Regular'),(151,'VAL001','Regular','08:00 AM','06:15 PM','615','2024-04-08','Overtime'),(152,'VAL001','Regular','08:00 AM','05:00 PM','540','2024-04-10','Regular'),(153,'VAL001','Regular','08:00 AM','05:00 PM','540','2024-04-11','Regular'),(154,'VAL001','Regular','08:00 AM','05:00 PM','540','2024-04-12','Regular'),(155,'VAL001','Regular','08:00 AM','05:00 PM','540','2024-04-15','Regular'),(156,'VAL001','Regular','08:00 AM','04:15 PM','495','2024-04-16','Undertime'),(157,'VAL001','Regular','08:00 AM','06:30 PM','630','2024-04-17','Overtime'),(158,'VAL001','Regular','08:00 AM','05:00 PM','540','2024-04-18','Regular'),(159,'VAL001','Regular','08:00 AM','05:00 PM','540','2024-04-19','Regular'),(160,'VAL001','Regular','08:00 AM','05:00 PM','540','2024-04-22','Regular'),(161,'VAL001','Regular','08:00 AM','05:00 PM','540','2024-04-25','Regular'),(162,'VAL001','Regular','08:00 AM','05:00 PM','540','2024-04-26','Regular'),(163,'VAL001','Regular','08:00 AM','05:00 PM','540','2024-04-29','Regular'),(164,'VAL001','Regular','08:00 AM','05:00 PM','540','2024-04-30','Regular'),(169,'VAL001','Regular',NULL,NULL,'540','2024-06-07','Leave'),(170,'VAL001','Regular',NULL,NULL,'540','2024-06-10','Leave'),(175,'VAL003','RegularHoliday',NULL,NULL,'0','2024-04-05','Regular'),(177,'VAL002','Regular',NULL,NULL,'540','2024-06-03','Leave');
/*!40000 ALTER TABLE `attendance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contributions`
--

DROP TABLE IF EXISTS `contributions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contributions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) NOT NULL,
  `Value` float NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contributions`
--

LOCK TABLES `contributions` WRITE;
/*!40000 ALTER TABLE `contributions` DISABLE KEYS */;
INSERT INTO `contributions` VALUES (1,'PAGIBIG',100),(2,'PHILHEALTH',350),(3,'SSS',500);
/*!40000 ALTER TABLE `contributions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deduction`
--

DROP TABLE IF EXISTS `deduction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `deduction` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `EmployeeID` varchar(50) NOT NULL,
  `Deduction` varchar(50) NOT NULL,
  `Amount` int(11) NOT NULL,
  `CutOff` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `EmployeeID` (`EmployeeID`),
  CONSTRAINT `deduction_ibfk_1` FOREIGN KEY (`EmployeeID`) REFERENCES `employee` (`EmployeeID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deduction`
--

LOCK TABLES `deduction` WRITE;
/*!40000 ALTER TABLE `deduction` DISABLE KEYS */;
/*!40000 ALTER TABLE `deduction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `EmployeeID` varchar(50) NOT NULL,
  `Firstname` varchar(50) DEFAULT NULL,
  `Middlename` varchar(50) DEFAULT NULL,
  `Lastname` varchar(50) NOT NULL,
  `Suffix` varchar(50) NOT NULL,
  `Type` int(11) NOT NULL,
  `Position` int(11) NOT NULL,
  `EmployeeRate` int(11) NOT NULL,
  `EmployeeSchedule` int(11) NOT NULL,
  `DateHired` varchar(50) NOT NULL,
  `Status` varchar(50) NOT NULL,
  PRIMARY KEY (`EmployeeID`),
  KEY `employeetypes` (`Type`),
  KEY `employeeposition` (`Position`),
  KEY `rate` (`EmployeeRate`),
  KEY `sched` (`EmployeeSchedule`),
  CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`Type`) REFERENCES `employeetypes` (`id`),
  CONSTRAINT `employee_ibfk_2` FOREIGN KEY (`Position`) REFERENCES `employeeposition` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `rate` FOREIGN KEY (`EmployeeRate`) REFERENCES `rate` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `sched` FOREIGN KEY (`EmployeeSchedule`) REFERENCES `schedule` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES ('VAL001','DHINE FRANKLIN','ARNEJO','ARJONA','',113,19,14,2,'2023-11-01','Active'),('VAL002','ED EMMANUEL','','PERPETUA','',113,24,13,2,'2023-11-01','Active'),('VAL003','SOPHIA','','ALPHA','',113,21,13,2,'2024-05-31','Active');
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employeeposition`
--

DROP TABLE IF EXISTS `employeeposition`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employeeposition` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Position` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employeeposition`
--

LOCK TABLES `employeeposition` WRITE;
/*!40000 ALTER TABLE `employeeposition` DISABLE KEYS */;
INSERT INTO `employeeposition` VALUES (19,'Executive Officer'),(20,'Executive Director'),(21,'Manager'),(22,'Officer'),(23,'Team Leader'),(24,'Specialist'),(25,'Assistant');
/*!40000 ALTER TABLE `employeeposition` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employeetypes`
--

DROP TABLE IF EXISTS `employeetypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employeetypes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Type` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=121 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employeetypes`
--

LOCK TABLES `employeetypes` WRITE;
/*!40000 ALTER TABLE `employeetypes` DISABLE KEYS */;
INSERT INTO `employeetypes` VALUES (113,'Regular'),(117,'Probationary'),(118,'Project-Based'),(119,'Part-Timer');
/*!40000 ALTER TABLE `employeetypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `leavetypes`
--

DROP TABLE IF EXISTS `leavetypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leavetypes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `Credit` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leavetypes`
--

LOCK TABLES `leavetypes` WRITE;
/*!40000 ALTER TABLE `leavetypes` DISABLE KEYS */;
INSERT INTO `leavetypes` VALUES (1,'Sick Leave',5),(2,'Casual Leave',5),(3,'Maternity Leave',5),(4,'Unpaid Leave',5),(9,'Vacation Leave',5);
/*!40000 ALTER TABLE `leavetypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payroll`
--

DROP TABLE IF EXISTS `payroll`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payroll` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `EmployeeID` varchar(50) NOT NULL,
  `Cutoff` varchar(50) NOT NULL,
  `Created` varchar(59) NOT NULL,
  `WorkDays` varchar(50) NOT NULL,
  `Rate` varchar(50) NOT NULL,
  `Undertime` varchar(50) NOT NULL,
  `TotalLeave` varchar(505) NOT NULL,
  `BasicPay` varchar(50) NOT NULL,
  `RegularHoliday` varchar(50) NOT NULL,
  `SpecialHoliday` varchar(50) NOT NULL,
  `RegularHolidayPay` varchar(50) NOT NULL,
  `SpecialHolidayPay` varchar(50) NOT NULL,
  `OvertimeHrs` varchar(50) NOT NULL,
  `OvertimePay` varchar(50) NOT NULL,
  `Allowance` varchar(50) NOT NULL,
  `SalaryAdjustment` varchar(50) NOT NULL,
  `TotalEarnings` varchar(50) NOT NULL,
  `Grosspay` varchar(50) NOT NULL,
  `PAGIBIG` varchar(50) NOT NULL,
  `PHILHEALTH` varchar(50) NOT NULL,
  `SSS` varchar(50) NOT NULL,
  `TAX` varchar(50) NOT NULL,
  `Deduction` varchar(50) NOT NULL,
  `TotalDeduction` varchar(50) NOT NULL,
  `Netpay` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `EmployeeID` (`EmployeeID`),
  CONSTRAINT `payroll_ibfk_1` FOREIGN KEY (`EmployeeID`) REFERENCES `employee` (`EmployeeID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payroll`
--

LOCK TABLES `payroll` WRITE;
/*!40000 ALTER TABLE `payroll` DISABLE KEYS */;
INSERT INTO `payroll` VALUES (1,'VAL001','2024-01-26-2024-02-10','2024-05-31','11 days','₱ 564','14 hrs','0','₱ 6063','0','0','₱ 0.00','₱ 0.00','1 hrs','₱ 88.13','₱ 0','₱ 0','₱ 88.13','₱ 6151.13','₱ 0.00','₱ 0.00','₱ 0.00','₱ 0.00','₱ 0','₱ 0.00','₱ 6151.13'),(2,'VAL002','2024-01-26-2024-02-10','2024-05-31','11 days','₱ 610','14 hrs','0','₱ 6557.5','0','0','₱ 0.00','₱ 0.00','1 hrs','₱ 95.31','₱ 0','₱ 0','₱ 95.31','₱ 6652.81','₱ 0.00','₱ 0.00','₱ 0.00','₱ 0.00','₱ 0','₱ 0.00','₱ 6652.81'),(3,'VAL002','2024-02-11-2024-02-25','2024-05-31','10 days','₱ 610','7 hrs','0','₱ 6023.75','0','0','₱ 0.00','₱ 183.00','1 hrs','₱ 95.31','₱ 0','₱ 0','₱ 278.31','₱ 6302.06','₱ 100.00','₱ 350.00','₱ 500.00','₱ 0.00','₱ 0','₱ 950.00','₱ 5352.06'),(4,'VAL001','2024-02-11-2024-02-25','2024-05-31','10 days','₱ 564','7 hrs','0','₱ 5569.5','0','0','₱ 0.00','₱ 169.20','1 hrs','₱ 88.13','₱ 0','₱ 0','₱ 257.33','₱ 5826.83','₱ 100.00','₱ 350.00','₱ 500.00','₱ 0.00','₱ 0','₱ 950.00','₱ 4876.83'),(5,'VAL001','2024-02-26-2024-03-10','2024-05-31','9 days','₱ 564','7 hrs','0','₱ 5005.5','0','0','₱ 0.00','₱ 0.00','1 hrs','₱ 88.13','₱ 0','₱ 0','₱ 88.13','₱ 5093.63','₱ 0.00','₱ 0.00','₱ 0.00','₱ 0.00','₱ 0','₱ 0.00','₱ 5093.63'),(6,'VAL002','2024-02-26-2024-03-10','2024-05-31','9 days','₱ 610','7 hrs','0','₱ 5413.75','0','0','₱ 0.00','₱ 0.00','1 hrs','₱ 95.31','₱ 0','₱ 0','₱ 95.31','₱ 5509.06','₱ 0.00','₱ 0.00','₱ 0.00','₱ 0.00','₱ 0','₱ 0.00','₱ 5509.06'),(9,'VAL002','2024-03-11-2024-03-25','2024-05-31','11 days','₱ 610','7 hrs','0','₱ 6633.75','0','0','₱ 0.00','₱ 183.00','1 hrs','₱ 95.31','₱ 0','₱ 0','₱ 278.31','₱ 6912.06','₱ 100.00','₱ 350.00','₱ 500.00','₱ 0.00','₱ 0','₱ 950.00','₱ 5962.06'),(10,'VAL003','2024-03-11-2024-03-25','2024-05-31','0 days','₱ 610','0 hrs','0','₱ 0','0','0','₱ 0.00','₱ 0.00','0 hrs','₱ 0.00','₱ 0','₱ 0','₱ 0.00','₱ 0.00','₱ 100.00','₱ 350.00','₱ 500.00','₱ 0.00','₱ 0','₱ 950.00','₱ -950.00'),(11,'VAL001','2024-03-11-2024-03-25','2024-05-31','11 days','₱ 564','7 hrs','0','₱ 6133.5','0','0','₱ 0.00','₱ 169.20','1 hrs','₱ 88.13','₱ 0','₱ 0','₱ 257.33','₱ 6390.83','₱ 100.00','₱ 350.00','₱ 500.00','₱ 0.00','₱ 0','₱ 950.00','₱ 5440.83');
/*!40000 ALTER TABLE `payroll` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rate`
--

DROP TABLE IF EXISTS `rate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rate` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Rate` varchar(50) NOT NULL,
  `Value` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rate`
--

LOCK TABLES `rate` WRITE;
/*!40000 ALTER TABLE `rate` DISABLE KEYS */;
INSERT INTO `rate` VALUES (13,'Minimum','610'),(14,'Lowest','564');
/*!40000 ALTER TABLE `rate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `request`
--

DROP TABLE IF EXISTS `request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `request` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `EmployeeID` varchar(255) NOT NULL,
  `startDate` varchar(255) NOT NULL,
  `endDate` varchar(255) NOT NULL,
  `types` int(11) NOT NULL,
  `reason` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `Date` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `types` (`types`),
  CONSTRAINT `types` FOREIGN KEY (`types`) REFERENCES `leavetypes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `request`
--

LOCK TABLES `request` WRITE;
/*!40000 ALTER TABLE `request` DISABLE KEYS */;
INSERT INTO `request` VALUES (1,'VAL001','2024-06-07','2024-06-10',9,'Plessss','Approved','2024-05-31'),(2,'VAL002','2024-06-03','2024-06-03',2,'Confidential ','Approved','2024-05-31');
/*!40000 ALTER TABLE `request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schedule`
--

DROP TABLE IF EXISTS `schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `schedule` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Schedule` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedule`
--

LOCK TABLES `schedule` WRITE;
/*!40000 ALTER TABLE `schedule` DISABLE KEYS */;
INSERT INTO `schedule` VALUES (2,'Flexible');
/*!40000 ALTER TABLE `schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sysaccount`
--

DROP TABLE IF EXISTS `sysaccount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sysaccount` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sysaccount`
--

LOCK TABLES `sysaccount` WRITE;
/*!40000 ALTER TABLE `sysaccount` DISABLE KEYS */;
INSERT INTO `sysaccount` VALUES (1,'CLD-DIGITALS','2128cfc9bb3f45c945acf74a4a01ffa2fb14d24b906498426a3de8c9f5fbef0e',1);
/*!40000 ALTER TABLE `sysaccount` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-01  8:00:49
