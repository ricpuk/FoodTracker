using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FoodTracker.Domain.Entities;
using FoodTracker.Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;

namespace FoodTracker.Infrastructure.Persistence
{
    public static class ApplicationDbContextSeed
    {
        public static async Task SeedDefaultUserAsync(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            var administratorRole = new IdentityRole(IdentityConsts.AdminRole);

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
            var role = new IdentityRole(IdentityConsts.UserRole);

            if (roleManager.Roles.All(r => r.Name != role.Name))
            {
                await roleManager.CreateAsync(role);
            }

            var users = new Dictionary<string, dynamic>
            {
                {"jake",new {Email = "jake@foo.bar", FirstName = "Jake", LastName = "Bar", ShortDescription = "Testing user"}},
                {"tim", new {Email = "tim@foo.bar", FirstName = "Tim", LastName = "Bar", ShortDescription = "Testing user"}},
                {"ed", new {Email = "ed@foo.bar", FirstName = "Ed", LastName = "Bar", ShortDescription = "Testing user"}},
                {"ben", new {Email = "ben@foo.bar", FirstName = "Ben", LastName = "Bar", ShortDescription = "Testing user"}},
                {"timmy", new {Email = "timmy@foo.bar", FirstName = "Timmy", LastName = "Bar", ShortDescription = "Testing user"}}
            };

            foreach (var userkvp in users)
            {
                var value = userkvp.Value;
                var userProfile = new UserProfile
                {
                    FirstName = value.FirstName,
                    LastName = value.LastName,
                    ShortDescription = value.ShortDescription
                };
                var user = new ApplicationUser { UserName = value.Email, Email = value.Email, Profile = userProfile};
                if (!userManager.Users.All(u => u.UserName != user.UserName)) continue;
                await userManager.CreateAsync(user, "User1!");
                await userManager.AddToRolesAsync(user, new[] { role.Name });
            }
        }

        public static async Task SeedDummyTrainersAsync(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            var role = new IdentityRole(IdentityConsts.TrainerRole);

            if (roleManager.Roles.All(r => r.Name != role.Name))
            {
                await roleManager.CreateAsync(role);
            }

            var users = new Dictionary<string, dynamic>
            {
                {"jake",new {Email = "jake.trainer@foo.bar", FirstName = "Jake", LastName = "Bar", ShortDescription = "Testing trainer"}},
                {"tim", new {Email = "tim.trainer@foo.bar", FirstName = "Tim", LastName = "Bar", ShortDescription = "Testing trainer"}},
                {"ed", new {Email = "ed.trainer@foo.bar", FirstName = "Ed", LastName = "Bar", ShortDescription = "Testing trainer"}},
                {"ben", new {Email = "ben.trainer@foo.bar", FirstName = "Ben", LastName = "Bar", ShortDescription = "Testing trainer"}},
                {"timmy", new {Email = "timmy.trainer@foo.bar", FirstName = "Timmy", LastName = "Bar", ShortDescription = "Testing trainer"}}
            };

            foreach (var userkvp in users)
            {
                var value = userkvp.Value;
                var userProfile = new UserProfile
                {
                    FirstName = value.FirstName,
                    LastName = value.LastName,
                    ShortDescription = value.ShortDescription
                };
                var user = new ApplicationUser { UserName = value.Email, Email = value.Email, Profile = userProfile };
                if (!userManager.Users.All(u => u.UserName != user.UserName)) continue;
                await userManager.CreateAsync(user, "User1!");
                await userManager.AddToRolesAsync(user, new[] { role.Name });
            }
        }
    }
}
