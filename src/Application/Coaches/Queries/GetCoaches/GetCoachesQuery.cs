using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using FoodTracker.Application.Common.DTOs;
using FoodTracker.Application.Common.Interfaces;
using FoodTracker.Application.Common.Mappings;
using FoodTracker.Application.Common.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace FoodTracker.Application.Coaches.Queries.GetCoaches
{
    public class GetCoachesQuery : IRequest<PaginatedList<CoachDto>>
    {
        public int Page { get; set; }

    }

    public class GetCoachesQueryHandler: IRequestHandler<GetCoachesQuery, PaginatedList<CoachDto>>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IIdentityService _identityService;

        public GetCoachesQueryHandler(IApplicationDbContext dbContext, IMapper mapper, IIdentityService identityService)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _identityService = identityService;

        }

        public async Task<PaginatedList<CoachDto>> Handle(GetCoachesQuery request, CancellationToken cancellationToken)
        {
            var profile = await _identityService.GetCurrentUserProfileIdAsync();

            var coaches = await _dbContext
                .UserProfiles
                .Include(x => x.Trainees)
                .Where(x => x.Id != profile)
                .ProjectTo<CoachDto>(_mapper.ConfigurationProvider)
                .PaginatedListAsync(request.Page, 100);

            var coachingRequests = await _dbContext.CoachingRequests.Where(x => x.FromId == profile).ToListAsync();

            foreach (var coachesItem in coaches.Items)
            {
                coachesItem.CoachingRequested = coachingRequests.Any(x => x.ToId == coachesItem.Id);
            }

            return coaches;
        }
    }
}
