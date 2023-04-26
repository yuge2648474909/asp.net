using Bootstrap.Client.Models;
using Longbow.Web.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bootstrap.Client.Query
{
    public class QueryStaffSyncOption : PaginationOption
    {
        public string? department { get; set; }
    }
}
