using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using FoodTracker.Application.Common.DTOs;
using FoodTracker.Application.Common.Models;
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
    }
}
