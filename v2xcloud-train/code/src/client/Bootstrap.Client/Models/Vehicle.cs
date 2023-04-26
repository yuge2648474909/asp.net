using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bootstrap.Client.Models
{
    public class Vehicle
    {
        /// <summary>
        /// id
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// 名称
        /// </summary>
        //[Required(ErrorMessage = "请输入公司名称,它不能为空")]
        public string? Name { get; set; }

        /// <summary>
        /// 类型
        /// </summary>
        //[Required(ErrorMessage = "请输入公司名称,它不能为空")]
        public string? Type { get; set; }
    }
}
