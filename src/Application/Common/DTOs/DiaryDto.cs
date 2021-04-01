using System;
using System.Collections.Generic;
using FoodTracker.Application.Common.Mappings;
using FoodTracker.Domain.Entities;

namespace FoodTracker.Application.Common.DTOs
{
    public class DiaryDto : IMapFrom<Diary>
    {
        public DiaryDto()
        {
            
        }

        public DiaryDto(Diary diary)
        {
            Id = diary.Id;
            UserGoals = new UserGoalsDto(diary.UserGoals);
            WaterIntake = diary.WaterIntake;
            Weight = diary.Weight;
            Date = diary.Date;

            foreach (var diaryEntry in diary.Entries)
            {
                var entryDto = new DiaryEntryDto(diaryEntry);
                Entries.Add(entryDto);
            }
        }
        public int Id { get; set; }
        public IList<DiaryEntryDto> Entries { get; set; } = new List<DiaryEntryDto>();
        public UserGoalsDto UserGoals { get; set; }
        public double WaterIntake { get; set; }
        public double Weight { get; set; }
        public DateTime Date { get; set; }

    }
}
