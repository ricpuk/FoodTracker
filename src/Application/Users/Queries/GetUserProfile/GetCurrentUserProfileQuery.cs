using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using FoodTracker.Application.Common.DTOs;
using FoodTracker.Application.Common.Interfaces;
using MediatR;

namespace FoodTracker.Application.Users.Queries.GetUserProfile
{
    public class GetCurrentUserProfileQuery : IRequest<UserProfileDto>
    {
    }


    public class GetCurrentUserProfileQueryHandler : IRequestHandler<GetCurrentUserProfileQuery, UserProfileDto>
    {
        private readonly IIdentityService _identityService;
        private readonly IMapper _mapper;

        public GetCurrentUserProfileQueryHandler(IIdentityService identityService, IMapper mapper)
        {
            _identityService = identityService;
            _mapper = mapper;
        }
        public async Task<UserProfileDto> Handle(GetCurrentUserProfileQuery request, CancellationToken cancellationToken)
        {
            var userProfile = await _identityService.GetCurrentUserProfileAsync();
            var userProfileDto = _mapper.Map<UserProfileDto>(userProfile);
            return userProfileDto;
        }
    }
}
