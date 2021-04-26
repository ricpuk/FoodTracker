using System.Threading.Tasks;
using FluentAssertions;
using FoodTracker.Application.Common.Exceptions;
using FoodTracker.Application.Users.Queries.GetUserStats;
using NUnit.Framework;

namespace FoodTracker.Application.IntegrationTests.Users.Queries
{
    using static Testing;
    class GetUserStatsQueryTests : TestBase
    {
        [Test]
        public async Task ShouldGetCurrentUserStatsWhenLoggedIn()
        {
            var userId = await RunAsDefaultUserAsync();
            var profile = await GetCurrentUserProfileAsync();
            var command = new GetUserStatsQuery
            {
                ProfileId = profile.Id
            };
            var result = await SendAsync(command);
            foreach (var userStatDto in result)
            {
                userStatDto.WaterIntake.Should().Be(0);
                userStatDto.Weight.Should().Be(0);
            }
        }

        [Test]
        public async Task ShouldThrowForbiddenAccessExceptionIfNoIdSpecified()
        {
            var userId = await RunAsDefaultUserAsync();
            var command = new GetUserStatsQuery();
            FluentActions.Invoking(() => SendAsync(command))
                .Should()
                .Throw<ForbiddenAccessException>();

        }
    }
}
