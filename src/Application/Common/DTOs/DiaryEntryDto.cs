using System;
using FoodTracker.Application.Common.Mappings;
using FoodTracker.Application.Products;
using FoodTracker.Domain.Entities;
using FoodTracker.Domain.Enums;

namespace FoodTracker.Application.Common.DTOs
{
    public class DiaryEntryDto : IMapFrom<DiaryEntry>
    {
        public int Id { get; set; }
        public int DiaryId { get; set; }
        public DateTime TimeLogged { get; set; }
        public ProductDto Product { get; set; }
        public int? ServingId { get; set; }
        public int? WaterIntake { get; set; }
        public DiaryEntryType EntryType { get; set; }
    }
}
