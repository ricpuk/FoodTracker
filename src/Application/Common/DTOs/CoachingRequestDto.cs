using FoodTracker.Application.Common.Mappings;
using FoodTracker.Domain.Entities;

namespace FoodTracker.Application.Common.DTOs
{
    public class CoachingRequestDto : IMapFrom<CoachingRequest>
    {
        public int Id { get; set; }
        public int FromId { get; set; }
        public UserProfileDto From { get; set; }
    }
}
