using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FoodTracker.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FoodTracker.Infrastructure.Persistence.Configurations
{
    public class CoachingRequestConfiguration : IEntityTypeConfiguration<CoachingRequest>
    {
        public void Configure(EntityTypeBuilder<CoachingRequest> builder)
        {
            builder.HasAlternateKey(cr => new {cr.FromId, cr.ToId});
        }
    }
}
