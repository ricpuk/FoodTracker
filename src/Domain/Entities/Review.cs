using FoodTracker.Domain.Common;

namespace FoodTracker.Domain.Entities
{
    public class Review : AuditableEntity
    {
        public int Id { get; set; }
        public UserProfile Client { get; set; }
        public int ClientId { get; set; }
        public UserProfile Trainer { get; set; }
        public int TrainerId { get; set; }
        public string Title { get; set; }
        public string Text { get; set; }
        public int StarsRating { get; set; }
    }
}
