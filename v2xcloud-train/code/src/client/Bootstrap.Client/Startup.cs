using Bootstrap.Client.DataAccess;
using Bootstrap.Client.Infrastructure;
using Bootstrap.Client.Infrastructure.Repositories;
using Bootstrap.Client.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;
using NetCore.AutoRegisterDi;
using System;
using System.IO;
using System.Reflection;

namespace Bootstrap.Client
{
    /// <summary>
    /// Startup 启动配置文件
    /// </summary>
    public class Startup
    {
        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="configuration"></param>
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        /// <summary>
        /// 获得 系统配置项 Iconfiguration 实例
        /// </summary>
        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        /// <summary>
        /// 服务容器注入方法
        /// </summary>
        /// <param name="services"></param>
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddLogging(builder => builder.AddFileLogger());
            services.AddCors();
            services.AddResponseCompression();

            services.AddCodePageProvider();
            services.AddCacheManager();
            services.AddDbAdapter();
            services.AddBootstrapHttpClient();
            services.AddIPLocator(DictHelper.ConfigIPLocator);
            services.AddOnlineUsers();
            services.AddBootstrapAdminAuthentication(Configuration);
            services.AddAuthorization(options => options.DefaultPolicy = new AuthorizationPolicyBuilder().RequireBootstrapAdminAuthorizate().Build());
            services.AddButtonAuthorization(MenuHelper.AuthorizateButtons);

            services.AddSendMail();

            // 添加Swagger
            services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });
                // 获取xml文件名
                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                // 获取xml文件路径
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                // 添加控制器层注释，true表示显示控制器注释
                options.IncludeXmlComments(xmlPath, true);
            });

            services.AddControllersWithViews(options =>
            {
                options.Filters.Add<BootstrapAdminAuthorizeFilter>();
                options.Filters.Add<ExceptionFilter>();
            }).AddJsonOptions(op => op.JsonSerializerOptions.AddDefaultConverters());

            //使用mysql数据库，通过Iconfiguration访问去获取，自定义名称client作为我们的连接字符串，需要安装mysql entityframeworkcore包
            services.AddDbContextPool<AppDbContext>(
                Options => Options.UseMySQL(Configuration.GetConnectionString("client")));
            services.AddControllersWithViews().AddXmlSerializerFormatters();

            services.AddTransient(typeof(IRepository<,>), typeof(RepositoryBase<,>));
            //自动注入服务到依赖注入容器
            services.RegisterAssemblyPublicNonGenericClasses()
             .Where(c => c.Name.EndsWith("Service"))
            .AsPublicImplementedInterfaces(ServiceLifetime.Scoped);

            services.AddBootstrapAdminBackgroundTask();

            services.AddTaskServices();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        /// <summary>
        /// 管道构建方法
        /// </summary>
        /// <param name="app"></param>
        /// <param name="env"></param>
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            //TestDbOperation.Instance = app.ApplicationServices;
       
            app.UseForwardedHeaders(new ForwardedHeadersOptions() { ForwardedHeaders = ForwardedHeaders.All });
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                app.UseHsts();
            }

            app.UseStatusCodePagesWithReExecute("/Home/Error/{0}");
            app.UseHttpsRedirection();
            app.UseResponseCompression();
            app.UseStaticFiles();

            // 添加Swagger有关中间件
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "API Demo v1");
            });

            app.UseRouting();
            app.UseCors(builder => builder.WithOrigins(Configuration["AllowOrigins"].Split(',', StringSplitOptions.RemoveEmptyEntries)).AllowAnyHeader().AllowAnyMethod().AllowCredentials());
            app.UseBootstrapAdminAuthentication(RoleHelper.RetrievesByUserName, RoleHelper.RetrievesByUrl, AppHelper.RetrievesByUserName);
            app.UseAuthorization();
            app.UseCacheManager();
            app.UseOnlineUsers(callback: TraceHelper.Save);
            //app.UseEndpoints(endpoints => endpoints.MapDefaultControllerRoute());
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                        name: "default",
                        pattern: "{controller=Home}/{action=Index}/{id?}");
            });

            //手动获取依赖注入对象
            IServiceScope serviceScope = app.ApplicationServices.CreateScope();
            ServiceLocator.repository_company = serviceScope.ServiceProvider.GetService<IRepository<Company, int>>();
            ServiceLocator.repository_staff = serviceScope.ServiceProvider.GetService<IRepository<Staff, int>>();
            ServiceLocator.repository_provider = serviceScope.ServiceProvider.GetService<IRepository<ProviderInfo, int>>();
            ServiceLocator.repository_log = serviceScope.ServiceProvider.GetService<IRepository<Log, int>>();

            //初始化一些自定义的函数
            ServiceLocator.InitAppService();

        }
    }
}
