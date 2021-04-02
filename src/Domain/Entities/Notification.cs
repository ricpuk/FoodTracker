using FoodTracker.Domain.Common;

namespace FoodTracker.Domain.Entities
{
    public class Notification : AuditableEntity
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int UserProfileId { get; set; }
        public string Text { get; set; }
    }

}
