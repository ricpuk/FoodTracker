﻿using System;
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

namespace FoodTracker.Application.Clients.Queries.GetClientsDiary
{
    public class GetClientsDiaryQuery : IRequest<DiaryDto>
    {
        public int ClientId { get; set; }
        public DateTime DiaryDate { get; set; }
    }

    public class GetClientsDiaryQueryHandler : IRequestHandler<GetClientsDiaryQuery, DiaryDto>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IIdentityService _identityService;

        public GetClientsDiaryQueryHandler(IApplicationDbContext dbContext, IMapper mapper, IIdentityService identityService)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _identityService = identityService;
        }

        public async Task<DiaryDto> Handle(GetClientsDiaryQuery request, CancellationToken cancellationToken)
        {
            var userProfile = await _identityService.GetCurrentUserProfileAsync();
            await CheckIfClient(userProfile, request.ClientId);

            var diary = await _dbContext.Diaries
                .Include(x => x.Entries)
                    .ThenInclude(de => de.ProductVersion)
                        .ThenInclude(pv => pv.ProductServings)
                .Include(x => x.Entries)
                    .ThenInclude(de => de.ProductVersion)
                        .ThenInclude(pv => pv.Product)
                .Include(x => x.UserGoals)
                .SingleOrDefaultAsync(x => x.Date == request.DiaryDate.Date && x.UserProfileId == request.ClientId, cancellationToken);
            if(diary == null)
            {
                throw new NotFoundException("No diary for this client was found");
            }
            var diaryDto = new DiaryDto(diary);
            AssignEntries(diaryDto, diary);

            return diaryDto;
        }

        private async Task CheckIfClient(UserProfile userProfile, int clientId)
        {
            var profile = await _dbContext.UserProfiles.SingleOrDefaultAsync(x => x.Id == clientId && x.TrainerId == userProfile.Id);
            if (profile == null)
            {
                throw new ForbiddenAccessException();
            }

        }

        private void AssignEntries(DiaryDto dto, Diary entity)
        {
            foreach (var diaryEntry in entity.Entries)
            {
            }
        }
    }
}
