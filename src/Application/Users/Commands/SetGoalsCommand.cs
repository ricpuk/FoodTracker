using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using FoodTracker.Application.Common.DTOs;
using FoodTracker.Application.Common.Interfaces;
using FoodTracker.Domain.Entities;
using MediatR;

namespace FoodTracker.Application.Users.Commands
{
    public class SetGoalsCommand : IRequest<UserGoalsDto>
    {
        public UserGoalsDto Goals { get; set; }
    }

    public class SetGoalsCommandHandler : IRequestHandler<SetGoalsCommand, UserGoalsDto>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IIdentityService _identityService;
        private readonly IMapper _mapper;

        public SetGoalsCommandHandler(IApplicationDbContext dbContext, IMapper mapper, IIdentityService identityService)
        {
            _dbContext = dbContext;
            _identityService = identityService;
            _mapper = mapper;
        }
        public async Task<UserGoalsDto> Handle(SetGoalsCommand request, CancellationToken cancellationToken)
        {
            var goals = _mapper.Map<UserGoals>(request.Goals);
            var profile = await _identityService.GetCurrentUserProfileAsync();
            goals.UserProfileId = profile.Id;
            await _dbContext.UserGoals.AddAsync(goals, cancellationToken);

            await _dbContext.SaveChangesAsync(cancellationToken);

            return _mapper.Map<UserGoalsDto>(_mapper.Map<UserGoalsDto>(goals));

        }
    }
}
