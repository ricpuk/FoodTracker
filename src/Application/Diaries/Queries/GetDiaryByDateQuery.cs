using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using FoodTracker.Application.Common.DTOs;
using FoodTracker.Application.Common.Interfaces;
using FoodTracker.Application.Diaries.Commands;
using MediatR;

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

        public GetDiaryByDateQueryHandler(IApplicationDbContext dbContext, IMapper mapper, IMediator mediator)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _mediator = mediator;
        }

        public async Task<DiaryDto> Handle(GetDiaryByDateQuery request, CancellationToken cancellationToken)
        {
            var diaryDate = request.Date.Date;
            var diary = _dbContext.Diaries.FirstOrDefault(x => x.Date.Date == diaryDate);
            if (diary != null)
            {
                return _mapper.Map<DiaryDto>(diary);
            }
            var command = new CreateDiaryCommand
            {
                Date = request.Date,
                ExistingChecked = true
            };
            return await _mediator.Send(command, cancellationToken);

        }
    }
}
