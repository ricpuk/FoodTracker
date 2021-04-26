using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentAssertions;
using FoodTracker.Application.Products.Queries.GetProductsByBarCode;
using NUnit.Framework;

namespace FoodTracker.Application.IntegrationTests.Products.Queries
{
    using static Testing;
    class GetProductByBarCodeQueryTests : TestBase
    {
        [Test]
        public async Task ShouldGetExisitingProduct()
        {
            var product = await CreateDefaultProduct();
            var query = new GetProductsByBarCodeQuery
            {
                BarCode = product.BarCode
            };
            var response = await SendAsync(query);

            response.BarCode.Should().Be(product.BarCode);
        }

        [Test]
        public async Task ShouldGetProductFromOpenFoodFactsProduct()
        {
            var barCode = "11111111";
            var query = new GetProductsByBarCodeQuery
            {
                BarCode = barCode
            };
            var response = await SendAsync(query);

            response.BarCode.Should().Be(barCode);
        }

        [Test]
        public async Task ShouldNotFindProduct()
        {
            var barCode = "22222222";
            var query = new GetProductsByBarCodeQuery
            {
                BarCode = barCode
            };
            var response = await SendAsync(query);

            response.Should().BeNull();
        }
    }
}
