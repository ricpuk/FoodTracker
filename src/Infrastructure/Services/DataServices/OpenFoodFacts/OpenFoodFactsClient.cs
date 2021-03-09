using System.Net.Http;
using System.Net.Http.Json;
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
            try
            {
                var response = await Client.GetFromJsonAsync<GetProductResponse>($"{BaseUrl}{barCode}{Extension}");
                return response;
            }
            catch
            {
                return new GetProductResponse
                {
                    Status = OpenFoodFactsStatusCode.NotFound
                };
            }

        }
    }
}
