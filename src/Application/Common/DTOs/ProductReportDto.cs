using FoodTracker.Application.Products;
using FoodTracker.Domain.Enums;

namespace FoodTracker.Application.Common.DTOs
{
    public class ProductReportDto
    {
        public int Id { get; set; }
        public ProductDto Product { get; set; }
        public ProductReportReason Reason { get; set; }
        public bool Resolved { get; set; }
    }
}
