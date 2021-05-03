using FoodTracker.Application.Common.Models;
using FoodTracker.Application.Products;
using FoodTracker.Application.Products.Queries.GetProductsByBarCode;
using FoodTracker.Application.Products.Queries.GetProductsWithPagination;
using System.Threading.Tasks;
using FoodTracker.Application.Products.Commands.CreateProduct;
using FoodTracker.Application.Products.Commands.UpdateProduct;
using FoodTracker.Infrastructure.Identity;
using FoodTracker.WebUI.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FoodTracker.WebUI.Controllers
{
    [Authorize]
    public class ProductsController : ApiControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<PaginatedList<ProductDto>>> Index([FromQuery] string query, [FromQuery] int page = 1, [FromQuery] int pageSize = 25)
        {
            var sQuery = new GetProductsWithPaginationQuery
            {
                Query = query,
                Page = page,
                PageSize = pageSize
            };
            return Ok(await Mediator.Send(sQuery));
        }

        [HttpGet("{barCode}")]
        public async Task<ActionResult<ProductDto>> GetByBarCode(string barCode, [FromQuery]int page)
        {
            var query = new GetProductsByBarCodeQuery
            {
                BarCode = barCode,
                Page = page
            };
            return Ok(await Mediator.Send(query));
        }

        [HttpPost]
        public async Task<ActionResult> Create(CreateProductCommand command)
        {
            return Ok(await Mediator.Send(command));
        }
    }
}
