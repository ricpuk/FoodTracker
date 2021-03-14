﻿using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FoodTracker.Application.Common.DTOs;
using FoodTracker.Application.Diaries.Commands;
using FoodTracker.Application.Diaries.Queries;
using Microsoft.AspNetCore.Authorization;

namespace FoodTracker.WebUI.Controllers
{
    [Authorize]
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

        [HttpPost("{diaryId}")]
        public async Task<ActionResult<DiaryDto>> CreateEntry(int diaryId, CreateDiaryEntryCommand command)
        {
            command.SetDiaryId(diaryId);
            return Ok(await Mediator.Send(command));
        }

    }
}
