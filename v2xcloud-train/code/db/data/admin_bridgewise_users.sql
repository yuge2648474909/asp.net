CREATE DATABASE  IF NOT EXISTS `admin_bridgewise` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `admin_bridgewise`;
-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: admin_bridgewise
-- ------------------------------------------------------
-- Server version	8.0.22

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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `UserName` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Password` varchar(50) NOT NULL,
  `PassSalt` varchar(50) NOT NULL,
  `DisplayName` varchar(50) NOT NULL,
  `RegisterTime` datetime NOT NULL,
  `ApprovedTime` datetime DEFAULT NULL,
  `ApprovedBy` varchar(50) DEFAULT NULL,
  `Description` varchar(500) NOT NULL,
  `RejectedBy` varchar(50) DEFAULT NULL,
  `RejectedTime` datetime DEFAULT NULL,
  `RejectedReason` varchar(50) DEFAULT NULL,
  `Icon` varchar(50) DEFAULT NULL,
  `Css` varchar(50) DEFAULT NULL,
  `App` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Admin','Es7WVgNsJuELwWK8daCqufUBknCsSC0IYDphQZAiGOo=','W5vpBEOYRGHkQXatN0t+ECM/U8cHDuEgrq56+zZBk4J481xH','Administrator','2020-11-11 16:00:06','2020-11-11 16:00:06','system','系统默认创建',NULL,NULL,NULL,NULL,'lte.css','Demo'),(2,'User','tXG/yNffpnm6cThrCH7wf6jN1ic3VHvLoY4OrzKtrZ4=','c5cIrRMn8XjB84M/D/X7Lg9uUqQFmYNEdxb/4HWH8OLa4pNZ','测试账号','2020-11-11 16:00:06','2020-11-11 16:00:06','system','系统默认创建',NULL,NULL,NULL,NULL,'lte.css','Demo'),(3,'jeb','Edp0TdSko9yO79jr/LR5/SkGl+0/2L4CpDiljVfcsD4=','Kh7UxP1fDZZ7ZbzJLS6ydtyRVLbwM3My34TLoSxzmkKBY4tp','jeb','2021-04-13 17:04:10','2021-04-13 17:04:10','admin','管理员admin创建用户',NULL,NULL,NULL,'','lte.css','Demo'),(4,'xuzhepu1993','g1UQqRviCcVmIXGuFwL33lG6k6YKStRIQ6cZKoIWhM0=','EsLA1zOSEhvuz8gicsFW3FzzoIbpgv5OPwXHVsF9SyshjAz3','素志','2021-11-10 12:05:50','2021-11-10 12:05:50','admin','管理员admin创建用户',NULL,NULL,NULL,'','lte.css','Demo'),(5,'baiduadmin','TXdlGgU3MG2Mb7FAN8Cb9D4mPazMJkp9CWUT5sTXe8o=','o9bUT+WCvvHgy4veeZtXkzCrQIHZyKXTfInVOwLNPsnoOcaq','百度管理员','2021-12-14 09:26:11','2021-12-14 09:26:11','admin','管理员admin创建用户',NULL,NULL,NULL,'','lte.css','Demo'),(6,'test','72e1YWPy5clRxXPn0+IaGvdboM20B+7V321U9Cu+MRg=','8uDC2VP3bmXEEzw9RXxgduYuEzpQHx1hyC7CR8agUIq0qCDr','test','2021-12-16 16:47:19','2021-12-16 16:47:19','admin','管理员admin创建用户',NULL,NULL,NULL,'','','Demo'),(7,'xuzhepu','efCryvfytxniL5PXOgPDh18up3b3uih8m2tburIp9AY=','is7Tn/UAgTaGNWuEi6b48HlMV6XDPtIwfBEaTG7VtQHMpf7x','xuzhepu','2021-12-25 12:38:14','2021-12-25 12:38:14','admin','管理员admin创建用户',NULL,NULL,NULL,'','','Demo'),(8,'wyp','iUIknQSVovqAnHB86fDzOHFkTUb6RpquNheynV4t9WE=','1RCqTLgOAk2xJ11A3Maf53JZ6dvV8Xz6o5GUzU06v0b6fyfw','wyp','2021-12-25 12:39:19','2021-12-25 12:39:19','admin','管理员admin创建用户',NULL,NULL,NULL,'','','Demo'),(9,'xhq','YFmLjlM5227sn1akxGAjJtioCAm86HAVBjNPerUvc5g=','1hZ5jlHDmrELLUmN0v38fD8e/PZQjxpqq9/TkQ3DB5nyhSP6','xhq','2021-12-25 12:48:06','2021-12-25 12:48:06','admin','管理员admin创建用户',NULL,NULL,NULL,'','','');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-11  8:09:31
