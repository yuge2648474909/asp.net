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
    /// <summary>
    /// 字典表维护控制器
    /// </summary>
    [Route("api/[controller]/[action]/{id?}")]
    [ApiController]
    public class VehicleManagementController : Controller
    {
        private readonly IRepository<Vehicle, int> _vehicleRepository;

        public VehicleManagementController(IRepository<Vehicle, int> vehicleRepository)
        {
            _vehicleRepository = vehicleRepository;
        }

        /// <summary>
        /// 初始化车辆列表
        /// </summary>
        [HttpGet]
        public object InitVehicleList()
        {
            return _vehicleRepository.GetAll() ;
        }


        /// <summary>
        /// 新建车辆
        /// </summary>
        [HttpPost]
        public object Create(Vehicle vehicle)
        {
            dynamic obj = new ExpandoObject();
            try
            {
                Vehicle vehicle_new = new Vehicle
                {
                    Name = vehicle.Name,
                    Type = vehicle.Type

                };

                _vehicleRepository.Insert(vehicle_new);

                obj.status = "success";
                obj.Id = vehicle_new.Id;


            }
            catch (Exception ex)
            {
                obj.status = "failed";
                obj.erro = ex.ToString();
            }
            return obj;

        }


        /// <summary>
        /// 车辆详情
        /// </summary>
        [HttpGet]
        public object Details(int id)
        {
            dynamic obj = new ExpandoObject();

            try
            {
                Vehicle vehicle = _vehicleRepository.Single(a => a.Id == id);

                obj.status = "success";
                obj.vehicle = vehicle;

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
        /// <param name="value"></param>
        [HttpPost]
        public bool Delete(IEnumerable<int> value)
        {
            foreach (int id in value)
            {
                var vehicle = _vehicleRepository.Single(a => a.Id == id);
                _vehicleRepository.Delete(a => a.Id == id);
            }
            return true;
        }

        /// <summary>
        /// 删除调用
        /// </summary>
        /// <param name="id"></param>
        [HttpGet]
        public bool Delete_single(int id)
        {
            _vehicleRepository.Delete(a => a.Id == id);
            return true;
        }


        /// <summary>
        /// 车辆编辑
        /// </summary>
        [HttpPost]
        public object VehicleEdit(Vehicle vehicle)
        {
            dynamic obj = new ExpandoObject();
            try
            {
                Vehicle v = vehicle;

                //从数据库中查询正在编辑的学生信息
                Vehicle exist_vehicle = _vehicleRepository.Single(a => a.Id == vehicle.Id);
                //用模型对象中的数据更新student对象
                exist_vehicle.Id = vehicle.Id;
                exist_vehicle.Name = vehicle.Name;
                exist_vehicle.Type = vehicle.Type;
               

                //调用仓储服务中的Update方法，保存studnet对象中的数据，更新数据库表中的信息。
                Vehicle updatedvehicle = _vehicleRepository.Update(exist_vehicle);

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
