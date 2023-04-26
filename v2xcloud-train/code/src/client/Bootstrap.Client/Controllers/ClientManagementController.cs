using Bootstrap.Client.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bootstrap.Client.Controllers
{
    public class ClientManagementController : Controller
    {
        public IActionResult StaffList()
        {
            return View(new NavigatorBarModel(this)); ;
        }

        public IActionResult StaffDetails(int id)
        {
            ViewBag.id = id;
            return View(new NavigatorBarModel(this)); ;
        }

        public IActionResult StaffEdit(int id)
        {
            ViewBag.id = id;
            return View(new NavigatorBarModel(this)); ;
        }
        public IActionResult StaffCreate()
        {
            return View(new NavigatorBarModel(this)); ;
        }

        public IActionResult CompanyList()
        {
            return View(new NavigatorBarModel(this)); ;
        }

        public IActionResult CompanyDetails(int id)
        {
            ViewBag.id = id;
            return View(new NavigatorBarModel(this)); ;
        }

        public IActionResult CompanyEdit(int id)
        {
            ViewBag.id = id;
            return View(new NavigatorBarModel(this)); ;
        }
        public IActionResult CompanyCreate()
        {
            return View(new NavigatorBarModel(this)); ;
        }

        public IActionResult DepartmentList()
        {
            return View(new NavigatorBarModel(this)); ;
        }

        public IActionResult DepartmentDetails(int id)
        {
            ViewBag.id = id;
            return View(new NavigatorBarModel(this)); ;
        }

        public IActionResult DepartmentEdit(int id)
        {
            ViewBag.id = id;
            return View(new NavigatorBarModel(this)); ;
        }
        public IActionResult DepartmentCreate()
        {
            return View(new NavigatorBarModel(this)); ;
        }


    }
}
