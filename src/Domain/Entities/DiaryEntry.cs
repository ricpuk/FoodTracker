using System;
using FoodTracker.Domain.Enums;

namespace FoodTracker.Domain.Entities
{
    public class DiaryEntry
    {
        public int Id { get; set; }
        public int DiaryId { get; set; }
        public DateTime TimeLogged { get; set; }
        public int ProductVersionId { get; set; }
        public ProductVersion ProductVersion { get; set; }
        public int ServingId { get; set; }
        public ProductServing Serving { get; set; }
        public double? NumberOfServings { get; set; }
        public int? WaterIntake { get; set; }
        public DiaryEntryType EntryType { get; set; }
        public DiarySection DiarySection { get; set; }
        
    }
}
