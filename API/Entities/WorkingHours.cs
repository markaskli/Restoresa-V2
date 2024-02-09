using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class WorkingHours
    {
        public int Id { get; set; }
        public DayOfWeek Weekday { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan FinishTime { get; set; }
        public List<TimeSlot> TimeSlots { get; set; }
        public virtual int RestaurantId { get; set; }

        public WorkingHours()
        {
            TimeSlots = new List<TimeSlot>();
        }

    }
}
