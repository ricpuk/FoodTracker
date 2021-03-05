using System;
using FoodTracker.Domain.Common;

namespace FoodTracker.Domain.Entities
{
    public class ProductServing : AuditableEntity
    {
        public int Id { get; set; }
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
