using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bootstrap.Client.Models
{
    public class ProviderInfo
    {
        /// <summary>
        /// id
        /// </summary>
        public int id { get; set; }

        /// <summary>
        /// SuiteID
        /// </summary>
        public string? SuiteID { get; set; }

        /// <summary>
        /// SuiteSecret
        /// </summary>
        public string? SuiteSecret { get; set; }

        /// <summary>
        /// SuiteToken
        /// </summary>
        public string? SuiteToken { get; set; }

        /// <summary>
        /// SuiteEncodingAESKey
        /// </summary>
        public string? SuiteEncodingAESKey { get; set; }

        /// <summary>
        /// SuiteTicket
        /// </summary>
        public string? SuiteTicket { get; set; }


        /// <summary>
        /// CorpID
        /// </summary>
        public string? CorpID { get; set; }
    }
}
