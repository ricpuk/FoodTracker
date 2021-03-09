using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using FoodTracker.Application.Common.Exceptions;
using FoodTracker.Application.Common.Interfaces;
using FoodTracker.Application.Common.Mappings;
using FoodTracker.Application.Common.Models;
using MediatR;

namespace FoodTracker.Application.Products.Queries.GetProductsBySearch
{
    public class GetProductsBySearchQuery : IRequest<PaginatedList<ProductDto>>
    {
        public string Query { get; set; }
        public int Page { get; set; }
    }
    public class GetProductsBySearchQueryHandler : IRequestHandler<GetProductsBySearchQuery, PaginatedList<ProductDto>>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMapper _mapper;

        public GetProductsBySearchQueryHandler(IApplicationDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<PaginatedList<ProductDto>> Handle(GetProductsBySearchQuery request, CancellationToken cancellationToken)
        {
            var products = await _dbContext.Products
                .Where(x => x.Name == request.Query)
                .ProjectTo<ProductDto>(_mapper.ConfigurationProvider)
                .PaginatedListAsync(request.Page, 10);

            if (products.TotalCount == 0)
            {
                throw new NotFoundException($"No products for search query : ${request.Query} have been found.");
            }

            return products;
        }
    }
}
