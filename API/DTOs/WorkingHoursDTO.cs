using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class WorkingHoursDTO
    {
        public int Id { get; set; }
        public int WeekDay { get; set; }
        public List<TimeSlotDTO> TimeSlots { get; set; }

        public WorkingHoursDTO() 
        {
            TimeSlots = new List<TimeSlotDTO>();
        }
    }
}
