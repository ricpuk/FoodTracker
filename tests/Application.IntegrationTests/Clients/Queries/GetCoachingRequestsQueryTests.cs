using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentAssertions;
using FoodTracker.Application.Clients.Queries.GetCachingRequests;
using FoodTracker.Application.Coaches.Commands.CreateCoachingRequest;
using FoodTracker.Application.Coaches.Queries.GetCoaches;
using FoodTracker.Domain.Entities;
using NUnit.Framework;

namespace FoodTracker.Application.IntegrationTests.Clients.Queries
{
    using static Testing;
    class GetCoachingRequestsQueryTests : TestBase
    {
        [SetUp]
        public async Task SetUp()
        {
            await ResetState();
        }
        [Test]
        public async Task ShouldGetCoacingRequests()
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
            var coachingRequest = new CoachingRequest
            {
                FromId = coach.Id,
                ToId = profile.Id
            };
            await AddAsync(coachingRequest);

            var query = new GetCoachingRequestsQuery
            {
                Page = 1
            };
            var coachingRequests = await SendAsync(query);

            coachingRequests.Items.Count.Should().Be(1);
        }
    }
}
