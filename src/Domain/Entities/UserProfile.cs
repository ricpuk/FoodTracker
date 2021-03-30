using System.Collections.Generic;
using FoodTracker.Domain.Common;

namespace FoodTracker.Domain.Entities
{
    public class UserProfile : AuditableEntity
    {
        public int Id { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ShortDescription { get; set; }
        public string WebsiteUrl { get; set; }
        public string YoutubeUrl { get; set; }
        public string TwitterUrl { get; set; }
        public string InstagramUrl { get; set; }
        public string FacebookUrl { get; set; }
        public IList<Diary> Diaries { get; set; } = new List<Diary>();
        public int? TrainerId { get; set; }
        public UserProfile Trainer { get; set; }
        public IList<UserProfile> Trainees { get; set; } = new List<UserProfile>();
        public UserGoals UserGoals { get; set; }
        public double StartingWeight { get; set; }
        public double WeightGoal { get; set; }

    }
}
