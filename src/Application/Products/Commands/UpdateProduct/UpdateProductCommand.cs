using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using FoodTracker.Application.Common.Exceptions;
using FoodTracker.Application.Common.Interfaces;
using FoodTracker.Domain.Entities;
using MediatR;

namespace FoodTracker.Application.Products.Commands.UpdateProduct
{
    public class UpdateProductCommand : IRequest
    {
        public int Id { get; set; }
        public string BarCode { get; set; }
        public int Calories { get; set; }
        public double Protein { get; set; }
        public double Carbohydrates { get; set; }
        public double Fats { get; set; }
        public double Sodium { get; set; }
    }

    public class UpdateProductCommandHandler : IRequestHandler<UpdateProductCommand, Unit>
    {
        private readonly IApplicationDbContext _dbContext;

        public UpdateProductCommandHandler(IApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Unit> Handle(UpdateProductCommand request, CancellationToken cancellationToken)
        {
            var entity = await _dbContext.Products.FindAsync(request.Id, cancellationToken);

            if (entity == null)
            {
                throw new NotFoundException(nameof(Product), request.Id);
            }

            entity.BarCode = request.BarCode;
            entity.ProductServings = CreateProductServings(request);

            await _dbContext.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }

        private static List<ProductServing> CreateProductServings(UpdateProductCommand command)
        {
            return new()
            {
                new ProductServing
                {
                    ProductServingVersions = new List<ProductServingVersion>()
                    {
                        new()
                        {
                            Calories = command.Calories,
                            Protein = command.Protein,
                            Carbohydrates = command.Carbohydrates,
                            Fats = command.Fats,
                        }
                    }

                }
            };
        }
    }


}
