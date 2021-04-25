using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentAssertions;
using FoodTracker.Application.Common.DTOs;
using FoodTracker.Application.Common.Exceptions;
using FoodTracker.Application.DiaryEntries.Commands.CreateDiaryEntry;
using FoodTracker.Application.DiaryEntries.Commands.DeleteDiaryEntry;
using FoodTracker.Application.Products;
using FoodTracker.Domain.Enums;
using NUnit.Framework;

namespace FoodTracker.Application.IntegrationTests.DiaryEntries.Commands
{
    using static Testing;
    class DeleteDiaryEntryTests : TestBase
    {
        private DiaryDto _diary;
        private ProductDto _product;
        private DiaryEntryDto _diaryEntry;
        [SetUp]
        public async Task SetUp()
        {
            await RunAsDefaultUserAsync();
            _diary = await GetDiaryByDate(DateTime.UtcNow);
            _product = await CreateDefaultProduct();
            var entry = new DiaryEntryDto
            {
                DiaryId = _diary.Id,
                DiarySection = DiarySection.Breakfast,
                NumberOfServings = 1,
                Product = _product,
                ServingId = _product.Servings.First().Id,
                TimeLogged = DateTime.UtcNow
            };
            var command = new CreateDiaryEntryCommand
            {
                Entry = entry
            };
            command.SetDiaryId(_diary.Id);
            _diaryEntry = await SendAsync(command);
        }

        [Test]
        public async Task ShouldDeleteDiaryEntry()
        {
            var command = new DeleteDiaryEntryCommand();
            command.SetDiaryEntryId(_diaryEntry.Id);
            var result = await SendAsync(command);
            var diary = await GetDiaryByDate(_diary.Date);
            diary.Entries.Count.Should().Be(0);
        }

        [Test]
        public async Task ShouldThrowOnEditingEntry()
        {
            var command = new DeleteDiaryEntryCommand();
            command.SetDiaryEntryId(9999);
            FluentActions.Invoking(() => SendAsync(command))
                .Should()
                .Throw<NotFoundException>();
        }
    }
}
