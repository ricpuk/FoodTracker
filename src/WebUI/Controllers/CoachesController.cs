using System.Threading.Tasks;
using FoodTracker.Application.Coaches.Commands.CreateCoachingRequest;
using FoodTracker.Application.Coaches.Commands.DeleteCoachingRequest;
using FoodTracker.Application.Coaches.Queries.GetCoaches;
using FoodTracker.Application.Common.DTOs;
using FoodTracker.Application.Common.Models;
using FoodTracker.Application.Common.Security;
using Microsoft.AspNetCore.Mvc;

namespace FoodTracker.WebUI.Controllers
{
    [Authorize]
    public class CoachesController : ApiControllerBase
    {
        public async Task<ActionResult<PaginatedList<CoachDto>>> Index([FromQuery] GetCoachesQuery query)
        {
            return Ok(await Mediator.Send(query));
        }

        [HttpPost("{coachId}")]
        public async Task<ActionResult<PaginatedList<CoachDto>>> CreateCoachingRequest(int coachId, CreateCoachingRequestCommand command)
        {
            command.CoachId = coachId;
            return Ok(await Mediator.Send(command));
        }

        [HttpDelete("{coachId}")]
        public async Task<ActionResult<PaginatedList<CoachDto>>> DeleteCoachingRequest(int coachId)
        {
            var command = new DeleteCoachingRequestCommand
            {
                CoachId = coachId
            };
            return Ok(await Mediator.Send(command));
        }
    }
}
