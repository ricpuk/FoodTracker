using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using FoodTracker.Application.Common.DTOs;
using FoodTracker.Application.Common.Interfaces;
using FoodTracker.Application.Diaries.Commands;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace FoodTracker.Application.Diaries.Queries
{
    public class GetDiaryByDateQuery : IRequest<DiaryDto>, IRequest<Unit>
    {
        public DateTime Date { get; set; }
    }

    public class GetDiaryByDateQueryHandler : IRequestHandler<GetDiaryByDateQuery, DiaryDto>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IMediator _mediator;
        private readonly IIdentityService _identityService;

        public GetDiaryByDateQueryHandler(IApplicationDbContext dbContext, IMapper mapper, IMediator mediator, IIdentityService identityService)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _mediator = mediator;
            _identityService = identityService;
        }

        public async Task<DiaryDto> Handle(GetDiaryByDateQuery request, CancellationToken cancellationToken)
        {
            var userProfile = await _identityService.GetCurrentUserProfileAsync();
            var diaryDate = request.Date.Date;
            var diary = _dbContext.Diaries
                .Include(x => x.UserGoals)
                .Include(x => x.Entries)
                .ThenInclude(e => e.Product)
                .ThenInclude(e => e.ProductServings)
                .SingleOrDefault(x => x.UserProfileId == userProfile.Id && x.Date.Date == diaryDate);
            if (diary != null)
            {
                return _mapper.Map<DiaryDto>(diary);
            }
            var command = new CreateDiaryCommand
            {
                Date = request.Date,
                ExistingChecked = true,
                UserProfileId = userProfile.Id
            };
            return await _mediator.Send(command, cancellationToken);

        }
    }
}
