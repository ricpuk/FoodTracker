using System;
using System.Threading;
using System.Threading.Tasks;
using FoodTracker.Application.Common.Interfaces;
using FoodTracker.Domain.Entities;
using MediatR;

namespace FoodTracker.Application.Coaches.Commands.CreateCoachingRequest
{
    public class CreateCoachingRequestCommand : IRequest<Unit>
    {
        public int CoachId { get; set; }
    }

    public class CreateCoachingRequestCommandHandler: IRequestHandler<CreateCoachingRequestCommand, Unit>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IIdentityService _identityService;

        public CreateCoachingRequestCommandHandler(IApplicationDbContext dbContext, IIdentityService identityService)
        {
            _dbContext = dbContext;
            _identityService = identityService;
        }

        public async Task<Unit> Handle(CreateCoachingRequestCommand request, CancellationToken cancellationToken)
        {
            var userProfile = await _identityService.GetCurrentUserProfileIdAsync();

            var coachingRequest = new CoachingRequest
            {
                FromId = userProfile,
                ToId = request.CoachId
            };

            await _dbContext.CoachingRequests.AddAsync(coachingRequest, cancellationToken);

            await _dbContext.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
