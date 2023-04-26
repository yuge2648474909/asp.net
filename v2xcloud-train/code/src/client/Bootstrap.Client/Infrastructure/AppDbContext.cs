using Bootstrap.Client.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bootstrap.Client.Infrastructure
{
    public class AppDbContext:DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        { }

        public DbSet<Staff> staff { get; set; }
        public DbSet<Company> company { get; set; }
        public DbSet<Login_log> login_log { get; set; }

        public DbSet<ReseultTest> reseultTest { get; set; }
        public DbSet<Department> department { get; set; }

        public DbSet<Log> log { get; set; }
        public DbSet<ProviderInfo> providerInfo { get; set; }
        public DbSet<Vehicle> vehicle { get; set; }

        public DbSet<Device> device { get; set; }

        public DbSet<Resource> resource { get; set; }

        public DbSet<Image> image { get; set; }

    }
}
