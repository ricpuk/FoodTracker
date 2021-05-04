using System.Threading;
using System.Threading.Tasks;
using FoodTracker.Application.Common.Exceptions;
using FoodTracker.Application.Common.Interfaces;
using MediatR;

namespace FoodTracker.Application.ProductReports.Commands.ResolveProductReport
{
    public class ResolveProductReportCommand : IRequest
    {
        public int Id { get; set; }
    }

    public class ResolveProductReportCommandHandler : IRequestHandler<ResolveProductReportCommand, Unit>
    {
        private readonly IApplicationDbContext _dbContext;

        public ResolveProductReportCommandHandler(IApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Unit> Handle(ResolveProductReportCommand request, CancellationToken cancellationToken)
        {
            var report = await _dbContext.ProductReports.FindAsync(request.Id);
            if (report == null)
            {
                throw new NotFoundException("Product report not found");
            }

            report.Resolved = true;

            await _dbContext.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
