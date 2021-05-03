using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FoodTracker.Application.Common.Models;
using FoodTracker.Application.Products;
using FoodTracker.Application.Products.Commands.UpdateProduct;
using FoodTracker.Application.Products.Queries.GetProductsWithPagination;
using FoodTracker.WebUI.Filters;
using MediatR;
using Microsoft.AspNetCore.Authorization;

namespace FoodTracker.WebUI.Controllers.Admin
{
    public class ProductsController : AdminApiControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<PaginatedList<ProductDto>>> AdminList([FromQuery] string query, [FromQuery] int page = 1, [FromQuery] int pageSize = 25)
        {
            var sQuery = new GetProductsWithPaginationQuery
            {
                Query = query,
                Page = page,
                PageSize = pageSize
            };
            return Ok(await Mediator.Send(sQuery));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, UpdateProductCommand command)
        {
            command.Id = id;

            await Mediator.Send(command);

            return NoContent();
        }
    }
}
