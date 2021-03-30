using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FoodTracker.Application.Common.DTOs
{
    public class UserStatsDto
    {
        public Dictionary<DateTime, UserStatDto> Stats { get; set; }
    }

    public class UserStatDto {
        public DateTime Date { get; set; }
        public double Weight { get; set; }
        public double WaterIntake { get; set; }
    }
}
