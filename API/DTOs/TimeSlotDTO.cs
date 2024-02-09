namespace API.DTOs
{
    public class TimeSlotDTO
    {
        public required string StartTime { get; set; }
        public required string EndTime { get; set; }
        public bool Available { get; set; }
    }
}
