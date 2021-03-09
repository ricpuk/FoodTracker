using System.Collections.Generic;
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
        private readonly IDataService _dataService;

        public GetProductQueryHandler(IApplicationDbContext dbContext, IMapper mapper, IDataService dataService)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _dataService = dataService;
        }

        public async Task<PaginatedList<ProductDto>> Handle(GetProductsByBarCodeQuery request, CancellationToken cancellationToken)
        {
            var products = await FetchProducts(request.BarCode, request.Page);

            if (products.TotalCount == 0)
            {
                throw new NotFoundException($"No products for bar code: {request.BarCode} have been found.");
            }

            return products;
        }

        private async Task<PaginatedList<ProductDto>> FetchProducts(string barCode, int page)
        {
            var products = _dbContext.Products
                .Where(x => x.BarCode == barCode)
                .ProjectTo<ProductDto>(_mapper.ConfigurationProvider);
            
            if (products.Any())
            {
                return await products.PaginatedListAsync(page, 10);
            }

            var dsProduct = await _dataService.FetchProduct(barCode);

            if (dsProduct == null)
            {
                return new PaginatedList<ProductDto>();
            }

            var productDto = _mapper.Map<ProductDto>(dsProduct);

            var dspServing = dsProduct.Serving;
            productDto.Servings = new List<ProductServingDto>
            {
                new()
                {
                    Calories = dspServing.Calories,
                    Carbohydrates = dspServing.Carbohydrates,
                    Fats = dspServing.Fats,
                    Fiber = dspServing.Fiber,
                    Protein = dspServing.Protein,
                    ServingSize = dspServing.ServingSize,
                    ServingSizeUnit = dspServing.ServingSizeUnits,
                    Sodium = dspServing.Sodium
                }
            };

            return new PaginatedList<ProductDto>(productDto);
        }
    }
}
