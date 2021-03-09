using FoodTracker.Application.Common.Models;
using FoodTracker.Application.Products;
using FoodTracker.Application.Products.Commands;
using FoodTracker.Application.Products.Queries.GetProductsByBarCode;
using FoodTracker.Application.Products.Queries.GetProductsWithPagination;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using FoodTracker.Application.Products.Commands.CreateProduct;
using FoodTracker.Application.Products.Commands.UpdateProduct;
using FoodTracker.Application.Products.Queries.GetProductsBySearch;

namespace FoodTracker.WebUI.Controllers
{
    public class ProductsController : ApiControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<PaginatedList<ProductDto>>> Index([FromQuery] GetProductsWithPaginationQuery query)
        {
            return Ok(await Mediator.Send(query));
        }

        [HttpGet("{barCode}")]
        public async Task<ActionResult<PaginatedList<ProductDto>>> GetByBarCode(string barCode, [FromQuery]int page)
        {
            var query = new GetProductsByBarCodeQuery
            {
                BarCode = barCode,
                Page = page
            };
            return Ok(await Mediator.Send(query));
        }

        [HttpGet("search/{query}")]
        public async Task<ActionResult<PaginatedList<ProductDto>>> GetBySearch(string searchQ, [FromQuery] int page)
        {
            var query = new GetProductsBySearchQuery
            {
                Query = searchQ,
                Page = page
            };
            return Ok(await Mediator.Send(query));
        }

        [HttpPost]
        public async Task<ActionResult> Create(CreateProductCommand command)
        {
            return Ok(await Mediator.Send(command));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, UpdateProductCommand command)
        {
            if (id != command.Id)
            {
                return BadRequest();
            }

            await Mediator.Send(command);

            return NoContent();
        }
    }
}
