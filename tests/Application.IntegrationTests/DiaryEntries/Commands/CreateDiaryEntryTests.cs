using System;
using System.Linq;
using System.Threading.Tasks;
using FluentAssertions;
using FoodTracker.Application.Common.DTOs;
using FoodTracker.Application.Common.Exceptions;
using FoodTracker.Application.DiaryEntries.Commands.CreateDiaryEntry;
using FoodTracker.Application.Products;
using FoodTracker.Domain.Enums;
using NUnit.Framework;

namespace FoodTracker.Application.IntegrationTests.DiaryEntries.Commands
{
    using static Testing;
    class CreateDiaryEntryTests : TestBase
    {
        private DiaryDto _diary;
        private ProductDto _product;
        [SetUp]
        public async Task SetUp()
        {
            await RunAsDefaultUserAsync();
            _diary = await GetDiaryByDate(DateTime.UtcNow);
            _product = await CreateDefaultProduct();

        }

        [Test]
        public async Task ShouldCreateDiaryEntry()
        {
            var command = new CreateDiaryEntryCommand
            {
                Entry = CreateEntryDto()
            };
            command.SetDiaryId(_diary.Id);
            await SendAsync(command);
            var diary = await GetDiaryByDate(_diary.Date);

            diary.Entries.Count.Should().Be(1);
        }

        [Test]
        public async Task ShouldThrowOnCreatingNewEntry()
        {
            var command = new CreateDiaryEntryCommand
            {
                Entry = CreateEntryDto()
            };
            command.SetDiaryId(9999);
            FluentActions.Invoking(() => SendAsync(command))
                .Should()
                .Throw<NotFoundException>();
        }

        private DiaryEntryDto CreateEntryDto()
        {
            return new DiaryEntryDto
            {
                DiaryId = _diary.Id,
                DiarySection = DiarySection.Breakfast,
                NumberOfServings = 1,
                Product = _product,
                ServingId = _product.Servings.First().Id,
                TimeLogged = DateTime.UtcNow
            };
        }
    }
}
