using Bootstrap.Client.Infrastructure.Repositories;
using Bootstrap.Client.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Threading.Tasks;

namespace Bootstrap.Client.Controllers.Api
{
    [Route("api/[controller]/[action]/{id?}")]
    [ApiController]
    public class DeviceManagementController : Controller
    {
        private readonly IRepository<Device, int> _devicerepository;

        public DeviceManagementController(IRepository<Device, int> devicerepository)
        {
            _devicerepository = devicerepository;
        }

        /// <summary>
        /// 初始化设备列表
        /// </summary>
        [HttpGet]
        public object InitDeviceList()
        {
            // select * from device;
            return _devicerepository.GetAll();
        }

        [HttpPost]
        public object Create(Device device)
        {
            dynamic obj = new ExpandoObject();
            try
            {
                Device device_new = new Device
                {
                    Name = device.Name,
                    Device_type = device.Device_type,
                    Device_specification = device.Device_specification,
                    //Device_location = device.Device_location,
                    //Device_status = device.Device_status,
                    //Update_time = device.Update_time,

                };

                _devicerepository.Insert(device_new);

                obj.status = "success";
                obj.Id = device_new.id;


            }
            catch (Exception ex)
            {
                obj.status = "failed";
                obj.erro = ex.ToString();
            }
            return obj;

        }


        [HttpGet]
        public object Details(int Id)
        {
            dynamic obj = new ExpandoObject();

            try
            {
                Device device = _devicerepository.Single(a => a.id == Id);

                obj.status = "success";
                obj.device = device;

            }
            catch (Exception ex)
            {
                obj.status = "failed";
                obj.erro = ex.ToString();
            }
            return obj;
        }

        [HttpPost]
        public bool Delete(IEnumerable<int> value)
        {
            foreach (int id in value)
            {
                var device = _devicerepository.Single(a => a.id == id);
                _devicerepository.Delete(a => a.id == id);
            }
            return true;
        }

        [HttpGet]
        public bool Delete_single(int id)
        {
            _devicerepository.Delete(a => a.id == id);
            return true;
        }


        /// <summary>
        /// 车辆编辑
        /// </summary>
        [HttpPost]
        public object DeviceEdit(Device device)
        {
            dynamic obj = new ExpandoObject();
            try
            {
                Device v = device;

                //从数据库中查询正在编辑的学生信息
                Device exist_device = _devicerepository.Single(a => a.id == device.id);
                //用模型对象中的数据更新student对象
                exist_device.id = device.id;
                exist_device.Name = device.Name;
                exist_device.Device_type = device.Device_type;
                exist_device.Device_location = device.Device_location;
                exist_device.Device_specification = device.Device_specification;
                exist_device.Device_status = device.Device_status;
                exist_device.Update_time = device.Update_time;
                //调用仓储服务中的Update方法，保存studnet对象中的数据，更新数据库表中的信息。
                Device updatedvehicle = _devicerepository.Update(exist_device);

                obj.status = "success";


            }
            catch (Exception ex)
            {
                obj.status = "failed";
                obj.erro = ex.ToString();
            }
            return obj;



        }

       
    }
}
