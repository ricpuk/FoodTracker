using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using FoodTracker.Application.Common.DTOs;
using FoodTracker.Application.Common.Exceptions;
using FoodTracker.Application.Common.Interfaces;
using FoodTracker.Domain.Entities;
using MediatR;

namespace FoodTracker.Application.DiaryEntries.Commands.UpdateDiaryEntry
{
    public class UpdateDiaryEntryCommand : IRequest<DiaryEntryDto>
    {
        private int _diaryEntryId;

        public void SetDiaryEntryId(int entryId)
        {
            _diaryEntryId = entryId;
        }

        public int GetDiaryEntryId()
        {
            return _diaryEntryId;
        }

        public int ServingId { get; set; }
        public int NumberOfServings { get; set; }
    }

    public class UpdateDiaryEntryCommandHandler : IRequestHandler<UpdateDiaryEntryCommand, DiaryEntryDto>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMapper _mapper;

        public UpdateDiaryEntryCommandHandler(IApplicationDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<DiaryEntryDto> Handle(UpdateDiaryEntryCommand request, CancellationToken cancellationToken)
        {
            var diaryEntry = await _dbContext.DiaryEntries.FindAsync(request.GetDiaryEntryId());

            if (diaryEntry == null)
            {
                throw new NotFoundException("Diary entry does not exist");
            }
            
            diaryEntry.ServingId = request.ServingId;
            diaryEntry.NumberOfServings = request.NumberOfServings;

            await _dbContext.SaveChangesAsync(cancellationToken);

            return _mapper.Map<DiaryEntryDto>(diaryEntry);
        }
    }
}
