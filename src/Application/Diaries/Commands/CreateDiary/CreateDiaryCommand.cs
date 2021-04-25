using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using FoodTracker.Application.Common.DTOs;
using FoodTracker.Application.Common.Exceptions;
using FoodTracker.Application.Common.Interfaces;
using FoodTracker.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace FoodTracker.Application.Diaries.Commands.CreateDiary
{
    public class CreateDiaryCommand: IRequest<DiaryDto>
    {
        public DateTime Date { get; set; }
    }

    public class CreateDiaryCommandHandler : IRequestHandler<CreateDiaryCommand, DiaryDto>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IIdentityService _identityService;

        public CreateDiaryCommandHandler(IApplicationDbContext dbContext, IMapper mapper, IIdentityService identityService)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _identityService = identityService;
        }
        public async Task<DiaryDto> Handle(CreateDiaryCommand request, CancellationToken cancellationToken)
        {
            var profileId = await _identityService.GetCurrentUserProfileIdAsync();

            return await CreateNewDiary(request, cancellationToken, profileId);
        }

        private async Task<DiaryDto> CreateNewDiary(CreateDiaryCommand request, CancellationToken cancellationToken, int profileId)
        {
            var userProfile = await _dbContext.UserProfiles.Include(x => x.UserGoals).Where(x => x.Id == profileId).FirstOrDefaultAsync(cancellationToken);
            if (userProfile == null)
            {
                throw new NotFoundException(); //TODO proper exception
            }

            var entity = new Diary
            {
                Date = request.Date.Date,
                UserProfileId = profileId,
                UserGoals = userProfile.CurrentUserGoals
            };

            await _dbContext.Diaries.AddAsync(entity, cancellationToken);
            await _dbContext.SaveChangesAsync(cancellationToken);

            return _mapper.Map<DiaryDto>(entity);

        }
    }
}
