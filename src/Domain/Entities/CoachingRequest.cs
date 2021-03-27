using FoodTracker.Domain.Common;

namespace FoodTracker.Domain.Entities
{
    public enum CoachingRequestStatus
    {
        Sent,
        Accepted,
        Declined,
        Revoked
    }
    public class CoachingRequest : AuditableEntity
    {
        public int Id { get; set; }
        public int FromId { get; set; }
        public UserProfile From { get; set; }

        public int ToId { get; set; }
        public UserProfile To { get; set; }
        public CoachingRequestStatus Status { get; set; }
    }
}
