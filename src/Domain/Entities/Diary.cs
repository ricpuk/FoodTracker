using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using FoodTracker.Domain.Common;

namespace FoodTracker.Domain.Entities
{
    public class Diary : AuditableEntity
    {
        public int Id { get; set; }
        public bool IsCompleted { get; set; }
        public IList<DiaryEntry> Entries { get; set; }

        [Column(TypeName = "date")]
        public DateTime Date { get; set; }
    }
}
