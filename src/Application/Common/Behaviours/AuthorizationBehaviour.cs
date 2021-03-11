using System;
using System.Linq;
using System.Reflection;
using System.Threading;
using System.Threading.Tasks;
using FoodTracker.Application.Common.Exceptions;
using FoodTracker.Application.Common.Interfaces;
using FoodTracker.Application.Common.Security;
using MediatR;

namespace FoodTracker.Application.Common.Behaviours
{
    public class AuthorizationBehaviour<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
    {
        private readonly ICurrentUserService _currentUserService;
        private readonly IIdentityService _identityService;

        public AuthorizationBehaviour(
            ICurrentUserService currentUserService,
            IIdentityService identityService)
        {
            _currentUserService = currentUserService;
            _identityService = identityService;
        }

        public async Task<TResponse> Handle(TRequest request, CancellationToken cancellationToken, RequestHandlerDelegate<TResponse> next)
        {
            var authorizeAttributes = request.GetType().GetCustomAttributes<AuthorizeAttribute>();

            var attributes = authorizeAttributes as AuthorizeAttribute[] ?? authorizeAttributes.ToArray();
            if (!attributes.Any()) return await next();
            // Must be authenticated user
            if (_currentUserService.UserId == null)
            {
                throw new UnauthorizedAccessException();
            }

            // Role-based authorization
            var authorizeAttributesWithRoles = attributes.Where(a => !string.IsNullOrWhiteSpace(a.Roles));

            var attributesWithRoles = authorizeAttributesWithRoles as AuthorizeAttribute[] ?? authorizeAttributesWithRoles.ToArray();
            if (attributesWithRoles.Any())
            {
                foreach (var roles in attributesWithRoles.Select(a => a.Roles.Split(',')))
                {
                    var authorized = false;
                    foreach (var role in roles)
                    {
                        var isInRole = await _identityService.IsInRoleAsync(_currentUserService.UserId, role.Trim());
                        if (!isInRole)
                        {
                            continue;
                        }
                        authorized = true;
                        break;
                    }

                    // Must be a member of at least one role in roles
                    if (!authorized)
                    {
                        throw new ForbiddenAccessException();
                    }
                }
            }

            // Policy-based authorization
            var authorizeAttributesWithPolicies = attributes.Where(a => !string.IsNullOrWhiteSpace(a.Policy));
            var attributesWithPolicies = authorizeAttributesWithPolicies as AuthorizeAttribute[] ?? authorizeAttributesWithPolicies.ToArray();
            
            if (!attributesWithPolicies.Any())
            {
                return await next();
            }

            foreach(var policy in attributesWithPolicies.Select(a => a.Policy))
            {
                var authorized = await _identityService.AuthorizeAsync(_currentUserService.UserId, policy);

                if (!authorized)
                {
                    throw new ForbiddenAccessException();
                }
            }

            // User is authorized / authorization not required
            return await next();
        }
    }
}
