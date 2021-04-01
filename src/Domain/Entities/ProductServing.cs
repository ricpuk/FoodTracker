using System;
using System.Collections.Generic;
using FoodTracker.Domain.Common;

namespace FoodTracker.Domain.Entities
{
    public class ProductServing : AuditableEntity
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public List<ProductServingVersion> ProductServingVersions { get; set; }
    }


}
