using System.Collections.Generic;
using AutoMapper;
using FoodTracker.Application.Common.Interfaces;
using FoodTracker.Application.Common.Mappings;
using FoodTracker.Application.Common.Models;
using MediatR;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using FoodTracker.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace FoodTracker.Application.Products.Queries.GetProductsWithPagination
{
    public class GetProductsWithPaginationQuery : IRequest<PaginatedList<ProductDto>>
    {
        public string Query { get; set; }
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 25;
    }

    public class GetProductsWithPaginationQueryHandler : IRequestHandler<GetProductsWithPaginationQuery, PaginatedList<ProductDto>>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMapper _mapper;

        public GetProductsWithPaginationQueryHandler(IApplicationDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<PaginatedList<ProductDto>> Handle(GetProductsWithPaginationQuery request, CancellationToken cancellationToken)
        {
            var query = _dbContext.Products
                .OrderByDescending(p => p.Created)
                .Include(x => x.ProductVersions)
                .ThenInclude(pv => pv.ProductServings)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(request.Query))
            {
                query = query.Where(x => x.ProductVersions.OrderByDescending(pv => pv.Id).First().Name.Contains(request.Query));
            }

            var products = await query.PaginatedListAsync(request.Page, request.PageSize);

            return ProjectToDto(products);
        }

        private PaginatedList<ProductDto> ProjectToDto(PaginatedList<Product> products)
        {
            var result = new List<ProductDto>();
            foreach (var product in products.Items) {

                var productDto = new ProductDto(product);
                result.Add(productDto);
            }

            return new PaginatedList<ProductDto>(result, products.PageIndex, products.TotalPages, products.TotalCount, true);
        }
    }
}
