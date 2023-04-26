using Longbow.Web.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bootstrap.Client.Query
{
    public class QueryCompanyOption: PaginationOption
    {
        /// <summary>
        /// 获得/设置 查询条件1
        /// </summary>
        public string? name { get; set; }

        /// <summary>
        /// 获得/设置 查询条件2
        /// </summary>
        public string? address { get; set; }

        /// <summary>
        /// 获得/设置 查询条件2
        /// </summary>
        public string? company_code { get; set; }

    }
}
