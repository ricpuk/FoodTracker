using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using FoodTracker.Domain.Common;

namespace FoodTracker.Domain.Entities
{
    public class Diary : AuditableEntity
    {
        public int Id { get; set; }
        public int UserProfileId { get; set; }
        public IList<DiaryEntry> Entries { get; set; } = new List<DiaryEntry>();
        public UserGoals UserGoals { get; set; }
        public double Weight { get; set; }

        [Column(TypeName = "date")]
        public DateTime Date { get; set; }
    }
}
