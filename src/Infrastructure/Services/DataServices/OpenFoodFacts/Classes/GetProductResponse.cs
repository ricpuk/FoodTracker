using System;
using Newtonsoft.Json;

namespace FoodTracker.Infrastructure.Services.DataServices.OpenFoodFacts.Classes
{
    public class GetProductResponse
    {
        [JsonProperty("product")]
        public OpenFoodFactsProduct Product { get; set; }

        [JsonProperty("status")]
        public Int32 Status { get; set; }

        [JsonProperty("code")]
        public string Code { get; set; }

        [JsonProperty("status_verbose")]
        public string StatusVerbose { get; set; }
    }
}
