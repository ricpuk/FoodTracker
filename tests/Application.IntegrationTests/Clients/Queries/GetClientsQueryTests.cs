using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentAssertions;
using FoodTracker.Application.Clients.Queries.GetCachingRequests;
using FoodTracker.Application.Clients.Queries.GetClients;
using FoodTracker.Application.Coaches.Queries.GetCoaches;
using FoodTracker.Application.Common.DTOs;
using FoodTracker.Domain.Entities;
using FoodTracker.Infrastructure.Persistence;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;

namespace FoodTracker.Application.IntegrationTests.Clients.Queries
{
    using  static Testing;
    class GetClientsQueryTests : TestBase
    {
        [SetUp]
        public async Task SetUp()
        {
            await ResetState();
        }
        [Test]
        public async Task ShouldGetClients()
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

            await SetClient(coach, profile.Id);

            var query = new GetClientsQuery
            {
                Page = 1
            };
            var clients = await SendAsync(query);

            clients.Items.Count.Should().Be(1);
        }

        private async Task SetClient(BaseUserDto user, int trainerId)
        {
            await using var context = GetContext();
            var profile = await context.UserProfiles.FindAsync(user.Id);
            profile.TrainerId = trainerId;
            await context.SaveChangesAsync();
        }
    }
}
