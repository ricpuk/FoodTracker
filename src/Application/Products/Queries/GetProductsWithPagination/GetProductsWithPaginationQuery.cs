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
                .Include(x => x.ProductServings)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(request.Query))
            {
                query = query.Where(x => x.SearchVector.Matches(request.Query));
            }

            var products = await query.ProjectTo<ProductDto>(_mapper.ConfigurationProvider)
                .PaginatedListAsync(request.Page, request.PageSize);

            return products;
        }
    }
}
