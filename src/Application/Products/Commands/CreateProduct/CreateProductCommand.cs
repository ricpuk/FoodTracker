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
                        ProductServings = _mapper.Map<IList<ProductServingDto>, IList<ProductServing>>(request.Servings)
                    }
                },
                
            };

            await _dbContext.Products.AddAsync(product, cancellationToken);

            await _dbContext.SaveChangesAsync(cancellationToken);

            return new ProductDto(product);
            
        }
    }
}
