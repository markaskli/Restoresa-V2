using API.Entities;

namespace API.DTOs
{
    public class ReservationDTO
    {
        public int Id { get; set; }
        public DateTime SubmitDate { get; set; }
        public DateTime ReservedDate { get; set; }
        public TimeSpan ReservedTime { get; set; }
        public required long Cost { get; set; }
        public required int Seats { get; set; }
        public List<OrderItemDTO> OrderedProducts { get; set; }
        public required string UserId { get; set; }
        public required int RestaurantId { get; set; }

        public ReservationDTO()
        {
            OrderedProducts= new List<OrderItemDTO>();
        }
    }
}
