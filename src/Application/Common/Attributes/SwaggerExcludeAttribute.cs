using System;

namespace FoodTracker.Application.Common.Attributes
{
    [AttributeUsage(AttributeTargets.Property)]
    public class SwaggerExcludeAttribute : Attribute
    {
    }
}
