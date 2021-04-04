using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using FoodTracker.Application.Common.Exceptions;
using FoodTracker.Application.Common.Interfaces;
using MediatR;

namespace FoodTracker.Application.Diaries.Commands.LogWaterIntake
{
    public class LogWaterIntakeCommand : IRequest<double>
    {
        public DateTime Date { get; set; }
        public double Amount { get; set; }
    }

    public class LogWaterIntakeCommandHandler: IRequestHandler<LogWaterIntakeCommand, double>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IIdentityService _identityService;

        public LogWaterIntakeCommandHandler(IApplicationDbContext dbContext, IIdentityService identityService)
        {
            _dbContext = dbContext;
            _identityService = identityService;
        }

        public async Task<double> Handle(LogWaterIntakeCommand request, CancellationToken cancellationToken)
        {
            var userProfile = await _identityService.GetCurrentUserProfileIdAsync();
            var diary = _dbContext.Diaries.SingleOrDefault(x => x.UserProfileId == userProfile && x.Date == request.Date.Date);
            if (diary == null)
            {
                throw new NotFoundException("Diary was not found");
            }

            diary.WaterIntake += request.Amount;

            await _dbContext.SaveChangesAsync(cancellationToken);

            return diary.WaterIntake;
        }
    }
}
