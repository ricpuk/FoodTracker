using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using FoodTracker.Application.Common.DTOs;
using FoodTracker.Application.Common.Exceptions;
using FoodTracker.Application.Common.Interfaces;
using FoodTracker.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace FoodTracker.Application.Users.Queries.GetUserStats
{
    public class GetUserStatsQuery : IRequest<List<UserStatDto>>
    {
        public int ProfileId { get; set; }
    }

    public class GetUserStatsQueryHandler : IRequestHandler<GetUserStatsQuery, List<UserStatDto>>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IIdentityService _identityService;

        public GetUserStatsQueryHandler(IApplicationDbContext dbContext, IIdentityService identityService)
        {
            _dbContext = dbContext;
            _identityService = identityService;
        }

        public async Task<List<UserStatDto>> Handle(GetUserStatsQuery request, CancellationToken cancellationToken)
        {
            await ValidateAuthorization(request.ProfileId);
                var today = DateTime.UtcNow.Date;
            var weekBefore = today.AddDays(-7);
            var stats = await _dbContext.Diaries
                .Where(x => x.UserProfileId == request.ProfileId && x.Date <= today && x.Date > weekBefore)
                .OrderByDescending(x => x.Date)
                .Select(x => new UserStatDto
                    {
                        Weight = x.Weight, 
                        WaterIntake = x.WaterIntake, 
                        Date = x.Date
                    })
                .ToListAsync(cancellationToken);

            return stats;

        }

        private async Task ValidateAuthorization(int profileId)
        {
            var userProfile = await _identityService.GetCurrentUserProfileAsync();
            var profile = await _dbContext.UserProfiles.SingleOrDefaultAsync(x =>
                x.Id == profileId &&
                (userProfile.Id == x.Id || x.TrainerId == userProfile.Id || userProfile.TrainerId == x.Id));
            if (profile == null)
            {
                throw new ForbiddenAccessException();
            }
        }
    }
}
