using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace FoodTracker.Infrastructure.Services.DataServices.OpenFoodFacts.Classes
{
    public class OpenFoodFactsNutritionValues
    {
        [JsonPropertyName("energy-kcal_100g")]
        public double Calories { get; set; }

        [JsonPropertyName("salt_100g")]
        public double Sodium { get; set; }

        [JsonPropertyName("fiber_100g")]
        public double Fiber { get; set; }

        [JsonPropertyName("fat_100g")]
        public double Fats { get; set; }

        [JsonPropertyName("sugars_100g")]
        public double Carbohydrates { get; set; }

        [JsonPropertyName("proteins")]
        public double Protein { get; set; }
    }
}
