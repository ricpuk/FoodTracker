using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using FoodTracker.Application.Common.DTOs;
using FoodTracker.Application.Common.Exceptions;
using FoodTracker.Application.Common.Interfaces;
using FoodTracker.Domain.Entities;
using MediatR;

namespace FoodTracker.Application.DiaryEntries.Commands.CreateDiaryEntry
{
    public class CreateDiaryEntryCommand : IRequest<DiaryEntryDto>
    {
        private int _diaryId;

        public void SetDiaryId(int diaryId)
        {
            _diaryId = diaryId;
        }

        public int GetDiaryId()
        {
            return _diaryId;
        }

        public DiaryEntryDto Entry { get; set; }
    }

    public class CreateDiaryEntryCommandHandler : IRequestHandler<CreateDiaryEntryCommand, DiaryEntryDto>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMapper _mapper;

        public CreateDiaryEntryCommandHandler(IApplicationDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<DiaryEntryDto> Handle(CreateDiaryEntryCommand request, CancellationToken cancellationToken)
        {
            var diary = await GetDiaryOrThrow(request.GetDiaryId());
            var diaryEntry = _mapper.Map<DiaryEntry>(request.Entry);
            diaryEntry.DiaryId = diary.Id;
            
            await _dbContext.DiaryEntries.AddAsync(diaryEntry, cancellationToken);
            await _dbContext.SaveChangesAsync(cancellationToken);

            return _mapper.Map<DiaryEntryDto>(diaryEntry);
        }

        private async Task<Diary> GetDiaryOrThrow(int diaryId)
        {
            var diary = await _dbContext.Diaries.FindAsync(diaryId);
            if (diary == null)
            {
                throw new NotFoundException("Diary was not found");
            }
            return diary;
        }
    }
}
