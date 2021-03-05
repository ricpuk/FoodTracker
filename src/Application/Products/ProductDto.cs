using System.Collections.Generic;

namespace FoodTracker.Application.Products
{
    public class ProductDto
    {
        public int Id { get; set; }
        public string BarCode { get; set; }
        public string Name { get; set; }
        public IList<ProductServingDto> Servings { get; set; } = new List<ProductServingDto>();
    }
}
