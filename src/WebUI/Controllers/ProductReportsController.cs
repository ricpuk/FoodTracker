﻿using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using FoodTracker.Application.ProductReports.Commands.CreateProductReport;

namespace FoodTracker.WebUI.Controllers
{
    public class ProductReportsController : ApiControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> Index(CreateProductReportCommand command)
        {
            return Ok(await Mediator.Send(command));
        }
    }
}
