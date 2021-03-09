using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text;
using System.Threading.Tasks;
using FoodTracker.Infrastructure.Services.DataServices.OpenFoodFacts.Classes;

namespace FoodTracker.Infrastructure.Services.DataServices.OpenFoodFacts
{
    public class OpenFoodFactsClient
    {
        private const string BaseUrl = "https://world.openfoodfacts.org/api/v0/product/";
        private const string Extension = ".json";
        public OpenFoodFactsClient(HttpClient client)
        {
            Client = client;
        }

        public HttpClient Client { get; }

        public async Task<GetProductResponse> GetProduct(string barCode)
        {
            var responseRaw = await Client.GetAsync($"{BaseUrl}{barCode}{Extension}");
            //response.EnsureSuccessStatusCode();
            var response = await responseRaw.Content.ReadFromJsonAsync<GetProductResponse>();
            return response;

        }
    }
}
