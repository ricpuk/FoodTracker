
using System.Threading.Tasks;
using FluentAssertions;
using FoodTracker.Application.DiaryEntries.Commands.CreateDiaryEntry;
using FoodTracker.Application.Users.Queries.GetCurrentUserProfile;
using NUnit.Framework;

namespace FoodTracker.Application.IntegrationTests.Users.Queries
{
    using static Testing;
    class GetCurrentUserProfileQueryTests : TestBase
    {
        [Test]
        public async Task ShouldGetCurrentUserProfileWhenLoggedIn()
        {
            var userId = await RunAsDefaultUserAsync();

            var command = new GetCurrentUserProfileQuery();
            var actual = await SendAsync(command);
            var expecpted = await GetCurrentUserProfileAsync();
            actual.Id.Should().Be(expecpted.Id);
        }
    }
}
