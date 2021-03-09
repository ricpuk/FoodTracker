using System.Collections;
using System.Collections.Generic;
using FoodTracker.Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace FoodTracker.Infrastructure.Identity
{
    public class ApplicationUser : IdentityUser
    {
        public UserProfile Profile { get; set; }
    }
}
