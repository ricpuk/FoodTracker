using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FoodTracker.Application.Common.Models;
using FoodTracker.Application.Products;
using FoodTracker.Application.Products.Queries.GetProductsWithPagination;
using FoodTracker.WebUI.Filters;
using MediatR;

namespace FoodTracker.WebUI.Controllers.Admin
{
    public class ProductsController : AdminApiControllerBase
    {
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
    }
}
