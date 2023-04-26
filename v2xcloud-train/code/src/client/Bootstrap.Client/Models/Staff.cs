using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Bootstrap.Client.Models
{
    public class Staff
    {
        /// <summary>
        /// id
        /// </summary>
        public int id { get; set; }

        /// <summary>
        /// 用户id
        /// </summary>
        [Display(Name = "用户id")]
        //[Required(ErrorMessage = "请输入名称,它不能为空")]
        public string? userid { get; set; }

        /// <summary>
        /// 用户标识
        /// </summary>
        [Display(Name = "用户标识")]
        //[Required(ErrorMessage = "请输入用户标识,它不能为空")]
        public string? openid { get; set; }

        /// <summary>
        /// 昵称
        /// </summary>
        [Display(Name = "昵称")]
        //[Required(ErrorMessage = "请输入名称,它不能为空")]
        public string? nickname { get; set; }

        /// <summary>
        /// 性别
        /// </summary>
        [Display(Name = "性别")]
        //[Required(ErrorMessage = "请输入名称,它不能为空")]
        public string? sex { get; set; }

        /// <summary>
        /// 省份
        /// </summary>
        [Display(Name = "省份")]
        //[Required(ErrorMessage = "请输入名称,它不能为空")]
        public string? province { get; set; }

        /// <summary>
        /// 城市
        /// </summary>
        [Display(Name = "城市")]
        //[Required(ErrorMessage = "请输入名称,它不能为空")]
        public string? city { get; set; }

        /// <summary>
        /// 国家
        /// </summary>
        [Display(Name = "国家")]
        //[Required(ErrorMessage = "请输入名称,它不能为空")]
        public string? country { get; set; }

        /// <summary>
        /// 用户头像
        /// </summary>
        [Display(Name = "用户头像")]
        //[Required(ErrorMessage = "请输入名称,它不能为空")]
        public string? headimgurl { get; set; }

        /// <summary>
        /// 特权信息
        /// </summary>
        [Display(Name = "特权信息")]
        //[Required(ErrorMessage = "请输入名称,它不能为空")]
        public string? privilege { get; set; }

        /// <summary>
        /// 用户统一标识
        /// </summary>
        [Display(Name = "用户统一标识")]
        //[Required(ErrorMessage = "请输入名称,它不能为空")]
        public string? unionid { get; set; }

        /// <summary>
        /// 公司
        /// </summary>
        [Display(Name = "公司")]
        //[Required(ErrorMessage = "请输入名称,它不能为空")]
        public string? company { get; set; }

        /// <summary>
        /// 职位
        /// </summary>
        [Display(Name = "职位")]
        //[Required(ErrorMessage = "请输入名称,它不能为空")]
        public string? role { get; set; }

        /// <summary>
        /// 许可
        /// </summary>
        [Display(Name = "许可")]
        //[Required(ErrorMessage = "请输入许可,它不能为空")]
        public int? permission { get; set; }

        /// <summary>
        /// 部门
        /// </summary>
        [Display(Name = "部门")]
        //[Required(ErrorMessage = "请输入部门,它不能为空")]
        public string? department { get; set; }

        /// <summary>
        /// token
        /// </summary>
        [Display(Name = "token")]
        //[Required(ErrorMessage = "请输入部门,它不能为空")]
        public string? token { get; set; }

        /// <summary>
        /// token
        /// </summary>
        [Display(Name = "使用状态")]
        //[Required(ErrorMessage = "请输入部门,它不能为空")]
        public string? running_status { get; set; }

        /// <summary>
        /// open_userid
        /// </summary>
        [Display(Name = "open_userid")]
        //[Required(ErrorMessage = "请输入部门,它不能为空")]
        public string? open_userid { get; set; }


    }
}
