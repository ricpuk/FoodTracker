using System.Threading.Tasks;
using FoodTracker.Application.Common.Interfaces;
using FoodTracker.Application.Common.Models;
using FoodTracker.Infrastructure.Services.DataServices.OpenFoodFacts.Classes;

namespace FoodTracker.Infrastructure.Services.DataServices.OpenFoodFacts
{
    public class OpenFoodFactsDataService : IDataService
    {
        private readonly OpenFoodFactsClient _client;

        public OpenFoodFactsDataService(OpenFoodFactsClient client)
        {
            _client = client;
        }

        public async Task<DataServiceProduct> FetchProduct(string barCode)
        {
            try
            {
                var response = await _client.GetProduct(barCode);
                if (response.Status == OpenFoodFactsStatusCode.NotFound)
                {
                    return null;
                }

                return MapToDsProduct(response.Product);
            }
            catch
            {
                return null;
            }
        }

        private DataServiceProduct MapToDsProduct(OpenFoodFactsProduct source)
        {
            var sourceNutritionValues = source.NutritionValues;
            return new DataServiceProduct
            {
                Name = source.ProductName,
                Serving = new DataServiceProductServing
                {
                    Calories = sourceNutritionValues.Calories,
                    Carbohydrates = sourceNutritionValues.Carbohydrates,
                    Fats = sourceNutritionValues.Fats,
                    Fiber = sourceNutritionValues.Fiber,
                    Protein = sourceNutritionValues.Protein,
                    Sodium = sourceNutritionValues.Sodium,
                    ServingSize = 100,
                    ServingSizeUnits = "grams"
                }
            };
        }
    }
}
