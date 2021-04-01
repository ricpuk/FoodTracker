using System.Collections.Generic;
using AutoMapper;
using FoodTracker.Application.Common.Interfaces;
using MediatR;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace FoodTracker.Application.Products.Queries.GetProductsByBarCode
{
    public class GetProductsByBarCodeQuery : IRequest<ProductDto>
    {
        public int Page { get; set; } = 0;
        public string BarCode { get; set; }
    }

    public class GetProductQueryHandler : IRequestHandler<GetProductsByBarCodeQuery, ProductDto>
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

        public async Task<ProductDto> Handle(GetProductsByBarCodeQuery request, CancellationToken cancellationToken)
        {
            var productDto = await FetchProduct(request.BarCode);

            return productDto;
        }

        private async Task<ProductDto> FetchProduct(string barCode)
        {
            var product = _dbContext.Products
                .Include(x => x.ProductVersions).ThenInclude(pv => pv.ProductServings)
                .FirstOrDefault(x => x.BarCode == barCode);

            if (product != null)
            {
                var dto = new ProductDto(product) {Complete = true};
                return dto;
            }

            var dsProduct = await _dataService.FetchProduct(barCode);

            if (dsProduct == null)
            {
                return null;
            }

            var productDto = _mapper.Map<ProductDto>(dsProduct);
            productDto.Complete = false;
            var dspServing = dsProduct.Serving;
            productDto.Servings = new List<ProductServingDto>
            {
                new()
                {
                    Calories = dspServing.Calories,
                    Carbohydrates = dspServing.Carbohydrates,
                    Fats = dspServing.Fats,
                    Protein = dspServing.Protein,
                    ServingSize = dspServing.ServingSize,
                    ServingSizeUnit = dspServing.ServingSizeUnits,
                }
            };

            return productDto;
        }
    }
}
