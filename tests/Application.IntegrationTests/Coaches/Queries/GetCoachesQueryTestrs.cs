using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentAssertions;
using FoodTracker.Application.Coaches.Queries.GetCoaches;
using FoodTracker.Application.Common.DTOs;
using FoodTracker.Application.Users.Commands;
using FoodTracker.Infrastructure.Persistence;
using NUnit.Framework;

namespace FoodTracker.Application.IntegrationTests.Coaches
{
    using static Testing;
    class GetCoachesQueryTestrs : TestBase
    {
        [Test]
        public async Task ShouldUpdateGoals()
        {
            await SeedDefaultUsers();
            await RunAsDefaultUserAsync();
            var command = new GetCoachesQuery
            {
                Page = 1
            };
            var result = await SendAsync(command);
            result.Items.Count.Should().BeGreaterThan(0);
        }
    }
}
