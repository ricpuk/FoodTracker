using System.Collections.Generic;
using System.Linq;
using FoodTracker.Domain.Entities;

namespace FoodTracker.Application.Products
{
    public class ProductDto
    {
        public ProductDto()
        {
            
        }
        public ProductDto(Product product, ProductVersion productVersion)
        {
            Id = product.Id;
            BarCode = product.BarCode;
            Complete = true;
            Name = productVersion.Name;
            VersionId = productVersion.Id;
            foreach (var serving in productVersion.ProductServings)
            {
                Servings.Add(new ProductServingDto
                {
                    Carbohydrates = serving.Carbohydrates,
                    Calories = serving.Calories,
                    Fats = serving.Fats,
                    Id = serving.Id,
                    Protein = serving.Protein,
                    ProductVersionId = productVersion.Id,
                    ServingSize = serving.ServingSize,
                    ServingSizeUnit = serving.ServingSizeUnit
                });
            }
        }

        public ProductDto(Product product): 
            this(product, product.ProductVersions.OrderByDescending(x => x.Id).First())
        {
        }
        public int Id { get; set; }
        public bool Complete { get; set; }
        public string BarCode { get; set; }
        public string Name { get; set; }
        public int VersionId { get; set; }
        public IList<ProductServingDto> Servings { get; set; } = new List<ProductServingDto>();
    }
}
