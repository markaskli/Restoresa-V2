namespace API.DTOs
{
    public class WorkingHoursDTO
    {
        public int Id { get; set; }
        public int WeekDay { get; set; }
        public int OpenTime { get; set; }
        public int CloseTime { get; set; }
    }
}
