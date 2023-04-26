using Longbow;
using Longbow.Tasks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bootstrap.Client.Tasks
{
    public class TaskUtility
    {
        /// <summary>
        /// 开启后台任务
        /// </summary>
        public static void  StartMessageSender(string userid)
        {
            string TaskExecutorName = "Bootstrap.Client.Tasks.MessageSenderTaskExecutor";
            var taskExecutor = (MessageSenderTaskExecutor)LgbActivator.CreateInstance<ITask>("Bootstrap.Client", TaskExecutorName);
            string TaskName = userid;
            taskExecutor.TaskName = TaskName;

            // 此处未存储到数据库中，直接送入任务中心
            TaskServicesManager.Remove(TaskName);
            //默认为每10秒钟更新一次
            TaskServicesManager.GetOrAdd(TaskName, token => taskExecutor.Execute(token), TriggerBuilder.Default.WithInterval(10000).Build());


            //开启后台发送消息
            var sche = TaskServicesManager.Get(TaskExecutorName);
            if (sche != null) sche.Status = SchedulerStatus.Running;
        }

        /// <summary>
        /// 停止后台任务
        /// </summary>
        public static void StopMessageSender(string userid)
        {
            string TaskName = userid;
            TaskServicesManager.Remove(TaskName);

        }
    }
}
