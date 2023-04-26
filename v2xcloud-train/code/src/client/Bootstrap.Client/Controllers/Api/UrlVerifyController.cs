using System;
using System.Collections.Generic;
using System.Dynamic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Linq;
using Bootstrap.Client.DataAccess.Helper;
using Bootstrap.Client.Infrastructure.Repositories;
using Bootstrap.Client.Models;
using Bootstrap.Client.Util;
using Bootstrap.Security;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Bootstrap.Client.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class UrlVerifyController : Controller
    {

        private readonly IRepository<Log, int> _logRepository;
        private readonly IRepository<Company, int> _companyRepository;
        private readonly IRepository<ProviderInfo, int> _providerInfoRepository;

        //使用构造函数注入的方式注入IRepository
        public UrlVerifyController(IRepository<Log, int> logRepository,
            IRepository<Company, int> companyRepository,
            IRepository<ProviderInfo, int> providerInfoRepository)
        {
            _logRepository = logRepository;
            _companyRepository = companyRepository;
            _providerInfoRepository = providerInfoRepository;
        }

        /// <summary>
        /// Get方法
        /// </summary>
        [HttpGet]
        public object Get()
        {
            Log log = new Log()
            {

                content = string.Format("Get:{0}", DateTime.Now.ToString())
            };
            _logRepository.Insert(log);

            log = new Log()
            {

                content = string.Format("path:{0}", HttpContext.Request.Path)
            };
            _logRepository.Insert(log);

            ProviderInfo providerInfo = _providerInfoRepository.FirstOrDefault(a => a.id == 1);

            string sToken = providerInfo.SuiteToken;
            string sCorpID = providerInfo.CorpID;//    get用corp_id才能成功
            string sEncodingAESKey = providerInfo.SuiteEncodingAESKey;

            WXBizMsgCrypt wxcpt = new WXBizMsgCrypt(sToken, sEncodingAESKey, sCorpID);
            // string sVerifyMsgSig = HttpUtils.ParseUrl("msg_signature");
            string sVerifyMsgSig = HttpContext.Request.Query["msg_signature"].ToString();
            // string sVerifyTimeStamp = HttpUtils.ParseUrl("timestamp");
            string sVerifyTimeStamp = HttpContext.Request.Query["timestamp"].ToString();
            // string sVerifyNonce = HttpUtils.ParseUrl("nonce");
            string sVerifyNonce = HttpContext.Request.Query["nonce"].ToString();
            // string sVerifyEchoStr = HttpUtils.ParseUrl("echostr");
            string sVerifyEchoStr = HttpContext.Request.Query["echostr"].ToString();


            log = new Log()
            {

                content = string.Format("echostr:{0}", sVerifyEchoStr)
            };
            _logRepository.Insert(log);


            int ret = 0;
            string sEchoStr = "";
            ret = wxcpt.VerifyURL(sVerifyMsgSig, sVerifyTimeStamp, sVerifyNonce, sVerifyEchoStr, ref sEchoStr);
            if (ret != 0)
            {
                return "ERR: VerifyURL fail, ret: " + ret;
            }
            return sEchoStr;
        }

        /// <summary>
        /// Post方法
        /// </summary>
        [HttpPost]
        public object Post()
        {
            Log log = new Log()
            {

                content = string.Format("Post:{0}", DateTime.Now.ToString())
            };
            _logRepository.Insert(log);

            ProviderInfo providerInfo = _providerInfoRepository.FirstOrDefault(a => a.id == 1);

            string sToken = providerInfo.SuiteToken;
            string sCorpID = providerInfo.SuiteID; //       post用suite_id才能成功
            string sEncodingAESKey = providerInfo.SuiteEncodingAESKey;
            WXBizMsgCrypt wxcpt = new WXBizMsgCrypt(sToken, sEncodingAESKey, sCorpID);

            // string sReqMsgSig = HttpUtils.ParseUrl("msg_signature");
            string sReqMsgSig = HttpContext.Request.Query["msg_signature"].ToString();
            // string sReqTimeStamp = HttpUtils.ParseUrl("timestamp");
            string sReqTimeStamp = HttpContext.Request.Query["timestamp"].ToString();
            // string sReqNonce = HttpUtils.ParseUrl("nonce");
            string sReqNonce = HttpContext.Request.Query["nonce"].ToString();

            // Post请求的密文数据
            // string sReqData = HttpUtils.PostData();
            var reader = new StreamReader(Request.Body);
            var body = reader.ReadToEndAsync().Result;
            string sReqData = body;
            string sMsg = "";  // 解析之后的明文          

            int ret = wxcpt.DecryptMsg(sReqMsgSig, sReqTimeStamp, sReqNonce, sReqData, ref sMsg);

            log = new Log()
            {

                content = string.Format("msg_signature:{0}, timestamp:{1}, nonce:{2}, sReqData:{3}, ret:{4}, sMsg: {5}", sReqMsgSig, sReqTimeStamp, sReqNonce, sReqData, ret, sMsg)
            };
            _logRepository.Insert(log);

            log = new Log()
            {

                content = string.Format("return:ret{0}", ret)
            };
            _logRepository.Insert(log);

            if (ret != 0)
            {
                return "ERR: Decrypt Fail, ret: " + ret;
            }

            // ret==0表示解密成功，sMsg表示解密之后的明文xml串
            // TODO: 对明文的处理
            // For example:

            /*
            XmlDocument doc = new XmlDocument();
            doc.LoadXml(sMsg);
            XmlNode root = doc.FirstChild;
            string SuiteTicket = root["SuiteTicket"].InnerText;

            ////更新ticket
            Company company = _companyRepository.FirstOrDefault(a => a.suite_id.Equals(sCorpID));

            log = new Log()
            {

                content = string.Format("SuiteTicket:{0},comapnyname:{1}", SuiteTicket,company.name)
            };
            _logRepository.Insert(log);


            company.suite_ticket = SuiteTicket;
            _companyRepository.Update(company);
            */
            string responseMessage = "success";//响应内容
            var xmlDoc = XDocument.Parse(sMsg);//xml数据转化

            //区分普通消息与第三方应用授权推送消息，MsgType有值说明是普通消息，反之则是第三方应用授权推送消息
            if (xmlDoc.Root.Element("MsgType") != null)
            {
                var msgType = (ResponseMsgType)Enum.Parse(typeof(ResponseMsgType), xmlDoc.Root.Element("MsgType").Value, true);
                switch (msgType)
                {
                    case ResponseMsgType.Text://文本消息
                        responseMessage = ResponseMessageText(xmlDoc, sReqTimeStamp, sReqMsgSig, sToken, sEncodingAESKey, sCorpID);
                        break;
                    case ResponseMsgType.Image:
                        responseMessage = ResponseMessageImage();
                        break;
                    case ResponseMsgType.Voice:
                        responseMessage = ResponseMessageVoice();
                        break;
                    case ResponseMsgType.Video:
                        responseMessage = ResponseMessageVideo();
                        break;
                    case ResponseMsgType.News:
                        responseMessage = ResponseMessageNews();
                        break;
                }
            }
            else if (xmlDoc.Root.Element("InfoType") != null)
            {
                //第三方回调
                var infoType = (ResponseInfoType)Enum.Parse(typeof(ResponseInfoType), xmlDoc.Root.Element("InfoType").Value, true);

                switch (infoType)
                {
                    case ResponseInfoType.suite_ticket:
                        {
                            
                            //LoggerHelper._.Warn("suite_ticket===>>>>>,进来了，获取到的SuiteTicket票据为" + xmlDoc.Root.Element("SuiteTicket").Value);
                            ////更新ticket
                            string SuiteTicket = xmlDoc.Root.Element("SuiteTicket").Value;
                            log = new Log()
                            {

                                content = string.Format("SuiteTicket:{0}", SuiteTicket)
                            };
                            _logRepository.Insert(log);


                            providerInfo.SuiteTicket = SuiteTicket;
                            _providerInfoRepository.Update(providerInfo);


                        }
                        break;
                    case ResponseInfoType.create_auth:
                        {
                           

                            ////LoggerHelper._.Warn("suite_ticket===>>>>>,进来了，获取到的SuiteTicket票据为" + xmlDoc.Root.Element("SuiteTicket").Value);
                            //////更新ticket
                            //Company company = _companyRepository.FirstOrDefault(a => a.suite_id.Equals(sCorpID));
                            //string SuiteTicket = xmlDoc.Root.Element("SuiteTicket").Value;
                            //log = new Log()
                            //{

                            //    content = string.Format("SuiteTicket:{0},comapnyname:{1}", SuiteTicket, company.name)
                            //};
                            //_logRepository.Insert(log);


                            //company.suite_ticket = SuiteTicket;
                            //_companyRepository.Update(company);

                            //首先获取第三方应用凭证
                            string SuiteID = providerInfo.SuiteID;
                            string SuiteSecret = providerInfo.SuiteSecret;
                            string SuiteTicket = providerInfo.SuiteTicket;

                            dynamic obj = new ExpandoObject();
                            obj.suite_id = SuiteID;
                            obj.suite_secret = SuiteSecret;
                            obj.suite_ticket = SuiteTicket;
                            string datastr = JsonConvert.SerializeObject(obj);

                            string suite_url = "https://qyapi.weixin.qq.com/cgi-bin/service/get_suite_token";
                            var result_suite = HttpUtility.PostWebRequest(datastr, suite_url);
                            JObject result_obj = (JObject)JsonConvert.DeserializeObject(result_suite);
                            string suite_access_token = result_obj["suite_access_token"].ToString();

                            log = new Log()
                            {

                                content = string.Format("suite_access_token:{0}", suite_access_token)
                            };
                            _logRepository.Insert(log);

                            //获取企业永久授权码
                            string AuthCode = xmlDoc.Root.Element("AuthCode").Value;

                            log = new Log()
                            {

                                content = string.Format("AuthCode:{0}", AuthCode)
                            };
                            _logRepository.Insert(log);

                            obj = new ExpandoObject();
                            obj.auth_code = AuthCode;

                            string auth_url = "https://qyapi.weixin.qq.com/cgi-bin/service/get_permanent_code?suite_access_token=" + suite_access_token;
                            datastr = JsonConvert.SerializeObject(obj);
                            var result_auth = HttpUtility.PostWebRequest(datastr, auth_url);
                            log = new Log()
                            {

                                content = string.Format("result_auth: {0}", result_auth)
                            };
                            _logRepository.Insert(log);

                            result_obj = (JObject)JsonConvert.DeserializeObject(result_auth);
                            string permanent_code = result_obj["permanent_code"].ToString();

                            log = new Log()
                            {

                                content = string.Format("permanent_code: {0}", permanent_code)
                            };
                            _logRepository.Insert(log);

                            string corpid = result_obj["auth_corp_info"]["corpid"].ToString();
                            string corp_name = result_obj["auth_corp_info"]["corp_name"].ToString();
                            int agent_id = int.Parse(result_obj["auth_info"]["agent"][0]["agentid"].ToString());

                            log = new Log()
                            {

                                content = string.Format("corpid: {0}, agent_id: {1}", corpid, agent_id)
                            };
                            _logRepository.Insert(log);

                            //更新企业信息
                            Company company = _companyRepository.FirstOrDefault(a => a.name.Equals(corp_name));    //一定要用open corpid
                            company.permanent_code = permanent_code;
                            company.corpid_open = corpid;
                            company.agentid = agent_id;
                            _companyRepository.Update(company);

                            log = new Log()
                            {

                                content = string.Format("Company: {0}, PermanentCode:{1}", corpid, permanent_code)
                            };
                            _logRepository.Insert(log);


                        }
                        break;

                    case ResponseInfoType.change_app_admin:
                        log = new Log()
                        {

                            content = string.Format("change_app_admin")
                        };
                        _logRepository.Insert(log);
                        break;
                }
            }
            else
            {
                //其他情况
            }

            // result==0表示解密成功，sMsg表示解密之后的明文xml串
            //服务器未正确返回响应字符串 “success”
            return responseMessage;

        }


        #region 相关事件实现

        /// <summary>
        /// 消息文本回复
        /// </summary>
        /// <returns></returns>
        public string ResponseMessageText(XDocument xmlDoc, string timestamp, string nonce, string sToken, string sEncodingAESKey, string sCorpID)
        {
            string FromUserName = xmlDoc.Root.Element("FromUserName").Value;
            string ToUserName = xmlDoc.Root.Element("ToUserName").Value;
            string Content = xmlDoc.Root.Element("Content").Value;

            string xml = "<xml>";
            xml += "<ToUserName><![CDATA[" + ToUserName + "]]></ToUserName>";
            xml += "<FromUserName><![CDATA[" + FromUserName + "]]></FromUserName>";
            xml += "<CreateTime>" + GetCurrentTimeUnix() + "</CreateTime>";
            xml += "<MsgType><![CDATA[text]]></MsgType>";
            xml += "<Content><![CDATA[" + Content + "]]></Content>";
            xml += "</xml>";
            //"" + Content + "0";//回复内容 FuncFlag设置为1的时候，自动星标刚才接收到的消息，适合活动统计使用
            WXBizMsgCrypt wxcpt = new WXBizMsgCrypt(sToken, sEncodingAESKey, sCorpID);
            string sEncryptMsg = "";// 加密后的可以直接回复用户的密文;
            wxcpt.EncryptMsg(xml, timestamp, nonce, ref sEncryptMsg);

            //返回
            return sEncryptMsg;
        }

        /// <summary>
        /// 图片消息
        /// </summary>
        /// <returns></returns>

        public string ResponseMessageImage()
        {
            return "success";
        }

        /// <summary>
        /// 语音消息
        /// </summary>
        /// <returns></returns>
        public string ResponseMessageVoice()
        {
            return "success";
        }

        /// <summary>
        /// 视频消息
        /// </summary>
        /// <returns></returns>
        public string ResponseMessageVideo()
        {
            return "success";
        }

        /// <summary>
        /// 图文消息
        /// </summary>
        /// <returns></returns>
        public string ResponseMessageNews()
        {
            return "success";
        }

        #endregion

        /// <summary>
        /// 获取当前时间戳
        /// </summary>
        /// <returns></returns>
        public static string GetCurrentTimeUnix()
        {
            TimeSpan cha = (DateTime.Now - TimeZone.CurrentTimeZone.ToLocalTime(new System.DateTime(1970, 1, 1)));
            long t = (long)cha.TotalSeconds;
            return t.ToString();
        }
    }

    /// <summary>
    /// 第三方应用授权推送消息类型
    /// </summary>
    public enum ResponseInfoType
    {
        /// <summary>
        /// 推送suite_ticket 企业微信服务器会定时（每十分钟）推送ticket。ticket会实时变更，并用于后续接口的调用。
        /// </summary>
        suite_ticket = 1,

        /// <summary>
        /// 授权成功通知
        /// </summary>
        create_auth = 2,

        /// <summary>
        /// 成员通知事件
        /// </summary>
        change_contact = 3,

        /// <summary>
        /// 成员通知事件
        /// </summary>
        change_app_admin = 4
    }

    /// <summary>
    /// 普通消息响应类型
    /// </summary>
    public enum ResponseMsgType
    {
        /// <summary>
        /// 文本消息
        /// </summary>
        Text = 0,
        /// <summary>
        /// 图文消息
        /// </summary>
        News = 1,
        /// <summary>
        /// 图片消息
        /// </summary>
        Image = 3,
        /// <summary>
        /// 语音消息
        /// </summary>
        Voice = 4,
        /// <summary>
        /// 视频消息
        /// </summary>
        Video = 5
    }
}
