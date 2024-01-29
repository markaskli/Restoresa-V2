namespace API.DTOs
{
    public class TimeSlotDTO
    {
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
        public bool Available { get; set; }
    }
}
