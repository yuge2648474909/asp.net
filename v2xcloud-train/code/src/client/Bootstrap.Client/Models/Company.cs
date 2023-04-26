using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Bootstrap.Client.Models
{   
    public class Company
    {
        /// <summary>
        /// id
        /// </summary>
        public int id { get; set; }

        /// <summary>
        /// 公司名称
        /// </summary>
        [Display(Name = "公司名称")]
        //[Required(ErrorMessage = "请输入公司名称,它不能为空")]
        public string? name { get; set; }

        /// <summary>
        /// 地址
        /// </summary>
        [Display(Name = "地址")]
        //[Required(ErrorMessage = "请输入地址,它不能为空")]
        public string? address { get; set; }

        /// <summary>
        /// corpid
        /// </summary>
        [Display(Name = "corpid")]
        //[Required(ErrorMessage = "请输入地址,它不能为空")]
        public string? corpid { get; set; }

        /// <summary>
        /// corpsecret
        /// </summary>
        [Display(Name = "corpsecret")]
        //[Required(ErrorMessage = "请输入地址,它不能为空")]
        public string? corpsecret { get; set; }

        /// <summary>
        /// corpsecret
        /// </summary>
        [Display(Name = "company_code")]
        //[Required(ErrorMessage = "请输入地址,它不能为空")]
        public string? company_code { get; set; }

        /// <summary>
        /// corpsecret
        /// </summary>
        [Display(Name = "agentid")]
        //[Required(ErrorMessage = "请输入地址,它不能为空")]
        public int? agentid { get; set; }

        /// <summary>
        /// corpsecret
        /// </summary>
        [Display(Name = "agent_secrete")]
        //[Required(ErrorMessage = "请输入地址,它不能为空")]
        public string? agent_secrete { get; set; }

        /// <summary>
        /// suite_id
        /// </summary>
        [Display(Name = "suite_id")]
        //[Required(ErrorMessage = "请输入地址,它不能为空")]
        public string? suite_id { get; set; }

        /// <summary>
        /// suite_secret
        /// </summary>
        [Display(Name = "suite_secret")]
        //[Required(ErrorMessage = "请输入地址,它不能为空")]
        public string? suite_secret { get; set; }

        /// <summary>
        /// suite_ticket
        /// </summary>
        [Display(Name = "suite_ticket")]
        //[Required(ErrorMessage = "请输入地址,它不能为空")]
        public string? suite_ticket { get; set; }

        /// <summary>
        /// permanent_code
        /// </summary>
        [Display(Name = "permanent_code")]
        //[Required(ErrorMessage = "请输入地址,它不能为空")]
        public string? permanent_code { get; set; }

        /// <summary>
        /// corpid_open
        /// </summary>
        [Display(Name = "corpid_open")]
        //[Required(ErrorMessage = "请输入地址,它不能为空")]
        public string? corpid_open { get; set; }

    }
}
