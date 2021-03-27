using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using FoodTracker.Application.Common.DTOs;
using FoodTracker.Application.Common.Interfaces;
using FoodTracker.Application.Common.Mappings;
using FoodTracker.Application.Common.Models;
using FoodTracker.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace FoodTracker.Application.Clients.Queries.GetCachingRequests
{
    public class GetCoachingRequestsQuery : IRequest<PaginatedList<CoachingRequestDto>>
    {
        public int Page { get; set; }
    }

    public class GetCoachingRequestsQueryHandler : IRequestHandler<GetCoachingRequestsQuery, PaginatedList<CoachingRequestDto>>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IIdentityService _identityService;

        public GetCoachingRequestsQueryHandler(IApplicationDbContext dbContext, IMapper mapper, IIdentityService identityService)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _identityService = identityService;
        }

        public async Task<PaginatedList<CoachingRequestDto>> Handle(GetCoachingRequestsQuery request, CancellationToken cancellationToken)
        {
            var profile = await _identityService.GetCurrentUserProfileAsync();

            var requests = await _dbContext
                .CoachingRequests
                .Include(x => x.From)
                .Where(x => x.ToId == profile.Id && x.Status == CoachingRequestStatus.Sent)
                .ProjectTo<CoachingRequestDto>(_mapper.ConfigurationProvider)
                .PaginatedListAsync(request.Page, 100);

            return requests;
        }
    }
}
