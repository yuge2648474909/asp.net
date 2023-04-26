using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Threading.Tasks;
using Bootstrap.Security.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace Bootstrap.Admin.Controllers.Api
{ /// <summary>
  /// 字典表维护控制器
  /// </summary>
    [Route("api/[controller]/[action]/{id?}")]
    [ApiController]
    public class ClientLoginController : Controller
    {
        /// <summary>
        /// 获取登录二维码地址
        /// </summary>
        [HttpGet]
        public object GetLoginCode()
        {

            //配置企业微信二维码地址
            string appid = BootstrapAppContext.Configuration.GetValue<String>("work_wechat_appid");
            string redirect_uri = Uri.EscapeDataString(BootstrapAppContext.Configuration.GetValue<String>("redirect_uri"));
            //string response_type = "code";
            //string scope = "snsapi_userinfo,snsapi_login";
            string state = GetRandomString();

            string url_temp = "https://open.work.weixin.qq.com/wwopen/sso/3rd_qrConnect?appid=" + appid +
                "&redirect_uri=" + redirect_uri +
                "&state=" + state+ "&usertype=member";

            url_obj url_Obj = new url_obj
            {
                url = url_temp,
                result = "ok"
            };

            return url_Obj;
        }

        /// <summary>
        /// 获取登录二维码地址，第三方应用
        /// </summary>
        [HttpGet]
        public object GetLoginCode2()
        {

            //配置企业微信二维码地址
            string appid = BootstrapAppContext.Configuration.GetValue<String>("3rd_work_wechat_appid");
            string redirect_uri = Uri.EscapeDataString(BootstrapAppContext.Configuration.GetValue<String>("redirect_uri"));
            //string response_type = "code";
            //string scope = "snsapi_userinfo,snsapi_login";
            string state = GetRandomString();

            string url_temp = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appid +
                "&redirect_uri=" + redirect_uri +
                "&state=" + state + "&usertype=member&response_type=code&scope=snsapi_base#wechat_redirect";

            url_obj url_Obj = new url_obj
            {
                url = url_temp,
                result = "ok"
            };

            return url_Obj;
        }


        public class url_obj
        {
            public string url { get; set; }
            public string result { get; set; }

        }

        ///<summary>
        ///生成随机字符串 
        ///</summary>
        ///<param name="length">目标字符串的长度</param>
        ///<param name="useNum">是否包含数字，1=包含，默认为包含</param>
        ///<param name="useLow">是否包含小写字母，1=包含，默认为包含</param>
        ///<param name="useUpp">是否包含大写字母，1=包含，默认为包含</param>
        ///<param name="useSpe">是否包含特殊字符，1=包含，默认为不包含</param>
        ///<param name="custom">要包含的自定义字符，直接输入要包含的字符列表</param>
        ///<returns>指定长度的随机字符串</returns>
        public static string GetRandomString(int length = 26, bool useNum = true, bool useLow = true, bool useUpp = true, bool useSpe = false, string custom = "a")
        {
            byte[] b = new byte[4];
            new System.Security.Cryptography.RNGCryptoServiceProvider().GetBytes(b);
            Random r = new Random(BitConverter.ToInt32(b, 0));
            string s = null, str = custom;
            if (useNum == true) { str += "0123456789"; }
            if (useLow == true) { str += "abcdefghijklmnopqrstuvwxyz"; }
            if (useUpp == true) { str += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; }
            if (useSpe == true) { str += "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"; }
            for (int i = 0; i < length; i++)
            {
                s += str.Substring(r.Next(0, str.Length - 1), 1);
            }
            return s;
        }
    }
}
