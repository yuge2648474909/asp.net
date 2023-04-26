using Bootstrap.Client.Infrastructure.Repositories;
using Bootstrap.Client.Models;
using Bootstrap.Client.Tasks;
using Longbow;
using Longbow.Tasks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bootstrap.Client.Infrastructure
{
    public static class ServiceLocator
    {
        public static IRepository<Company, int> repository_company { get; set; }
        public static IRepository<Staff, int> repository_staff { get; set; }
        public static IRepository<ProviderInfo, int> repository_provider { get; set; }
        public static IRepository<Log, int> repository_log { get; set; }

        //public static IRepository<ChildDeviceData, int> repository_child_device_data { get; set; }
        //public static IRepository<WorkzoneDevicesSetup, int> repository_workzone_setup { get; set; }
        //public static IRepository<SmartTemplate, int> repository_smart_template { get; set; }
        //public static IRepository<Device, int> repository_device { get; set; }

        public static void InitAppService()
        {

            IRepository<Staff, int> _staffRepository = repository_staff;
            //每次重启服务器之后，后台的任务就会终止，这里重新启动
            //遍历所有的作业区
            var staffs = repository_staff.GetAll();
            foreach (Staff staff in staffs)
            {
                if (!String.IsNullOrEmpty(staff.userid))       //说明是企业微信，微信没有此功能，不处理
                {
                    string running_status = staff.running_status;
                    if (running_status == "running")
                    {


                        string taskName = staff.userid;  //默认用用户id作为任务名称

                        // 加载任务执行体
                        // 此处可以扩展为任意 DLL 中的任意继承 ITask 接口的实体类
                        string TaskExecutorName = "Bootstrap.Client.Tasks.MessageSenderTaskExecutor";
                        var taskExecutor = (MessageSenderTaskExecutor)LgbActivator.CreateInstance<ITask>("Bootstrap.Client", TaskExecutorName);
                        taskExecutor.TaskName = taskName;

                        // 此处未存储到数据库中，直接送入任务中心
                        TaskServicesManager.Remove(taskName);
                        //默认为每10秒钟更新一次
                        TaskServicesManager.GetOrAdd(taskName, token => taskExecutor.Execute(token), TriggerBuilder.Default.WithInterval(10000).Build());


                    }



                }

            }
        }
    }
}
