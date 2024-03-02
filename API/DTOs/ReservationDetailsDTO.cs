namespace API.DTOs
{
    public class ReservationDetailsDTO
    {
        public required string ReservedDate { get; set; }
        public required string ReservedTime { get; set; }
        public required int Seats { get; set; }
    }
}
