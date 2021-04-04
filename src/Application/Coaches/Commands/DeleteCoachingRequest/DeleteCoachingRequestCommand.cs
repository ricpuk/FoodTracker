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

namespace FoodTracker.Application.Coaches.Commands.DeleteCoachingRequest
{
    public class DeleteCoachingRequestCommand : IRequest<Unit>
    {
        public int CoachId { get; set; }
    }


    public class DeleteCoachingRequestCommandHandler : IRequestHandler<DeleteCoachingRequestCommand, Unit>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IIdentityService _identityService;

        public DeleteCoachingRequestCommandHandler(IApplicationDbContext dbContext, IIdentityService identityService)
        {
            _dbContext = dbContext;
            _identityService = identityService;
        }

        public async Task<Unit> Handle(DeleteCoachingRequestCommand request, CancellationToken cancellationToken)
        {
            var userProfile = await _identityService.GetCurrentUserProfileIdAsync();

            var coachingRequest = await _dbContext
                    .CoachingRequests
                    .Where(x => x.FromId == userProfile && x.ToId == request.CoachId)
                    .SingleOrDefaultAsync(cancellationToken);

            if (coachingRequest == null)
            {
                throw new NotFoundException("Coaching request was not found.");
            }

            _dbContext.CoachingRequests.Remove(coachingRequest);

            await _dbContext.SaveChangesAsync(cancellationToken);

            return Unit.Value;

        }
    }
}
