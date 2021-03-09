using System;
using Newtonsoft.Json;

namespace FoodTracker.Infrastructure.Services.DataServices.OpenFoodFacts.Utils
{
    public class OpenFoodFactsProductStringConverter : JsonConverter<String>
    {
        public override void WriteJson(JsonWriter writer, string value, JsonSerializer serializer)
        {
            throw new NotImplementedException();
        }

        public override string ReadJson(JsonReader reader, Type objectType, string existingValue, bool hasExistingValue, JsonSerializer serializer)
        {
            string str = (string)reader.Value;
            return str;
        }
    }
}
