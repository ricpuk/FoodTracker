﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using FoodTracker.Application.Common.Mappings;
using FoodTracker.Domain.Entities;

namespace FoodTracker.Application.Common.DTOs
{
    public class DiaryDto : IMapFrom<Diary>
    {
        public int Id { get; set; }
        public bool IsCompleted { get; set; }
        public IList<DiaryEntryDto> Entries { get; set; } = new List<DiaryEntryDto>();
        public UserGoalsDto UserGoals { get; set; }
        public double WaterIntake { get; set; }
        public double Weight { get; set; }
        public DateTime Date { get; set; }

    }
}
