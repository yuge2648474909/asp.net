CREATE DATABASE  IF NOT EXISTS `client_bridgewise` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `client_bridgewise`;
-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: client_bridgewise
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
-- Table structure for table `staff`
--

DROP TABLE IF EXISTS `staff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `staff` (
  `id` int NOT NULL AUTO_INCREMENT,
  `openid` varchar(100) DEFAULT NULL,
  `nickname` varchar(100) DEFAULT NULL,
  `sex` varchar(45) DEFAULT NULL,
  `province` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `headimgurl` varchar(200) DEFAULT NULL,
  `privilege` varchar(100) DEFAULT NULL,
  `unionid` varchar(100) DEFAULT NULL,
  `company` varchar(100) DEFAULT NULL,
  `role` varchar(100) DEFAULT NULL,
  `userid` varchar(100) DEFAULT NULL,
  `permission` int DEFAULT '0',
  `department` varchar(45) DEFAULT NULL,
  `token` longtext,
  `running_status` varchar(45) DEFAULT 'stop',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=154 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff`
--

LOCK TABLES `staff` WRITE;
/*!40000 ALTER TABLE `staff` DISABLE KEYS */;
INSERT INTO `staff` VALUES (142,NULL,'DaddyDo','1',NULL,NULL,NULL,'http://wework.qpic.cn/bizmail/gNHmiapib1DYp7ibgZibJYILgicQunRvTkHhVibzmwn0iaTicWbEiaBn45YrxqA/0',NULL,NULL,'同航科技','','daddydo',1,'上海同航土木工程技术有限公司',NULL,NULL),(149,NULL,'刘玮娜','2',NULL,NULL,NULL,'https://wework.qpic.cn/bizmail/psicYibHAk6eY5Y2TqUfZrKTBl0UXzNBh9xN82fJggWmQUFnKvZMuoHQ/0',NULL,NULL,'同航科技','','LiuWeiNa',1,'上海同航土木工程技术有限公司',NULL,NULL),(151,NULL,'许哲谱','1',NULL,NULL,NULL,'https://wework.qpic.cn/bizmail/FqoqJCCTEhCLJfDQgHL7aibYFKia23Ef4ib1ABw2W9hiaCqKo5v3iahWJ8Q/0',NULL,NULL,'同航科技','','XuZhePu',1,'测试部门','4gvKXqcoCmv6f-hG0b1ovJAt9p0gGNXMDQpcBVfYOt1wXXpNEuiFVtfQmfh-dyNQTmrdU3ffDLIO9PsmklDF_VdWGMkPnPHCoVM2YsoqreLpS_PMAsu3E6hQlkrQQYhR','running'),(152,NULL,'李声俊','1',NULL,NULL,NULL,'http://wework.qpic.cn/bizmail/GSEccy3rOD473Pgiba5ttMU5hoc0FwKNop8f5KWHz8kodBiaaEwBMchQ/0',NULL,NULL,'同航科技','','ShengJun',1,'上海同航土木工程技术有限公司','6H9r5dI6ncjLoVhwe44L91AZ8c-e-VH1iVoTNw2UvjEyjvQRF_R4mJprgukdZZ6ELPePNhKO98FhfFEn9wsM48XIXNngOVRTOI2RA6m3yUhnx4XeGAX7u2RiV79GJEnk','stop'),(153,NULL,'赵德润','1',NULL,NULL,NULL,'https://wework.qpic.cn/bizmail/jvqbKAAnI7ptyicrU0r7vV0hWuYe2Xklj0lRuWdOa3aEt4iaqnlshPLQ/0',NULL,NULL,'同航科技','','ZhaoDeRun',1,'上海同航土木工程技术有限公司','tTZFz_KwUCYVbKhswf7ML6qT4KhANTXmxCqKkOjqnb3FMhXgJ_4MDEz2gzzEm4r6w2XMQlc7Cle4NdaBMeT7dcwjDp3_A74Tdr-PiMEr-Tqsbe9jksFS6WrfSw57O1zg','stop');
/*!40000 ALTER TABLE `staff` ENABLE KEYS */;
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
