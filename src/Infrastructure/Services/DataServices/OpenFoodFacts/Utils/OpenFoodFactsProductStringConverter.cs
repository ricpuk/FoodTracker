using System;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace FoodTracker.Infrastructure.Services.DataServices.OpenFoodFacts.Utils
{
    public class OpenFoodFactsProductStringConverter : JsonConverter<string>
    {
        public override string Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            string str = reader.GetString();
            return str;
        }

        public override void Write(Utf8JsonWriter writer, string value, JsonSerializerOptions options)
        {
            throw new NotImplementedException();
        }
    }
}
