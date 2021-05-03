using System.Security.Principal;
using System.Threading.Tasks;
using FoodTracker.Application.Common.Interfaces;
using FoodTracker.Infrastructure.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace FoodTracker.WebUI.Filters
{
    public class AdministratorAttribute : TypeFilterAttribute
    {
        public AdministratorAttribute() : base(typeof(AdministratorFilter))
        {

        }

        public class AdministratorFilter : IAsyncAuthorizationFilter
        {
            private readonly ICurrentUserService _currentUserService;
            private readonly IIdentityService _identityService;

            public AdministratorFilter(ICurrentUserService currentUserService, IIdentityService identityService)
            {
                _currentUserService = currentUserService;
                _identityService = identityService;
            }

            public async Task OnAuthorizationAsync(AuthorizationFilterContext context)
            {
                var isAdmin = _currentUserService.UserId != null && await _identityService.IsInRoleAsync(_currentUserService.UserId, IdentityConsts.AdminRole);
                if (!isAdmin)
                {
                    context.Result = new ForbidResult();
                }
            }
        }
    }
}
