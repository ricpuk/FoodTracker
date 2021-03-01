using FoodTracker.Domain.Common;
using System.Threading.Tasks;

namespace FoodTracker.Application.Common.Interfaces
{
    public interface IDomainEventService
    {
        Task Publish(DomainEvent domainEvent);
    }
}
