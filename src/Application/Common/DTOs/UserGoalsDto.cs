using FoodTracker.Application.Common.Mappings;
using FoodTracker.Domain.Entities;

namespace FoodTracker.Application.Common.DTOs
{
    public class UserGoalsDto : IMapFrom<UserGoals>
    {
        public UserGoalsDto()
        {
            
        }

        public UserGoalsDto(UserGoals goals)
        {
            Id = goals.Id;
            CaloriesGoal = goals.CaloriesGoal;
            ProteinGoal = goals.ProteinGoal;
            CarbohydratesGoal = goals.CarbohydratesGoal;
            FatsGoal = goals.FatsGoal;
            WaterGoal = goals.WaterGoal;
            StartingWeight = goals.StartingWeight;
            WeightGoal = goals.WeightGoal;
        }
        public int Id { get; set; }
        public double CaloriesGoal { get; set; }
        public double ProteinGoal { get; set; }
        public double CarbohydratesGoal { get; set; }
        public double FatsGoal { get; set; }
        public double WaterGoal { get; set; }
        public double StartingWeight { get; set; }
        public double WeightGoal { get; set; }
    }
}
