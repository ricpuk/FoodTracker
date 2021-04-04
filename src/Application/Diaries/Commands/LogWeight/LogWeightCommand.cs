using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using FoodTracker.Application.Common.Exceptions;
using FoodTracker.Application.Common.Interfaces;
using MediatR;

namespace FoodTracker.Application.Diaries.Commands.LogWeight
{
    public class LogWeightCommand : IRequest<Unit>
    {
        public DateTime Date { get; set; }
        public double Weight { get; set; }
    }

    public class LogWeightCommandHandler : IRequestHandler<LogWeightCommand, Unit>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IIdentityService _identityService;

        public LogWeightCommandHandler(IApplicationDbContext dbContext, IIdentityService identityService)
        {
            _dbContext = dbContext;
            _identityService = identityService;
        }

        public async Task<Unit> Handle(LogWeightCommand request, CancellationToken cancellationToken)
        {
            var userProfile = await _identityService.GetCurrentUserProfileIdAsync();
            var diary = _dbContext.Diaries.SingleOrDefault(x =>
                x.UserProfileId == userProfile && x.Date == request.Date.Date);

            if (diary == null)
            {
                throw new NotFoundException("Diary was not found");
            }

            diary.Weight = request.Weight;

            await _dbContext.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
