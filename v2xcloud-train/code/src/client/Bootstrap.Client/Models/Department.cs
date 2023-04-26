using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace Bootstrap.Client.Models
{
    public class Department
    {
        /// <summary>
        /// id
        /// </summary>
        public int id { get; set; }

        /// <summary>
        /// 公司名称
        /// </summary>
        [Display(Name = "部门名称")]
        //[Required(ErrorMessage = "请输入公司名称,它不能为空")]
        public string? name { get; set; }

        /// <summary>
        /// 公司名称en
        /// </summary>
        [Display(Name = "部门名称en")]
        //[Required(ErrorMessage = "请输入公司名称,它不能为空")]
        public string? name_en { get; set; }

        /// <summary>
        /// 部门领导
        /// </summary>
        [Display(Name = "部门领导")]
        //[Required(ErrorMessage = "请输入公司名称,它不能为空")]
        public string? department_leader { get; set; }

        /// <summary>
        /// 所属公司
        /// </summary>
        [Display(Name = "所属公司")]
        //[Required(ErrorMessage = "请输入公司名称,它不能为空")]
        public string? company { get; set; }

        /// <summary>
        /// 微信部门id
        /// </summary>
        [Display(Name = "微信部门id")]
        //[Required(ErrorMessage = "请输入公司名称,它不能为空")]
        public string? department_id { get; set; }

        /// <summary>
        /// 许可
        /// </summary>
        [Display(Name = "许可")]
        public int permission { get; set; }
    }
}
