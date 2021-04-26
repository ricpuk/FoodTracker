using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentAssertions;
using FoodTracker.Application.Users.Commands;
using Microsoft.AspNetCore.Http;
using Moq;
using NUnit.Framework;

namespace FoodTracker.Application.IntegrationTests.Users.Commands
{
    using static Testing;
    class UpdateCurrentUserPhotoCommandTests : TestBase
    {
        [Test]
        public async Task ShouldUpdateProfilePhoto()
        {
            await RunAsDefaultUserAsync();
            var formFileMock = new Mock<IFormFile>();

            var command = new UpdateCurrentUserPhotoCommand
            {
                File = formFileMock.Object
            };
            var result = await SendAsync(command);

            var profile = await GetCurrentUserProfileAsync();

            profile.ProfilePicture.Should().Be(result);
        }
    }
}
