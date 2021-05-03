using System.Threading.Tasks;
using FoodTracker.Application.Common.Interfaces;
using FoodTracker.Infrastructure.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace FoodTracker.WebUI.Filters
{
    public class TrainerAttribute : TypeFilterAttribute
    {
        public TrainerAttribute() : base(typeof(TrainerFilter))
        {

        }

        public class TrainerFilter : IAsyncAuthorizationFilter
        {
            private readonly ICurrentUserService _currentUserService;
            private readonly IIdentityService _identityService;

            public TrainerFilter(ICurrentUserService currentUserService, IIdentityService identityService)
            {
                _currentUserService = currentUserService;
                _identityService = identityService;
            }

            public async Task OnAuthorizationAsync(AuthorizationFilterContext context)
            {
                var isTrainer = _currentUserService.UserId != null && await _identityService.IsInRoleAsync(_currentUserService.UserId, IdentityConsts.TrainerRole);
                if (!isTrainer)
                {
                    context.Result = new ForbidResult();
                }
            }
        }
    }
}
