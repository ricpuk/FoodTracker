using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using FoodTracker.Application.Common.Exceptions;
using FoodTracker.Application.Common.Interfaces;
using MediatR;

namespace FoodTracker.Application.DiaryEntries.Commands.DeleteDiaryEntry
{
    public class DeleteDiaryEntryCommand : IRequest<Unit>
    {
        private int _diaryId;
        private int _diaryEntryId;

        public void SetDiaryId(int diaryId)
        {
            _diaryId = diaryId;
        }

        public int GetDiaryId()
        {
            return _diaryId;
        }
        public void SetDiaryEntryId(int entryId)
        {
            _diaryEntryId = entryId;
        }

        public int GetDiaryEntryId()
        {
            return _diaryEntryId;
        }
    }

    public class DeleteDiaryEntryCommandHandler : IRequestHandler<DeleteDiaryEntryCommand, Unit>
    {
        private readonly IApplicationDbContext _dbContext;

        public DeleteDiaryEntryCommandHandler(IApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<Unit> Handle(DeleteDiaryEntryCommand request, CancellationToken cancellationToken)
        {
            var diaryEntry = await _dbContext.DiaryEntries.FindAsync(request.GetDiaryEntryId());
            if (diaryEntry == null)
            {
                throw new NotFoundException("Diary entry does not exist");
            }

            _dbContext.DiaryEntries.Remove(diaryEntry);
            await _dbContext.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
