using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using FoodTracker.Application.Common.Exceptions;
using FoodTracker.Application.Common.Interfaces;
using FoodTracker.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace FoodTracker.Application.Products.Commands.UpdateProduct
{
    public class UpdateProductCommand : IRequest<ProductDto>
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public IList<ProductServingDto> Servings { get; set; }
    }

    public class UpdateProductCommandHandler : IRequestHandler<UpdateProductCommand, ProductDto>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMapper _mapper;

        public UpdateProductCommandHandler(IApplicationDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<ProductDto> Handle(UpdateProductCommand request, CancellationToken cancellationToken)
        {
            var entity = await _dbContext.Products
                .Include(x => x.ProductVersions)
                .ThenInclude(pv => pv.ProductServings)
                .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

            if (entity == null)
            {
                throw new NotFoundException(nameof(Product), request.Id);
            }

            var servings = _mapper.Map<IList<ProductServingDto>, IList<ProductServing>>(request.Servings);
            foreach (var productServing in servings)
            {
                productServing.Id = 0;
            }
            entity.ProductVersions.Add(new ProductVersion
            {
                Name = request.Name,
                ProductServings = servings
            });

            await _dbContext.SaveChangesAsync(cancellationToken);

            return new ProductDto(entity);
        }
    }


}
