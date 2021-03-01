using System.Threading;
using System.Threading.Tasks;

namespace FoodTracker.Application.Common.Interfaces
{
    public interface IApplicationDbContext
    {
        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
