using Bootstrap.Client.DataAccess.Helper;
using Bootstrap.Client.Infrastructure.Repositories;
using Bootstrap.Client.Models;
using Bootstrap.Client.Query;
using Bootstrap.Client.Tasks;
using Bootstrap.Client.Util;
using Bootstrap.Security;
using Longbow;
using Longbow.Tasks;
using Longbow.Web.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Dynamic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Xml;

namespace Bootstrap.Client.Controllers.Api
{
    /// <summary>
    /// 字典表维护控制器
    /// </summary>
    [Route("api/[controller]/[action]/{id?}")]
    //[Authorize]
    [ApiController]
    public class DataManagementController : Controller
    {
        private readonly IRepository<Login_log, int> _loginlogRepository;
        private readonly IRepository<Staff, int> _staffRepository;
        private readonly IRepository<Company, int> _companyRepository;
        private readonly IRepository<Log, int> _logRepository;

        //使用构造函数注入的方式注入IRepository
        public DataManagementController(IRepository<Login_log, int> loginlogRepository,
            IRepository<Staff, int> staffRepository,
            IRepository<Log, int> logRepository,
            IRepository<Company, int> companyRepository)
        {
            _loginlogRepository = loginlogRepository;
            _staffRepository = staffRepository;
            _companyRepository = companyRepository;
            _logRepository = logRepository;
        }

        /// <summary>
        /// 获取所有字典表数据方法
        /// </summary>
        [HttpPost]
        public object GetPersonalData(LoginUserInfo loginUserInfo)
        {
            dynamic obj = new ExpandoObject();

            try {
                string userid_open=loginUserInfo.userid_open;
                string corpid_open=loginUserInfo.corpid_open;
                Company company = _companyRepository.FirstOrDefault(a => a.corpid_open == corpid_open||a.corpid==corpid_open);

                Log log = new Log()
                {
                     content=company.name
                };
                _logRepository.Insert(log);

                Staff staff = _staffRepository.FirstOrDefault(a => a.company == company.name && a.open_userid == userid_open);
                obj.data = staff;

                obj.status = "success";
            } catch (Exception e) {
                obj.status = "failed";
                obj.erro = e.ToString();
            }

            return obj;
        }

        /// <summary>
        /// 获取所有字典表数据方法
        /// </summary>
        [HttpGet]
        public object InitLogList([FromQuery] QueryLogOption value)
        {
            string username = User.Identity.Name;
            var group = GroupHelper.RetrievesByUserName(username);
            string groupname = group.First<BootstrapGroup>().GroupName;
            value.company = groupname;

            string Order = "";
            string Sort = "";
            if (string.IsNullOrEmpty(value.Order)) Order = "asc";
            if (string.IsNullOrEmpty(value.Sort)) Sort = "userid";

            var ds = _loginlogRepository.GetAll().ToList();
            List<Detailed_Log> logslist = new List<Detailed_Log>();
            foreach (var log in ds)
            {
                int id = log.id;
                string user_unionid = log.user_unionid;
                string userid = log.userid;
                string user_token_session = log.user_token_session;
                string login_time = log.login_time;
                string logout_time = log.logout_time;

                Staff staff=null;
                string nickname="";
                string company="";
                string role="";
                if (!string.IsNullOrEmpty(userid))
                    staff = _staffRepository.FirstOrDefault(a => a.userid == userid);
                else if (!string.IsNullOrEmpty(user_unionid))
                    staff = _staffRepository.FirstOrDefault(a => a.unionid == user_unionid);

                if (staff != null)
                {
                    nickname = staff.nickname;
                    company = staff.company;
                    role = staff.role;
                }
                else
                    continue;

                if (!string.IsNullOrEmpty(value.userid))
                {
                    if (string.IsNullOrEmpty(userid))
                        continue;
                    if (!userid.Contains(value.userid))
                        continue;
                }
                if (!string.IsNullOrEmpty(value.nickname))
                {
                    if (string.IsNullOrEmpty(nickname))
                        continue;
                    if (!nickname.Contains(value.nickname))
                        continue;
                }
                if (!string.IsNullOrEmpty(value.company))
                {
                    if (string.IsNullOrEmpty(company))
                        continue;
                    if (!company.Contains(value.company))
                        continue;
                }
                if (!string.IsNullOrEmpty(value.role))
                {
                    if (string.IsNullOrEmpty(role))
                        continue;
                    if (!role.Contains(value.role))
                        continue;
                }
                if (!string.IsNullOrEmpty(value.login_time))
                {
                    if (string.IsNullOrEmpty(login_time))
                        continue;

                    DateTime dt1 = Convert.ToDateTime(login_time);
                    DateTime dt2 = Convert.ToDateTime(value.login_time);

                    if(dt1<dt2)
                        continue;
                }
                if (!string.IsNullOrEmpty(value.logout_time))
                {
                    if (string.IsNullOrEmpty(logout_time))
                        continue;
                    DateTime dt1 = Convert.ToDateTime(logout_time);
                    DateTime dt2 = Convert.ToDateTime(value.logout_time);

                    if (dt1 > dt2)
                        continue;
                }

                bool exist_flag = false;
                if (!string.IsNullOrEmpty(value.Search))
                {
                    if (!string.IsNullOrEmpty(userid))
                        if (userid.Contains(value.Search))
                            exist_flag = true;
                    if (!string.IsNullOrEmpty(nickname))
                        if (nickname.Contains(value.Search))
                            exist_flag = true;
                    if (!string.IsNullOrEmpty(company))
                        if (company.Contains(value.Search))
                            exist_flag = true;
                    if (!string.IsNullOrEmpty(role))
                        if (role.Contains(value.Search))
                            exist_flag = true;
                    if (!string.IsNullOrEmpty(login_time))
                        if (login_time.Contains(value.Search))
                            exist_flag = true;
                    if (!string.IsNullOrEmpty(logout_time))
                        if (logout_time.Contains(value.Search))
                            exist_flag = true;

                    if (exist_flag == false)
                        continue;
                }


                Detailed_Log detailed_Log_temp = new Detailed_Log()
                {
                    id = id,
                    user_unionid = user_unionid,
                    user_token_session = user_token_session,
                    login_time = login_time,
                    logout_time = logout_time,
                    nickname = nickname,
                    company = company,
                    role = role,
                    userid=userid

                };

                logslist.Add(detailed_Log_temp);

            }

            QueryData<Detailed_Log> logs = new QueryData<Detailed_Log>();
            logs.total = logslist.Count();
            logs.rows = logslist;
            return logs;
        }       

        /// <summary>
        /// 新建日志记录
        /// </summary>
        [HttpPost]
        public object LogCreate(Login_log log)
        {
            dynamic obj = new ExpandoObject();
            try
            {
                //先判断用户是否存在，不存在的话返回注册
                if (!string.IsNullOrEmpty(log.userid))
                {
                    string userid = log.userid;
                    Staff staff = _staffRepository.FirstOrDefault(a => a.open_userid == userid||a.userid==userid);   //用openid来匹配
                    if (staff == null)
                    {
                        obj.status = "failed";
                        obj.erro = "用户不存在，请联系同航注册！";
                        return obj;
                    }
                    //再判断用户是否有登录权限，无的话返回授权
                    var permission = staff.permission;
                    if (permission == 0)
                    {
                        obj.status = "failed";
                        obj.erro = "用户无登录权限，请向管理员申请！";
                        return obj;

                    }

                    Login_log newlog = new Login_log
                    {
                        userid = log.userid,
                        user_unionid = log.user_unionid,
                        user_token_session = log.user_token_session,
                        login_time = log.login_time,
                        logout_time = log.logout_time

                    };

                    _loginlogRepository.Insert(newlog);

                    //更新用户的token
                    staff.token = log.user_token_session;

                    //开启后台发送消息
                    staff.running_status = "running";
                    TaskUtility.StartMessageSender(log.userid);

                    //调用仓储服务中的Update方法，保存studnet对象中的数据，更新数据库表中的信息。
                    _staffRepository.Update(staff);                  

                    obj.status = "success";
                    obj.log_id = newlog.id;
                    return obj;
                }

                //先判断用户是否存在，不存在的话返回注册
                if (!string.IsNullOrEmpty(log.user_unionid))
                {
                    string user_unionid = log.user_unionid;
                    Staff staff = _staffRepository.FirstOrDefault(a => a.unionid == user_unionid);
                    if (staff == null)
                    {
                        obj.status = "failed";
                        obj.erro = "用户不存在，请联系同航注册！";
                        return obj;
                    }
                    //再判断用户是否有登录权限，无的话返回授权
                    var permission = staff.permission;
                    if (permission == 0)
                    {
                        obj.status = "failed";
                        obj.erro = "用户无登录权限，请向管理员申请！";
                        return obj;

                    }

                    Login_log newlog = new Login_log
                    {
                        userid = staff.userid,
                        user_unionid = log.user_unionid,
                        user_token_session = log.user_token_session,
                        login_time = log.login_time,
                        logout_time = log.logout_time

                    };

                    _loginlogRepository.Insert(newlog);

                    //更新用户的token
                    staff.token = log.user_token_session;

                    //调用仓储服务中的Update方法，保存studnet对象中的数据，更新数据库表中的信息。
                    _staffRepository.Update(staff);                 

                    obj.status = "success";
                    obj.log_id = newlog.id;
                    return obj;
                }

                obj.status = "failed";
                obj.erro = "用户不存在，请联系同航注册！";
                return obj;
            }
            catch (Exception ex)
            {
                obj.status = "failed";
                obj.erro = ex.ToString();
                return obj;
            }

        }


        /// <summary>
        /// 登出操作，根据access_token更新登出时间
        /// </summary>
        [HttpPost]
        public object Logout(Login_log log)
        {
            dynamic obj = new ExpandoObject();
            try
            {
                //从数据库中查询正在编辑的学生信息
                Login_log exist_log = _loginlogRepository.FirstOrDefault(a => a.user_token_session == log.user_token_session);
                //用模型对象中的数据更新student对象              
                exist_log.logout_time = log.logout_time;
                //调用仓储服务中的Update方法，保存studnet对象中的数据，更新数据库表中的信息。
                Login_log updatedlog = _loginlogRepository.Update(exist_log);              

                //关闭后台消息
                if (!string.IsNullOrEmpty(log.userid))
                {
                    string userid = log.userid;
                    Staff staff = _staffRepository.FirstOrDefault(a => a.userid == userid||a.open_userid==userid);

                    //关闭后台发送消息
                    staff.running_status = "stop";
                    TaskUtility.StopMessageSender(log.userid);

                    //调用仓储服务中的Update方法，保存studnet对象中的数据，更新数据库表中的信息。
                    _staffRepository.Update(staff);

                }

                if (!string.IsNullOrEmpty(log.user_unionid))
                {
                    string user_unionid = log.user_unionid;
                    Staff staff = _staffRepository.FirstOrDefault(a => a.unionid == user_unionid);
                    //关闭后台发送消息
                    staff.running_status = "stop";

                    //调用仓储服务中的Update方法，保存studnet对象中的数据，更新数据库表中的信息。
                    _staffRepository.Update(staff);
                }

                obj.status = "success";


            }
            catch (Exception ex)
            {
                obj.status = "failed";
                obj.erro = ex.ToString();
            }
            return obj;

        }

        /// <summary>
        /// 设备详情-初始化子设备列表
        /// </summary>
        [HttpPost]
        public object LogEdit(Login_log log)
        {
            dynamic obj = new ExpandoObject();
            try
            {
                //从数据库中查询正在编辑的学生信息
                Login_log exist_log = _loginlogRepository.Single(a => a.id == log.id);
                //用模型对象中的数据更新student对象
                exist_log.id = log.id;
                exist_log.user_unionid = log.user_unionid;
                exist_log.user_token_session = log.user_token_session;
                exist_log.login_time = log.login_time;
                exist_log.logout_time = log.logout_time;


                //调用仓储服务中的Update方法，保存studnet对象中的数据，更新数据库表中的信息。
                Login_log updatedlog = _loginlogRepository.Update(exist_log);

                obj.status = "success";


            }
            catch (Exception ex)
            {
                obj.status = "failed";
                obj.erro = ex.ToString();
            }
            return obj;



        }

        /// <summary>
        /// 设备详情
        /// </summary>
        [HttpGet]
        public object LogDetails(int id)
        {
            dynamic obj = new ExpandoObject();

            try
            {
                Login_log log = _loginlogRepository.Single(a => a.id == id);

                obj.status = "success";
                obj.log = log;

            }
            catch (Exception ex)
            {
                obj.status = "failed";
                obj.erro = ex.ToString();
            }
            return obj;
        }


        /// <summary>
        /// 判断是否为同一账户，企业微信
        /// </summary>
        [HttpPost]
        public object QueryAccount_work(QueryAccountParmsWork parms)
        {
            dynamic obj = new ExpandoObject();
            try
            {
                //先判断用户是否存在，不存在的话返回注册
                if (!string.IsNullOrEmpty(parms.userid))
                {
                    string userid = parms.userid;
                    Staff staff = _staffRepository.FirstOrDefault(a => a.open_userid == userid|| a.userid == userid);    //用open_userid
                    if (staff == null)
                    {
                        obj.status = "failed";
                        obj.erro = "用户不存在，请联系同航注册！";
                        return obj;
                    }
                    //再判断用户是否有登录权限，无的话返回授权
                    var permission = staff.permission;
                    if (permission == 0)
                    {
                        obj.status = "failed";
                        obj.erro = "用户无登录权限，请向管理员申请！";
                        return obj;

                    }
                   
                }


                //判断携带的token是否有效
                if (!string.IsNullOrEmpty(parms.token))
                {
                    string token = parms.token;
                    string userid = parms.userid;
                    Staff staff = _staffRepository.FirstOrDefault(a => a.userid == userid||a.open_userid==userid);
                    string token_old = staff.token;

                    if(string.IsNullOrEmpty(token_old)|| !token_old.Equals(token))    //不相同     
                    {
                        obj.status = "success";
                        obj.flag = "False";

                    }
                    else
                    {
                        obj.status = "success";
                        obj.flag = "True";
                    }
                    return obj;
                }

                obj.status = "failed";
                obj.erro = "token非法！";
                return obj;

            }
            catch (Exception ex)
            {
                obj.status = "failed";
                obj.erro = ex.ToString();
                return obj;
            }

        }

        /// <summary>
        /// 判断是否为同一账户，微信
        /// </summary>
        [HttpPost]
        public object QueryAccount_wechat(QueryAccountParmsWechat parms)
        {
            dynamic obj = new ExpandoObject();
            try
            {
                //先判断用户是否存在，不存在的话返回注册
                if (!string.IsNullOrEmpty(parms.unionid))
                {
                    string unionid = parms.unionid;
                    Staff staff = _staffRepository.FirstOrDefault(a => a.unionid == unionid);
                    if (staff == null)
                    {
                        obj.status = "failed";
                        obj.erro = "用户不存在，请联系同航注册！";
                        return obj;
                    }
                    //再判断用户是否有登录权限，无的话返回授权
                    var permission = staff.permission;
                    if (permission == 0)
                    {
                        obj.status = "failed";
                        obj.erro = "用户无登录权限，请向管理员申请！";
                        return obj;

                    }

                }


                //判断携带的token是否有效
                if (!string.IsNullOrEmpty(parms.token))
                {
                    string token = parms.token;
                    string unionid = parms.unionid;
                    Staff staff = _staffRepository.FirstOrDefault(a => a.unionid == unionid);
                    string token_old = staff.token;

                    if (string.IsNullOrEmpty(token_old) || !token_old.Equals(token))    //不相同     
                    {
                        obj.status = "success";
                        obj.flag = "False";

                    }
                    else
                    {
                        obj.status = "success";
                        obj.flag = "True";
                    }
                    return obj;
                }

                obj.status = "failed";
                obj.erro = "token非法！";
                return obj;

            }
            catch (Exception ex)
            {
                obj.status = "failed";
                obj.erro = ex.ToString();
                return obj;
            }

        }

    }


    public class Detailed_Log
    {
        public int id { get; set; }
        public string user_unionid { get; set; }
        public string user_token_session { get; set; }
        public string login_time { get; set; }
        public string logout_time { get; set; }
        public string nickname { get; set; }
        public string company { get; set; }
        public string role { get; set; }
        public string userid { get; set; }

    }


}
