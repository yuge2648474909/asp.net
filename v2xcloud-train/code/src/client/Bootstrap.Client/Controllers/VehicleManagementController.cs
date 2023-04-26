using Bootstrap.Client.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bootstrap.Client.Controllers
{
    public class VehicleManagementController : Controller
    {
        public IActionResult VehicleList()
        {
            return View(new NavigatorBarModel(this));
        }

        public IActionResult VehicleCreate()
        {
            return View(new NavigatorBarModel(this));
        }

        public IActionResult VehicleEdit(int id)
        {
            ViewBag.id = id;
            return View(new NavigatorBarModel(this));
        }

        public IActionResult VehicleDetail(int id)
        {
            ViewBag.id = id;
            return View(new NavigatorBarModel(this));
        }
    }
}
