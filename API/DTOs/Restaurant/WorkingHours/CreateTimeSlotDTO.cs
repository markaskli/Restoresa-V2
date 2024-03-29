namespace API.DTOs.Restaurant.WorkingHours
{
    public class CreateTimeSlotDTO
    {
        public required string StartTime { get; set; }
        public bool Available = true;

    }
}
