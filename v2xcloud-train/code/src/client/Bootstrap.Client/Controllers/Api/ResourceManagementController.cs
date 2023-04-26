using Bootstrap.Client.Infrastructure.Repositories;
using Bootstrap.Client.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Dynamic;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;
using Bootstrap.Client.Controllers.Api;
using System.Collections;
namespace Bootstrap.Client.Controllers.Api
{
    [Route("api/[controller]/[action]/{id?}")]
    [ApiController]
    public class ResourceManagementController : Controller
    {
        private readonly IRepository<Resource, int> _resourceRepository;

        private readonly IRepository<Image, int> _imageRepository;

        private readonly IWebHostEnvironment _hostingEnvironment;

        public ResourceManagementController(IRepository<Resource, int> resourceRepository,
            IRepository<Image, int> imageRepository, IWebHostEnvironment hostEnvironment)
        {
            _resourceRepository = resourceRepository;
            _imageRepository = imageRepository;
            _hostingEnvironment = hostEnvironment;

        }

        /// <summary>
        /// 初始化资源列表
        /// </summary>
        [HttpGet]
        public object InitResourceList()
        {
            return _resourceRepository.GetAllList();
            
        }
        
        //[HttpGet]
        //public object InitImageList(int id)
        //{
            
        //    return _imageRepository.GetAllList(a => a.resource_id == id); ;
        //}

        /// <summary>
        /// 新建资源类型
        /// </summary>
        [HttpPost]
        public object Create(Resource resource)
        {
            dynamic obj = new ExpandoObject();
            try
            {
                string webRootPath = _hostingEnvironment.WebRootPath ;
                string fullPath = Path.Combine(webRootPath, "images");
                string newfullpath = Path.Combine(fullPath, resource.Name);
                if (!Directory.Exists(newfullpath))
                {
                    Directory.CreateDirectory(newfullpath);
                }


                Resource resource_new = new Resource
                {
                    Name = resource.Name,
                    Update_time = resource.Update_time,
                    Comment = resource.Comment,                                
                };

                _resourceRepository.Insert(resource_new);

                obj.status = "success";
                obj.Id = resource_new.id;


            }
            catch (Exception ex)
            {
                obj.status = "failed";
                obj.erro = ex.ToString();
            }
            return obj;

        }

        /// <summary>
        /// 删除资源
        /// </summary>
        [HttpPost]
        public bool Delete(IEnumerable<int> value)
        {
            foreach (int id in value)
            {
                var resource = _resourceRepository.Single(a => a.id == id);

                Delete_single(id);
            }
            return true;
        }

        [HttpPost]
        public object getImageNum(int id)
        {
            dynamic obj = new ExpandoObject();

            try
            {
                ICollection<Image> imagelist= _imageRepository.GetAllList(a => a.resource_id == id);
                int imagenum = imagelist.Count;
                obj.status = "success";
                obj.num = imagenum;

            }
            catch (Exception ex)
            {
                obj.status = "failed";
                obj.erro = ex.ToString();
            }
            return obj;

        }
        /// <summary>
        /// 删除调用
        /// </summary>
        /// <param name="id"></param>
        public bool Delete_single(int id)
        {
            var resource = _resourceRepository.Single(a => a.id == id);
            Delete_images(id);
            _resourceRepository.Delete(a => a.id == id);
            
            return true;
        }

        public void Delete_images(int id)
        {

            List<Image> imagelist = _imageRepository.GetAllList(a => a.resource_id == id);

            foreach(Image image in imagelist)
            {
                //删除图片
                if (System.IO.File.Exists(image.absolute_url))
                {
                   
                    //删除本地图片
                    System.IO.File.Delete(image.absolute_url);
                    _imageRepository.Delete(a => a.id == image.id);
                    
                }
            }
            //判断文件是否存在
            
        }

    }
}
