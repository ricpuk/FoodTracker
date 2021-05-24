using FoodTracker.Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace FoodTracker.Infrastructure.Identity
{
    public class ApplicationUser : IdentityUser
    {
        public int UserProfileId { get; set; }
        public UserProfile UserProfile { get; set; }
    }
}
