using Bootstrap.Client.Infrastructure;
using Bootstrap.Client.Infrastructure.Repositories;
using Bootstrap.Client.Models;
using Bootstrap.Client.Util;
using Longbow.Cache;
using Longbow.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Bootstrap.Client.Tasks
{
    public class MessageSenderTaskExecutor : ITask
    {
        /// <summary>
        /// 通过角色 ID 获得授权前台应用数据缓存键值
        /// </summary>
        public const string SuiteAccessTokenDataKey = "SuiteAccessToken";
        public const string AccessTokenDataKey = "AccessToken";
        //public const string TestCacheTokenDataKey = "TestCache";

        public string TaskName { set; get; }

        /// <summary>
        /// 任务执行方法
        /// </summary>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        public Task Execute(CancellationToken cancellationToken)
        {

            IRepository<Company, int> _repository_company = ServiceLocator.repository_company;
            IRepository<Staff, int> _repository_staff = ServiceLocator.repository_staff;
            IRepository<ProviderInfo, int> _repository_provider = ServiceLocator.repository_provider;
            IRepository<Log, int> _repository_log = ServiceLocator.repository_log;

            //找到这个任务对应的参数
            try
            {
                /*
                string test_str = CacheManager.GetOrAdd(TestCacheTokenDataKey, key => TeshCache());
                Log log = new Log()
                {
                    content = string.Format("test_str:{0}, 时间：{1}", test_str, DateTime.Now.ToString())
                };
                _repository_log.Insert(log);

                */

                
                string userid = TaskName;
                Staff staff = _repository_staff.FirstOrDefault(a => a.userid == userid);
                Company company = _repository_company.FirstOrDefault(a => a.name == staff.company);
                ProviderInfo providerInfo = _repository_provider.FirstOrDefault(a => a.id == 1);

                Log log = new Log()
                {
                    content = string.Format("find user:{0}, find company {1}, 时间：{2}", staff.nickname, company.name, DateTime.Now.ToString())
                };
                _repository_log.Insert(log);

                //获取token
                //第一步，获取suite token
                string suite_access_token_str = CacheManager.GetOrAdd(SuiteAccessTokenDataKey, key => FectchSuiteAccessToken(providerInfo));

                log = new Log()
                {
                    content = string.Format("第一步，获取suite_access_token:{0}, 时间：{1}", suite_access_token_str, DateTime.Now.ToString())
                };
                _repository_log.Insert(log);

                JObject result_obj = (JObject)JsonConvert.DeserializeObject(suite_access_token_str);
                string suite_access_token = result_obj["suite_access_token"].ToString();


                //第二步，根据永久授权码获取企业token
                string access_token_str = CacheManager.GetOrAdd(string.Format("{0}-{1}", AccessTokenDataKey, company.corpid_open), key => FectchAccessToken(suite_access_token,company));

                log = new Log()
                {
                    content = string.Format("第二步，access_token:{0}，时间：{1}", access_token_str, DateTime.Now.ToString())
                };
                _repository_log.Insert(log);


                result_obj = (JObject)JsonConvert.DeserializeObject(access_token_str);
                string access_token = result_obj["access_token"].ToString();

                //第三步，尝试发消息
                dynamic obj = new ExpandoObject();
                obj.touser = staff.open_userid;
                obj.msgtype = "text";
                obj.agentid = company.agentid;

                dynamic obj_text = new ExpandoObject();
                obj_text.content = "您正在使用同航云服务，此条消息仅用于检测企业微信客户端是否在线，您无需处理！\n " + DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");

                obj.text = obj_text;
                string datastr = JsonConvert.SerializeObject(obj);

                string url = "https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=" + access_token;
                string result = HttpUtility.PostWebRequest(datastr, url);
                Console.WriteLine(result);

                log = new Log()
                {
                    content = string.Format("第三步，发消息:{0}，时间：{1}", result, DateTime.Now.ToString())
                };
                _repository_log.Insert(log);

                
            }
            catch (Exception ex)
            {
                Log log = new Log()
                {
                    content = string.Format("发送消息报错:{0}，时间：{1}", ex.ToString(), DateTime.Now.ToString())
                };
                _repository_log.Insert(log);

                Console.WriteLine(ex.ToString());
            }

            return Task.CompletedTask;

        }

        //public string TeshCache() {           
        //    return string.Format("运行到这，时间：{0}", DateTime.Now.ToString());
        //}

        /// <summary>
        /// 获取第三方应用的suite access token
        /// </summary>
        public string FectchSuiteAccessToken(ProviderInfo providerInfo)
        {
            dynamic obj = new ExpandoObject();
            obj.suite_id = providerInfo.SuiteID;
            obj.suite_secret = providerInfo.SuiteSecret;
            obj.suite_ticket = providerInfo.SuiteTicket;

            string datastr = JsonConvert.SerializeObject(obj);
            string post_utl = "https://qyapi.weixin.qq.com/cgi-bin/service/get_suite_token";

            return HttpUtility.PostWebRequest(datastr, post_utl);
        }

        /// <summary>
        /// 获取第三方应用的access token
        /// </summary>
        public string FectchAccessToken(string suite_access_token,Company company)
        {
            dynamic obj = new ExpandoObject();
            obj.auth_corpid = company.corpid_open;   //auth_corpid open
            obj.permanent_code = company.permanent_code;

            string datastr = JsonConvert.SerializeObject(obj);
            string post_utl = " https://qyapi.weixin.qq.com/cgi-bin/service/get_corp_token?suite_access_token=" + suite_access_token;
            return HttpUtility.PostWebRequest(datastr, post_utl);
        }
    }
}
