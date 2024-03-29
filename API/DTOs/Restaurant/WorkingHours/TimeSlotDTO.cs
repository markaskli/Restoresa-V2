namespace API.DTOs.Restaurant.WorkingHours
{
    public class TimeSlotDTO
    {
        public required string StartTime { get; set; }
        public bool Available { get; set; }
    }
}
