using System.Collections.Generic;
using System.Text.Json.Serialization;
using FoodTracker.Infrastructure.Services.DataServices.OpenFoodFacts.Utils;

namespace FoodTracker.Infrastructure.Services.DataServices.OpenFoodFacts.Classes
{
    public class OpenFoodFactsProduct
    {
        [JsonPropertyName("image_front_url")]
        public string ImageFrontUrl { get; set; }

        [JsonPropertyName("brands_tags")]
        public IEnumerable<string> BrandsTags { get; set; }

        [JsonPropertyName("product_name")]
        [JsonConverter(typeof(OpenFoodFactsProductStringConverter))]
        public string ProductName { get; set; }

        [JsonPropertyName("image_url")]
        public string ImageUrl { get; set; }

        [JsonPropertyName("nutrition_data_per")]
        public string NutritionDataPer { get; set; }

        [JsonPropertyName("nutriments")]
        public OpenFoodFactsNutritionValues NutritionValues { get; set; }
    }
}
