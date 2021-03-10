using System.Text.Json.Serialization;
using FoodTracker.Application.Common.DTOs;
using MediatR;

namespace FoodTracker.Application.Diaries.Commands
{
    public class CreateDiaryEntryCommand : IRequest<DiaryEntryDto>
    {
        [JsonIgnore]
        public int DiaryId { get; set; }
        public DiaryEntryDto Entry { get; set; }
    }
}
