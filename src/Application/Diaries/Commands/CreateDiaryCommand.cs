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
    }

    public class CreateDiaryCommandHandler : IRequestHandler<CreateDiaryCommand, DiaryDto>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMapper _mapper;

        public CreateDiaryCommandHandler(IApplicationDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }
        public async Task<DiaryDto> Handle(CreateDiaryCommand request, CancellationToken cancellationToken)
        {
            if (request.ExistingChecked)
            {
                return await CreateNewDiary(request, cancellationToken);

            }

            var existingEntity = _dbContext.Diaries.SingleOrDefault(x => x.Date == request.Date.Date);

            if (existingEntity != null)
            {
                return _mapper.Map<DiaryDto>(existingEntity);
            }

            return await CreateNewDiary(request, cancellationToken);
        }

        private async Task<DiaryDto> CreateNewDiary(CreateDiaryCommand request, CancellationToken cancellationToken)
        {
            var entity = new Diary
            {
                Date = request.Date.Date
            };

            await _dbContext.Diaries.AddAsync(entity, cancellationToken);
            await _dbContext.SaveChangesAsync(cancellationToken);

            return _mapper.Map<DiaryDto>(entity);

        }
    }
}
