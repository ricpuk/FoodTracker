using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using FoodTracker.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace FoodTracker.Application.Clients.Commands
{
    public class StopCoachingClientCommand : IRequest<Unit>
    {
        public int ClientId { get; set; }
    }

    public class StopCoachingClientCommandHandler : IRequestHandler<StopCoachingClientCommand, Unit>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IIdentityService _identityService;

        public StopCoachingClientCommandHandler(IApplicationDbContext dbContext, IIdentityService identityService)
        {
            _dbContext = dbContext;
            _identityService = identityService;
        }

        public async Task<Unit> Handle(StopCoachingClientCommand request, CancellationToken cancellationToken)
        {
            var userProfile = await _identityService.GetCurrentUserProfileIdAsync();
            var client = await _dbContext.UserProfiles.SingleOrDefaultAsync(x => x.Id == request.ClientId && x.TrainerId == userProfile, cancellationToken);
            client.TrainerId = null;
            DeleteCoachingRequests(userProfile, client.Id);
            await _dbContext.SaveChangesAsync(cancellationToken);
            return Unit.Value;
        }

        private void DeleteCoachingRequests(int coachId, int clientId)
        {
            var requests = _dbContext.CoachingRequests.Where(x => x.FromId == clientId && x.ToId == coachId);
            _dbContext.CoachingRequests.RemoveRange(requests);

        }
    }
}
