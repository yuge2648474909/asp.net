using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Bootstrap.Client.Models
{
    public class Login_log
    {
        /// <summary>
       /// id
       /// </summary>
        public int id { get; set; }

        /// <summary>
        /// userid
        /// </summary>
        //[Display(Name = "登出时间")]
        //[Required(ErrorMessage = "请输入登出时间,它不能为空")]
        public string? userid { get; set; }

        /// <summary>
        /// 用户统一标识
        /// </summary>
        [Display(Name = "用户统一标识")]
        //[Required(ErrorMessage = "请输入用户统一标识,它不能为空")]
        public string? user_unionid { get; set; }

        /// <summary>
        /// 凭证
        /// </summary>
        [Display(Name = "凭证")]
        //[Required(ErrorMessage = "请输入凭证,它不能为空")]
        public string? user_token_session { get; set; }

        /// <summary>
        /// 登录时间
        /// </summary>
        [Display(Name = "登录时间")]
        //[Required(ErrorMessage = "请输入登录时间,它不能为空")]
        public string? login_time { get; set; }

        /// <summary>
        /// 登出时间
        /// </summary>
        [Display(Name = "登出时间")]
        //[Required(ErrorMessage = "请输入登出时间,它不能为空")]
        public string? logout_time { get; set; }
    }
}
