﻿using Bootstrap.Client.Models;
using Longbow.Web.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bootstrap.Client.Query
{
    public class QueryStaffOption : PaginationOption
    {
        /// <summary>
        /// 获得/设置 查询条件1
        /// </summary>
        public string? userid { get; set; }

        /// <summary>
        /// 获得/设置 查询条件2
        /// </summary>
        public string? nickname { get; set; }

        /// <summary>
        /// 获得/设置 查询条件3
        /// </summary>
        /// <remark>数据库定义此字段为数值型，查询类为何定义为 string? 类型？因为这里可以设置为全部</remark>
        public string? company { get; set; }

        /// <summary>
        /// 获得/设置 查询条件3
        /// </summary>
        /// <remark>数据库定义此字段为数值型，查询类为何定义为 string? 类型？因为这里可以设置为全部</remark>
        public string? sex { get; set; }

        /// <summary>
        /// 获得/设置 查询条件3
        /// </summary>
        /// <remark>数据库定义此字段为数值型，查询类为何定义为 string? 类型？因为这里可以设置为全部</remark>
        public string? province { get; set; }

        /// <summary>
        /// 获得/设置 查询条件3
        /// </summary>
        /// <remark>数据库定义此字段为数值型，查询类为何定义为 string? 类型？因为这里可以设置为全部</remark>
        public string? city { get; set; }
        /// <summary>
        /// 获得/设置 查询条件3
        /// </summary>
        /// <remark>数据库定义此字段为数值型，查询类为何定义为 string? 类型？因为这里可以设置为全部</remark>
        public string? department { get; set; }
    }
}
