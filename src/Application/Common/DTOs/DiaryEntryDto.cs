using System;
using FoodTracker.Application.Common.Mappings;
using FoodTracker.Application.Diaries;
using FoodTracker.Application.Products;
using FoodTracker.Domain.Entities;
using FoodTracker.Domain.Enums;

namespace FoodTracker.Application.Common.DTOs
{
    public class DiaryEntryDto : IMapFrom<DiaryEntry>
    {
        public DiaryEntryDto()
        {
            
        }

        public DiaryEntryDto(DiaryEntry diaryEntry)
        {
            Id = diaryEntry.Id;
            DiaryId = diaryEntry.DiaryId;
            TimeLogged = diaryEntry.TimeLogged;
            Product = new ProductDto(diaryEntry.ProductVersion.Product, diaryEntry.ProductVersion);
            ServingId = diaryEntry.ServingId;
            NumberOfServings = diaryEntry.NumberOfServings;
            DiarySection = diaryEntry.DiarySection;
        }
        public int Id { get; set; }
        public int DiaryId { get; set; }
        public DateTime TimeLogged { get; set; }
        public ProductDto Product { get; set; }
        public int? ServingId { get; set; }
        public double? NumberOfServings { get; set; }
        public DiarySection DiarySection { get; set; }
    }
}
