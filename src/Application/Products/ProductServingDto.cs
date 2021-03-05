using FoodTracker.Application.Common.Mappings;
using FoodTracker.Domain.Entities;

namespace FoodTracker.Application.Products
{
    public class ProductServingDto : IMapFrom<ProductServing>
    {
        public int ProductId { get; set; }
        public double ServingSize { get; set; }
        public string ServingSizeUnit { get; set; }
        public double Calories { get; set; }
        public double Protein { get; set; }
        public double Carbohydrates { get; set; }
        public double Fats { get; set; }
        public double Fiber { get; set; }
        public double Sodium { get; set; }
    }
}
