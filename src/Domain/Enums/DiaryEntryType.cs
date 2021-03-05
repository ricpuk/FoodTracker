using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace FoodTracker.Domain.Enums
{
    public class DiaryEntryType
    {
        public int Id { get; set; }
        public int DiaryId { get; set; }
        [Column(TypeName = "time")]
        public DateTime TimeLogged { get; set; }
        
    }
}
