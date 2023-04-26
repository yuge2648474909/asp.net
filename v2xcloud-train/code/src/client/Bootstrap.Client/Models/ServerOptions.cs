using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bootstrap.Client.Models
{
    public class ServerOptions
    {
        public string host { get; set; }
        public int port { get; set; }
        public string controlName { get; set; }
        public dynamic? data { get; set; }
    }
}
