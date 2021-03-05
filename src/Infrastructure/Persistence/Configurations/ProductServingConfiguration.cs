using FoodTracker.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FoodTracker.Infrastructure.Persistence.Configurations
{
    public class ProductServingConfiguration : IEntityTypeConfiguration<ProductServing>
    {
        public void Configure(EntityTypeBuilder<ProductServing> builder)
        {
        }
    }
}
