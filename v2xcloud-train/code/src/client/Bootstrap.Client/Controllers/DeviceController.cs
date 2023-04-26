using Bootstrap.Client.Infrastructure.Repositories;
using Bootstrap.Client.Models;

using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bootstrap.Client.Controllers
{
    public class DeviceController : Controller
    {
       

        public IActionResult DeviceList()
        {
            return View(new NavigatorBarModel(this));
        }


        public IActionResult DeviceCreate()
        {
            return View(new NavigatorBarModel(this));
        }

        public IActionResult DeviceEdit(int id)
        {
            ViewBag.id = id;
            return View(new NavigatorBarModel(this));
        }

        public IActionResult DeviceDetail(int id)
        {
            ViewBag.id = id;
            return View(new NavigatorBarModel(this));
        }

        

    }
}
