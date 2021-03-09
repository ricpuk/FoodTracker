using System.Threading.Tasks;
using AutoMapper;
using FoodTracker.Application.Common.Interfaces;
using FoodTracker.Application.Common.Models;

namespace FoodTracker.Infrastructure.Services.DataServices.OpenFoodFacts
{
    public class OpenFoodFactsDataService : IDataService
    {
        private readonly OpenFoodFactsClient _client;
        private readonly IMapper _mapper;

        public OpenFoodFactsDataService(OpenFoodFactsClient client, IMapper mapper)
        {
            _client = client;
            _mapper = mapper;
        }

        public async Task<DataServiceProduct> FetchProduct(string barCode)
        {
            var response = await _client.GetProduct(barCode);
            return new DataServiceProduct();

        }
    }
}
