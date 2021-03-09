namespace FoodTracker.Application.Common.Models
{
    public class DataServiceProduct
    {
        public string Name { get; set; }
        public string BarCode { get; set; }
        public DataServiceProductServing Serving { get; set; }
    }

    public class DataServiceProductServing
    {
        public double ServingSize { get; set; }
        public string ServingSizeUnits { get; set; } = "grams";
        public double Calories { get; set; }
        public double Sodium { get; set; }
        public double Fiber { get; set; }
        public double Fats { get; set; }
        public double Carbohydrates { get; set; }
        public double Protein { get; set; }
    }
}
