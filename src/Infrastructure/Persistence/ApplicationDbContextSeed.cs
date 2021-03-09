using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FoodTracker.Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;

namespace FoodTracker.Infrastructure.Persistence
{
    public static class ApplicationDbContextSeed
    {
        public static async Task SeedDefaultUserAsync(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            var administratorRole = new IdentityRole("Administrator");

            if (roleManager.Roles.All(r => r.Name != administratorRole.Name))
            {
                await roleManager.CreateAsync(administratorRole);
            }

            var administrator = new ApplicationUser { UserName = "administrator@localhost", Email = "administrator@localhost" };

            if (userManager.Users.All(u => u.UserName != administrator.UserName))
            {
                await userManager.CreateAsync(administrator, "Administrator1!");
                await userManager.AddToRolesAsync(administrator, new [] { administratorRole.Name });
            }
        }

        public static async Task SeedDummyUsersAsync(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            var role = new IdentityRole("User");

            if (roleManager.Roles.All(r => r.Name != role.Name))
            {
                await roleManager.CreateAsync(role);
            }

            var users = new Dictionary<string, string>
            {
                {"jake","jake@foo.bar"},
                {"tim", "tim@foo.bar"},
                {"ed", "ed@foo.bar"},
                {"ben", "ben@foo.bar"},
                {"timmy", "timmy@foo.bar"}
            };

            foreach (var userkvp in users)
            {
                var user = new ApplicationUser { UserName = userkvp.Key, Email = userkvp.Value };
                if (userManager.Users.All(u => u.UserName != user.UserName))
                {
                    await userManager.CreateAsync(user, "User1!");
                    await userManager.AddToRolesAsync(user, new[] { role.Name });
                }
            }
        }
    }
}
