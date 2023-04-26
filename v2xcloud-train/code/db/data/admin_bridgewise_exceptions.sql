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
-- Table structure for table `exceptions`
--

DROP TABLE IF EXISTS `exceptions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exceptions` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `AppDomainName` varchar(50) NOT NULL,
  `ErrorPage` varchar(50) NOT NULL,
  `UserID` varchar(50) DEFAULT NULL,
  `UserIp` varchar(15) DEFAULT NULL,
  `ExceptionType` text NOT NULL,
  `Message` text NOT NULL,
  `StackTrace` text,
  `LogTime` datetime NOT NULL,
  `Category` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=136 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exceptions`
--

LOCK TABLES `exceptions` WRITE;
/*!40000 ALTER TABLE `exceptions` DISABLE KEYS */;
INSERT INTO `exceptions` VALUES (132,'Bootstrap.Admin','/Account/Login',NULL,'::1','System.ObjectDisposedException','Cannot access a disposed object.','   at System.Threading.TimerQueueTimer.Change(UInt32 dueTime, UInt32 period)\r\n   at System.Threading.Timer.Change(Int32 dueTime, Int32 period)\r\n   at Longbow.Cache.AutoExpireCacheEntry`1.Reset()\r\n   at Longbow.Cache.DefaultCache.InternalGetOrAddOrUpdate[T](ICacheOption option, Func`2 valueFactory, Func`2 callback)\r\n   at Longbow.Cache.DefaultCache.InternalGetOrAddOrUpdate[T](String key, Func`2 valueFactory, Func`2 callback, String profileKey)\r\n   at Longbow.Cache.DefaultCache.GetOrAdd[T](String key, Func`2 valueFactory, String profileKey)\r\n   at Longbow.Cache.CacheManager.GetOrAdd[T](String key, Func`2 valueFactory, String profileKey)\r\n   at Bootstrap.DataAccess.DictHelper.RetrieveDicts() in C:\\Users\\Administrator\\source\\repos\\BootstrapAdmin-master-bridgewise\\src\\admin\\Bootstrap.DataAccess\\Helper\\DictHelper.cs:line 31\r\n   at Bootstrap.DataAccess.Dict.RetrieveLocaleIPSvr() in C:\\Users\\Administrator\\source\\repos\\BootstrapAdmin-master-bridgewise\\src\\admin\\Bootstrap.DataAccess\\Dict.cs:line 207\r\n   at Bootstrap.DataAccess.DictHelper.RetrieveLocaleIPSvr() in C:\\Users\\Administrator\\source\\repos\\BootstrapAdmin-master-bridgewise\\src\\admin\\Bootstrap.DataAccess\\Helper\\DictHelper.cs:line 262\r\n   at Bootstrap.DataAccess.DictHelper.ConfigIPLocator(IPLocatorOption op) in C:\\Users\\Administrator\\source\\repos\\BootstrapAdmin-master-bridgewise\\src\\admin\\Bootstrap.DataAccess\\Helper\\DictHelper.cs:line 117\r\n   at Microsoft.Extensions.DependencyInjection.IPLocatorServicesCollectionExtensions.ConfigureOption(IPLocatorOption option)\r\n   at Longbow.Web.DefaultIPLocatorProvider.Locate(String ip)\r\n   at Microsoft.AspNetCore.Builder.OnlineUsersMiddlewareExtensions.<>c__DisplayClass0_2.<UseOnlineUsers>b__5(String key)\r\n   at System.Collections.Concurrent.ConcurrentDictionary`2.AddOrUpdate(TKey key, Func`2 addValueFactory, Func`3 updateValueFactory)\r\n   at Longbow.Web.DefaultOnlineUsers.AddOrUpdate(String key, Func`2 addValueFactory, Func`3 updateValueFactory)\r\n   at Microsoft.AspNetCore.Builder.OnlineUsersMiddlewareExtensions.<>c__DisplayClass0_1.<UseOnlineUsers>b__3()\r\n   at System.Threading.Tasks.Task.InnerInvoke()\r\n   at System.Threading.Tasks.Task.<>c.<.cctor>b__277_0(Object obj)\r\n   at System.Threading.ExecutionContext.RunFromThreadPoolDispatchLoop(Thread threadPoolThread, ExecutionContext executionContext, ContextCallback callback, Object state)\r\n--- End of stack trace from previous location ---\r\n   at System.Threading.ExecutionContext.RunFromThreadPoolDispatchLoop(Thread threadPoolThread, ExecutionContext executionContext, ContextCallback callback, Object state)\r\n   at System.Threading.Tasks.Task.ExecuteWithThreadLocal(Task& currentTaskSlot, Thread threadPoolThread)\r\n--- End of stack trace from previous location ---\r\n   at Microsoft.AspNetCore.Builder.OnlineUsersMiddlewareExtensions.<>c__DisplayClass0_0.<<UseOnlineUsers>b__2>d.MoveNext()\r\n--- End of stack trace from previous location ---\r\n   at Microsoft.AspNetCore.Builder.Extensions.MapWhenMiddleware.Invoke(HttpContext context)\r\n   at Swashbuckle.AspNetCore.SwaggerUI.SwaggerUIMiddleware.Invoke(HttpContext httpContext)\r\n   at Swashbuckle.AspNetCore.Swagger.SwaggerMiddleware.Invoke(HttpContext httpContext, ISwaggerProvider swaggerProvider)\r\n   at Microsoft.AspNetCore.Authorization.AuthorizationMiddleware.Invoke(HttpContext context)\r\n   at Microsoft.AspNetCore.Builder.AuthenticationExtensions.<>c__DisplayClass3_0.<<UseBootstrapAdminAuthentication>b__0>d.MoveNext()\r\n--- End of stack trace from previous location ---\r\n   at Microsoft.AspNetCore.Authentication.AuthenticationMiddleware.Invoke(HttpContext context)\r\n   at Exceptionless.AspNetCore.ExceptionlessMiddleware.Invoke(HttpContext context)\r\n   at Microsoft.AspNetCore.Builder.AutoGenerateDatabaseExtensions.<>c.<<UseAutoGenerateDatabase>b__3_0>d.MoveNext() in C:\\Users\\Administrator\\source\\repos\\BootstrapAdmin-master-bridgewise\\src\\admin\\Bootstrap.Admin\\Extensions\\AutoGenerateDatabaseExtensions.cs:line 65\r\n--- End of stack trace from previous location ---\r\n   at Microsoft.AspNetCore.ResponseCompression.ResponseCompressionMiddleware.Invoke(HttpContext context)\r\n   at Microsoft.AspNetCore.Diagnostics.StatusCodePagesMiddleware.Invoke(HttpContext context)\r\n   at Microsoft.AspNetCore.Diagnostics.DeveloperExceptionPageMiddleware.Invoke(HttpContext context)','2021-11-24 16:50:18','App'),(133,'Bootstrap.Admin','MySqlException',NULL,NULL,'MySql.Data.MySqlClient.MySqlException','Timeout expired.  The timeout period elapsed prior to completion of the operation or the server is not responding.','   at MySql.Data.MySqlClient.Interceptors.ExceptionInterceptor.Throw(Exception exception)\r\n   at MySql.Data.MySqlClient.MySqlConnection.Throw(Exception ex)\r\n   at MySql.Data.MySqlClient.MySqlConnection.HandleTimeoutOrThreadAbort(Exception ex)\r\n   at MySql.Data.MySqlClient.MySqlCommand.ExecuteReader(CommandBehavior behavior)\r\n   at MySql.Data.MySqlClient.Driver.LoadCharacterSets(MySqlConnection connection)\r\n   at MySql.Data.MySqlClient.Driver.Configure(MySqlConnection connection)\r\n   at MySql.Data.MySqlClient.MySqlConnection.Open()\r\n   at PetaPoco.Database.OpenSharedConnection()\r\n   at PetaPoco.Database.ExecuteInternal(CommandType commandType, String sql, Object[] args)','2021-11-24 17:11:01','DB'),(134,'Bootstrap.Admin','MySqlException',NULL,NULL,'MySql.Data.MySqlClient.MySqlException','Timeout expired.  The timeout period elapsed prior to completion of the operation or the server is not responding.','   at MySql.Data.MySqlClient.Interceptors.ExceptionInterceptor.Throw(Exception exception)\r\n   at MySql.Data.MySqlClient.MySqlConnection.Throw(Exception ex)\r\n   at MySql.Data.MySqlClient.MySqlConnection.HandleTimeoutOrThreadAbort(Exception ex)\r\n   at MySql.Data.MySqlClient.MySqlCommand.ExecuteReader(CommandBehavior behavior)\r\n   at MySql.Data.MySqlClient.Driver.LoadCharacterSets(MySqlConnection connection)\r\n   at MySql.Data.MySqlClient.Driver.Configure(MySqlConnection connection)\r\n   at MySql.Data.MySqlClient.MySqlConnection.Open()\r\n   at PetaPoco.Database.OpenSharedConnection()\r\n   at PetaPoco.Database.ExecuteInternal(CommandType commandType, String sql, Object[] args)\r\n   at PetaPoco.Database.Execute(String sql, Object[] args)\r\n   at PetaPoco.Database.Update[T](String sql, Object[] args)\r\n   at Bootstrap.DataAccess.Dict.<>c__DisplayClass2_0.<SaveSettings>b__0(BootstrapDict dict) in C:\\Users\\Administrator\\source\\repos\\BootstrapAdmin-master-bridgewise\\src\\admin\\Bootstrap.DataAccess\\Dict.cs:line 56\r\n   at System.Collections.Generic.List`1.ForEach(Action`1 action)\r\n   at Bootstrap.DataAccess.Dict.SaveSettings(IEnumerable`1 dicts) in C:\\Users\\Administrator\\source\\repos\\BootstrapAdmin-master-bridgewise\\src\\admin\\Bootstrap.DataAccess\\Dict.cs:line 56\r\n   at Bootstrap.DataAccess.DictHelper.SaveSettings(IEnumerable`1 dicts) in C:\\Users\\Administrator\\source\\repos\\BootstrapAdmin-master-bridgewise\\src\\admin\\Bootstrap.DataAccess\\Helper\\DictHelper.cs:line 134\r\n   at Microsoft.Extensions.DependencyInjection.BootstrapAdminBackgroundServices.<>c.<ExecuteAsync>b__0_7(CancellationToken token) in C:\\Users\\Administrator\\source\\repos\\BootstrapAdmin-master-bridgewise\\src\\admin\\Bootstrap.Admin\\Tasks\\TasksExtensions.cs:line 58\r\n   at Longbow.Tasks.DefaultTask.Execute(CancellationToken cancellationToken)\r\n   at Longbow.Tasks.DefaultTaskMetaData.Execute(CancellationToken cancellationToken)\r\n   at Longbow.Tasks.SchedulerProcess.<>c__DisplayClass25_0.<<InternalStart>b__0>d.MoveNext()','2021-11-24 17:11:06','DB'),(135,'Bootstrap.Admin','/api/Login',',18323461672','114.88.130.102','System.Exception','',NULL,'2021-12-17 14:38:50','App');
/*!40000 ALTER TABLE `exceptions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-11  8:09:32
