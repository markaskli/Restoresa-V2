﻿namespace API.DTOs.Reservation
{
    public class ReservationDetailsDTO
    {
        public required string ReservedDate { get; set; }
        public required string ReservedTime { get; set; }
        public required int Seats { get; set; }
        public required int RestaurantId { get; set; }
    }
}
