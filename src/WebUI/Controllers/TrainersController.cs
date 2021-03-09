using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FoodTracker.WebUI.Controllers
{
    public class TrainersController : ApiControllerBase
    {
        public IActionResult Index()
        {
            return Ok();
        }
    }
}
