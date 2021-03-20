using System.Threading.Tasks;
using FoodTracker.Application.Users.Queries.GetUserCurrentGoals;
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
    }
}
