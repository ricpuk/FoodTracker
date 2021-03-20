using System.Collections.Generic;
using FoodTracker.Domain.Common;

namespace FoodTracker.Domain.Entities
{
    public class UserProfile : AuditableEntity
    {
        public int Id { get; set; }
        public IList<Diary> Diaries { get; set; } = new List<Diary>();
        public UserProfile Trainer { get; set; }
        public IList<UserProfile> Trainees { get; set; } = new List<UserProfile>();
        public UserGoals UserGoals { get; set; }
        public double StartingWeight { get; set; }
        public double WeightGoal { get; set; }

    }
}
