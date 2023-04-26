using System;
using System.Threading;
using System.Threading.Tasks;
using Bootstrap.Client.Infrastructure;
using Bootstrap.Client.Infrastructure.Repositories;
using Bootstrap.Client.Models;
using Longbow.Tasks;

namespace Bootstrap.Client
{
    /// <summary>
    /// 默认任务执行体实体类
    /// </summary>
    ///
    public class DefaultTaskExecutor : ITask
    {

        /// <summary>
        /// 任务执行方法
        /// </summary>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        public Task Execute(CancellationToken cancellationToken)
        {
            

            return Task.CompletedTask;

        }
        //=> Task.Delay(1000, cancellationToken);
    }
}
