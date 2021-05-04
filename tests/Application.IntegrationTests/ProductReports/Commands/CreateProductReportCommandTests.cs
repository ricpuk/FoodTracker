using System.Linq;
using System.Threading.Tasks;
using FluentAssertions;
using FoodTracker.Application.Common.Exceptions;
using FoodTracker.Application.ProductReports.Commands.CreateProductReport;
using FoodTracker.Domain.Enums;
using NUnit.Framework;

namespace FoodTracker.Application.IntegrationTests.ProductReports.Commands
{
    using static Testing;
    public class CreateProductReportCommandTests : TestBase
    {

        [Test]
        public async Task ShouldCreateReport()
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

            report.Should().NotBe(null);
        }

        [Test]
        public async Task ShouldNotFindProduct()
        {
            var id = 999;
            var query = new CreateProductReportCommand
            {
                ProductId = id,
                Reason = ProductReportReason.WrongProduct
            };

            FluentActions.Invoking(() => SendAsync(query)).Should().Throw<NotFoundException>();

        }
    }
}
