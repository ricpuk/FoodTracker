using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentAssertions;
using FoodTracker.Application.Clients.Queries.GetCachingRequests;
using FoodTracker.Application.Coaches.Commands.CreateCoachingRequest;
using FoodTracker.Application.Coaches.Queries.GetCoaches;
using FoodTracker.Application.CoachingRequests.Commands.AcceptCoachingRequest;
using FoodTracker.Application.CoachingRequests.Commands.DeclineCoachingRequest;
using FoodTracker.Domain.Entities;
using NUnit.Framework;

namespace FoodTracker.Application.IntegrationTests.CoachingRequests.Commands
{
    using static Testing;
    class DeclineCoachingRequestCommandTests : TestBase
    {
        [SetUp]
        public async Task SetUp()
        {
            await ResetState();
        }
        [Test]
        public async Task ShouldDeclineCoachingRequest()
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
            var coachingRequestEntity = new CoachingRequest
            {
                FromId = coach.Id,
                ToId = profile.Id
            };
            await AddAsync(coachingRequestEntity);

            var query = new GetCoachingRequestsQuery
            {
                Page = 1
            };
            var coachingRequests = await SendAsync(query);
            var coachingRequest = coachingRequests.Items.First();

            var declineCommand = new DeclineCoachingRequestCommand
            {
                RequestId = coachingRequest.Id
            };

            await SendAsync(declineCommand);

            coachingRequests = await SendAsync(query);

            coachingRequests.Items.Count.Should().Be(0);
        }

        [Test]
        public async Task ShouldAcceptCoachingRequest()
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
            var coachingRequestEntity = new CoachingRequest
            {
                FromId = coach.Id,
                ToId = profile.Id
            };
            await AddAsync(coachingRequestEntity);

            var query = new GetCoachingRequestsQuery
            {
                Page = 1
            };
            var coachingRequests = await SendAsync(query);
            var coachingRequest = coachingRequests.Items.First();

            var declineCommand = new AcceptCoachingRequestCommand
            {
                RequestId = coachingRequest.Id
            };

            await SendAsync(declineCommand);

            coachingRequests = await SendAsync(query);

            coachingRequests.Items.Count.Should().Be(0);
        }
    }
}
