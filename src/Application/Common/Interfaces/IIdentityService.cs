using System.Threading.Tasks;
using FoodTracker.Application.Common.Models;
using FoodTracker.Domain.Entities;

namespace FoodTracker.Application.Common.Interfaces
{
    public interface IIdentityService
    {
        Task<string> GetUserNameAsync(string userId);

        Task<UserProfile> GetCurrentUserProfileAsync();

        Task<UserProfile> UpdateCurrentUserProfileAsync(UserProfile profile);

        Task<bool> IsInRoleAsync(string userId, string role);

        Task<bool> AuthorizeAsync(string userId, string policyName);

        Task<(Result Result, string UserId)> CreateUserAsync(string userName, string password);

        Task<Result> DeleteUserAsync(string userId);
    }
}
