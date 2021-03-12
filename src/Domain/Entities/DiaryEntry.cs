using System;
using System.ComponentModel.DataAnnotations.Schema;
using FoodTracker.Domain.Enums;

namespace FoodTracker.Domain.Entities
{
    public class DiaryEntry
    {
        public int Id { get; set; }
        public int DiaryId { get; set; }
        public DateTime TimeLogged { get; set; }
        public Product Product { get; set; }
        public int? ServingId { get; set; }
        public int? WaterIntake { get; set; }
        public DiaryEntryType EntryType { get; set; }
        
    }
}
