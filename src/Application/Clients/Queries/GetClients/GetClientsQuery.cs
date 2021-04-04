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

namespace FoodTracker.Application.Clients.Queries.GetClients
{
    public class GetClientsQuery : IRequest<PaginatedList<UserProfileDto>>
    {
        public int Page { get; set; }
        public string Query { get; set; }
        public int PageSize { get; set; } = 25;

    }

    public class GetClientsQueryHandler : IRequestHandler<GetClientsQuery, PaginatedList<UserProfileDto>>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IIdentityService _identityService;

        public GetClientsQueryHandler(IApplicationDbContext dbContext, IMapper mapper, IIdentityService identityService)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _identityService = identityService;
        }

        public async Task<PaginatedList<UserProfileDto>> Handle(GetClientsQuery request, CancellationToken cancellationToken)
        {
            var userProfile = await _identityService.GetCurrentUserProfileIdAsync();
            var clients = await _dbContext.UserProfiles
                .Where(x => x.TrainerId == userProfile)
                .ProjectTo<UserProfileDto>(_mapper.ConfigurationProvider)
                .PaginatedListAsync(request.Page, request.PageSize);
            return clients;
        }
    }
}
