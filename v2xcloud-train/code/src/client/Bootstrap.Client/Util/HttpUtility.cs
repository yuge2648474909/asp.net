using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Bootstrap.Client.Util
{
    public class HttpUtility
    {

        //data:参数  URL：路径

        public static string PostWebRequest(string Data, string URL)
        {
            CookieContainer cc = new CookieContainer();
            string postData = Data;
            byte[] byteArray = Encoding.UTF8.GetBytes(postData); // 转化
            HttpWebRequest webRequest2 = (HttpWebRequest)WebRequest.Create(new Uri(URL));
            webRequest2.CookieContainer = cc;
            webRequest2.Method = "POST";
            webRequest2.ContentType = "application/json; charset=utf-8";
            webRequest2.ContentLength = byteArray.Length;
            Stream newStream = webRequest2.GetRequestStream();
            newStream.Write(byteArray, 0, byteArray.Length);    //写入参数
            newStream.Close();
            HttpWebResponse response2 = (HttpWebResponse)webRequest2.GetResponse();
            StreamReader sr2 = new StreamReader(response2.GetResponseStream(), Encoding.UTF8);
            string text2 = sr2.ReadToEnd();
            if (text2 != null && text2.Length > 0)
            {
                return text2;
            }
            return "";
        }


        //data:参数  URL：路径

        public static string GetWebRequest(string URL)
        {
            HttpWebRequest webRequest = (HttpWebRequest)WebRequest.Create(new Uri(URL));
            webRequest.UserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36";
            webRequest.Referer = "http://192.168.1.7:49185?ReturnUrl=http://192.168.1.7:49185";
            HttpWebResponse response = (HttpWebResponse)webRequest.GetResponse();
            System.IO.StreamReader myreader = new System.IO.StreamReader(response.GetResponseStream(), Encoding.UTF8);
            string responseText = myreader.ReadToEnd();
            myreader.Close();
            return responseText;
        }

        

        //原HttpUtility内,把referer添加了一个参数出来，企业微信需要带入正确的referer扩展授权，不然不能正常返回请求
        public static string GetWebRequest(string URL, string referer)
        {
            //企业微信发送请求要求的附加服务器referer "http://123.60.106.226:50852?ReturnUrl=http://123.60.106.226:50852"
            HttpWebRequest webRequest = (HttpWebRequest)WebRequest.Create(new Uri(URL));
            webRequest.UserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36";
            if (string.IsNullOrEmpty(referer) == false) webRequest.Referer = referer;
            HttpWebResponse response = (HttpWebResponse)webRequest.GetResponse();
            System.IO.StreamReader myreader = new System.IO.StreamReader(response.GetResponseStream(), Encoding.UTF8);
            string responseText = myreader.ReadToEnd();
            myreader.Close();
            return responseText;
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
        public static string GetStateRandomString(int length = 26, bool useNum = true, bool useLow = true, bool useUpp = true, bool useSpe = false, string custom = "a")
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
