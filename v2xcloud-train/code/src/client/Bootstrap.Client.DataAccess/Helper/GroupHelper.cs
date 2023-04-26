using Bootstrap.Security;
using Bootstrap.Security.DataAccess;
using Longbow.Cache;
using Longbow.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bootstrap.Client.DataAccess.Helper
{
    /// <summary>
    /// 
    /// </summary>
    public static class GroupHelper
    {
        /// <summary>
        /// 
        /// </summary>
        public const string RetrieveGroupsByUserNameDataKey = DbHelper.RetrieveGroupsByUserNameDataKey;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="userName"></param>
        /// <returns></returns>
        public static IEnumerable<BootstrapGroup> RetrievesByUserName(string userName) => CacheManager.GetOrAdd(string.Format("{0}-{1}", RetrieveGroupsByUserNameDataKey, userName), r => DbContextManager.Create<Group>()?.RetrievesByUserName(userName), RetrieveGroupsByUserNameDataKey) ?? new BootstrapGroup[0];
    }
}
