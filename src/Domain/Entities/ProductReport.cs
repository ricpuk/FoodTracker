using FoodTracker.Domain.Common;
using FoodTracker.Domain.Enums;

namespace FoodTracker.Domain.Entities
{
    public class ProductReport : AuditableEntity
    {
        public int Id { get; set; }
        public Product Product { get; set; }
        public int ProductId { get; set; }
        public ProductReportReason Reason { get; set; }
        public bool Resolved { get; set; }
    }


}
