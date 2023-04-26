using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bootstrap.Client.Models
{
    public class Device
    {
        public int id { get; set; }

        public string? Name { get; set; }

        public string? Device_type { get; set; }

        public string? Device_specification { get; set; }

        public string? Device_location { get; set;}

        public string? Device_status { get; set;}

        public string? Update_time { get; set;}
    }
}
