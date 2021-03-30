using FoodTracker.Application.Common.Mappings;
using FoodTracker.Domain.Entities;

namespace FoodTracker.Application.Common.DTOs
{
    public class UserProfileDto : BaseUserDto, IMapFrom<UserProfile>
    {
        public CoachDto Trainer { get; set; }
    }
}
