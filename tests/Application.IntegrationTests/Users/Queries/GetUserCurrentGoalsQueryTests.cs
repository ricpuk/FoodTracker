using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentAssertions;
using FoodTracker.Application.Users.Queries.GetUserCurrentGoals;
using NUnit.Framework;

namespace FoodTracker.Application.IntegrationTests.Users.Queries
{
    using static Testing;
    class GetUserCurrentGoalsQueryTests : TestBase
    {
        [Test]
        public async Task ShouldGetCurrentUserProfileWhenLoggedIn()
        {
            var userId = await RunAsDefaultUserAsync();

            var command = new GetUserCurrentGoalsQuery();
            var actual = await SendAsync(command);
            var expecpted = await GetCurrentUserProfileAsync();
            actual.Id.Should().Be(expecpted.CurrentUserGoals.Id);
        }
    }
}
