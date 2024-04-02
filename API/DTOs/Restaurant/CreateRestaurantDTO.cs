using API.DTOs.Restaurant.WorkingHours;

namespace API.DTOs.Restaurant
{
    public class CreateRestaurantDTO
    {
        public required string Name { get; set; }
        public required string Address { get; set; }
        public required string PictureUrl { get; set; }
        public required string Description { get; set; }
        public required int MaxPeopleServedPerTable { get; set; }
        public List<CreateWorkingHoursDTO> WorkingHours { get; set; }
        public CreateRestaurantDTO()
        {
            WorkingHours = new List<CreateWorkingHoursDTO>();
        }

    }
}
