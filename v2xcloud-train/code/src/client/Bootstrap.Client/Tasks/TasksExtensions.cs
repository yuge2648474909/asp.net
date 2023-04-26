using Bootstrap.Client.Infrastructure;
using Bootstrap.Client.Infrastructure.Repositories;
using Bootstrap.Client.Models;
using Bootstrap.Security;
using Longbow.Tasks;
using Microsoft.Extensions.Hosting;
using System.Linq;
using System.Threading;
using Task = System.Threading.Tasks.Task;

namespace Microsoft.Extensions.DependencyInjection
{
    /// <summary>
    /// 后台任务扩展方法
    /// </summary>
    internal static class TasksExtensions
    {
        /// <summary>
        /// 添加示例后台任务
        /// </summary>
        /// <param name="services"></param>
        public static IServiceCollection AddBootstrapAdminBackgroundTask(this IServiceCollection services)
        {
            //services.AddTaskServices(builder => builder.AddFileStorage());
            services.AddHostedService<BootstrapAdminBackgroundServices>();
            return services;
        }
    }

    /// <summary>
    /// 后台任务服务类
    /// </summary>
    internal class BootstrapAdminBackgroundServices : BackgroundService
    {
        /// <summary>
        /// 运行任务
        /// </summary>
        /// <param name="stoppingToken"></param>
        /// <returns></returns>
        protected override Task ExecuteAsync(CancellationToken stoppingToken) => Task.Run(() =>
        {

        });
    }
}
