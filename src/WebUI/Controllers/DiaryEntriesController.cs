using System.Threading.Tasks;
using FoodTracker.Application.Common.DTOs;
using FoodTracker.Application.Diaries.Commands;
using FoodTracker.Application.DiaryEntries.Commands.DeleteDiaryEntry;
using FoodTracker.Application.DiaryEntries.Commands.UpdateDiaryEntry;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FoodTracker.WebUI.Controllers
{
    [Authorize]
    [Route("api/diaries/{diaryId}/entries")]
    public class DiaryEntriesController : ApiControllerBase
    {
        [HttpPost]
        public async Task<ActionResult<DiaryDto>> Create(int diaryId, CreateDiaryEntryCommand command)
        {
            command.SetDiaryId(diaryId);
            return Ok(await Mediator.Send(command));
        }

        [HttpPut("{entryId}")]
        public async Task<ActionResult<DiaryDto>> Update(int diaryId, int entryId, UpdateDiaryEntryCommand command)
        {
            command.SetDiaryId(diaryId);
            command.SetDiaryEntryId(entryId);
            return Ok(await Mediator.Send(command));
        }

        [HttpDelete("{entryId}")]
        public async Task<ActionResult> Delete(int diaryId, int entryId)
        {
            var command = new DeleteDiaryEntryCommand();
            command.SetDiaryId(diaryId);
            command.SetDiaryEntryId(entryId);
            return Ok(await Mediator.Send(command));
        }
    }
}
