using System;
using System.Threading;
using System.Threading.Tasks;
using FoodTracker.Application.Common.DTOs;
using FoodTracker.Application.Common.Exceptions;
using FoodTracker.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace FoodTracker.Application.Clients.Queries.GetClientsDiary
{
    public class GetClientsDiaryQuery : IRequest<DiaryDto>
    {
        public int ClientId { get; set; }
        public DateTime DiaryDate { get; set; }
    }

    public class GetClientsDiaryQueryHandler : IRequestHandler<GetClientsDiaryQuery, DiaryDto>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IIdentityService _identityService;

        public GetClientsDiaryQueryHandler(IApplicationDbContext dbContext, IIdentityService identityService)
        {
            _dbContext = dbContext;
            _identityService = identityService;
        }

        public async Task<DiaryDto> Handle(GetClientsDiaryQuery request, CancellationToken cancellationToken)
        {
            await CheckIfClient(request.ClientId);
            var diary = await _dbContext.Diaries
                .Include(x => x.Entries)
                    .ThenInclude(de => de.ProductVersion)
                        .ThenInclude(pv => pv.ProductServings)
                .Include(x => x.Entries)
                    .ThenInclude(de => de.ProductVersion)
                        .ThenInclude(pv => pv.Product)
                .Include(x => x.UserGoals)
                .SingleOrDefaultAsync(x => x.Date == request.DiaryDate.Date && x.UserProfileId == request.ClientId, cancellationToken);
            if(diary == null)
            {
                throw new NotFoundException("No diary for this client was found");
            }
            var diaryDto = new DiaryDto(diary);

            return diaryDto;
        }

        private async Task CheckIfClient(int clientId)
        {
            var userProfile = await _identityService.GetCurrentUserProfileIdAsync();
            var profile = await _dbContext.UserProfiles.SingleOrDefaultAsync(x => x.Id == clientId && x.TrainerId == userProfile);
            if (profile == null)
            {
                throw new ForbiddenAccessException();
            }

        }

    }
}
