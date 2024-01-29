using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class CreateWorkingHoursDTO
    {
        public int WeekDay { get; set; }
        public List<CreateTimeSlotDTO> TimeSlots { get; set; }

        public CreateWorkingHoursDTO()
        {
            TimeSlots = new List<CreateTimeSlotDTO>();
        }


    }
}
