using FoodTracker.Application.Common.Mappings;
using FoodTracker.Domain.Entities;

namespace FoodTracker.Application.Common.DTOs
{
    public class CoachDto : BaseUserDto, IMapFrom<UserProfile>
    {
        public bool CoachingRequested { get; set; }
    }
}
