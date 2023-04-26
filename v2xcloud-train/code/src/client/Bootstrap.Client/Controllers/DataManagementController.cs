using Bootstrap.Client.Infrastructure.Repositories;
using Bootstrap.Client.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bootstrap.Client.Controllers
{
    public class DataManagementController : Controller
    {      
        public IActionResult LogList()
        {
            return View(new NavigatorBarModel(this)); ;
        }
    }
}
