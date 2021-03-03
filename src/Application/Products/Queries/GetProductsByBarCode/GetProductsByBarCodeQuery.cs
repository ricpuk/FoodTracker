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

namespace FoodTracker.Application.Products.Queries.GetProductsByBarCode
{
    public class GetProductsByBarCodeQuery : IRequest<PaginatedList<ProductDto>>
    {
        public int Page { get; set; } = 0;
        public string BarCode { get; set; }
    }

    public class GetProductQueryHandler : IRequestHandler<GetProductsByBarCodeQuery, PaginatedList<ProductDto>>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMapper _mapper;

        public GetProductQueryHandler(IApplicationDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<PaginatedList<ProductDto>> Handle(GetProductsByBarCodeQuery request, CancellationToken cancellationToken)
        {
            var products = await _dbContext.Products
                .Where(x => x.BarCode == request.BarCode)
                .ProjectTo<ProductDto>(_mapper.ConfigurationProvider)
                .PaginatedListAsync(request.Page, 10);

            if (products.TotalCount == 0)
            {
                throw new NotFoundException($"No products for bar code : ${request.BarCode} have been found.");
            }

            return products;
        }
    }
}
