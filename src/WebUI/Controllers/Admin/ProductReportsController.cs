using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using FoodTracker.Application.Common.DTOs;
using FoodTracker.Application.Common.Models;
using FoodTracker.Application.ProductReports.Commands.ResolveProductReport;
using FoodTracker.Application.ProductReports.Queries;

namespace FoodTracker.WebUI.Controllers.Admin
{
    public class ProductReportsController : AdminApiControllerBase
    {
        public async Task<ActionResult<PaginatedList<ProductReportDto>>> Index([FromQuery] int page = 1, [FromQuery] int pageSize = 25)
        {
            var sQuery = new GetProductReportsListQuery()
            {
                Page = page,
                PageSize = pageSize
            };
            return Ok(await Mediator.Send(sQuery));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id)
        {
            var command = new ResolveProductReportCommand
            {
                Id = id
            };
            return Ok(await Mediator.Send(command));
        }
    }
}
