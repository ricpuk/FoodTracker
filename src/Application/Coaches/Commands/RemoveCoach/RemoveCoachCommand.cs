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

namespace FoodTracker.Application.Coaches.Commands.RemoveCoach
{
    public class RemoveCoachCommand : IRequest<Unit>
    {
    }

    public class RemoveCoachCommandHandler : IRequestHandler<RemoveCoachCommand, Unit>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IIdentityService _identityService;

        public RemoveCoachCommandHandler(IApplicationDbContext dbContext, IIdentityService identityService)
        {
            _dbContext = dbContext;
            _identityService = identityService;
        }

        public async Task<Unit> Handle(RemoveCoachCommand request, CancellationToken cancellationToken)
        {
            var profileId = await _identityService.GetCurrentUserProfileIdAsync();

            var myProfile = await _dbContext.UserProfiles.FindAsync(profileId);

            if (myProfile == null || myProfile.TrainerId == null)
            {
                throw new NotFoundException("You currently do not have a coach");
            }

            myProfile.TrainerId = null;

            var trainerProfile = await _dbContext.UserProfiles
                .Include(x => x.Trainees)
                .Where(x => x.Id == myProfile.TrainerId)
                .FirstOrDefaultAsync(cancellationToken);

            trainerProfile?.Trainees.Remove(myProfile);

            await _dbContext.SaveChangesAsync(cancellationToken);
            return Unit.Value;
        }
    }
}
