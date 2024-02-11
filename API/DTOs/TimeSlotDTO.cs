namespace API.DTOs
{
    public class TimeSlotDTO
    {
        public required string StartTime { get; set; }
        public bool Available { get; set; }
    }
}
