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
            entity.ProductServings = new List<ProductServing>
            {
                new()
                {
                    Calories = request.Calories,
                    Protein = request.Protein,
                    Carbohydrates = request.Carbohydrates,
                    Fats = request.Fats,
                    Sodium = request.Sodium
                }

            };

            await _dbContext.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }


}
