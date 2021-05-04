using System.Threading.Tasks;
using FluentAssertions;
using FoodTracker.Application.Common.Exceptions;
using FoodTracker.Application.Products.Commands.DeleteProduct;
using FoodTracker.Domain.Entities;
using NUnit.Framework;

namespace FoodTracker.Application.IntegrationTests.Products.Commands
{
    using static Testing;
    public class DeleteProductCommandTests : TestBase
    {

        [Test]
        public async Task ShouldDeleteProduct()
        {
            var product = await CreateDefaultProduct();
            var query = new DeleteProductCommand
            {
                Id = product.Id
            };

            var response = await SendAsync(query);

            var productTest = await FindAsync<Product>(product.Id);
            productTest.Should().Be(null);
        }

        [Test]
        public async Task ShouldNotFindProduct()
        {
            var id = 999;
            var query = new DeleteProductCommand
            {
                Id = id
            };

            FluentActions.Invoking(() => SendAsync(query)).Should().Throw<NotFoundException>();


        }
    }
}
