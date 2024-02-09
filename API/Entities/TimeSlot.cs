namespace API.Entities
{
    public class TimeSlot
    {
        public int Id { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
        public bool Available { get; set; } 
        public virtual int WorkingHoursId { get; set; }

        public TimeSlot()
        {
            Available = true;
        }
    }
}
