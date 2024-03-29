﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace FoodTracker.Domain.Entities
{
    public class Diary
    {
        public int Id { get; set; }
        public int UserProfileId { get; set; }
        public IList<DiaryEntry> Entries { get; set; } = new List<DiaryEntry>();
        public UserGoals UserGoals { get; set; }
        public double Weight { get; set; }
        public double WaterIntake { get; set; }

        [Column(TypeName = "date")]
        public DateTime Date { get; set; }
    }
}
