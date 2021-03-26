using FoodTracker.Domain.Common;

namespace FoodTracker.Domain.Entities
{
    public enum TrainingRequestStatus
    {
        Sent,
        Accepted,
        Declined
    }
    public class TrainingRequest : AuditableEntity
    {
        public int Id { get; set; }
        public UserProfile From { get; set; }
        public UserProfile To { get; set; }
        public TrainingRequestStatus Status { get; set; }
    }
}
