using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using FoodTracker.Application.Common.Exceptions;
using FoodTracker.Application.Common.Interfaces;
using FoodTracker.Domain.Entities;
using MediatR;

namespace FoodTracker.Application.CoachingRequests.Commands.AcceptCoachingRequest
{
    public class AcceptCoachingRequestCommand : IRequest<Unit>
    {
        public int RequestId { get; set; }
    }

    public class AcceptCoachingRequestCommandHandler : IRequestHandler<AcceptCoachingRequestCommand, Unit>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IIdentityService _identityService;

        public AcceptCoachingRequestCommandHandler(IApplicationDbContext dbContext, IIdentityService identityService)
        {
            _dbContext = dbContext;
            _identityService = identityService;
        }
        public async Task<Unit> Handle(AcceptCoachingRequestCommand request, CancellationToken cancellationToken)
        {
            var userProfile = await _identityService.GetCurrentUserProfileIdAsync();
            var coachingRequest = _dbContext
                .CoachingRequests
                .SingleOrDefault(x => x.Id == request.RequestId && x.ToId == userProfile);

            if (coachingRequest == null)
            {
                throw new NotFoundException("Coaching request was not found");
            }

            var coachProfile = _dbContext.UserProfiles.Single(x => x.Id == userProfile);
            var clientProfile = _dbContext.UserProfiles.Single(x => x.Id == coachingRequest.FromId);

            coachProfile.Trainees.Add(clientProfile);
            clientProfile.Trainer = coachProfile;
            coachingRequest.Status = CoachingRequestStatus.Accepted;

            RevokeOtherRequests(coachingRequest.Id, coachingRequest.FromId);

            await _dbContext.SaveChangesAsync(cancellationToken);

            return Unit.Value;


        }

        private void RevokeOtherRequests(int currentRequestId, int fromId)
        {
            var coachingRequests = _dbContext
                .CoachingRequests
                .Where(x => x.FromId == fromId && x.Id != currentRequestId);
            _dbContext.CoachingRequests.RemoveRange(coachingRequests);
        }
    }
}
