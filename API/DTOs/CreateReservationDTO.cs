using API.Entities;

namespace API.DTOs
{
    public class CreateReservationDTO
    {
        public DateTime ReservationCreationDate { get; set; }
        public DateTime ReservationDate { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
        public int Seats { get; set; }
        public required string UserId { get; set; }
        public required int RestaurantId { get; set; }

    }
}
