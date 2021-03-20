using FoodTracker.Application.Common.Mappings;
using FoodTracker.Domain.Entities;

namespace FoodTracker.Application.Common.DTOs
{
    public class UserGoalsDto : IMapFrom<UserGoals>
    {
        public int Id { get; set; }
        public double CaloriesGoal { get; set; }
        public double ProteinGoal { get; set; }
        public double CarbohydratesGoal { get; set; }
        public double FatsGoal { get; set; }
        public double WaterGoal { get; set; }
    }
}
