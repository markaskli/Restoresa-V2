using API.Entities;

namespace API.DTOs
{
    public class CreateReservationDTO
    {
        public required string ReservedDate { get; set; }
        public required string ReservedTime { get; set; }
        public required int Seats { get; set; }
        public required string UserId { get; set; }
        public required int RestaurantId { get; set; }

    }
}
