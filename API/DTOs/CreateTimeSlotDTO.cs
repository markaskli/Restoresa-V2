namespace API.DTOs
{
    public class CreateTimeSlotDTO
    {
        public int StartingHour { get; set; }
        public int StartingMinutes { get; set; }
        public int EndingHour { get; set; }
        public int EndingMinutes { get; set; }
    }
}
