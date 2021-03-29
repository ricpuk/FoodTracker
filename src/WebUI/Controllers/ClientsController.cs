using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FoodTracker.Application.Clients.Commands;
using FoodTracker.Application.Clients.Queries.GetCachingRequests;
using FoodTracker.Application.Clients.Queries.GetClients;
using FoodTracker.Application.Clients.Queries.GetClientsDiary;
using FoodTracker.Application.CoachingRequests.Commands.AcceptCoachingRequest;
using FoodTracker.Application.CoachingRequests.Commands.DeclineCoachingRequest;
using FoodTracker.Application.Common.DTOs;
using FoodTracker.Application.Common.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FoodTracker.WebUI.Controllers
{
    [Authorize]
    public class ClientsController : ApiControllerBase
    {

        [HttpGet]
        public async Task<ActionResult<PaginatedList<CoachingRequestDto>>> ClientsList([FromQuery] GetClientsQuery query)
        {
            return Ok(await Mediator.Send(query));
        }

        [HttpGet("{clientId}/diaries/{diaryDate}")]
        public async Task<ActionResult<PaginatedList<CoachingRequestDto>>> ClientDiary([FromRoute] GetClientsDiaryQuery query)
        {
            return Ok(await Mediator.Send(query));
        }

        [HttpDelete("{clientId}")]
        public async Task<ActionResult> StopCoaching([FromRoute] int clientId)
        {
            var command = new StopCoachingClientCommand
            {
                ClientId = clientId
            };

            return Ok(await Mediator.Send(command));
        }
        [HttpGet("requests")]
        public async Task<ActionResult<PaginatedList<CoachingRequestDto>>> CoachingRequests([FromQuery] GetCoachingRequestsQuery query)
        {
            return Ok(await Mediator.Send(query));
        }

        [HttpPut("requests/{requestId}")]
        public async Task<ActionResult<PaginatedList<CoachingRequestDto>>> AcceptCoachingRequest(int requestId)
        {
            var command = new AcceptCoachingRequestCommand
            {
                RequestId = requestId
            };
            return Ok(await Mediator.Send(command));
        }

        [HttpDelete("requests/{requestId}")]
        public async Task<ActionResult<PaginatedList<CoachingRequestDto>>> DeclineCoachingRequest(int requestId)
        {
            var command = new DeclineCoachingRequestCommand
            {
                RequestId = requestId
            };
            return Ok(await Mediator.Send(command));
        }
    }
}
