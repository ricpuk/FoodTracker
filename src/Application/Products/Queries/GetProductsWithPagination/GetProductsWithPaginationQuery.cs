using AutoMapper;
using AutoMapper.QueryableExtensions;
using FoodTracker.Application.Common.Exceptions;
using FoodTracker.Application.Common.Interfaces;
using FoodTracker.Application.Common.Mappings;
using FoodTracker.Application.Common.Models;
using MediatR;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace FoodTracker.Application.Products.Queries.GetProductsWithPagination
{
    public class GetProductsWithPaginationQuery : IRequest<PaginatedList<ProductDto>>
    {
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
            var products = await _dbContext.Products
                .OrderByDescending(p => p.Created)
                .Include(x => x.ProductServings)
                .ProjectTo<ProductDto>(_mapper.ConfigurationProvider)
                .PaginatedListAsync(request.Page, request.PageSize);

            if (products.TotalCount == 0)
            {
                throw new NotFoundException("No products have been found.");
            }

            return products;
        }
    }
}
