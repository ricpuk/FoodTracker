using FoodTracker.Application.Common.Mappings;
using FoodTracker.Domain.Entities;

namespace FoodTracker.Application.Common.DTOs
{
    public class CoachDto : IMapFrom<UserProfile>
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ShortDescription { get; set; }
        public int NumberOfClients { get; set; }
        public bool CoachingRequested { get; set; }
    }
}
