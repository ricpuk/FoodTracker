using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using FoodTracker.Application.Common.DTOs;
using FoodTracker.Application.Common.Interfaces;
using FoodTracker.Domain.Entities;
using MediatR;

namespace FoodTracker.Application.Diaries.Commands
{
    public class CreateDiaryCommand: IRequest<DiaryDto>
    {
        public DateTime Date { get; set; }
        public bool ExistingChecked { get; init; } = false;
        public int? UserProfileId { get; set; }
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
            var profileId = await UserProfileIdAsync(request.UserProfileId);

            if (request.ExistingChecked)
            {
                return await CreateNewDiary(request, cancellationToken, profileId);

            }


            var existingEntity = _dbContext.Diaries
                .SingleOrDefault(x => x.UserProfileId == profileId && x.Date == request.Date.Date);

            if (existingEntity != null)
            {
                return _mapper.Map<DiaryDto>(existingEntity);
            }

            return await CreateNewDiary(request, cancellationToken, profileId);
        }

        private async Task<DiaryDto> CreateNewDiary(CreateDiaryCommand request, CancellationToken cancellationToken, int profileId)
        {
            var entity = new Diary
            {
                Date = request.Date.Date,
                UserProfileId = profileId
            };

            await _dbContext.Diaries.AddAsync(entity, cancellationToken);
            await _dbContext.SaveChangesAsync(cancellationToken);

            return _mapper.Map<DiaryDto>(entity);

        }

        private async Task<int> UserProfileIdAsync(int? userProfileId)
        {
            if (userProfileId.HasValue)
            {
                return userProfileId.Value;
            }

            var userProfile = await _identityService.GetCurrentUserProfileAsync();
            return userProfile.Id;
        }
    }
}
