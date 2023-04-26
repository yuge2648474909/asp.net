using Bootstrap.Client.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bootstrap.Client.Controllers
{
    public class ImageManagementController : Controller
    {
        public IActionResult ImageList(int id)
        {
            ViewBag.id = id;
            ViewBag.Title = "资源列表";
            return View(new NavigatorBarModel(this));
        }

        public IActionResult ImageDetail(int id)
        {
            ViewBag.id = id;
            return View(new NavigatorBarModel(this));
        }


        public IActionResult ImageCreate(int id)
        {
            ViewBag.id = id;
            return View(new NavigatorBarModel(this));
        }


    }
}
