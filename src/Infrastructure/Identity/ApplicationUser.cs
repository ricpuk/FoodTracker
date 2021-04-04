using System.Collections;
using System.Collections.Generic;
using FoodTracker.Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace FoodTracker.Infrastructure.Identity
{
    public class ApplicationUser : IdentityUser
    {
        public int ProfileId { get; set; }
        public UserProfile Profile { get; set; }
    }
}
