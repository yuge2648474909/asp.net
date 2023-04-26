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
-- Table structure for table `navigations`
--

DROP TABLE IF EXISTS `navigations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `navigations` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `ParentId` int DEFAULT '0',
  `Name` varchar(50) NOT NULL,
  `Order` int NOT NULL DEFAULT '0',
  `Icon` varchar(50) DEFAULT 'fa fa-fa',
  `Url` varchar(4000) DEFAULT NULL,
  `Category` varchar(50) DEFAULT '0',
  `Target` varchar(10) DEFAULT '_self',
  `IsResource` int DEFAULT '0',
  `Application` varchar(200) DEFAULT 'BA',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=113 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `navigations`
--

LOCK TABLES `navigations` WRITE;
/*!40000 ALTER TABLE `navigations` DISABLE KEYS */;
INSERT INTO `navigations` VALUES (1,0,'后台管理',10,'fa fa-gear','~/Admin/Index','0','_self',0,'BA'),(2,0,'个人中心',20,'fa fa-suitcase','~/Admin/Profiles','0','_self',0,'BA'),(3,2,'保存显示名称',10,'fa fa-fa','saveDisplayName','0','_self',2,'BA'),(4,2,'保存密码',20,'fa fa-fa','savePassword','0','_self',2,'BA'),(5,2,'保存应用',30,'fa fa-fa','saveApp','0','_self',2,'BA'),(6,2,'保存样式',40,'fa fa-fa','saveTheme','0','_self',2,'BA'),(7,2,'保存头像',50,'fa fa-fa','saveIcon','0','_self',2,'BA'),(8,2,'保存网站设置',60,'fa fa-fa','saveUISettings','0','_self',2,'BA'),(9,0,'系统锁屏',25,'fa fa-television','~/Account/Lock','0','_self',0,'BA'),(10,0,'返回前台',30,'fa fa-hand-o-left','~/Home/Index','0','_self',0,'BA'),(11,0,'网站设置',40,'fa fa-fa','~/Admin/Settings','0','_self',0,'BA'),(12,11,'保存系统名称',10,'fa fa-fa','saveTitle','0','_self',2,'BA'),(13,11,'保存页脚设置',20,'fa fa-fa','saveFooter','0','_self',2,'BA'),(14,11,'保存样式',30,'fa fa-fa','saveTheme','0','_self',2,'BA'),(15,11,'清理缓存',40,'fa fa-fa','clearCache','0','_self',2,'BA'),(16,11,'清理全部缓存',50,'fa fa-fa','clearAllCache','0','_self',2,'BA'),(17,11,'登录设置',60,'fa fa-fa','loginSettings','0','_self',2,'BA'),(18,11,'自动锁屏',70,'fa fa-fa','lockScreen','0','_self',2,'BA'),(19,11,'默认应用',80,'fa fa-fa','defaultApp','0','_self',2,'BA'),(20,0,'菜单管理',50,'fa fa-dashboard','~/Admin/Menus','0','_self',0,'BA'),(21,20,'新增',10,'fa fa-fa','add','0','_self',2,'BA'),(22,20,'编辑',20,'fa fa-fa','edit','0','_self',2,'BA'),(23,20,'删除',30,'fa fa-fa','del','0','_self',2,'BA'),(24,20,'分配角色',40,'fa fa-fa','assignRole','0','_self',2,'BA'),(25,0,'图标页面',50,'fa fa-fa','~/Admin/IconView','0','_self',1,'BA'),(26,0,'侧边栏',55,'fa fa-fa','~/Admin/Sidebar','0','_self',1,'BA'),(27,0,'用户管理',60,'fa fa-user','~/Admin/Users','0','_self',0,'BA'),(28,27,'新增',10,'fa fa-fa','add','0','_self',2,'BA'),(29,27,'编辑',20,'fa fa-fa','edit','0','_self',2,'BA'),(30,27,'删除',30,'fa fa-fa','del','0','_self',2,'BA'),(31,27,'分配部门',40,'fa fa-fa','assignGroup','0','_self',2,'BA'),(32,27,'分配角色',50,'fa fa-fa','assignRole','0','_self',2,'BA'),(33,0,'角色管理',70,'fa fa-sitemap','~/Admin/Roles','0','_self',0,'BA'),(34,33,'新增',10,'fa fa-fa','add','0','_self',2,'BA'),(35,33,'编辑',20,'fa fa-fa','edit','0','_self',2,'BA'),(36,33,'删除',30,'fa fa-fa','del','0','_self',2,'BA'),(37,33,'分配用户',40,'fa fa-fa','assignUser','0','_self',2,'BA'),(38,33,'分配部门',50,'fa fa-fa','assignGroup','0','_self',2,'BA'),(39,33,'分配菜单',60,'fa fa-fa','assignMenu','0','_self',2,'BA'),(40,33,'分配应用',70,'fa fa-fa','assignApp','0','_self',2,'BA'),(41,0,'部门管理',80,'fa fa-bank','~/Admin/Groups','0','_self',0,'BA'),(42,41,'新增',10,'fa fa-fa','add','0','_self',2,'BA'),(43,41,'编辑',20,'fa fa-fa','edit','0','_self',2,'BA'),(44,41,'删除',30,'fa fa-fa','del','0','_self',2,'BA'),(45,41,'分配用户',40,'fa fa-fa','assignUser','0','_self',2,'BA'),(46,41,'分配角色',50,'fa fa-fa','assignRole','0','_self',2,'BA'),(47,0,'字典表维护',90,'fa fa-book','~/Admin/Dicts','0','_self',0,'BA'),(48,47,'新增',10,'fa fa-fa','add','0','_self',2,'BA'),(49,47,'编辑',20,'fa fa-fa','edit','0','_self',2,'BA'),(50,47,'删除',30,'fa fa-fa','del','0','_self',2,'BA'),(51,0,'站内消息',100,'fa fa-envelope','~/Admin/Messages','0','_self',0,'BA'),(52,0,'任务管理',110,'fa fa fa-tasks','~/Admin/Tasks','0','_self',0,'BA'),(53,52,'暂停',10,'fa fa-fa','pause','0','_self',2,'BA'),(54,52,'日志',20,'fa fa-fa','info','0','_self',2,'BA'),(55,0,'通知管理',120,'fa fa-bell','~/Admin/Notifications','0','_self',0,'BA'),(56,0,'系统日志',130,'fa fa-gears','#','0','_self',0,'BA'),(57,56,'操作日志',10,'fa fa-edit','~/Admin/Logs','0','_self',0,'BA'),(58,56,'登录日志',20,'fa fa-user-circle-o','~/Admin/Logins','0','_self',0,'BA'),(59,56,'访问日志',30,'fa fa-bars','~/Admin/Traces','0','_self',0,'BA'),(60,56,'SQL日志',40,'fa fa-database','~/Admin/SQL','0','_self',0,'BA'),(61,0,'在线用户',140,'fa fa-users','~/Admin/Online','0','_self',0,'BA'),(62,0,'网站分析',145,'fa fa-line-chart','~/Admin/Analyse','0','_self',0,'BA'),(63,0,'程序异常',150,'fa fa-cubes','~/Admin/Exceptions','0','_self',0,'BA'),(64,63,'服务器日志',10,'fa fa-fa','log','0','_self',2,'BA'),(65,0,'健康检查',155,'fa fa-heartbeat','~/Admin/Healths','0','_self',0,'BA'),(66,0,'工具集合',160,'fa fa-gavel','#','0','_self',0,'BA'),(67,66,'客户端测试',10,'fa fa-wrench','~/Admin/Mobile','0','_self',0,'BA'),(68,66,'API文档',10,'fa fa-wrench','~/swagger','0','_self',0,'BA'),(69,66,'图标集',10,'fa fa-dashboard','~/Admin/FAIcon','0','_self',0,'BA'),(70,0,'控件集合',170,'fa fa-stethoscope','#','0','_self',0,'BA'),(71,70,'行为式验证码',10,'fa fa-wrench','https://gitee.com/LongbowEnterprise/SliderCaptcha','0','_self',0,'BA'),(72,70,'下拉框',20,'fa fa-bars','http://longbowenterprise.gitee.io/longbow-select/','0','_self',0,'BA'),(73,0,'首页',10,'fa fa-home','~/Home/Index','1','_self',0,'Demo'),(77,0,'客户管理',10,'fa fa-user-o','#','1','_self',0,'Demo'),(83,80,'测试列表',10,'fa fa-fa','~/SpeedManagement/TryList','1','_self',0,'Demo'),(85,80,'测试ajax',10,'fa fa-fa','~/SpeedManagement/TestAjaxPage','1','_self',0,'Demo'),(86,86,'作业区列表',20,'fa fa-skype','~/Workzone/WorkzoneList','1','_self',0,'Demo'),(91,0,'数据管理',10,'fa fa-database','#','1','_self',0,'Demo'),(92,77,'人员管理',10,'fa fa-list','~/ClientManagement/StaffList','1','_self',0,'Demo'),(93,77,'公司管理',20,'fa fa-list','~/ClientManagement/CompanyList','1','_self',0,'Demo'),(95,91,'日志管理',10,'fa fa-fa','~/DataManagement/LogList','1','_self',0,'Demo'),(100,77,'部门管理',10,'fa fa-fa','~/ClientManagement/DepartmentList','1','_self',0,'Demo'),(101,92,'新增',10,'fa fa-fa','~/ClientManagement/StaffCreate','1','_self',2,'Demo'),(102,92,'查看',20,'fa fa-fa','~/ClientManagement/StaffDetails','1','_self',2,'Demo'),(103,92,'编辑',10,'fa fa-fa','~/ClientManagement/StaffEdit','1','_self',2,'Demo'),(104,100,'新建',10,'fa fa-fa','~/ClientManagement/DepartmentCreate','1','_self',2,'Demo'),(105,100,'编辑',10,'fa fa-fa','~/ClientManagement/DepartmentEdit','1','_self',2,'Demo'),(106,100,'查看',10,'fa fa-fa','~/ClientManagement/DepartmentDetails','1','_self',2,'Demo'),(107,93,'查看',10,'fa fa-fa','~/ClientManagement/CompanyDetails','1','_self',2,'Demo'),(108,93,'删除',10,'fa fa-fa','~/ClientManagement/CompanyDelete','1','_self',2,'Demo'),(109,93,'删除单个',10,'fa fa-fa','~/ClientManagement/CompanyDelete_single','1','_self',2,'Demo'),(110,93,'编辑',10,'fa fa-fa','~/ClientManagement/CompanyEdit','1','_self',2,'Demo'),(111,0,'车辆管理',10,'fa fa-fa','#','1','_self',0,'Demo'),(112,111,'车辆列表',10,'fa fa-fa','~/VehicleManagement/VehicleList','1','_self',0,'Demo');
/*!40000 ALTER TABLE `navigations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-09-15 13:03:58
