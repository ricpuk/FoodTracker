using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FoodTracker.Application.Common.Interfaces;
using FoodTracker.Application.Common.Models;
using FoodTracker.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace FoodTracker.Infrastructure.Identity
{
    public class IdentityService : IIdentityService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IUserClaimsPrincipalFactory<ApplicationUser> _userClaimsPrincipalFactory;
        private readonly IAuthorizationService _authorizationService;
        private readonly ICurrentUserService _currentUserService;

        public IdentityService(
            UserManager<ApplicationUser> userManager,
            IUserClaimsPrincipalFactory<ApplicationUser> userClaimsPrincipalFactory,
            IAuthorizationService authorizationService,
            ICurrentUserService currentUserService)
        {
            _userManager = userManager;
            _userClaimsPrincipalFactory = userClaimsPrincipalFactory;
            _authorizationService = authorizationService;
            _currentUserService = currentUserService;
        }

        public async Task<string> GetUserNameAsync(string userId)
        {
            var user = await _userManager.Users.FirstAsync(u => u.Id == userId);

            return user.UserName;
        }

        public async Task<UserProfile> GetCurrentUserProfileAsync()
        {
            var user = await _userManager.Users
            .Include(x => x.UserProfile.UserGoals)
            .Include(x => x.UserProfile.Trainer)
            .Include(x => x.UserProfile.Trainees)
            .FirstAsync(u => u.Id == _currentUserService.UserId);
            return user.UserProfile;
        }

        public async Task<int> GetCurrentUserProfileIdAsync()
        {
            return await _userManager.Users
                .Where(x => x.Id == _currentUserService.UserId)
                .Select(x => x.UserProfileId)
                .FirstAsync();
        }
        
        public async Task<UserProfile> UpdateCurrentUserProfileAsync(UserProfile userProfile)
        {
            var user = _userManager.Users.SingleOrDefault(u => u.Id == _currentUserService.UserId);
            if (user == null)
            {
                return userProfile;
            }
            user.UserProfile = userProfile;
            await _userManager.UpdateAsync(user);

            return user.UserProfile;
        }

        public async Task<(Result Result, string UserId)> CreateUserAsync(string userName, string password)
        {
            var user = new ApplicationUser
            {
                UserName = userName,
                Email = userName,
            };

            var result = await _userManager.CreateAsync(user, password);

            return (result.ToApplicationResult(), user.Id);
        }

        public async Task<bool> IsInRoleAsync(string userId, string role)
        {
            var user = _userManager.Users.SingleOrDefault(u => u.Id == userId);

            return await _userManager.IsInRoleAsync(user, role);
        }

        public async Task<bool> IsInRoleAsync(int profileId, string role)
        {
            var user = await _userManager.Users
                .SingleOrDefaultAsync(x => x.UserProfileId == profileId);

            if (user == null)
            {
                return false;
            }

            return await _userManager.IsInRoleAsync(user, role);
        }

        public async Task<bool> AuthorizeAsync(string userId, string policyName)
        {
            var user = _userManager.Users.SingleOrDefault(u => u.Id == userId);

            var principal = await _userClaimsPrincipalFactory.CreateAsync(user);

            var result = await _authorizationService.AuthorizeAsync(principal, policyName);

            return result.Succeeded;
        }

        public async Task<Result> DeleteUserAsync(string userId)
        {
            var user = _userManager.Users.SingleOrDefault(u => u.Id == userId);

            if (user != null)
            {
                return await DeleteUserAsync(user);
            }

            return Result.Success();
        }

        public async Task<string> GetCurrentUserRole()
        {
            var user = await _userManager.Users.FirstAsync(u => u.Id == _currentUserService.UserId);
            var roles = await _userManager.GetRolesAsync(user);
            if (roles.Contains(IdentityConsts.AdminRole))
            {
                return IdentityConsts.AdminRole;
            }

            if (roles.Contains(IdentityConsts.TrainerRole))
            {
                return IdentityConsts.TrainerRole;
            }

            return IdentityConsts.UserRole;

        }

        public async Task<Result> DeleteUserAsync(ApplicationUser user)
        {
            var result = await _userManager.DeleteAsync(user);

            return result.ToApplicationResult();
        }

        public async Task<IList<string>> GetUsersInRole(string role)
        {
            var users = await _userManager.GetUsersInRoleAsync(role);
            return users.Select(x => x.Id).ToList();
        }


    }
}
