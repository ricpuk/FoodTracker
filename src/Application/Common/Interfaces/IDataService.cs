using System.Threading.Tasks;
using FoodTracker.Application.Common.Models;

namespace FoodTracker.Application.Common.Interfaces
{
    public interface IDataService
    {
        Task<DataServiceProduct> FetchProduct(string barCode);
    }
}
