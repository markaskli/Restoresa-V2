namespace API.DTOs
{
    public class CreateTimeSlotDTO
    {
        public required string StartTime { get; set; }
        public bool Available = true;

    }
}
