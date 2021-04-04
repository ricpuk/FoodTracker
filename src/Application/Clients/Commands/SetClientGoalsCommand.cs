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

namespace FoodTracker.Application.Clients.Commands
{
    public class SetClientGoalsCommand : IRequest<UserGoalsDto>
    {
        public int ClientId { get; set; }
        public UserGoalsDto Goals { get; set; }
    }

    public class SetClientGoalsCommandHandler : IRequestHandler<SetClientGoalsCommand, UserGoalsDto>
    {
        private readonly IIdentityService _identityService;
        private readonly IMapper _mapper;
        private readonly IApplicationDbContext _dbContext;

        public SetClientGoalsCommandHandler(IIdentityService identityService, IApplicationDbContext dbContext, IMapper mapper)
        {
            _identityService = identityService;
            _dbContext = dbContext;
            _mapper = mapper;
        }
        public async Task<UserGoalsDto> Handle(SetClientGoalsCommand request, CancellationToken cancellationToken)
        {
            var profileId = await _identityService.GetCurrentUserProfileIdAsync();
            var clientProfile =
                await _dbContext.UserProfiles.Include(x => x.UserGoals).Where(x => x.Id == request.ClientId && x.TrainerId == profileId).SingleOrDefaultAsync(cancellationToken);
            if (clientProfile == null)
            {
                throw new NotFoundException("Client not found");
            }

            var userGoals = _mapper.Map<UserGoals>(request.Goals);

            userGoals.UserProfileId = request.ClientId;

            await _dbContext.UserGoals.AddAsync(userGoals, cancellationToken);
            await _dbContext.SaveChangesAsync(cancellationToken);

            return _mapper.Map<UserGoalsDto>(userGoals);
        }
    }
}
