using Bootstrap.Client.Infrastructure.Repositories;
using Bootstrap.Client.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using System.Dynamic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;
using System.Text;
using Microsoft.AspNetCore.Http;

namespace Bootstrap.Client.Controllers.Api
{
    [Route("api/[controller]/[action]/{id?}")]
    [ApiController]
    public class ImageManagementController : Controller
    {
        private readonly IRepository<Image, int> _imageRepository;

        private readonly IWebHostEnvironment _hostingEnvironment;

        private readonly IRepository<Resource, int> _resourceRepository;

        public ImageManagementController(IRepository<Resource, int> resourceRepository, IRepository<Image, int> imageRepository,
            IWebHostEnvironment hostEnvironment)
        {
            _resourceRepository = resourceRepository;
            _imageRepository = imageRepository;
            _hostingEnvironment = hostEnvironment;
        }

        [HttpGet]
        public object InitImageList(int id)
        {
            ViewBag.Title = "资源列表";
            return _imageRepository.GetAllList(a => a.resource_id == id);
        }

        /// <summary>
        /// 查看图片的细节
        /// </summary>
        [HttpGet]
        public object Details(int id)
        {
            dynamic obj = new ExpandoObject();
            try
            {
                Image image = _imageRepository.Single(a => a.id == id);

                obj.status = "success";
                obj.image = image;

            }
            catch (Exception ex)
            {
                obj.status = "failed";
                obj.erro = ex.ToString();
            }
            return obj;
        }
        

        [HttpPost]
        public object Create(int id)
        {
            dynamic obj = new ExpandoObject();
            return obj;

        }
        
     
        /// <summary>
        /// 上传
        /// </summary>
        /// <param name="files"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<object> Upload1(IFormCollection files)
        {
            dynamic obj = new ExpandoObject();
            string webRootPath = _hostingEnvironment.WebRootPath;
            var file = files.Files[0];
            var num = file.Length;
            string name = file.FileName;
            string filename = files["filename"];
            int resource_id = int.Parse(files["type"]);
            string fullPath = Path.Combine(webRootPath, "images");
            if (!Directory.Exists(fullPath))
            {
                Directory.CreateDirectory(fullPath);
            }
            var imgtype = file.ContentType;
            var ext = ".bmp";
            switch (imgtype)
            {
                case "image/png":
                    ext = ".png";
                    break;
                case "image/jpg":
                    ext = ".jpg";
                    break;
                case "image/jpeg":
                    ext = ".jpg";
                    break;

            }
            //临时存档
            var uuid = string.Format(@"{0}", Guid.NewGuid());
            var newfile = uuid + ext;
            string url = "/images/" + newfile;
            var newfullPath = Path.Combine(fullPath, newfile);

            DateTime currentTime = new DateTime();
            currentTime = DateTime.Now;

            int year = currentTime.Year;
            int month = currentTime.Month;
            int day = currentTime.Day;
            int hour = currentTime.Hour;
            int min = currentTime.Minute;
            int second = currentTime.Second;

            string time = year.ToString() + "." + month.ToString() + "." + day.ToString() + "." + hour.ToString() + "."
                + min.ToString() + "." + second.ToString();
            try
            {
                Image image_new = new Image
                {
                    image_uuid = uuid,
                    image_name = filename,

                    update_time = time,


                    resource_id = resource_id,
                    type = GetReourceInfo(resource_id).Name,
                    relative_url = url,
                    absolute_url = newfullPath,
                    image_size = GetFileSize(num)

                };

                _imageRepository.Insert(image_new);
                obj.status = "success";
                obj.Id = image_new.id;

            }
            catch (Exception ex)
            {
                obj.status = "failed";
                obj.erro = ex.ToString();
            }

            if (System.IO.File.Exists(Path.GetFullPath(newfullPath)))
            {
                System.IO.File.Delete(Path.GetFullPath(newfullPath));
            }

            using var stream = new FileStream(newfullPath, FileMode.Create);
            await file.CopyToAsync(stream);
            stream.Close();
            return RedirectToAction("ImageList", new { id = resource_id });
        }

        /// <summary>
        /// 计算文件大小(B,KB,MB)
        /// </summary>
        /// <param name="size">初始文件大小</param>
        /// <returns></returns>
        public static string GetFileSize(long size)
        {
            var num = 1024;
            if(size < num)
            {
                return size + " B";
            }
            if(size < Math.Pow(num, 2))
            {
                return (size / num).ToString("f2") + " KB"; //kb
            }
            if (size < Math.Pow(num, 3))
            {
                return (size / Math.Pow(num, 2)).ToString("f2") + " MB"; //M 
            }


            return "0";
                
        }

        public Resource GetReourceInfo(int id)
        {
            dynamic obj = new ExpandoObject();
            Resource resource = _resourceRepository.Single(a => a.id == id);           
            return resource;

        }
        


        [HttpPost]
        public bool Delete(IEnumerable<int> value)
        {
            foreach (int id in value)
            {
                var device = _imageRepository.Single(a => a.id == id);
                Delete_single(id);
               
            }
            return true;
        }

        /// <summary>
        /// 删除指定的图片
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        public bool Delete_single(int id)
        {
            
            var image = _imageRepository.Single(a => a.id == id);


            //判断文件是否存在
            if (System.IO.File.Exists(image.absolute_url))
            {
                // 2、根据路径字符串判断是文件还是文件夹
             
                System.IO.File.Delete(image.absolute_url);
                _imageRepository.Delete(a => a.id == id);
                return true;
            }         
            return false;
        }

    }

   
}



