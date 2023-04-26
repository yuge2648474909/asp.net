using Bootstrap.Client.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bootstrap.Client.Controllers
{
    public class ResourceManagementController : Controller
    {
        public IActionResult ResourceList()
        {
            return View(new NavigatorBarModel(this));
        }

        public IActionResult ResourceCreate()
        {
            return View(new NavigatorBarModel(this));
        }

        public IActionResult ImageList(int id)
        {
            ViewBag.id = id;
            return View(new NavigatorBarModel(this));
        }

        public IActionResult ImageCreate()
        {
            return View(new NavigatorBarModel(this));
        }

        public IActionResult ImageDetail(int id)
        {
            ViewBag.id = id;
            return View(new NavigatorBarModel(this));
        }

    }
}
