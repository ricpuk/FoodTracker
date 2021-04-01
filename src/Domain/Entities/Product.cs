using FoodTracker.Domain.Common;
using System.Collections.Generic;

namespace FoodTracker.Domain.Entities
{
    public class Product : AuditableEntity
    {
        public int Id { get; set; }
        public string BarCode { get; set; }
        public List<ProductVersion> ProductVersions { get; set; }
    }
}
