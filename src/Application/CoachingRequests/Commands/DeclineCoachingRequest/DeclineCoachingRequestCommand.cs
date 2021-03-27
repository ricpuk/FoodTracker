using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using FoodTracker.Application.Common.Exceptions;
using FoodTracker.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace FoodTracker.Application.CoachingRequests.Commands.DeclineCoachingRequest
{
    public class DeclineCoachingRequestCommand : IRequest<Unit>
    {
        public int RequestId { get; set; }
    }

    public class DeclineCoachingRequestCommandHandler: IRequestHandler<DeclineCoachingRequestCommand, Unit>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IIdentityService _identityService;

        public DeclineCoachingRequestCommandHandler(IApplicationDbContext dbContext, IIdentityService identityService)
        {
            _dbContext = dbContext;
            _identityService = identityService;
        }

        public async Task<Unit> Handle(DeclineCoachingRequestCommand request, CancellationToken cancellationToken)
        {
            var userProfile = await _identityService.GetCurrentUserProfileAsync();
            var coachingRequest =
                await _dbContext.CoachingRequests
                    .Where(x => x.Id == request.RequestId && x.ToId == userProfile.Id).SingleOrDefaultAsync(cancellationToken);

            if(coachingRequest == null)
            {
                throw new NotFoundException("Coaching request was not found");
            }

            _dbContext.CoachingRequests.Remove(coachingRequest);

            await _dbContext.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
