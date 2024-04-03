using System.ComponentModel.DataAnnotations;

namespace API.DTOs.Restaurant.WorkingHours
{
    public class CreateWorkingHoursDTO
    {
        public DayOfWeek WeekDay { get; set; }
        public required string StartTime { get; set; }
        public required string FinishTime { get; set; }
        public List<CreateTimeSlotDTO> TimeSlots { get; set; }

        public CreateWorkingHoursDTO()
        {
            TimeSlots = new List<CreateTimeSlotDTO>();
        }


    }
}
