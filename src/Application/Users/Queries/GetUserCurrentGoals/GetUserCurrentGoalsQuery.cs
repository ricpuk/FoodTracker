using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using FoodTracker.Application.Common.DTOs;
using FoodTracker.Application.Common.Interfaces;
using MediatR;

namespace FoodTracker.Application.Users.Queries.GetUserCurrentGoals
{
    public class GetUserCurrentGoalsQuery : IRequest<UserGoalsDto>
    {
    }

    public class GetUserCurrentGoalsQueryHandler : IRequestHandler<GetUserCurrentGoalsQuery, UserGoalsDto>
    {
        private readonly IIdentityService _identityService;
        private readonly IMapper _mapper;

        public GetUserCurrentGoalsQueryHandler(IIdentityService identityService, IMapper mapper)
        {
            _identityService = identityService;
            _mapper = mapper;
        }

        public async Task<UserGoalsDto> Handle(GetUserCurrentGoalsQuery request, CancellationToken cancellationToken)
        {
            var profile = await _identityService.GetCurrentUserProfileAsync();
            var goals = profile.CurrentUserGoals;
            var goalsDto = _mapper.Map<UserGoalsDto>(goals);
            return goalsDto;
        }
    }
}
