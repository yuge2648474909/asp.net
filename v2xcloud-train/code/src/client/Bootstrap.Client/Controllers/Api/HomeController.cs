using Bootstrap.Client.DataAccess.Helper;
using Bootstrap.Client.Infrastructure.Repositories;
using Bootstrap.Client.Models;
using Bootstrap.Client.Util;
using Bootstrap.Security;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Threading.Tasks;

namespace Bootstrap.Client.Controllers.Api
{
    /// <summary>
    /// 字典表维护控制器
    /// </summary>
    [Route("api/[controller]/[action]/{id?}")]
    //[Authorize]
    [ApiController]
    public class HomeController : Controller
    {
        private readonly IRepository<Login_log, int> _loginlogRepository;
        private readonly IRepository<Staff, int> _staffRepository;
        private readonly IRepository<Department, int> _departmentRepository;
        private readonly IRepository<ProviderInfo, int> _providerInfoRepository;
        private readonly IRepository<Log, int> _logRepository;
        private readonly IRepository<Company, int> _companyRepository;

        //使用构造函数注入的方式注入IRepository
        public HomeController(IRepository<Login_log, int> loginlogRepository,
            IRepository<Staff, int> staffRepository,
            IRepository<Log, int> logRepository,
            IRepository<Department, int> departmentRepository,
            IRepository<ProviderInfo, int> providerInfoRepository,
            IRepository<Company, int> companyRepository)
        {
            _loginlogRepository = loginlogRepository;
            _staffRepository = staffRepository;
            _departmentRepository = departmentRepository;
            _providerInfoRepository = providerInfoRepository;
            _logRepository = logRepository;
            _companyRepository = companyRepository;

        }


        /// <summary>
        /// 获取所有字典表数据方法
        /// </summary>
        [HttpGet]
        public object TestProvider()
        {
            dynamic obj_result = new ExpandoObject();
            string result_final = "success";
            try
            {
                dynamic obj = new ExpandoObject();
                obj.suite_id = "ww5de6325ae78ece07";
                obj.suite_secret = "sykNDZKBSUrOjoAePntLUIQ2MNmOaaRMrb1IstHhTBw";
                obj.suite_ticket = "FVX6EVVziFacgDLjdWxc7Lq2-AeX5m4WPbMKOrvIJsqrGrVxWgfyYyaIg1vtURdN";

                string datastr = JsonConvert.SerializeObject(obj);
                string post_utl = "https://qyapi.weixin.qq.com/cgi-bin/service/get_suite_token";
                string result_PROVIDER_ACCESS_TOKEN = HttpUtility.PostWebRequest(datastr, post_utl);
                JObject result_obj = (JObject)JsonConvert.DeserializeObject(result_PROVIDER_ACCESS_TOKEN);
                string suite_access_token = result_obj["suite_access_token"].ToString();

                obj = new ExpandoObject();
                obj.auth_corpid = "wpBlo7DAAAB7KSTyZig5yKiip9EQmzvg";   //auth_corpid open
                obj.permanent_code = "P4ub8v0JSTwe5oUorfkonE14Hw8ypSl2HR_O3dRRwiA";

                datastr = JsonConvert.SerializeObject(obj);
                post_utl = " https://qyapi.weixin.qq.com/cgi-bin/service/get_corp_token?suite_access_token="+ suite_access_token;
                result_PROVIDER_ACCESS_TOKEN = HttpUtility.PostWebRequest(datastr, post_utl);
                result_obj = (JObject)JsonConvert.DeserializeObject(result_PROVIDER_ACCESS_TOKEN);
                string access_token = result_obj["access_token"].ToString();

                obj_result.access_token = access_token;

                ////获取成员信息，显然只能拿到open user id
                //string get_users_url = "https://qyapi.weixin.qq.com/cgi-bin/user/list?access_token="+ access_token + "&department_id=1&fetch_child=FETCH_CHILD";
                //result_final = HttpUtility.GetWebRequest(get_users_url);

                /*
                //尝试user id 转 open user id
                List<string> userid_list = new List<string>();
                userid_list.Add("WangYuPing");
                userid_list.Add("YangZhe");

                obj = new ExpandoObject();
                obj.userid_list = userid_list;

                datastr = JsonConvert.SerializeObject(obj);
                post_utl = "https://qyapi.weixin.qq.com/cgi-bin/batch/userid_to_openuserid?access_token=" + access_token;
                result_final  = HttpUtility.PostWebRequest(datastr, post_utl);
                */

                //尝试发消息
                obj = new ExpandoObject();
                obj.touser = "woBlo7DAAAkQ6uPpB3VNqZF7ZyW2Bfww|woBlo7DAAAvwRdGG12W8hH2KQjOa9nkg";
                obj.msgtype = "text";
                obj.agentid = 1000044;

                dynamic obj_text = new ExpandoObject();
                obj_text.content = "您正在使用同航云服务，此条消息仅用于检测企业微信客户端是否在线，您无需处理！\n " + DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");

                obj.text = obj_text;
                datastr = JsonConvert.SerializeObject(obj);

                string url = "https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=" + access_token+ "&debug=1";
                result_final = HttpUtility.PostWebRequest(datastr, url);
            }
            catch (Exception e)
            {
                result_final = e.ToString();
            }
            obj_result.result_final = result_final;

            return obj_result;

        }


        /// <summary>
        /// 获取所有字典表数据方法
        /// </summary>
        [HttpGet]
        public object TestProvider_corp()
        {
            dynamic obj_result = new ExpandoObject();
            string result_final = "success";
            try
            {
                dynamic obj = new ExpandoObject();
                obj.corpid = "ww38b340d2ae3bf8e9";
                obj.provider_secret = "SSqWeg5Z1XvZ7miTfnTN2xSWsiElfRpejSoiOor1vFg9Bh2Mwm2S5DKPWqjw548r";


                string datastr = JsonConvert.SerializeObject(obj);
                string post_utl = "https://qyapi.weixin.qq.com/cgi-bin/service/get_provider_token";
                string result_PROVIDER_ACCESS_TOKEN = HttpUtility.PostWebRequest(datastr, post_utl);
                JObject result_obj = (JObject)JsonConvert.DeserializeObject(result_PROVIDER_ACCESS_TOKEN);
                string provider_access_token = result_obj["provider_access_token"].ToString();

                obj = new ExpandoObject();
                obj.corpid = "wwbc028d2f212852fc";
                datastr = JsonConvert.SerializeObject(obj);

                string suite_url = "https://qyapi.weixin.qq.com/cgi-bin/service/corpid_to_opencorpid?provider_access_token="+ provider_access_token;
                string result_suite = HttpUtility.PostWebRequest(datastr, suite_url);
                result_obj = (JObject)JsonConvert.DeserializeObject(result_suite);
                string open_corpid = result_obj["open_corpid"].ToString();
                result_final = open_corpid;
            }
            catch (Exception e)
            {
                result_final = e.ToString();
            }
            obj_result.result_final = result_final;

            return obj_result;

        }

        /// <summary>
        /// 获取所有字典表数据方法
        /// </summary>
        [HttpGet]
        public object InitChart_department1()
        {
            string username = User.Identity.Name;
            var group = GroupHelper.RetrievesByUserName(username);
            string groupname = group.First<BootstrapGroup>().GroupName;

            dynamic obj = new ExpandoObject();

            var data = _staffRepository.GetAll();
            List<string> departments = new List<string>();   //存储已经授权使用的部门信息，unique
            foreach (Staff staff in data)
            {
                if (!string.IsNullOrEmpty(staff.company))
                {
                    if (staff.company.Contains(groupname))
                    {
                        if (staff.permission != null)
                        {
                            int permission = (int)staff.permission;
                            string department = staff.department;
                            if (permission == 1)
                            {
                                if (!departments.Contains(department))
                                    departments.Add(department);
                            }
                        }

                    }
                }

               
                
            }

            obj.count_department_used = departments.Count;
            obj.count_departments_all = _departmentRepository.GetAll().Where(t=>t.company.Contains(groupname)).Count();
            return obj;
        }

        /// <summary>
        /// 获取所有字典表数据方法
        /// </summary>
        [HttpGet]
        public object InitChart_department2()
        {
            string username = User.Identity.Name;
            var group = GroupHelper.RetrievesByUserName(username);
            string groupname = group.First<BootstrapGroup>().GroupName;

            dynamic obj = new ExpandoObject();

            var data = _staffRepository.GetAll();
            List<DepartmentUsed> departmentUsed = new List<DepartmentUsed>();   //存储已经授权使用的部门信息，unique
            foreach (Staff staff in data)
            {
                if (!string.IsNullOrEmpty(staff.company))
                {
                    if (staff.company.Contains(groupname))
                    {

                        if (staff.permission != null)
                        {
                            int permission = (int)staff.permission;
                            string department = staff.department;
                            if (permission == 1)
                            {
                                int index = departmentUsed.FindIndex((DepartmentUsed dU) => dU.name.Equals(department));
                                if (index >= 0)   //说明已经存在，数量增加1
                                    departmentUsed[index].value++;
                                else      //说明不存在，列表增加1
                                {
                                    DepartmentUsed departmentUsed1 = new DepartmentUsed()
                                    {
                                        name = department,
                                        value = 1
                                    };
                                    departmentUsed.Add(departmentUsed1);
                                }


                            }
                        }

                    }
                }

            }

            obj.departmentUsed = departmentUsed;
            return obj;
        }

        /// <summary>
        /// 获取所有字典表数据方法
        /// </summary>
        [HttpGet]
        public object InitChart_Login()
        {
            string username = User.Identity.Name;
            var group = GroupHelper.RetrievesByUserName(username);
            string groupname = group.First<BootstrapGroup>().GroupName;

            var staffs = _staffRepository.GetAll().Where(t=>t.company.Equals(groupname)).ToList();

            dynamic obj = new ExpandoObject();

            var data = _loginlogRepository.GetAll();
            List<int> logMonth = new List<int>();   //存储已经授权使用的部门信息，unique          
            for(int index=0;index<12;index++)
                logMonth.Add(0);           

            //获取当年的年份
            int year = DateTime.Now.Year;

            foreach (Login_log log in data)
            {
                string userid = log.userid;
                if (!string.IsNullOrEmpty(userid))
                {
                    if (staffs.FindIndex((Staff t) => t.userid.Equals(userid)) >= 0)
                    {
                        if (!string.IsNullOrEmpty(log.login_time))
                        {
                            DateTime dateTime = Convert.ToDateTime(log.login_time);
                            int year_temp = dateTime.Year;
                            if (year == year_temp)
                            {
                                int month = dateTime.Month;
                                switch (month)
                                {
                                    case 1:
                                        logMonth[0]++;
                                        break;
                                    case 2:
                                        logMonth[1]++;
                                        break;
                                    case 3:
                                        logMonth[2]++;
                                        break;
                                    case 4:
                                        logMonth[3]++;
                                        break;
                                    case 5:
                                        logMonth[4]++;
                                        break;
                                    case 6:
                                        logMonth[5]++;
                                        break;
                                    case 7:
                                        logMonth[6]++;
                                        break;
                                    case 8:
                                        logMonth[7]++;
                                        break;
                                    case 9:
                                        logMonth[8]++;
                                        break;
                                    case 10:
                                        logMonth[9]++;
                                        break;
                                    case 11:
                                        logMonth[10]++;
                                        break;
                                    case 12:
                                        logMonth[11]++;
                                        break;
                                }
                            }

                        }

                    }

                }
                

            }

            obj.logMonth = logMonth;
            return obj;
        }

    }

    public class DepartmentUsed {
        public string name { get; set; }
        public int value { get; set; }

    }

}
