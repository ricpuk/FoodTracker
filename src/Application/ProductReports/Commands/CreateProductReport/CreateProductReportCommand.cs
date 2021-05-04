using System.Threading;
using System.Threading.Tasks;
using FoodTracker.Application.Common.Exceptions;
using FoodTracker.Application.Common.Interfaces;
using FoodTracker.Domain.Entities;
using FoodTracker.Domain.Enums;
using MediatR;

namespace FoodTracker.Application.ProductReports.Commands.CreateProductReport
{
    public class CreateProductReportCommand : IRequest
    {
        public int ProductId { get; set; }
        public ProductReportReason Reason { get; set; }

    }

    public class CreateProductReportCommandHandler : IRequestHandler<CreateProductReportCommand, Unit>
    {
        private readonly IApplicationDbContext _dbContext;

        public CreateProductReportCommandHandler(IApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<Unit> Handle(CreateProductReportCommand request, CancellationToken cancellationToken)
        {
            var product = await _dbContext.Products.FindAsync(request.ProductId);
            if (product == null)
            {
                throw new NotFoundException("Product was not found");
            }

            var entity = new ProductReport
            {
                ProductId = request.ProductId,
                Reason = request.Reason,
                Resolved = false
            };

            await _dbContext.ProductReports.AddAsync(entity, cancellationToken);

            await _dbContext.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
