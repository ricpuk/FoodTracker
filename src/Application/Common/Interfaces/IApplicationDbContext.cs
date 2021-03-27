using FoodTracker.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace FoodTracker.Application.Common.Interfaces
{
    public interface IApplicationDbContext
    {
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductServing> ProductServings { get; set; }
        public DbSet<Diary> Diaries { get; set; }
        public DbSet<DiaryEntry> DiaryEntries { get; set; }
        public DbSet<UserGoals> UserGoals { get; set; }
        public DbSet<UserProfile> UserProfiles { get; set; }
        public DbSet<CoachingRequest> CoachingRequests { get; set; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
