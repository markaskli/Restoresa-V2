using System.ComponentModel.DataAnnotations;

namespace API.DTOs.Restaurant.WorkingHours
{
    public class WorkingHoursDTO
    {
        public int Id { get; set; }
        public required string StartTime { get; set; }
        public required string FinishTime { get; set; }
        public required string WeekDay { get; set; }
        public List<TimeSlotDTO> TimeSlots { get; set; }

        public WorkingHoursDTO()
        {
            TimeSlots = new List<TimeSlotDTO>();
        }
    }
}
