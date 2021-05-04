using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentAssertions;
using FoodTracker.Application.Common.Exceptions;
using FoodTracker.Application.ProductReports.Commands.CreateProductReport;
using FoodTracker.Application.ProductReports.Commands.ResolveProductReport;
using FoodTracker.Domain.Enums;
using NUnit.Framework;

namespace FoodTracker.Application.IntegrationTests.ProductReports.Commands
{
    using static Testing;
    public class ResolveProductReportCommandTests : TestBase
    {

        [Test]
        public async Task ShouldResolveReport()
        {
            var product = await CreateDefaultProduct();
            var query = new CreateProductReportCommand
            {
                ProductId = product.Id,
                Reason = ProductReportReason.WrongProduct
            };

            var response = await SendAsync(query);

            var report = GetContext().ProductReports
                .Where(x => x.ProductId == product.Id)
                .FirstOrDefault();

            var command = new ResolveProductReportCommand
            {
                Id = report.Id
            };

            response = await SendAsync(command);

            report = GetContext().ProductReports
                .Where(x => x.ProductId == product.Id)
                .FirstOrDefault();

            report.Resolved.Should().Be(true);
        }

        [Test]
        public async Task ShouldNotFindReport()
        {
            var id = 999;
            var query = new ResolveProductReportCommand
            {
                Id = id
            };

            FluentActions.Invoking(() => SendAsync(query)).Should().Throw<NotFoundException>();

        }
    }
}
