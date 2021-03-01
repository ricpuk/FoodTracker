using System;
using FoodTracker.Application.Common.Interfaces;

namespace FoodTracker.Infrastructure.Services
{
    public class DateTimeService : IDateTime
    {
        public DateTime Now => DateTime.Now;
    }
}
