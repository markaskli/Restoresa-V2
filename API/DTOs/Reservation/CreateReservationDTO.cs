using API.Entities;

namespace API.DTOs.Reservation
{
    public class CreateReservationDTO
    {
        public required string ReservedDate { get; set; }
        public required string ReservedTime { get; set; }
        public required int Seats { get; set; }
        public required string CustomerId { get; set; }
        public required int RestaurantId { get; set; }

    }
}
