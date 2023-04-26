using Bootstrap.Client.DataAccess;
using Bootstrap.Client.DataAccess.Helper;
using Bootstrap.Client.Infrastructure.Repositories;
using Bootstrap.Client.Models;
using Bootstrap.Client.Query;
using Bootstrap.Client.Util;
using Bootstrap.Security;
using Longbow.Web.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Bootstrap.Client.Controllers.Api
{
    /// <summary>
    /// 字典表维护控制器
    /// </summary>
    [Route("api/[controller]/[action]/{id?}")]
    //[Authorize]
    [ApiController]
    public class ClientManagementController : Controller
    {
        private readonly IRepository<Staff, int> _staffRepository;
        private readonly IRepository<Company, int> _companyRepository;
        private readonly IRepository<Department, int> _departmentRepository;
        private readonly IRepository<ProviderInfo, int> _providerInfoRepository;
        public ClientManagementController(IRepository<Staff, int> staffRepository,
            IRepository<Company, int> companyRepository,
            IRepository<Department, int> departmentRepository,
            IRepository<ProviderInfo, int> providerInfoRepository)
        {
            _staffRepository = staffRepository;
            _companyRepository = companyRepository;
            _departmentRepository = departmentRepository;
            _providerInfoRepository = providerInfoRepository;
        }

        #region 员工管理


        
        /// <summary>
        /// 获取所有字典表数据方法
        /// </summary>
        [HttpGet]
        public object GetDepartment()
        {
            dynamic obj = new ExpandoObject();
            string username = User.Identity.Name;
            var group = GroupHelper.RetrievesByUserName(username);
            obj.name = group.First<BootstrapGroup>().GroupName;
            return obj;

        }
        /// <summary>
        /// 获取所有字典表数据方法
        /// </summary>
        [HttpGet]
        public object InitStaffList([FromQuery] QueryStaffOption value)
        {
            //only show the staff belonging to the same company
            string username = User.Identity.Name;
            var group = GroupHelper.RetrievesByUserName(username);
            string groupname= group.First<BootstrapGroup>().GroupName;
            value.company = groupname;

            string Order = "";
            string Sort = "";
            if (string.IsNullOrEmpty(value.Order)) Order = "asc";
            if (string.IsNullOrEmpty(value.Sort)) Sort = "userid";

            var ds = _staffRepository.GetAll().ToList();
            List<Staff> stafflist = new List<Staff>();
            foreach (var staff in ds)
            {
                int id = staff.id;
                string  openid = staff.openid;
                string nickname = staff.nickname;
                string province = staff.province;
                string city = staff.city;
                string country = staff.country;
                string headimgurl = staff.headimgurl;
                string privilege = staff.privilege;
                string unionid = staff.unionid;
                string company = staff.company;
                string role = staff.role;
                string userid = staff.userid;
                int permission = (int)staff.permission;
                string department = staff.department;
                string sex = staff.sex;
                string open_userid = staff.open_userid;

                Department department1_query = null;

                string name = "";
                string name_en = "";
                string department_leader = "";
                if (!string.IsNullOrEmpty(department))
                    department1_query = _departmentRepository.FirstOrDefault(a => a.name.Contains(department));

                if (department1_query != null)
                {
                    name = department1_query.name;
                    name_en = department1_query.name_en;
                    department_leader = department1_query.department_leader;
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
                if (!string.IsNullOrEmpty(value.sex))
                {
                    if (string.IsNullOrEmpty(sex))
                        continue;
                    if (!sex.Contains(value.sex))
                        continue;
                }
                if (!string.IsNullOrEmpty(value.province))
                {
                    if (string.IsNullOrEmpty(province))
                        continue;
                    if (!province.Contains(value.province))
                        continue;
                }
                if (!string.IsNullOrEmpty(value.city))
                {
                    if (string.IsNullOrEmpty(city))
                        continue;
                    if (!city.Contains(value.city))
                        continue;
                }
                if (!string.IsNullOrEmpty(value.department))
                {
                    if (string.IsNullOrEmpty(department))
                        continue;
                    if (!department.Contains(value.department))
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
                    if (!string.IsNullOrEmpty(sex))
                        if (sex.Contains(value.Search))
                            exist_flag = true;
                    if (!string.IsNullOrEmpty(province))
                        if (province.Contains(value.Search))
                            exist_flag = true;
                    if (!string.IsNullOrEmpty(city))
                        if (city.Contains(value.Search))
                            exist_flag = true;
                    if (!string.IsNullOrEmpty(company))
                        if (company.Contains(value.Search))
                            exist_flag = true;
                    if (!string.IsNullOrEmpty(department))
                        if (department.Contains(value.Search))
                            exist_flag = true;

                    if (exist_flag == false)
                        continue;
                }


                Staff detailed_Staff_temp = new Staff()
                {
                    id = id,
                    openid = openid,
                    nickname = nickname,
                    province = province,
                    city = city,
                    country = country,
                    headimgurl = headimgurl,
                    privilege = privilege,
                    unionid = unionid,
                    company = company,
                    role = role,
                    userid = userid,
                    department = name,
                    permission=permission,
                    sex = sex,
                    open_userid= open_userid

                };

                stafflist.Add(detailed_Staff_temp);

            }

            QueryData<Staff> staffs = new QueryData<Staff>();
            staffs.total = stafflist.Count();
            staffs.rows = stafflist;
            return staffs;


        }


        /// <summary>
        /// 新建设备
        /// </summary>
        [HttpPost]
        public object Create(Staff staff)
        {
            dynamic obj = new ExpandoObject();
            try
            {
                Staff newStaff = new Staff
                {
                    userid = staff.userid,
                    nickname = staff.nickname,
                    sex = staff.sex,
                    province = staff.province,
                    city = staff.city,
                    country = staff.country,
                    headimgurl = staff.headimgurl,
                    privilege = staff.privilege,
                    unionid = staff.unionid,
                    permission=staff.permission,
                    open_userid = staff.open_userid

                };

                _staffRepository.Insert(newStaff);
              
                obj.status = "success";
                obj.staff_id = newStaff.id;


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
        public object Details(int Id)
        {
            dynamic obj = new ExpandoObject();

            try
            {
                Staff staff = _staffRepository.Single(a => a.id == Id);

                obj.status = "success";
                obj.staff = staff;

            }
            catch (Exception ex)
            {
                obj.status = "failed";
                obj.erro = ex.ToString();
            }
            return obj;
        }


        /// <summary>
        /// 删除调用
        /// </summary>
        /// <param name="value"></param>
        [HttpPost]
        public bool Delete(IEnumerable<int> value)
        {
            foreach (int id in value)
            {
                var device = _staffRepository.Single(a => a.id == id);
                _staffRepository.Delete(a => a.id == id);
            }
            return true;
        }

        /// <summary>
        /// 删除调用
        /// </summary>
        /// <param name="id"></param>
        [HttpGet]
        public bool Delete_single(int id)
        {
            _staffRepository.Delete(a => a.id == id);
            return true;
        }


        /// <summary>
        /// 设备详情-初始化子设备列表
        /// </summary>
        [HttpPost]
        public object StaffEdit(Staff staff)
        {
            dynamic obj = new ExpandoObject();
            try
            {
                Staff s = staff;

                //从数据库中查询正在编辑的学生信息
                Staff exist_staff= _staffRepository.Single(a => a.id == staff.id);
                //用模型对象中的数据更新student对象
                exist_staff.id = staff.id;
                exist_staff.openid = staff.openid;
                exist_staff.nickname = staff.nickname;
                exist_staff.sex = staff.sex;
                exist_staff.province = staff.province;
                exist_staff.city = staff.city;
                exist_staff.country = staff.country;
                exist_staff.headimgurl = staff.headimgurl;
                exist_staff.privilege = staff.privilege;
                exist_staff.unionid = staff.unionid;
                exist_staff.userid = staff.userid;
                exist_staff.permission = staff.permission;
                exist_staff.open_userid = staff.open_userid;

                //调用仓储服务中的Update方法，保存studnet对象中的数据，更新数据库表中的信息。
                Staff updatedstaff = _staffRepository.Update(exist_staff);
             
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
        ///一键授权
        /// </summary>
        /// <param name="value"></param>
        [HttpPost]
        public object AuthOnetime(IEnumerable<int> value) {
            foreach (int id in value)
            {
                Staff staff = _staffRepository.Single(a => a.id == id);
                staff.permission = 1;
                _staffRepository.Update(staff);
            }
            return true;

        }

        /// <summary>
        /// 查询是否授权
        /// </summary>
        [HttpGet]
        public object CheckAuth()
        {
            //only show the staff belonging to the same company
            string username = User.Identity.Name;
            var group = GroupHelper.RetrievesByUserName(username);
            string groupname = group.First<BootstrapGroup>().GroupName;

            //获取到对应的corpid和corpsecret
            Company company = _companyRepository.FirstOrDefault(a => a.name == groupname);
            string open_corpid = company.corpid_open;

            if (string.IsNullOrEmpty(open_corpid))
                return false;
            else
                return true;
        }

        /// <summary>
        /// 更新通讯录调用
        /// </summary>
        [HttpGet]
        public object SynchContact([FromQuery] QueryStaffSyncOption value)
        {
            //only show the staff belonging to the same company
            string username = User.Identity.Name;
            var group = GroupHelper.RetrievesByUserName(username);
            string groupname = group.First<BootstrapGroup>().GroupName;

            //获取到对应的corpid和corpsecret
            Company company = _companyRepository.FirstOrDefault(a => a.name == groupname);
            string corpid = company.corpid;
            string corpsecret = company.corpsecret;

            //现获取access_token
            string url = "https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=" + corpid + "&corpsecret=" + corpsecret;
            string access_token_result = HttpUtility.GetWebRequest(url);
            JObject result_obj = (JObject)JsonConvert.DeserializeObject(access_token_result);
            string access_token1 = result_obj["access_token"].ToString();

            //string url_test = "https://qyapi.weixin.qq.com/cgi-bin/batch/userid_to_openuserid?access_token=" + access_token1+ "&debug=1";

            //List<string> userid_list = new List<string>();
            //userid_list.Add("XuZhePu");
            //userid_list.Add("QuMiao");
            //dynamic obj = new ExpandoObject();
            //obj.userid_list = userid_list;
            //string datastr = JsonConvert.SerializeObject(obj);


            //string result_test= PostWebRequest(datastr, url_test);


            //查询有多少个部门
            List<Staff> userlist_syn = new List<Staff>();

            var departmentList = _departmentRepository.GetAll().Where(a=>a.company== groupname);

            List<string> name_list = new List<string>();

            foreach (var department in departmentList)
            {
                string department_id = department.department_id;
                string department_name = department.name;

                if (!string.IsNullOrEmpty(value.Search))
                {
                    if (!string.IsNullOrEmpty(department_name))
                        if (!department_name.Contains(value.Search))
                            continue;
                }



                url = "https://qyapi.weixin.qq.com/cgi-bin/user/list?access_token=" + access_token1 + "&department_id="+department_id+"&fetch_child=FETCH_CHILD";
                string result = HttpUtility.GetWebRequest(url);
                result_obj = (JObject)JsonConvert.DeserializeObject(result);
                var userlist = result_obj["userlist"];

                foreach (var user in userlist)
                {

                    string headimgurl = user["avatar"].ToString();
                    string nickname = user["name"].ToString();
                    string role = user["position"].ToString();
                    string sex = user["gender"].ToString();
                    string userid = user["userid"].ToString();
                    string departmentTemp = department_name;               
                   
                    name_list.Add(userid);
                  
                    Staff userSyn = new Staff
                    {

                        headimgurl = headimgurl,
                        nickname = nickname,
                        userid = userid,
                        role = role,
                        sex = sex,
                        department = departmentTemp

                    };

                    userlist_syn.Add(userSyn);

                }

            }

            //接下来，找到对应的open user id
            //第一步获取suite access token
            ProviderInfo providerInfo = _providerInfoRepository.FirstOrDefault(a => a.id == 1);
            dynamic obj = new ExpandoObject();
            obj.suite_id = providerInfo.SuiteID;
            obj.suite_secret = providerInfo.SuiteSecret;
            obj.suite_ticket = providerInfo.SuiteTicket;

            string datastr = JsonConvert.SerializeObject(obj);
            string post_utl = "https://qyapi.weixin.qq.com/cgi-bin/service/get_suite_token";
            string result_PROVIDER_ACCESS_TOKEN = HttpUtility.PostWebRequest(datastr, post_utl);
            result_obj = (JObject)JsonConvert.DeserializeObject(result_PROVIDER_ACCESS_TOKEN);
            string suite_access_token = result_obj["suite_access_token"].ToString();

            //第二步，获取access token
            obj = new ExpandoObject();
            obj.auth_corpid = company.corpid_open;   //auth_corpid open
            obj.permanent_code = company.permanent_code;

            datastr = JsonConvert.SerializeObject(obj);
            post_utl = " https://qyapi.weixin.qq.com/cgi-bin/service/get_corp_token?suite_access_token=" + suite_access_token;
            result_PROVIDER_ACCESS_TOKEN = HttpUtility.PostWebRequest(datastr, post_utl);
            result_obj = (JObject)JsonConvert.DeserializeObject(result_PROVIDER_ACCESS_TOKEN);
            string access_token = result_obj["access_token"].ToString();


            //第三步，将user id转换成open user id

            obj = new ExpandoObject();
            obj.userid_list = name_list;

            datastr = JsonConvert.SerializeObject(obj);
            post_utl = "https://qyapi.weixin.qq.com/cgi-bin/batch/userid_to_openuserid?access_token=" + access_token;
            string result_open_userids = HttpUtility.PostWebRequest(datastr, post_utl);
            result_obj = (JObject)JsonConvert.DeserializeObject(result_open_userids);
            for (int i = 0; i < result_obj["open_userid_list"].Count(); i++)
            {
                string userid_temp = result_obj["open_userid_list"][i]["userid"].ToString();
                string open_userid_temp= result_obj["open_userid_list"][i]["open_userid"].ToString();
                userlist_syn.FirstOrDefault(a => a.userid == userid_temp).open_userid= open_userid_temp;

            }

            QueryData<Staff> logs = new QueryData<Staff>();
            logs.rows = userlist_syn;
            return logs;
        }



        /// <summary>
        /// 更新通讯录
        /// </summary>
        [HttpPost]
        public object Syn_confirmed_list(IEnumerable<Staff> users)
        {
            //only show the staff belonging to the same company
            string username = User.Identity.Name;
            var group = GroupHelper.RetrievesByUserName(username);
            string groupname = group.First<BootstrapGroup>().GroupName;

            dynamic obj = new ExpandoObject();
            try
            {

                foreach (var user in users)
                {
                    string openid = user.openid;
                    string userid = user.userid;
                    string nickname = user.nickname;
                    string sex = user.sex;
                    string province = user.province;
                    string city = user.city;
                    string country = user.country;
                    string department = user.department;
                    string headimgurl = user.headimgurl;
                    string privilege = user.privilege;
                    string unionid = user.unionid;
                    string company = groupname;
                    string role = user.role;
                    string open_userid = user.open_userid;
                    int permission = 1;

                    Staff staff_new = new Staff
                    {
                        userid = userid,
                        openid = openid,
                        nickname = nickname,
                        sex = sex,
                        province = province,
                        city = city,
                        country = country,
                        headimgurl = headimgurl,
                        privilege = privilege,
                        unionid = unionid,
                        company = company,
                        department = department,
                        permission= permission,
                        open_userid= open_userid,
                        role = role
                    };
                    //判断是否存在该用户，是则更新，否则添加
                    var staff_exist = _staffRepository.FirstOrDefault(a => a.userid == staff_new.userid&&a.company==staff_new.company);
                    if (staff_exist == null)
                    {

                        _staffRepository.Insert(staff_new);
                    }
                    else
                    {
                        staff_exist.userid = staff_new.userid;
                        staff_exist.openid = staff_new.openid;
                        staff_exist.nickname = staff_new.nickname;
                        staff_exist.sex = staff_new.sex;
                        staff_exist.province = staff_new.province;
                        staff_exist.city = staff_new.city;
                        staff_exist.country = staff_new.country;
                        staff_exist.headimgurl = staff_new.headimgurl;
                        staff_exist.privilege = staff_new.privilege;
                        staff_exist.unionid = staff_new.unionid;
                        staff_exist.company = staff_new.company;
                        staff_exist.department = staff_new.department;
                        staff_exist.role = staff_new.role;
                        staff_exist.open_userid = staff_new.open_userid;
                        //staff_exist.permission = staff_new.permission;   //不改变现有权限配置

                        _staffRepository.Update(staff_exist);

                    }

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

        #endregion


        #region 公司管理
        /// <summary>
        /// 界面权限管理
        /// </summary>
        [HttpGet]    
         public object InitCompanyView()
        {
            //only show the staff belonging to the same company
            string username = User.Identity.Name;
            var group = GroupHelper.RetrievesByUserName(username);
            string groupname = group.First<BootstrapGroup>().GroupName;
            if (groupname.Equals("Admin"))      //如果登陆用户是Admin，返回true
                return true;
            else
                return false;
        }
        /// <summary>
        /// 获取所有字典表数据方法
        /// </summary>
        [HttpGet]
        public object InitCompanyList([FromQuery] QueryCompanyOption value)
        {
            //only show the staff belonging to the same company
            string username = User.Identity.Name;
            var group = GroupHelper.RetrievesByUserName(username);
            string groupname = group.First<BootstrapGroup>().GroupName;
            value.name = groupname;

            string Order = "";
            string Sort = "";
            if (string.IsNullOrEmpty(value.Order)) Order = "asc";
            if (string.IsNullOrEmpty(value.Sort)) Sort = "name";

            var data = _companyRepository.GetAll();

            if (!string.IsNullOrEmpty(value.name))
            {
                if(!value.name.Equals("Admin"))            //如果是超级管理员账户，可以看到所有公司
                    data = data.Where(t => t.name.Contains(value.name, StringComparison.OrdinalIgnoreCase));
            }
            if (!string.IsNullOrEmpty(value.address))
            {
                data = data.Where(t => t.address.Contains(value.address, StringComparison.OrdinalIgnoreCase));
            }

            if (!string.IsNullOrEmpty(value.company_code))
            {
                data = data.Where(t => t.company_code.Contains(value.company_code, StringComparison.OrdinalIgnoreCase));
            }

            if (!string.IsNullOrEmpty(value.Search))
            {
                // 处理快捷搜索文本条件
                data = data.Where(t => t.name.Contains(value.Search, StringComparison.OrdinalIgnoreCase)
                || t.address.Contains(value.Search, StringComparison.OrdinalIgnoreCase)
                || t.company_code.Contains(value.Search, StringComparison.OrdinalIgnoreCase));
            }

            var ret = new QueryData<Company>();
            ret.total = data.Count();
            // 通过option.Sort属性判断对那列进行排序
            switch (Sort)
            {
                case "name":
                    data = Order == "asc" ? data.OrderBy(t => t.name) : data.OrderByDescending(t => t.name);
                    break;
                case "address":
                    data = Order == "asc" ? data.OrderBy(t => t.address) : data.OrderByDescending(t => t.address);
                    break;
                case "company_code":
                    data = Order == "asc" ? data.OrderBy(t => t.company_code) : data.OrderByDescending(t => t.company_code);
                    break;
            }
            ret.rows = data.Skip(value.Offset).Take(value.Limit);

            return ret;

            
        }


        /// <summary>
        /// 新建设备
        /// </summary>
        [HttpPost]
        public object CompanyCreate(Company company)
        {
            dynamic obj = new ExpandoObject();
            try
            {
                Company newCompany = new Company
                {
                    name = company.name,
                    company_code = company.company_code,
                    address = company.address,
                    corpid = company.corpid,
                    corpsecret = company.corpsecret,
                    agentid= company.agentid,
                    agent_secrete = company.agent_secrete,
                    permanent_code=company.permanent_code,
                    corpid_open=company.corpid_open

                };

                _companyRepository.Insert(newCompany);

                obj.status = "success";
                obj.company_id = newCompany.id;


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
        public object CompanyDetails(int Id)
        {
            dynamic obj = new ExpandoObject();

            try
            {
                Company company = _companyRepository.Single(a => a.id == Id);

                obj.status = "success";
                obj.company = company;

            }
            catch (Exception ex)
            {
                obj.status = "failed";
                obj.erro = ex.ToString();
            }
            return obj;
        }


        /// <summary>
        /// 删除调用
        /// </summary>
        /// <param name="value"></param>
        [HttpPost]
        public bool CompanyDelete(IEnumerable<int> value)
        {
            foreach (int id in value)
            {
                var company = _companyRepository.Single(a => a.id == id);
                _companyRepository.Delete(a => a.id == id);
            }
            return true;
        }

        /// <summary>
        /// 删除调用
        /// </summary>
        /// <param name="id"></param>
        [HttpGet]
        public bool CompanyDelete_single(int id)
        {
            _companyRepository.Delete(a => a.id == id);
            return true;
        }


        /// <summary>
        /// 设备详情-初始化子设备列表
        /// </summary>
        [HttpPost]
        public object CompanyEdit(Company company)
        {
            dynamic obj = new ExpandoObject();
            try
            {
                //从数据库中查询正在编辑的学生信息
                Company exist_company = _companyRepository.Single(a => a.id == company.id);
                //用模型对象中的数据更新student对象
                exist_company.id = company.id;
                exist_company.name = company.name;
                exist_company.company_code = company.company_code;
                exist_company.address = company.address;
                exist_company.corpid = company.corpid;
                exist_company.corpsecret = company.corpsecret;
                exist_company.agentid = company.agentid;
                exist_company.agent_secrete = company.agent_secrete;
                exist_company.permanent_code = company.permanent_code;
                exist_company.corpid_open = company.corpid_open;


                //调用仓储服务中的Update方法，保存studnet对象中的数据，更新数据库表中的信息。
                Company updatedcompany = _companyRepository.Update(exist_company);

                obj.status = "success";


            }
            catch (Exception ex)
            {
                obj.status = "failed";
                obj.erro = ex.ToString();
            }
            return obj;



        }
        #endregion

        #region 部门管理
        /// <summary>
        /// 获取所有字典表数据方法
        /// </summary>
        [HttpGet]
        public object InitDepartmentList([FromQuery] QueryDepartmentOption value)
        {
            //only show the staff belonging to the same company
            string username = User.Identity.Name;
            var group = GroupHelper.RetrievesByUserName(username);
            string groupname = group.First<BootstrapGroup>().GroupName;
            value.company = groupname;

            string Order = "";
            string Sort = "";
            if (string.IsNullOrEmpty(value.Order)) Order = "asc";
            if (string.IsNullOrEmpty(value.Sort)) Sort = "name";

            var data = _departmentRepository.GetAll();

            if (!string.IsNullOrEmpty(value.name))
            {
                data = data.Where(t => t.name.Contains(value.name, StringComparison.OrdinalIgnoreCase));
            }
            if (!string.IsNullOrEmpty(value.name_en))
            {
                data = data.Where(t => t.name_en.Contains(value.name_en, StringComparison.OrdinalIgnoreCase));
            }

            if (!string.IsNullOrEmpty(value.department_leader))
            {
                data = data.Where(t => t.department_leader.Contains(value.department_leader, StringComparison.OrdinalIgnoreCase));
            }

            if (!string.IsNullOrEmpty(value.company))
            {
                data = data.Where(t => t.company.Contains(value.company, StringComparison.OrdinalIgnoreCase));
            }

            if (!string.IsNullOrEmpty(value.Search))
            {
                // 处理快捷搜索文本条件
                data = data.Where(t => t.name.Contains(value.Search, StringComparison.OrdinalIgnoreCase)
                || t.name_en.Contains(value.Search, StringComparison.OrdinalIgnoreCase)
                || t.department_leader.Contains(value.Search, StringComparison.OrdinalIgnoreCase));
            }

            var ret = new QueryData<Department>();
            ret.total = data.Count();
            // 通过option.Sort属性判断对那列进行排序
            switch (Sort)
            {
                case "name":
                    data = Order == "asc" ? data.OrderBy(t => t.name) : data.OrderByDescending(t => t.name);
                    break;
                case "name_en":
                    data = Order == "asc" ? data.OrderBy(t => t.name_en) : data.OrderByDescending(t => t.name_en);
                    break;
                case "department_leader":
                    data = Order == "asc" ? data.OrderBy(t => t.department_leader) : data.OrderByDescending(t => t.department_leader);
                    break;
            }
            ret.rows = data.Skip(value.Offset).Take(value.Limit);

            return ret;


        }


        /// <summary>
        /// 新建设备
        /// </summary>
        [HttpPost]
        public object DepartmentCreate(Department department)
        {
            //only show the staff belonging to the same company
            string username = User.Identity.Name;
            var group = GroupHelper.RetrievesByUserName(username);
            string groupname = group.First<BootstrapGroup>().GroupName;

            dynamic obj = new ExpandoObject();
            try
            {
                Department newDepartment = new Department
                {
                    name = department.name,
                    name_en = department.name_en,
                    department_leader = department.department_leader,
                    company= groupname,
                    permission= department.permission

                };

                _departmentRepository.Insert(newDepartment);

                obj.status = "success";
                obj.department_id = newDepartment.id;


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
        public object DepartmentDetails(int Id)
        {
            dynamic obj = new ExpandoObject();

            try
            {
                Department department = _departmentRepository.FirstOrDefault(a => a.id == Id);

                obj.status = "success";
                obj.department = department;

            }
            catch (Exception ex)
            {
                obj.status = "failed";
                obj.erro = ex.ToString();
            }
            return obj;
        }


        /// <summary>
        /// 删除调用
        /// </summary>
        /// <param name="value"></param>
        [HttpPost]
        public bool DepartmentDelete(IEnumerable<int> value)
        {
            foreach (int id in value)
            {
                //var company = _departmentRepository.Single(a => a.id == id);
                _departmentRepository.Delete(a => a.id == id);
            }
            return true;
        }

        /// <summary>
        /// 删除调用
        /// </summary>
        /// <param name="id"></param>
        [HttpGet]
        public bool DepartmentDelete_single(int id)
        {
            _departmentRepository.Delete(a => a.id == id);
            return true;
        }


        /// <summary>
        /// 设备详情-初始化子设备列表
        /// </summary>
        [HttpPost]
        public object DepartmentEdit(Department department)
        {
            //only show the staff belonging to the same company
            string username = User.Identity.Name;
            var group = GroupHelper.RetrievesByUserName(username);
            string groupname = group.First<BootstrapGroup>().GroupName;

            dynamic obj = new ExpandoObject();
            try
            {
               

                //从数据库中查询正在编辑的学生信息
                Department exist_department = _departmentRepository.FirstOrDefault(a => a.id == department.id);
                //用模型对象中的数据更新student对象
                exist_department.id = department.id;
                exist_department.name = department.name;
                exist_department.name_en = department.name_en;
                exist_department.department_leader = department.department_leader;
                exist_department.permission = department.permission;


                //调用仓储服务中的Update方法，保存studnet对象中的数据，更新数据库表中的信息。
                Department updateddepartment = _departmentRepository.Update(exist_department);

                //更改staff
                var staffs = _staffRepository.GetAllList();
                foreach (Staff staff in staffs)
                {
                    if (staff.company.Equals(groupname)&&staff.department.Equals(exist_department.name))
                    {
                        //从数据库中查询正在编辑的学生信息
                        Staff exist_staff = staff;
                        //用模型对象中的数据更新student对象
                        exist_staff.permission = department.permission;
                        Staff updatedstaff=_staffRepository.Update(exist_staff);

                    }


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
        /// 更新通讯录调用
        /// </summary>
        [HttpGet]
        public object SynchContactDepartment()
        {
            //only show the staff belonging to the same company
            string username = User.Identity.Name;
            var group = GroupHelper.RetrievesByUserName(username);
            string groupname = group.First<BootstrapGroup>().GroupName;

            //获取到对应的corpid和corpsecret
            Company company = _companyRepository.FirstOrDefault(a => a.name == groupname);
            string corpid = company.corpid;
            string corpsecret = company.corpsecret;

            //现获取access_token
            string url = "https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=" + corpid + "&corpsecret=" + corpsecret;
            string access_token_result = HttpUtility.GetWebRequest(url);
            JObject result_obj = (JObject)JsonConvert.DeserializeObject(access_token_result);
            string access_token1 = result_obj["access_token"].ToString();


            url = "https://qyapi.weixin.qq.com/cgi-bin/department/list?access_token=" + access_token1 ;
            string result = HttpUtility.GetWebRequest(url);
            result_obj = (JObject)JsonConvert.DeserializeObject(result);
            var departmentlist = result_obj["department"];
            List<Department> departmentlist_syn = new List<Department>();
            foreach (var department in departmentlist)
            {

                int id = int.Parse(department["id"].ToString());
                string name = department["name"].ToString();
                //string name_en = department["name_en"].ToString();
                string department_leader = department["department_leader"].ToString();
                string department_id = department["id"].ToString();


                Department departmentSyn = new Department
                {

                    id = id,
                    name = name,
                    //name_en = name_en,
                    department_leader = department_leader,
                    department_id = department_id


                };

                departmentlist_syn.Add(departmentSyn);

            }

            QueryData<Department> logs = new QueryData<Department>();
            logs.rows = departmentlist_syn;
            return logs;
        }



        /// <summary>
        /// 更新通讯录
        /// </summary>
        [HttpPost]
        public object Syn_confirmed_list_department(IEnumerable<Department> departments)
        {
            //only show the staff belonging to the same company
            string username = User.Identity.Name;
            var group = GroupHelper.RetrievesByUserName(username);
            string groupname = group.First<BootstrapGroup>().GroupName;

            dynamic obj = new ExpandoObject();
            try
            {

                foreach (var department in departments)
                {
                    string department_id = department.department_id;
                    string name = department.name;
                    string name_en = department.name_en;
                    string department_leader = department.department_leader;
                    string company = groupname;
                    int permission = 1;


                    Department department_new = new Department
                    {
                        name = name,
                        name_en = name_en,
                        department_leader = department_leader,
                        department_id = department_id,
                        company=company,
                        permission=permission
                    };
                    //判断是否存在该用户，是则更新，否则添加
                    var department_exist = _departmentRepository.FirstOrDefault(a => a.name==department_new.name&&a.company==department_new.company);
                    if (department_exist == null)
                    {

                        _departmentRepository.Insert(department_new);
                    }
                    else
                    {

                        department_exist.name = department_new.name;
                        department_exist.name_en = department_new.name_en;
                        department_exist.department_leader = department_new.department_leader;
                        department_exist.department_id = department_new.department_id;
                        department_exist.company = department_new.company;

                        _departmentRepository.Update(department_exist);

                    }

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

        #endregion


        //public static string GetWebRequest(string URL)
        //{
        //    HttpWebRequest webRequest = (HttpWebRequest)WebRequest.Create(new Uri(URL));
        //    HttpWebResponse response = (HttpWebResponse)webRequest.GetResponse();
        //    System.IO.StreamReader myreader = new System.IO.StreamReader(response.GetResponseStream(), Encoding.UTF8);
        //    string responseText = myreader.ReadToEnd();
        //    myreader.Close();
        //    return responseText;
        //}

        //public static string PostWebRequest(string Data, string URL)
        //{
        //    CookieContainer cc = new CookieContainer();
        //    string postData = Data;
        //    byte[] byteArray = Encoding.UTF8.GetBytes(postData); // 转化
        //    HttpWebRequest webRequest2 = (HttpWebRequest)WebRequest.Create(new Uri(URL));
        //    webRequest2.CookieContainer = cc;
        //    webRequest2.Method = "POST";
        //    webRequest2.ContentType = "application/json; charset=utf-8";
        //    webRequest2.ContentLength = byteArray.Length;
        //    Stream newStream = webRequest2.GetRequestStream();
        //    newStream.Write(byteArray, 0, byteArray.Length);    //写入参数
        //    newStream.Close();
        //    HttpWebResponse response2 = (HttpWebResponse)webRequest2.GetResponse();
        //    StreamReader sr2 = new StreamReader(response2.GetResponseStream(), Encoding.UTF8);
        //    string text2 = sr2.ReadToEnd();
        //    if (text2 != null && text2.Length > 0)
        //    {
        //        return text2;
        //    }
        //    return "";
        //}


    }

}
