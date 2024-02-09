using API.Entities;

namespace API.DTOs
{
    public class RestaurantDTO
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Address { get; set; }
        public required string PictureUrl { get; set; }
        public required string Description { get; set; }
        public List<ProductDTO> Products { get; set; }
        public List<WorkingHoursDTO> WorkingHours { get; set; }

        public RestaurantDTO()
        {
            Products = new List<ProductDTO>();
            WorkingHours = new List<WorkingHoursDTO>();
        }
    }
}
