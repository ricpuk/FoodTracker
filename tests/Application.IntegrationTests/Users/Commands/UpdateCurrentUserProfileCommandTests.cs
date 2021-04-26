using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentAssertions;
using FoodTracker.Application.Common.DTOs;
using FoodTracker.Application.Users.Commands;
using NUnit.Framework;

namespace FoodTracker.Application.IntegrationTests.Users.Commands
{
    using static Testing;
    class UpdateCurrentUserProfileCommandTests : TestBase
    {
        [Test]
        public async Task ShouldUpdateGoals()
        {
            await RunAsDefaultUserAsync();
            var command = new UpdateCurrentUserProfileCommand
            {
                Profile = new UserProfileDto
                {
                    FirstName = "UpdatedTest",
                    LastName = "UpdatedTest"
                }
            };
            var result = await SendAsync(command);

            var profile = await GetCurrentUserProfileAsync();

            profile.FirstName.Should().Be(result.FirstName);
            profile.LastName.Should().Be(result.LastName);
        }
    }
}
