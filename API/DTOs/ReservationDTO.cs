using API.Entities;

namespace API.DTOs
{
    public class ReservationDTO
    {
        public int Id { get; set; }
        public DateTime OrderDate { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
        public required long Cost { get; set; }
        public required int Seats { get; set; }
        public List<ProductDTO> OrderedProducts { get; set; }
        public required string UserId { get; set; }
        public required int RestaurantId { get; set; }

        public ReservationDTO()
        {
            OrderedProducts= new List<ProductDTO>();
        }
    }
}
