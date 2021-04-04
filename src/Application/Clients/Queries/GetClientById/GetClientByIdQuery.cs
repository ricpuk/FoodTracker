using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using FoodTracker.Application.Common.DTOs;
using FoodTracker.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace FoodTracker.Application.Clients.Queries.GetClientById
{
    public class GetClientByIdQuery : IRequest<UserProfileDto>
    {
        public int ClientId { get; set; }
    }

    public class GetClientByIdQueryHandler : IRequestHandler<GetClientByIdQuery, UserProfileDto>
    {
        private readonly IIdentityService _identityService;
        private readonly IApplicationDbContext _dbContext;
        private readonly IMapper _mapper;

        public GetClientByIdQueryHandler(IIdentityService identityService, IApplicationDbContext dbContext, IMapper mapper)
        {
            _identityService = identityService;
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<UserProfileDto> Handle(GetClientByIdQuery request, CancellationToken cancellationToken)
        {
            var profileId = await _identityService.GetCurrentUserProfileIdAsync();

            var clientProfile = await _dbContext.UserProfiles
                .Include(x => x.UserGoals)
                .Include(x => x.Trainees)
                .SingleOrDefaultAsync(x => x.TrainerId == profileId && x.Id == request.ClientId, cancellationToken);
            return _mapper.Map<UserProfileDto>(clientProfile);
        }
    }
}
