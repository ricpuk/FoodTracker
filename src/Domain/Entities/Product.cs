using System;
using FoodTracker.Domain.Common;
using System.Collections.Generic;

namespace FoodTracker.Domain.Entities
{
    public class Product : AuditableEntity
    {
        public int Id { get; set; }
        public string BarCode { get; set; }
        public string Name { get; set; }
        public IList<ProductServing> ProductServings { get; set; } = new List<ProductServing>();
    }
}
