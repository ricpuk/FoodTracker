using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FoodTracker.WebUI.Controllers
{
    public class TraineesController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
