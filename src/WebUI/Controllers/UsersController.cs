using System.Threading.Tasks;
using FoodTracker.Application.Users.Commands;
using FoodTracker.Application.Users.Queries.GetUserCurrentGoals;
using FoodTracker.Application.Users.Queries.GetUserProfile;
using FoodTracker.Application.Users.Queries.GetUserStats;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FoodTracker.WebUI.Controllers
{
    [Authorize]
    public class UsersController : ApiControllerBase
    {
        [HttpGet("goals")]
        public async Task<IActionResult> GoalsAsync()
        {
            var query = new GetUserCurrentGoalsQuery();
            return Ok(await Mediator.Send(query));
        }

        [HttpGet("profile")]
        public async Task<IActionResult> ProfileAsync()
        {
            var query = new GetCurrentUserProfileQuery();
            return Ok(await Mediator.Send(query));
        }

        [HttpPut("profile")]
        public async Task<IActionResult> UpdateProfileAsync([FromBody] UpdateCurrentUserProfileCommand command)
        {
            return Ok(await Mediator.Send(command));
        }

        [HttpPost("profile/photo")]
        public async Task<IActionResult> UpdateProfilePhotoAsync([FromForm] UpdateCurrentUserPhotoCommand command)
        {
            return Ok(await Mediator.Send(command));
        }

        [HttpGet("profile/{profileId}/stats")]
        public async Task<IActionResult> ProfileAsync([FromRoute] GetUserStatsQuery query)
        {
            return Ok(await Mediator.Send(query));
        }

        [HttpPost("goals")]
        public async Task<IActionResult> SetGoalsAsync([FromBody] SetGoalsCommand command)
        {
            return Ok(await Mediator.Send(command));
        }
    }
}
