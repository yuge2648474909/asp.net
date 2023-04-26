using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Bootstrap.Client.Models;
using Microsoft.AspNetCore.Mvc;

namespace Bootstrap.Client.Controllers
{
    public class DashboardController : Controller
    {
        // GEt: Home/Index
        public IActionResult Index()
        {

            //返回一个视图对象
            return View(new NavigatorBarModel(this));
        }
    }
}
