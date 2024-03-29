using API.DTOs.Product;
using API.DTOs.Restaurant;
using API.Entities;
using API.Entities.Enums;

namespace API.DTOs.Reservation
{
    public class ReservationDTO
    {
        public int Id { get; set; }
        public string SubmitDate { get; set; }
        public string ReservedDate { get; set; }
        public TimeSpan ReservedTime { get; set; }
        public required long Cost { get; set; }
        public required int Seats { get; set; }
        public string PaymentStatus { get; set; }
        public List<OrderItemDTO> OrderedProducts { get; set; }
        public required string UserId { get; set; }
        public required RestaurantDTO Restaurant { get; set; }

        public ReservationDTO()
        {
            OrderedProducts = new List<OrderItemDTO>();
        }
    }
}
