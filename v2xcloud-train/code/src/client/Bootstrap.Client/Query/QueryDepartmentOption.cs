using Longbow.Web.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bootstrap.Client.Query
{
    public class QueryDepartmentOption: PaginationOption
    {
        /// <summary>
        /// 获得/设置 查询条件1
        /// </summary>
        public string? name { get; set; }

        /// <summary>
        /// 获得/设置 查询条件2
        /// </summary>
        public string? name_en { get; set; }

        /// <summary>
        /// 获得/设置 查询条件2
        /// </summary>
        public string? department_leader { get; set; }

        /// <summary>
        /// 获得/设置 查询条件2
        /// </summary>
        public string? company { get; set; }

    }
}
