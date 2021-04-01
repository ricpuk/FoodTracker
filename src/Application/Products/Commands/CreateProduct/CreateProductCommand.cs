using System.Collections;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using FoodTracker.Application.Common.Interfaces;
using FoodTracker.Domain.Entities;
using MediatR;

namespace FoodTracker.Application.Products.Commands.CreateProduct
{
    public class CreateProductCommand : IRequest<ProductDto>
    {
        public string BarCode { get; set; }
        public string Name { get; set; }
        public IList<ProductServingDto> Servings { get; set; }
    }

    public class CreateProductsCommandHandler : IRequestHandler<CreateProductCommand, ProductDto>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMapper _mapper;

        public CreateProductsCommandHandler(IApplicationDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<ProductDto> Handle(CreateProductCommand request, CancellationToken cancellationToken)
        {
            var product = new Product
            {
                BarCode = request.BarCode,
                ProductVersions = new List<ProductVersion> {
                    new()
                    {
                        Name = request.Name,
                    }
                },
                ProductServings = CreateProductServings(request.Servings)
            };

            await _dbContext.Products.AddAsync(product, cancellationToken);

            await _dbContext.SaveChangesAsync(cancellationToken);

            return _mapper.Map<ProductDto>(product);
            
        }

        private IList<ProductServing> CreateProductServings(IList<ProductServingDto> servingDtos)
        {
            var result = new List<ProductServing>();
            foreach (var productServingDto in servingDtos)
            {
                var serving = _mapper.Map<ProductServing>(productServingDto);
                serving.ProductServingVersions = new List<ProductServingVersion>
                {
                    new()
                    {
                        Calories = productServingDto.Calories,
                        Carbohydrates = productServingDto.Carbohydrates,
                        Fats = productServingDto.Fats,
                        Protein = productServingDto.Protein,
                        ServingSize = productServingDto.ServingSize,
                        ServingSizeUnit = productServingDto.ServingSizeUnit
                    }
                };
                result.Add(serving);
            }

            return result;
        }
    }
}
