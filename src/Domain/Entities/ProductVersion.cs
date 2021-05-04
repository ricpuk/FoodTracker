using System.Collections.Generic;

namespace FoodTracker.Domain.Entities
{
    public class ProductVersion
    {
        public int Id { get; set; }
        public IList<ProductServing> ProductServings { get; set; } = new List<ProductServing>();
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public string Name { get; set; }
    }
}
