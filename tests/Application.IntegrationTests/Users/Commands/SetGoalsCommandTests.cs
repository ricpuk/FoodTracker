using System.Threading.Tasks;
using FluentAssertions;
using FoodTracker.Application.Common.DTOs;
using FoodTracker.Application.Users.Commands;
using NUnit.Framework;

namespace FoodTracker.Application.IntegrationTests.Users.Commands
{
    using static Testing;
    class SetGoalsCommandTests : TestBase
    {
        [Test]
        public async Task ShouldUpdateGoals()
        {
            await RunAsDefaultUserAsync();
            var command = new SetGoalsCommand
            {
                Goals = new UserGoalsDto
                {
                    CarbohydratesGoal = 100,
                    CaloriesGoal = 1000,
                    FatsGoal = 100,
                    ProteinGoal = 100,
                    WaterGoal = 1000
                }
            };
            var result = await SendAsync(command);

            var profile = await GetCurrentUserProfileAsync();

            profile.UserGoals.Count.Should().Be(2);
        }
    }
}
