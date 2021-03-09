using System.Text.Json.Serialization;
using FoodTracker.Infrastructure.Services.DataServices.OpenFoodFacts.Utils;

namespace FoodTracker.Infrastructure.Services.DataServices.OpenFoodFacts.Classes
{
    public class GetProductResponse
    {
        [JsonPropertyName("product")]
        public OpenFoodFactsProduct Product { get; set; }

        [JsonPropertyName("status")]
        public OpenFoodFactsStatusCode Status { get; set; }

        [JsonPropertyName("code")]
        public string Code { get; set; }

        [JsonPropertyName("status_verbose")]
        [JsonConverter(typeof(OpenFoodFactsProductStringConverter))]
        public string StatusVerbose { get; set; }
    }
}
