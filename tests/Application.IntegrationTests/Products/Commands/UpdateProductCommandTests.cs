using System.Collections.Generic;
using System.Threading.Tasks;
using FluentAssertions;
using FoodTracker.Application.Common.Exceptions;
using FoodTracker.Application.Products;
using FoodTracker.Application.Products.Commands.UpdateProduct;
using NUnit.Framework;

namespace FoodTracker.Application.IntegrationTests.Products.Commands
{
    using static Testing;
    public class UpdateProductCommandTests : TestBase
    {

        [Test]
        public async Task ShouldUpdateProduct()
        {
            var product = await CreateDefaultProduct();
            var query = new UpdateProductCommand
            {
                Id = product.Id,
                Name = "TestNew",
                Servings = new List<ProductServingDto>
                {
                    new()
                    {
                        Calories = 200,
                        Carbohydrates = 200,
                        Fats = 200,
                        Protein = 0,
                        ServingSize = 100,
                        ServingSizeUnit = "g"
                    }
                }
            };

            var response = await SendAsync(query);

            response.Name.Should().Be("TestNew");
        }

        [Test]
        public async Task ShouldNotFindProduct()
        {
            var id = 999;
            var query = new UpdateProductCommand
            {
                Id = id,
                Name = "Test",
                Servings = new List<ProductServingDto>()
            };

            FluentActions.Invoking(() => SendAsync(query)).Should().Throw<NotFoundException>();

        }
    }
}
