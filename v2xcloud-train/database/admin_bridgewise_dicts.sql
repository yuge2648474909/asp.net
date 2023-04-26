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
-- Table structure for table `dicts`
--

DROP TABLE IF EXISTS `dicts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dicts` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Category` varchar(50) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Code` varchar(2000) NOT NULL,
  `Define` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dicts`
--

LOCK TABLES `dicts` WRITE;
/*!40000 ALTER TABLE `dicts` DISABLE KEYS */;
INSERT INTO `dicts` VALUES (1,'菜单','系统菜单','0',0),(2,'菜单','外部菜单','1',0),(3,'应用程序','后台管理','BA',0),(4,'网站设置','网站标题','同路智安后台管理系统',0),(5,'网站设置','网站页脚','2021 © 同路智安后台管理系统',0),(6,'系统通知','用户注册','0',0),(7,'系统通知','程序异常','1',0),(8,'系统通知','数据库连接','2',0),(9,'通知状态','未处理','0',0),(10,'通知状态','已处理','1',0),(11,'处理结果','同意','0',0),(12,'处理结果','拒绝','1',0),(13,'消息状态','未读','0',0),(14,'消息状态','已读','1',0),(15,'消息标签','一般','0',0),(16,'消息标签','紧要','1',0),(17,'头像地址','头像路径','~/images/uploader/',0),(18,'头像地址','头像文件','default.jpg',0),(19,'网站样式','蓝色样式','blue.css',0),(20,'网站样式','黑色样式','black.css',0),(21,'网站样式','AdminLTE','lte.css',0),(22,'网站设置','使用样式','lte.css',0),(23,'网站设置','前台首页','~/Home/Index',0),(24,'网站设置','侧边栏状态','1',0),(25,'网站设置','卡片标题状态','1',0),(26,'网站设置','固定表头','1',0),(27,'网站设置','短信验证码登录','1',0),(28,'网站设置','OAuth 认证登录','1',0),(29,'网站设置','自动锁屏时长','30',0),(30,'网站设置','自动锁屏','0',0),(31,'网站设置','Blazor','0',0),(32,'网站设置','健康检查','1',0),(33,'网站设置','程序异常保留时长','1',0),(34,'网站设置','操作日志保留时长','12',0),(35,'网站设置','登录日志保留时长','12',0),(36,'网站设置','访问日志保留时长','1',0),(37,'网站设置','Cookie保留时长','7',0),(38,'网站设置','IP地理位置接口','None',0),(39,'地理位置服务','百度地图开放平台','BaiDuIPSvr',0),(40,'地理位置服务','聚合地理位置','JuheIPSvr',0),(41,'地理位置服务','百度138地理位置','BaiDuIP138Svr',0),(42,'地理位置','BaiDuIPSvr','http://api.map.baidu.com/location/ip?ak=6lvVPMDlm2gjLpU0aiqPsHXi2OiwGQRj&ip=',0),(43,'地理位置','JuheIPSvr','http://apis.juhe.cn/ip/ipNew?key=f57102d1b9fadd3f4a1c29072d0c0206&ip=',0),(44,'地理位置','BaiDuIP138Svr','https://sp0.baidu.com/8aQDcjqpAAV3otqbppnN2DJv/api.php?resource_id=6006&query=',0),(45,'网站设置','IP请求缓存时长','10',0),(46,'网站设置','演示系统','0',0),(47,'网站设置','授权盐值','yjglE2eddCGcS7tTFTDd2DfvqXHgCnMhNhpmx9HJaC9l8GAZ',0),(48,'网站设置','哈希结果','6jTT50HGuk8V+AIsiE4IfqjcER71PBN1DY7gqOLZE7E=',0),(49,'网站设置','验证码图床','http://imgs.sdgxgz.com/images/',0),(50,'网站设置','默认应用程序','0',0),(51,'网站设置','后台地址','http://localhost:50852',0),(52,'系统首页','高仿码云','Login-Gitee',1),(53,'系统首页','蓝色清新','Login-Blue',1),(54,'系统首页','系统默认','Login',1),(55,'系统首页','科技动感','Login-Tec',1),(56,'系统首页','Admin-LTE','Login-LTE',1),(57,'网站设置','登录界面','Login-LTE',1),(58,'应用程序','测试平台','Demo',0),(59,'应用首页','Demo','http://localhost:49185',0),(60,'测试平台','网站标题','同路智安云平台',1),(61,'测试平台','网站页脚','同路智安云平台',1),(62,'测试平台','个人中心地址','/Admin/Profiles',1),(63,'测试平台','系统设置地址','/Admin/Index',1),(64,'测试平台','系统通知地址','/Admin/Notifications',1),(65,'测试平台','favicon','/favicon.ico',1),(66,'测试平台','网站图标','/favicon.png',1);
/*!40000 ALTER TABLE `dicts` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-09-15 13:04:00
