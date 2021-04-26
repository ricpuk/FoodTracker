using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentAssertions;
using FoodTracker.Application.Coaches.Commands.CreateCoachingRequest;
using FoodTracker.Application.Coaches.Commands.DeleteCoachingRequest;
using FoodTracker.Application.Coaches.Queries.GetCoaches;
using NUnit.Framework;

namespace FoodTracker.Application.IntegrationTests.Coaches.Commands
{
    using static Testing;
    class DeleteCoachingRequestCommandTests
    {
        [SetUp]
        public async Task SetUp()
        {
            await ResetState();
        }

        [Test]
        public async Task ShouldUpdateGoals()
        {
            await SeedDefaultUsers();
            await RunAsDefaultUserAsync();
            var profile = await GetCurrentUserProfileAsync();
            var command = new GetCoachesQuery
            {
                Page = 1
            };
            var result = await SendAsync(command);
            var coach = result.Items.First();

            var requestCommand = new CreateCoachingRequestCommand
            {
                CoachId = coach.Id
            };
            await SendAsync(requestCommand);

            var deleteCommand = new DeleteCoachingRequestCommand
            {
                CoachId = coach.Id
            };
            await SendAsync(deleteCommand);

            result = await SendAsync(command);

            result.Items.Find(x => x.Id == coach.Id).CoachingRequested.Should().Be(false);
        }
    }
}
