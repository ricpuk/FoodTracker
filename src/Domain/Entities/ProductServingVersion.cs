namespace FoodTracker.Domain.Entities
{
    public class ProductServingVersion
    {
        public int Id { get; set; }
        public int ProductServingId { get; set; }
        public ProductServing ProductServing { get; set; }
        public double ServingSize { get; set; }
        public string ServingSizeUnit { get; set; }
        public double Calories { get; set; }
        public double Protein { get; set; }
        public double Carbohydrates { get; set; }
        public double Fats { get; set; }
    }
}
