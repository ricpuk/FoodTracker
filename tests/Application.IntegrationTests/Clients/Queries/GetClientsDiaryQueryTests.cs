using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentAssertions;
using FoodTracker.Application.Clients.Queries.GetClientById;
using FoodTracker.Application.Clients.Queries.GetClientsDiary;
using FoodTracker.Application.Coaches.Queries.GetCoaches;
using FoodTracker.Application.Common.DTOs;
using FoodTracker.Application.Common.Exceptions;
using NUnit.Framework;

namespace FoodTracker.Application.IntegrationTests.Clients.Queries
{
    using static Testing;
    class GetClientsDiaryQueryTests
    {
        [SetUp]
        public async Task SetUp()
        {
            await ResetState();
        }
        [Test]
        public async Task ShouldGetClientsDiary()
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

            var query = new GetClientsDiaryQuery
            {
                ClientId = coach.Id,
                DiaryDate = DateTime.UtcNow
            };

            FluentActions.Invoking(() => SendAsync(query)).Should().Throw<NotFoundException>();

            //var diary = await ;

            //diary.Should().BeNull();
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
