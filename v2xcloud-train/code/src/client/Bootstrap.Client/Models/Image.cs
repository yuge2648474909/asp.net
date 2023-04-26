using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bootstrap.Client.Models
{
    public class Image
    {
        public int id { get; set; }
        /// <summary>
        /// image_uuid
        /// </summary>
        //[Required(ErrorMessage = "请输入图片名称,它不能为空")]
        public string image_uuid { get; set; }
        /// <summary>
        /// image_name
        /// </summary>
        //[Required(ErrorMessage = "请输入图片实际名称,它不能为空")]
        public string? image_name { get; set; }
        /// <summary>
        /// update_time
        /// </summary>

        //[Required(ErrorMessage = "请输入图片修改时间,它不能为空")]
        public string? update_time { get; set; }
        /// <summary>
        /// comment
        /// </summary>
        public string? absolute_url { get; set; }
        /// <summary>
        /// resource_id
        /// </summary>

        //[Required(ErrorMessage = "请输入图片所属类别id,它不能为空")]
        public int resource_id { get; set; }
        /// <summary>
        /// type
        /// </summary>
        public string? type { get; set; }
        /// <summary>
        /// image_url
        /// </summary>
        public string? relative_url { get; set; }
        /// <summary>
        /// image_size
        /// </summary>
        public string? image_size { get; set; }

        
    }
}
