using System;
using System.Threading.Tasks;
using FluentAssertions;
using FoodTracker.Application.Common.DTOs;
using FoodTracker.Application.Common.Exceptions;
using FoodTracker.Application.Diaries.Commands.LogWaterIntake;
using FoodTracker.Application.Diaries.Commands.LogWeight;
using FoodTracker.Application.Diaries.Queries;
using NUnit.Framework;

namespace FoodTracker.Application.IntegrationTests.Diaries.Queries
{
    using static Testing;
    class GetDiaryByDateTests : TestBase
    {
        [SetUp]
        public async Task SetUp()
        {
            await RunAsDefaultUserAsync();
        }
        [Test]
        public async Task ShouldReturnNewDiary()
        {
            var date = DateTime.UtcNow;
            var diary = await GetDiaryByDate(date);

            date.Should().BeSameDateAs(diary.Date);
            diary.Entries.Should().BeEmpty();
        }

        [Test]
        public async Task ShouldReturnExistingEmptyDiary()
        {
            var date = DateTime.UtcNow;
            var diary = await GetDiaryByDate(date);

            var query = new GetDiaryByDateQuery
            {
                Date = date
            };
            await SendAsync(query);

            var result = await SendAsync(query);

            result.Date.Should().BeSameDateAs(diary.Date);
            result.Entries.Should().BeEmpty();
        }

        [Test]
        public async Task ShouldLogWaterCorrectly()
        {
            var diary = await GetDiaryByDate(DateTime.UtcNow);
            double amount = 2000;

            var command = new LogWaterIntakeCommand
            {
                Date = diary.Date,
                Amount = amount
            };
            var result = await SendAsync(command);

            var updatedDiary = await GetDiaryByDate(diary.Date);

            updatedDiary.WaterIntake.Should().Be(amount).And.Be(result);
        }

        [Test]
        public async Task ShouldThrowWhenLoggingWater()
        {
            var diary = DateTime.UtcNow.AddMonths(1);
            double amount = 2000;

            var command = new LogWaterIntakeCommand
            {
                Date = diary.Date,
                Amount = amount
            };
            var result = FluentActions.
                Invoking(() => SendAsync(command))
                .Should()
                .Throw<NotFoundException>();
        }

        [Test]
        public async Task ShouldLogWeightCorrectly()
        {
            var diary = await GetDiaryByDate(DateTime.UtcNow);
            double amount = 85.2;

            var command = new LogWeightCommand
            {
                Date = diary.Date,
                Weight = amount
            };
            var result = await SendAsync(command);

            var updatedDiary = await GetDiaryByDate(diary.Date);

            updatedDiary.Weight.Should().Be(amount);
        }

        [Test]
        public async Task ShouldThrowWhenLoggingWeight()
        {
            var diary = DateTime.UtcNow.AddMonths(1);
            double amount = 85.2;

            var command = new LogWeightCommand
            {
                Date = diary.Date,
                Weight = amount
            };
            var result = FluentActions.
                Invoking(() => SendAsync(command))
                .Should()
                .Throw<NotFoundException>();
        }

        private async Task<DiaryDto> GetDiaryByDate(DateTime date)
        {
            var query = new GetDiaryByDateQuery
            {
                Date = date
            };
            return await SendAsync(query);
        }
    }
}
