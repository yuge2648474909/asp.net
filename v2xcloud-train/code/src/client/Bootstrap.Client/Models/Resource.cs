using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bootstrap.Client.Models
{
    public class Resource
    {
        public int id { get; set; }
        /// <summary>
        /// 资源名称
        /// </summary>
        public string? Name { get; set; }

        /// <summary>
        /// 修改时间
        /// </summary>
        public string? Update_time { get; set;}
        /// <summary>
        /// 备注
        /// </summary>
        public string? Comment { get; set; }

    }
}
