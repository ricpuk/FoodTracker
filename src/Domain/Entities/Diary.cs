using System;
using System.Collections.Generic;
using FoodTracker.Domain.Common;

namespace FoodTracker.Domain.Entities
{
    public class Diary : AuditableEntity
    {
        public int Id { get; set; }
        public bool IsCompleted { get; set; }
        public IList<DiaryEntry> Type { get; set; }
    }
}
