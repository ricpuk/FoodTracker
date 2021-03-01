namespace FoodTracker.Application.Products
{
    public class ProductDto
    {
        public int Id { get; set; }
        public string BarCode { get; set; }
        public int Calories { get; set; }
        public double Protein { get; set; }
        public double Carbohydrates { get; set; }
        public double Fats { get; set; }
        public double Fiber { get; set; }
        public double Sodium { get; set; }
    }
}
