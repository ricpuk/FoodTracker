using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FoodTracker.Application.Clients.Queries.GetCachingRequests;
using FoodTracker.Application.Common.DTOs;
using FoodTracker.Application.Common.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FoodTracker.WebUI.Controllers
{
    [Authorize]
    public class ClientsController : ApiControllerBase
    {
        [HttpGet("requests")]
        public async Task<ActionResult<PaginatedList<CoachingRequestDto>>> CoachingRequests([FromQuery] GetCoachingRequestsQuery query)
        {
            return Ok(await Mediator.Send(query));
        }
    }
}
