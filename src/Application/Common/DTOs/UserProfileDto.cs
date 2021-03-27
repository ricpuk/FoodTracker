﻿using FoodTracker.Application.Common.Mappings;
using FoodTracker.Domain.Entities;

namespace FoodTracker.Application.Common.DTOs
{
    public class UserProfileDto : IMapFrom<UserProfile>
    {
        public int Id { get; set; }
        public double StartingWeight { get; set; }
        public double WeightGoal { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ShortDescription { get; set; }

    }
}
