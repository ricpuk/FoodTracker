using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FoodTracker.Application.Common.DTOs;
using FoodTracker.Application.Diaries.Queries;

namespace FoodTracker.WebUI.Controllers
{
    public class DiariesController : ApiControllerBase
    {
        [HttpGet("{date}")]
        public async Task<ActionResult<DiaryDto>> Index(DateTime date)
        {
            var query = new GetDiaryByDateQuery
            {
                Date = date.Date
            };
            return Ok(await Mediator.Send(query));
        }

    }
}
