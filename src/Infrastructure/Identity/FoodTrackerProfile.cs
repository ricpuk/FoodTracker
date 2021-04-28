using IdentityModel;
using IdentityServer4.Models;

namespace FoodTracker.Infrastructure.Identity
{
    public class FoodTrackerProfile
        : IdentityResources.Profile
    {
        public FoodTrackerProfile()
        {
            UserClaims.Add(JwtClaimTypes.Role);
        }
    }
}
