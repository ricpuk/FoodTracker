using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using FoodTracker.Application.Common.DTOs;
using FoodTracker.Application.Common.Exceptions;
using FoodTracker.Application.Common.Interfaces;
using MediatR;

namespace FoodTracker.Application.Coaches.Queries
{
    public class FetchCoachProfileQuery : IRequest<CoachDto>
    {
        public int CoachId { get; set; }
    }

    public class FetchCoachProfileQueryHandler : IRequestHandler<FetchCoachProfileQuery, CoachDto>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IIdentityService _identityService;
        private readonly IMapper _mapper;

        public FetchCoachProfileQueryHandler(IApplicationDbContext dbContext, IIdentityService identityService, IMapper mapper)
        {
            _dbContext = dbContext;
            _identityService = identityService;
            _mapper = mapper;
        }

        public async Task<CoachDto> Handle(FetchCoachProfileQuery request, CancellationToken cancellationToken)
        {
            var isTrainer = await _identityService.IsInRoleAsync(request.CoachId, "Trainer");
            if (!isTrainer)
            {
                throw new NotFoundException($"Coach with id {request.CoachId} was not found.");
            }

            var profile = await _dbContext.UserProfiles.FindAsync(request.CoachId);

            if (profile == null)
            {
                throw new NotFoundException($"Coach with id {request.CoachId} was not found.");
            }

            return _mapper.Map<CoachDto>(profile);
        }
    }
}
