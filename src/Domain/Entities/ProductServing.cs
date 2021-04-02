using FoodTracker.Domain.Common;

namespace FoodTracker.Domain.Entities
{
    public class ProductServing
    {
        public int Id { get; set; }
        public int ProductVersionId { get; set; }
        public ProductVersion ProductVersion { get; set; }
        public double ServingSize { get; set; }
        public string ServingSizeUnit { get; set; }
        public double Calories { get; set; }
        public double Protein { get; set; }
        public double Carbohydrates { get; set; }
        public double Fats { get; set; }
    }


}
