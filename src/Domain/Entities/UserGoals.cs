using FoodTracker.Domain.Common;
using System;
using System.Collections.Generic;

namespace FoodTracker.Domain.Entities
{
    public class UserGoals : AuditableEntity
    {
        public int Id { get; set; }
        public int UserProfileId { get; set; }
        public double CaloriesGoal { get; set; }
        public double ProteinGoal { get; set; }
        public double CarbohydratesGoal { get; set; }
        public double FatsGoal { get; set; }
        public double WaterGoal { get; set; }
        public double StartingWeight { get; set; }
        public double WeightGoal { get; set; }

        public static implicit operator List<object>(UserGoals v)
        {
            throw new NotImplementedException();
        }
    }
}
