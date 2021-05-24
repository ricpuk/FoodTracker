using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace FoodTracker.Domain.Entities
{
    public class UserProfile
    {
        public int Id { get; set; }
        public string ApplicationUserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ShortDescription { get; set; }
        public string WebsiteUrl { get; set; }
        public string YoutubeUrl { get; set; }
        public string TwitterUrl { get; set; }
        public string InstagramUrl { get; set; }
        public string FacebookUrl { get; set; }
        public IList<Diary> Diaries { get; set; } = new List<Diary>();
        public int? TrainerId { get; set; }
        public UserProfile Trainer { get; set; }
        public IList<UserProfile> Trainees { get; set; } = new List<UserProfile>();
        public List<UserGoals> UserGoals { get; set; } = new();
        public DateTime NotificationsLastSeen { get; set; }
        public List<Notification> Notifications { get; set; } = new();
        public string ProfilePicture { get; set; }

        [NotMapped]
        public UserGoals CurrentUserGoals => UserGoals.OrderByDescending(x => x.Id).FirstOrDefault();

    }
}
